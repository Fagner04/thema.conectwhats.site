# 📋 Configuração de Frete via Google Sheets

## Passo 1: Obter Credenciais dos Correios

### Como conseguir as credenciais:

1. **Contrato com os Correios**
   - Você precisa ter um contrato ativo com os Correios
   - Entre em contato com uma agência dos Correios
   - Solicite um contrato para e-commerce

2. **Credenciais que você receberá:**
   - **Usuário**: Código de usuário do contrato
   - **Senha**: Senha de acesso
   - **Código Administrativo**: Código da empresa
   - **Cartão de Postagem**: Número do cartão

3. **Para testes (sem contrato):**
   - Você pode usar credenciais de teste dos Correios
   - Usuário: `sigepweb` (sem contrato)
   - Senha: (deixe vazio para testes)
   - **IMPORTANTE**: Valores de teste podem não ser precisos

## Passo 2: Criar a Planilha (Opcional - apenas para fallback)

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Na primeira linha, adicione os cabeçalhos:

```
CEP_INICIO | CEP_FIM | VALOR | PRAZO | NOME_SERVICO
```

## Passo 2: Criar a Planilha (Opcional - apenas para fallback)

**Nota**: Se você usar a OPÇÃO 1 (API dos Correios), não precisa criar a planilha. A planilha é necessária apenas para a OPÇÃO 2 (fallback manual).

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Na primeira linha, adicione os cabeçalhos:

```
CEP_INICIO | CEP_FIM | VALOR | PRAZO | NOME_SERVICO
```

## Passo 2B: Adicionar Dados de Frete (Opcional)

Exemplo de dados (adicione suas próprias faixas de CEP):

```
74000000    74999999    15.00    5    PAC
74000000    74999999    25.00    2    SEDEX
74000000    74999999    35.00    1    SEDEX 10
75000000    75999999    18.00    6    PAC
75000000    75999999    28.00    3    SEDEX
01000000    01999999    20.00    7    PAC
01000000    01999999    35.00    3    SEDEX
```

**Importante:**
- CEP_INICIO e CEP_FIM devem ser números sem hífen (8 dígitos)
- VALOR deve usar ponto como separador decimal (ex: 15.00)
- PRAZO é em dias úteis
- NOME_SERVICO é o nome que aparecerá para o cliente

## Passo 3: Criar o Google Apps Script

1. Na planilha, vá em **Extensões > Apps Script**
2. Apague o código padrão
3. Cole o código abaixo:

### OPÇÃO 1: Usando API dos Correios (Recomendado)

