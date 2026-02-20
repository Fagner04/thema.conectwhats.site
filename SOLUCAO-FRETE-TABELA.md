# ✅ SOLUÇÃO IMEDIATA - Frete por Tabela

## Problema Identificado

O token da API dos Correios que você tem está **inválido ou expirado**. 

Erro: `GTW-006: Token inválido`

## Como Renovar o Token (para usar API depois)

1. Acesse: https://cws.correios.com.br/
2. Faça login com suas credenciais
3. Vá em **Tokens** ou **Chaves de API**
4. Gere um novo token
5. Copie o novo token e atualize nas configurações

## ✅ SOLUÇÃO IMEDIATA - Use Este Script

Este script funciona **AGORA** sem depender da API dos Correios. Ele usa uma tabela interna com valores de frete por região do Brasil.

### Script Completo (Cole no Google Apps Script)

```javascript
// ========================================
// CALCULADORA DE FRETE - TABELA INTERNA
// Funciona sem API dos Correios
// ========================================

const CONFIG = {
  cepOrigem: '74550050', // Seu CEP de origem
  pesoBase: 1000,        // Peso base em gramas (1kg)
  
  // Ajuste estes multiplicadores conforme necessário
  multiplicadorPeso: 0.5,  // A cada kg adicional, aumenta 50% do valor base
  
  // Tabela de frete por região (primeiros 2 dígitos do CEP)
  tabelaFrete: {
    // Goiás (74-76) - Região próxima
    '74': { pac: 12.50, sedex: 22.00, prazo_pac: 5, prazo_sedex: 2 },
    '75': { pac: 13.00, sedex: 23.00, prazo_pac: 6, prazo_sedex: 3 },
    '76': { pac: 13.50, sedex: 24.00, prazo_pac: 6, prazo_sedex: 3 },
    
    // Brasília (70-73) - Região próxima
    '70': { pac: 14.00, sedex: 25.00, prazo_pac: 5, prazo_sedex: 2 },
    '71': { pac: 14.00, sedex: 25.00, prazo_pac: 5, prazo_sedex: 2 },
    '72': { pac: 14.00, sedex: 25.00, prazo_pac: 5, prazo_sedex: 2 },
    '73': { pac: 14.00, sedex: 25.00, prazo_pac: 5, prazo_sedex: 2 },
    
    // Tocantins (77)
    '77': { pac: 16.00, sedex: 29.00, prazo_pac: 7, prazo_sedex: 3 },
    
    // Mato Grosso (78)
    '78': { pac: 15.00, sedex: 27.00, prazo_pac: 6, prazo_sedex: 3 },
    
    // Mato Grosso do Sul (79)
    '79': { pac: 16.00, sedex: 29.00, prazo_pac: 7, prazo_sedex: 3 },
    
    // Minas Gerais (30-39)
    '30': { pac: 16.00, sedex: 29.00, prazo_pac: 6, prazo_sedex: 3 },
    '31': { pac: 16.00, sedex: 29.00, prazo_pac: 6, prazo_sedex: 3 },
    '32': { pac: 16.50, sedex: 30.00, prazo_pac: 7, prazo_sedex: 3 },
    '33': { pac: 16.50, sedex: 30.00, prazo_pac: 7, prazo_sedex: 3 },
    '34': { pac: 17.00, sedex: 31.00, prazo_pac: 7, prazo_sedex: 3 },
    '35': { pac: 17.00, sedex: 31.00, prazo_pac: 7, prazo_sedex: 3 },
    '36': { pac: 17.50, sedex: 32.00, prazo_pac: 8, prazo_sedex: 4 },
    '37': { pac: 17.50, sedex: 32.00, prazo_pac: 8, prazo_sedex: 4 },
    '38': { pac: 18.00, sedex: 33.00, prazo_pac: 8, prazo_sedex: 4 },
    '39': { pac: 18.00, sedex: 33.00, prazo_pac: 8, prazo_sedex: 4 },
    
    // São Paulo (01-19)
    '01': { pac: 18.00, sedex: 32.00, prazo_pac: 7, prazo_sedex: 3 },
    '02': { pac: 18.00, sedex: 32.00, prazo_pac: 7, prazo_sedex: 3 },
    '03': { pac: 18.00, sedex: 32.00, prazo_pac: 7, prazo_sedex: 3 },
    '04': { pac: 18.00, sedex: 32.00, prazo_pac: 7, prazo_sedex: 3 },
    '05': { pac: 18.00, sedex: 32.00, prazo_pac: 7, prazo_sedex: 3 },
    '06': { pac: 18.50, sedex: 33.00, prazo_pac: 7, prazo_sedex: 3 },
    '07': { pac: 18.50, sedex: 33.00, prazo_pac: 7, prazo_sedex: 3 },
    '08': { pac: 18.50, sedex: 33.00, prazo_pac: 7, prazo_sedex: 3 },
    '09': { pac: 19.00, sedex: 34.00, prazo_pac: 8, prazo_sedex: 4 },
    '10': { pac: 19.00, sedex: 34.00, prazo_pac: 8, prazo_sedex: 4 },
    '11': { pac: 19.00, sedex: 34.00, prazo_pac: 8, prazo_sedex: 4 },
    '12': { pac: 19.50, sedex: 35.00, prazo_pac: 8, prazo_sedex: 4 },
    '13': { pac: 19.50, sedex: 35.00, prazo_pac: 8, prazo_sedex: 4 },
    '14': { pac: 19.50, sedex: 35.00, prazo_pac: 8, prazo_sedex: 4 },
    '15': { pac: 20.00, sedex: 36.00, prazo_pac: 9, prazo_sedex: 4 },
    '16': { pac: 20.00, sedex: 36.00, prazo_pac: 9, prazo_sedex: 4 },
    '17': { pac: 20.00, sedex: 36.00, prazo_pac: 9, prazo_sedex: 4 },
    '18': { pac: 20.50, sedex: 37.00, prazo_pac: 9, prazo_sedex: 4 },
    '19': { pac: 20.50, sedex: 37.00, prazo_pac: 9, prazo_sedex: 4 },
    
    // Rio de Janeiro (20-28)
    '20': { pac: 19.00, sedex: 34.00, prazo_pac: 8, prazo_sedex: 4 },
    '21': { pac: 19.00, sedex: 34.00, prazo_pac: 8, prazo_sedex: 4 },
    '22': { pac: 19.50, sedex: 35.00, prazo_pac: 8, prazo_sedex: 4 },
    '23': { pac: 19.50, sedex: 35.00, prazo_pac: 8, prazo_sedex: 4 },
    '24': { pac: 20.00, sedex: 36.00, prazo_pac: 9, prazo_sedex: 4 },
    '25': { pac: 20.00, sedex: 36.00, prazo_pac: 9, prazo_sedex: 4 },
    '26': { pac: 20.50, sedex: 37.00, prazo_pac: 9, prazo_sedex: 4 },
    '27': { pac: 20.50, sedex: 37.00, prazo_pac: 9, prazo_sedex: 4 },
    '28': { pac: 21.00, sedex: 38.00, prazo_pac: 10, prazo_sedex: 5 },
    
    // Espírito Santo (29)
    '29': { pac: 19.00, sedex: 34.00, prazo_pac: 8, prazo_sedex: 4 },
    
    // Bahia (40-48)
    '40': { pac: 22.00, sedex: 40.00, prazo_pac: 10, prazo_sedex: 5 },
    '41': { pac: 22.00, sedex: 40.00, prazo_pac: 10, prazo_sedex: 5 },
    '42': { pac: 22.50, sedex: 41.00, prazo_pac: 10, prazo_sedex: 5 },
    '43': { pac: 22.50, sedex: 41.00, prazo_pac: 10, prazo_sedex: 5 },
    '44': { pac: 23.00, sedex: 42.00, prazo_pac: 11, prazo_sedex: 6 },
    '45': { pac: 23.00, sedex: 42.00, prazo_pac: 11, prazo_sedex: 6 },
    '46': { pac: 23.50, sedex: 43.00, prazo_pac: 11, prazo_sedex: 6 },
    '47': { pac: 23.50, sedex: 43.00, prazo_pac: 11, prazo_sedex: 6 },
    '48': { pac: 24.00, sedex: 44.00, prazo_pac: 12, prazo_sedex: 6 },
    
    // Sergipe (49)
    '49': { pac: 24.00, sedex: 44.00, prazo_pac: 12, prazo_sedex: 6 },
    
    // Pernambuco (50-56)
    '50': { pac: 24.00, sedex: 44.00, prazo_pac: 12, prazo_sedex: 6 },
    '51': { pac: 24.00, sedex: 44.00, prazo_pac: 12, prazo_sedex: 6 },
    '52': { pac: 24.50, sedex: 45.00, prazo_pac: 12, prazo_sedex: 6 },
    '53': { pac: 24.50, sedex: 45.00, prazo_pac: 12, prazo_sedex: 6 },
    '54': { pac: 25.00, sedex: 46.00, prazo_pac: 13, prazo_sedex: 7 },
    '55': { pac: 25.00, sedex: 46.00, prazo_pac: 13, prazo_sedex: 7 },
    '56': { pac: 25.50, sedex: 47.00, prazo_pac: 13, prazo_sedex: 7 },
    
    // Alagoas (57)
    '57': { pac: 25.00, sedex: 46.00, prazo_pac: 13, prazo_sedex: 7 },
    
    // Paraíba (58)
    '58': { pac: 25.00, sedex: 46.00, prazo_pac: 13, prazo_sedex: 7 },
    
    // Rio Grande do Norte (59)
    '59': { pac: 25.00, sedex: 46.00, prazo_pac: 13, prazo_sedex: 7 },
    
    // Ceará (60-63)
    '60': { pac: 25.00, sedex: 46.00, prazo_pac: 13, prazo_sedex: 7 },
    '61': { pac: 25.00, sedex: 46.00, prazo_pac: 13, prazo_sedex: 7 },
    '62': { pac: 25.50, sedex: 47.00, prazo_pac: 13, prazo_sedex: 7 },
    '63': { pac: 25.50, sedex: 47.00, prazo_pac: 13, prazo_sedex: 7 },
    
    // Piauí (64)
    '64': { pac: 26.00, sedex: 48.00, prazo_pac: 14, prazo_sedex: 7 },
    
    // Maranhão (65)
    '65': { pac: 27.00, sedex: 50.00, prazo_pac: 14, prazo_sedex: 8 },
    
    // Pará (66-68)
    '66': { pac: 28.00, sedex: 52.00, prazo_pac: 15, prazo_sedex: 8 },
    '67': { pac: 28.00, sedex: 52.00, prazo_pac: 15, prazo_sedex: 8 },
    '68': { pac: 28.50, sedex: 53.00, prazo_pac: 15, prazo_sedex: 8 },
    
    // Amazonas, Roraima, Acre (69)
    '69': { pac: 30.00, sedex: 56.00, prazo_pac: 18, prazo_sedex: 10 },
    
    // Paraná (80-87)
    '80': { pac: 20.00, sedex: 36.00, prazo_pac: 8, prazo_sedex: 4 },
    '81': { pac: 20.00, sedex: 36.00, prazo_pac: 8, prazo_sedex: 4 },
    '82': { pac: 20.50, sedex: 37.00, prazo_pac: 9, prazo_sedex: 4 },
    '83': { pac: 20.50, sedex: 37.00, prazo_pac: 9, prazo_sedex: 4 },
    '84': { pac: 21.00, sedex: 38.00, prazo_pac: 9, prazo_sedex: 5 },
    '85': { pac: 21.00, sedex: 38.00, prazo_pac: 9, prazo_sedex: 5 },
    '86': { pac: 21.50, sedex: 39.00, prazo_pac: 10, prazo_sedex: 5 },
    '87': { pac: 21.50, sedex: 39.00, prazo_pac: 10, prazo_sedex: 5 },
    
    // Santa Catarina (88-89)
    '88': { pac: 21.00, sedex: 38.00, prazo_pac: 9, prazo_sedex: 5 },
    '89': { pac: 21.00, sedex: 38.00, prazo_pac: 9, prazo_sedex: 5 },
    
    // Rio Grande do Sul (90-99)
    '90': { pac: 22.00, sedex: 40.00, prazo_pac: 10, prazo_sedex: 5 },
    '91': { pac: 22.00, sedex: 40.00, prazo_pac: 10, prazo_sedex: 5 },
    '92': { pac: 22.50, sedex: 41.00, prazo_pac: 10, prazo_sedex: 5 },
    '93': { pac: 22.50, sedex: 41.00, prazo_pac: 10, prazo_sedex: 5 },
    '94': { pac: 23.00, sedex: 42.00, prazo_pac: 11, prazo_sedex: 6 },
    '95': { pac: 23.00, sedex: 42.00, prazo_pac: 11, prazo_sedex: 6 },
    '96': { pac: 23.50, sedex: 43.00, prazo_pac: 11, prazo_sedex: 6 },
    '97': { pac: 23.50, sedex: 43.00, prazo_pac: 11, prazo_sedex: 6 },
    '98': { pac: 24.00, sedex: 44.00, prazo_pac: 12, prazo_sedex: 6 },
    '99': { pac: 24.00, sedex: 44.00, prazo_pac: 12, prazo_sedex: 6 }
  }
};

// ========================================
// FUNÇÃO PRINCIPAL
// ========================================
function doGet(e) {
  try {
    const cep = e.parameter.cep;
    const debug = e.parameter.debug === '1';
    const pesoGramas = e.parameter.peso ? parseFloat(e.parameter.peso) * 1000 : CONFIG.pesoBase;
    
    if (!cep || cep.length !== 8) {
      return retornarJSON({
        error: 'CEP inválido. Deve conter 8 dígitos.'
      });
    }
    
    const resultado = calcularFrete(cep, pesoGramas, debug);
    return retornarJSON(resultado);
    
  } catch (error) {
    Logger.log('Erro: ' + error.message);
    return retornarJSON({
      cep: e.parameter.cep || '',
      opcoes: [],
      error: error.message
    });
  }
}

// ========================================
// CALCULAR FRETE
// ========================================
function calcularFrete(cep, pesoGramas, debug) {
  const opcoes = [];
  const regiao = cep.substring(0, 2);
  
  // Buscar valores na tabela
  let valores = CONFIG.tabelaFrete[regiao];
  
  // Se não encontrar, usar valores padrão
  if (!valores) {
    valores = { pac: 20.00, sedex: 36.00, prazo_pac: 10, prazo_sedex: 5 };
  }
  
  // Calcular multiplicador de peso (a cada kg adicional)
  const pesoKg = pesoGramas / 1000;
  const pesoAdicional = Math.max(0, pesoKg - 1); // Peso além de 1kg
  const multiplicador = 1 + (pesoAdicional * CONFIG.multiplicadorPeso);
  
  // Calcular valores finais
  const valorPac = parseFloat((valores.pac * multiplicador).toFixed(2));
  const valorSedex = parseFloat((valores.sedex * multiplicador).toFixed(2));
  
  opcoes.push({
    nome: 'PAC',
    valor: valorPac,
    prazo: valores.prazo_pac
  });
  
  opcoes.push({
    nome: 'SEDEX',
    valor: valorSedex,
    prazo: valores.prazo_sedex
  });
  
  const resultado = {
    cep: cep,
    opcoes: opcoes
  };
  
  if (debug) {
    resultado.debug = {
      regiao: regiao,
      encontrado: !!CONFIG.tabelaFrete[regiao],
      pesoKg: pesoKg,
      multiplicador: multiplicador,
      valoresBase: valores
    };
  }
  
  return resultado;
}

// ========================================
// RETORNAR JSON
// ========================================
function retornarJSON(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ========================================
// TESTE
// ========================================
function testar() {
  const resultado = doGet({ parameter: { cep: '74605120', debug: '1' } });
  Logger.log(resultado.getContent());
}
```

## Como Usar

1. Copie todo o código acima
2. Cole no Google Apps Script (substitua tudo)
3. Salve
4. Vá em **Implantar > Gerenciar implantações**
5. Edite a implantação e mude para "Nova versão"
6. Clique em **Implantar**
7. Teste: `https://script.google.com/macros/s/SEU_ID/exec?cep=74605120`

## Vantagens

✅ Funciona imediatamente  
✅ Não depende da API dos Correios  
✅ Você controla os valores  
✅ Calcula peso automaticamente  
✅ Cobre todo o Brasil  

## Ajustar Valores

Para ajustar os valores de frete, edite a tabela `tabelaFrete` no código. Por exemplo:

```javascript
'74': { pac: 12.50, sedex: 22.00, prazo_pac: 5, prazo_sedex: 2 },
```

Mude para os valores que você quiser.

## Depois que Renovar o Token

Quando você renovar o token dos Correios, podemos voltar a usar a API. Mas por enquanto, use esta solução que funciona perfeitamente!
