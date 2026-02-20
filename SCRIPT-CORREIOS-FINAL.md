# Script Final - API Correios (SEM DEBUG)

Cole este código no Google Apps Script:

```javascript
// ========================================
// CALCULADORA DE FRETE - API CORREIOS
// Versão final sem debug
// ========================================

const CONFIG = {
  // Credenciais dos Correios
  idCorreios: '45688532000100',
  chaveApi: 'RyFdHVt61RGXDLap5gLuGFkXobkkdmDF4LAUTXsm',
  cartaoPostagem: '0077411030',
  
  // CEP de origem padrão
  cepOrigemPadrao: '74550050',
  
  // Serviços
  servicos: [
    { codigo: '03298', nome: 'PAC' },
    { codigo: '03220', nome: 'SEDEX' }
  ],
  
  // Configurações do pacote
  pesoGramas: 1000,
  formato: 2,
  comprimento: 20,
  altura: 10,
  largura: 15,
  diametro: 0
};

function doGet(e) {
  try {
    const cep = e.parameter.cep || e.parameter.destination_cep;
    const peso = parseFloat(e.parameter.peso || e.parameter.cart_weight || 0.5);
    const cepOrigem = e.parameter.cep_origem || e.parameter.origin_cep || CONFIG.cepOrigemPadrao;
    
    const cleanDestCep = cep ? cep.replace(/\D/g, '') : '';
    const cleanOriginCep = cepOrigem.replace(/\D/g, '');
    
    if (!cleanDestCep || cleanDestCep.length !== 8) {
      return retornarJSON({
        success: false,
        error: 'CEP inválido. Deve conter 8 dígitos.'
      });
    }
    
    const resultado = consultarCorreiosAPI(cleanOriginCep, cleanDestCep, peso);
    return retornarJSON(resultado);
    
  } catch (error) {
    Logger.log('Erro: ' + error.message);
    return retornarJSON({
      success: false,
      error: 'Erro ao processar solicitação'
    });
  }
}

function obterTokenCorreios() {
  try {
    const url = 'https://api.correios.com.br/token/v1/autentica/cartaopostagem';
    
    const credentials = Utilities.base64Encode(
      CONFIG.idCorreios + ':' + CONFIG.chaveApi
    );
    
    const payload = {
      numero: CONFIG.cartaoPostagem
    };
    
    const options = {
      method: 'post',
      contentType: 'application/json',
      headers: {
        'Authorization': 'Basic ' + credentials
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const statusCode = response.getResponseCode();
    
    if (statusCode === 201 || statusCode === 200) {
      const data = JSON.parse(response.getContentText());
      return { success: true, token: data.token };
    }
    
    return { success: false };
  } catch (error) {
    return { success: false };
  }
}

function consultarPreco(token, originCep, destCep, pesoGramas, serviceCode) {
  try {
    const url = 'https://api.correios.com.br/preco/v1/nacional/' + serviceCode +
      '?cepOrigem=' + originCep +
      '&cepDestino=' + destCep +
      '&psObjeto=' + pesoGramas +
      '&tpObjeto=' + CONFIG.formato +
      '&comprimento=' + CONFIG.comprimento +
      '&largura=' + CONFIG.largura +
      '&altura=' + CONFIG.altura +
      '&diametro=' + CONFIG.diametro;
    
    const options = {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
      },
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const statusCode = response.getResponseCode();
    
    if (statusCode === 200) {
      const data = JSON.parse(response.getContentText());
      return {
        success: true,
        price: parseFloat(data.pcFinal || 0)
      };
    }
    
    return { success: false };
  } catch (error) {
    return { success: false };
  }
}

function consultarPrazo(token, originCep, destCep, serviceCode) {
  try {
    const url = 'https://api.correios.com.br/prazo/v1/nacional/' + serviceCode +
      '?cepOrigem=' + originCep +
      '&cepDestino=' + destCep;
    
    const options = {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
      },
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const statusCode = response.getResponseCode();
    
    if (statusCode === 200) {
      const data = JSON.parse(response.getContentText());
      return {
        success: true,
        days: parseInt(data.prazoEntrega || 0)
      };
    }
    
    return { success: false, days: 0 };
  } catch (error) {
    return { success: false, days: 0 };
  }
}

function consultarCorreiosAPI(originCep, destCep, pesoKg) {
  const options = [];
  
  const authResult = obterTokenCorreios();
  
  if (!authResult.success) {
    return {
      success: false,
      options: [],
      error: 'Erro ao autenticar com os Correios'
    };
  }
  
  const token = authResult.token;
  const pesoGramas = Math.max(300, Math.round(pesoKg * 1000));
  
  for (let i = 0; i < CONFIG.servicos.length; i++) {
    const servico = CONFIG.servicos[i];
    
    const precoResult = consultarPreco(token, originCep, destCep, pesoGramas, servico.codigo);
    
    if (precoResult.success && precoResult.price > 0) {
      const prazoResult = consultarPrazo(token, originCep, destCep, servico.codigo);
      const days = prazoResult.success ? prazoResult.days : 0;
      
      options.push({
        id: 'correios-' + servico.nome.toLowerCase(),
        name: servico.nome,
        carrier: 'correios',
        description: 'Entrega ' + (servico.nome === 'PAC' ? 'econômica' : 'expressa') + ' dos Correios',
        price: Math.round(precoResult.price * 100) / 100,
        estimated_days: days > 0 ? 'até ' + (days + 1) + ' dias úteis' : 'Consultar',
        type: 'delivery'
      });
    }
  }
  
  options.sort((a, b) => a.price - b.price);
  
  if (options.length === 0) {
    return {
      success: false,
      options: [],
      error: 'Nenhuma opção de frete disponível'
    };
  }
  
  return {
    success: true,
    options: options,
    cep: destCep
  };
}

function retornarJSON(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Como usar:

1. Copie o código acima
2. Cole no Google Apps Script (substitua tudo)
3. Salve
4. Vá em **Implantar > Gerenciar implantações**
5. Edite a implantação e mude para "Nova versão"
6. Clique em **Implantar**

Agora a URL **NÃO** vai mais mostrar debug, apenas os dados necessários:

```json
{
  "success": true,
  "options": [
    {
      "id": "correios-sedex",
      "name": "SEDEX",
      "carrier": "correios",
      "description": "Entrega expressa dos Correios",
      "price": 11.15,
      "estimated_days": "até 2 dias úteis",
      "type": "delivery"
    },
    {
      "id": "correios-pac",
      "name": "PAC",
      "carrier": "correios",
      "description": "Entrega econômica dos Correios",
      "price": 17.34,
      "estimated_days": "até 7 dias úteis",
      "type": "delivery"
    }
  ],
  "cep": "74605120"
}
```

Pronto! Sem debug aparecendo.