```javascript
// ========================================
// CONFIGURAÇÃO - PREENCHA COM SUAS CREDENCIAIS
// ========================================
const CONFIG = {
  // Credenciais do contrato dos Correios
  usuario: 'SEU_USUARIO_AQUI',           // Ex: 'sigepweb'
  senha: 'SUA_SENHA_AQUI',               // Senha do contrato
  codigoAdministrativo: 'SEU_CODIGO',    // Código administrativo (se tiver)
  cartaoPostagem: 'SEU_CARTAO',          // Número do cartão de postagem
  
  // CEP de origem (seu endereço)
  cepOrigem: '74000000',                 // CEP sem hífen
  
  // Serviços a consultar (códigos dos Correios)
  servicos: [
    { codigo: '04014', nome: 'SEDEX' },
    { codigo: '04510', nome: 'PAC' },
    { codigo: '04782', nome: 'SEDEX 10' },
    { codigo: '04790', nome: 'SEDEX Hoje' }
  ],
  
  // Configurações do produto (valores padrão)
  pesoKg: 1,        // Peso em kg
  formato: 1,       // 1=caixa/pacote, 2=rolo/prisma, 3=envelope
  comprimento: 20,  // em cm
  altura: 10,       // em cm
  largura: 15,      // em cm
  diametro: 0,      // em cm (para formato cilíndrico)
  maoPropria: 'N', // S ou N
  valorDeclarado: 0, // Valor declarado (0 = sem seguro)
  avisoRecebimento: 'N' // S ou N
};

// ========================================
// FUNÇÃO PRINCIPAL
// ========================================
function doGet(e) {
  try {
    const cep = e.parameter.cep;
    const peso = e.parameter.peso || CONFIG.pesoKg;
    const valor = e.parameter.valor || CONFIG.valorDeclarado;
    
    if (!cep || cep.length !== 8) {
      return retornarJSON({
        error: 'CEP inválido. Deve conter 8 dígitos.'
      });
    }
    
    // Consultar API dos Correios
    const opcoes = consultarCorreios(cep, peso, valor);
    
    return retornarJSON({
      cep: cep,
      opcoes: opcoes
    });
    
  } catch (error) {
    Logger.log('Erro: ' + error.message);
    return retornarJSON({
      error: 'Erro ao consultar frete: ' + error.message
    });
  }
}

// ========================================
// CONSULTAR API DOS CORREIOS
// ========================================
function consultarCorreios(cepDestino, peso, valorDeclarado) {
  const opcoes = [];
  
  for (let i = 0; i < CONFIG.servicos.length; i++) {
    const servico = CONFIG.servicos[i];
    
    try {
      // Montar URL da API dos Correios
      const url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?' + 
        'nCdEmpresa=' + CONFIG.codigoAdministrativo +
        '&sDsSenha=' + CONFIG.senha +
        '&nCdServico=' + servico.codigo +
        '&sCepOrigem=' + CONFIG.cepOrigem +
        '&sCepDestino=' + cepDestino +
        '&nVlPeso=' + peso +
        '&nCdFormato=' + CONFIG.formato +
        '&nVlComprimento=' + CONFIG.comprimento +
        '&nVlAltura=' + CONFIG.altura +
        '&nVlLargura=' + CONFIG.largura +
        '&nVlDiametro=' + CONFIG.diametro +
        '&sCdMaoPropria=' + CONFIG.maoPropria +
        '&nVlValorDeclarado=' + valorDeclarado +
        '&sCdAvisoRecebimento=' + CONFIG.avisoRecebimento +
        '&StrRetorno=xml';
      
      // Fazer requisição
      const response = UrlFetchApp.fetch(url, {
        muteHttpExceptions: true
      });
      
      const xml = response.getContentText();
      
      // Parsear XML
      const valor = extrairValorXML(xml, 'Valor');
      const prazo = extrairValorXML(xml, 'PrazoEntrega');
      const erro = extrairValorXML(xml, 'Erro');
      const msgErro = extrairValorXML(xml, 'MsgErro');
      
      // Se não houver erro, adicionar opção
      if (erro === '0' && valor) {
        opcoes.push({
          nome: servico.nome,
          valor: parseFloat(valor.replace(',', '.')),
          prazo: parseInt(prazo) || 0
        });
      } else if (msgErro) {
        Logger.log('Erro ' + servico.nome + ': ' + msgErro);
      }
      
    } catch (error) {
      Logger.log('Erro ao consultar ' + servico.nome + ': ' + error.message);
    }
  }
  
  // Ordenar por valor (mais barato primeiro)
  opcoes.sort((a, b) => a.valor - b.valor);
  
  return opcoes;
}

// ========================================
// FUNÇÕES AUXILIARES
// ========================================
function extrairValorXML(xml, tag) {
  const regex = new RegExp('<' + tag + '>(.*?)<\/' + tag + '>', 'i');
  const match = xml.match(regex);
  return match ? match[1] : null;
}

function retornarJSON(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ========================================
// FUNÇÃO DE TESTE (opcional)
// ========================================
function testar() {
  const resultado = doGet({ parameter: { cep: '01310100' } });
  Logger.log(resultado.getContent());
}
```

### OPÇÃO 2: Usando Planilha (Backup/Fallback)

```javascript
function doGet(e) {
  try {
    const cep = e.parameter.cep;
    
    if (!cep || cep.length !== 8) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'CEP inválido. Deve conter 8 dígitos.'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const cepNumero = parseInt(cep);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Pular cabeçalho
    const opcoes = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const cepInicio = parseInt(row[0]);
      const cepFim = parseInt(row[1]);
      const valor = parseFloat(row[2]);
      const prazo = parseInt(row[3]);
      const nome = row[4];
      
      // Verificar se o CEP está na faixa
      if (cepNumero >= cepInicio && cepNumero <= cepFim) {
        opcoes.push({
          nome: nome,
          valor: valor,
          prazo: prazo
        });
      }
    }
    
    // Ordenar por valor (mais barato primeiro)
    opcoes.sort((a, b) => a.valor - b.valor);
    
    return ContentService.createTextOutput(JSON.stringify({
      cep: cep,
      opcoes: opcoes
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: 'Erro ao processar solicitação: ' + error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Clique em **Salvar** (ícone de disquete)
5. Dê um nome ao projeto (ex: "API Frete Shopify")

### 🤔 Qual opção escolher?

**Use OPÇÃO 1 (API dos Correios) se:**
- ✅ Você tem contrato com os Correios
- ✅ Quer valores e prazos reais e atualizados
- ✅ Quer cálculo automático baseado em peso/dimensões
- ✅ Não quer manter uma planilha manualmente

**Use OPÇÃO 2 (Planilha) se:**
- ✅ Você não tem contrato com os Correios
- ✅ Quer controle total sobre os valores
- ✅ Tem tabelas de frete personalizadas
- ✅ Quer valores fixos por região

### ⚙️ Configurando a OPÇÃO 1 (API dos Correios)

No código da OPÇÃO 1, localize a seção `CONFIG` e preencha:

```javascript
const CONFIG = {
  usuario: 'seu_usuario',              // Fornecido pelos Correios
  senha: 'sua_senha',                  // Fornecida pelos Correios
  codigoAdministrativo: 'seu_codigo',  // Código da empresa
  cartaoPostagem: 'seu_cartao',        // Número do cartão
  cepOrigem: '74000000',               // SEU CEP (sem hífen)
  
  // Ajuste peso e dimensões padrão do seu produto
  pesoKg: 1,        // Peso médio em kg
  comprimento: 20,  // em cm
  altura: 10,       // em cm
  largura: 15,      // em cm
};
```

**Dica**: Você pode passar peso e valor por parâmetro na URL:
- `?cep=01310100&peso=2&valor=100`

## Passo 4: Publicar como Web App

1. Clique em **Implantar > Nova implantação**
2. Clique no ícone de engrenagem ⚙️ e selecione **Aplicativo da Web**
3. Configure:
   - **Descrição**: API de Frete
   - **Executar como**: Eu (seu email)
   - **Quem tem acesso**: Qualquer pessoa
4. Clique em **Implantar**
5. **Copie a URL** que aparece (algo como: `https://script.google.com/macros/s/...../exec`)
6. Clique em **Concluído**

