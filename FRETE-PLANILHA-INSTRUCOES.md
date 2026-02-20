# 📋 Configuração de Frete via Google Sheets

## Passo 1: Criar a Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Na primeira linha, adicione os cabeçalhos:

```
CEP_INICIO | CEP_FIM | VALOR | PRAZO | NOME_SERVICO
```

## Passo 2: Adicionar Dados de Frete

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