## Passo 5: Configurar no Shopify

1. Acesse o painel admin do Shopify
2. Vá em **Temas > Personalizar**
3. Clique em **Configurações do tema** (ícone de pincel no canto superior esquerdo)
4. Procure a seção **"Frete via Planilha Google Sheets"**
5. Marque **"Ativar cálculo de frete via planilha"**
6. Cole a URL copiada no campo **"URL da API do Google Sheets"**
7. Clique em **Salvar**

## Passo 6: Adicionar ao Tema

Adicione o snippet onde quiser mostrar o cálculo de frete:

### Na página do produto:
Edite `sections/product-template.liquid` e adicione:

```liquid
{% render 'frete-planilha' %}
```

### No carrinho:
Edite `sections/cart-template.liquid` e adicione:

```liquid
{% render 'frete-planilha' %}
```

## 🔧 Testando

1. Acesse uma página de produto ou carrinho
2. Digite um CEP que esteja na sua planilha
3. Clique em "Calcular Frete"
4. Deve aparecer as opções de frete disponíveis

## 📝 Dicas

- **Organize por regiões**: Agrupe CEPs por estado ou região
- **Atualize facilmente**: Basta editar a planilha, não precisa mexer no código
- **Múltiplas opções**: Você pode ter várias linhas para o mesmo CEP com serviços diferentes
- **Frete grátis**: Use valor 0.00 para frete grátis em determinadas regiões

## ⚠️ Importante

- A planilha precisa estar acessível (não pode ser privada)
- Cada consulta conta como uma execução do Apps Script (Google tem limites gratuitos)
- Para grandes volumes, considere usar um banco de dados real

## 🆘 Problemas Comuns

**Erro "Script não autorizado":**
- Certifique-se de que publicou como "Qualquer pessoa" tem acesso

**Nenhuma opção aparece:**
- Verifique se os CEPs na planilha estão sem hífen
- Confirme que o CEP testado está dentro de alguma faixa

**Erro ao calcular:**
- Verifique se a URL está correta
- Teste a URL diretamente no navegador: `URL?cep=74000000`

**Usando API dos Correios:**

**Erro "Acesso negado":**
- Verifique se suas credenciais estão corretas
- Confirme que o contrato está ativo

**Valores muito altos ou errados:**
- Verifique o peso configurado (deve estar em kg)
- Confirme as dimensões (em cm)
- Verifique se o CEP de origem está correto

**Timeout ou demora muito:**
- A API dos Correios pode estar lenta
- Considere adicionar cache ou usar planilha como fallback

**Serviços não disponíveis:**
- Nem todos os serviços estão disponíveis para todas as regiões
- Remova serviços que não usa da lista `CONFIG.servicos`

## 🔄 Combinando as duas opções

Você pode criar um sistema híbrido:

1. Tente primeiro a API dos Correios
2. Se falhar, use a planilha como fallback

```javascript
function doGet(e) {
  try {
    const cep = e.parameter.cep;
    
    // Tentar API dos Correios primeiro
    let opcoes = consultarCorreios(cep);
    
    // Se não retornar nada, usar planilha
    if (opcoes.length === 0) {
      opcoes = consultarPlanilha(cep);
    }
    
    return retornarJSON({ cep: cep, opcoes: opcoes });
  } catch (error) {
    return retornarJSON({ error: error.message });
  }
}
```

## 📊 Logs e Monitoramento

Para ver os logs do Apps Script:

1. No editor do Apps Script
2. Vá em **Execuções** (ícone de relógio)
3. Veja todas as execuções e erros

Para adicionar logs no código:
```javascript
Logger.log('Consultando CEP: ' + cep);
```
