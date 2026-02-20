# 🚀 Resumo: Sistema de Frete com API dos Correios

## ✅ O que foi implementado

### 1. Configurações no Tema Shopify
- Campos para ativar/desativar o sistema
- Campo para URL da API do Google Apps Script
- Campos para armazenar credenciais dos Correios (para referência)

### 2. Snippet de Cálculo (`snippets/frete-planilha.liquid`)
- Interface visual para digitar CEP
- Formatação automática do CEP
- Consulta à API via Google Apps Script
- Exibição de múltiplas opções de frete
- Suporte a peso e valor do produto

### 3. Google Apps Script
- **OPÇÃO 1**: Integração direta com API dos Correios
  - Consulta valores reais em tempo real
  - Suporta múltiplos serviços (PAC, SEDEX, etc)
  - Calcula baseado em peso, dimensões e CEP
  
- **OPÇÃO 2**: Tabela manual via planilha
  - Controle total sobre valores
  - Faixas de CEP personalizadas
  - Fallback se API dos Correios falhar

### 4. Integração no Tema
- Calculadora na página do produto (com peso/valor do produto)
- Calculadora na página do carrinho

## 📋 Arquivos Criados

1. **`snippets/frete-planilha.liquid`** - Interface do calculador
2. **`FRETE-PLANILHA-INSTRUCOES.md`** - Instruções completas de configuração
3. **`CORREIOS-CODIGOS-SERVICOS.md`** - Lista de códigos e serviços dos Correios
4. **`config/settings_schema.json`** - Configurações adicionadas

## 🎯 Como Funciona

```
Cliente digita CEP
       ↓
Shopify envia para Google Apps Script
       ↓
Apps Script consulta API dos Correios
       ↓
Retorna opções de frete (PAC, SEDEX, etc)
       ↓
Exibe para o cliente
```

## ⚙️ Configuração Rápida

### Passo 1: Criar Google Apps Script
1. Crie uma planilha no Google Sheets
2. Vá em Extensões > Apps Script
3. Cole o código da OPÇÃO 1 (API dos Correios)
4. Configure suas credenciais no objeto `CONFIG`
5. Publique como Web App

### Passo 2: Configurar no Shopify
1. Copie a URL do Apps Script
2. Vá em Temas > Personalizar > Configurações
3. Procure "Frete via Planilha Google Sheets"
4. Ative e cole a URL
5. Salve

### Passo 3: Testar
1. Acesse uma página de produto
2. Digite um CEP
3. Clique em "Calcular Frete"
4. Veja as opções disponíveis

## 🔑 Credenciais dos Correios

### Com Contrato (Produção)
```javascript
const CONFIG = {
  usuario: 'seu_usuario_correios',
  senha: 'sua_senha_correios',
  codigoAdministrativo: 'seu_codigo',
  cartaoPostagem: 'seu_cartao',
  cepOrigem: '74000000',
  
  servicos: [
    { codigo: '40436', nome: 'PAC' },
    { codigo: '40096', nome: 'SEDEX' }
  ]
};
```

### Sem Contrato (Testes)
```javascript
const CONFIG = {
  usuario: 'sigepweb',
  senha: '',
  codigoAdministrativo: '',
  cartaoPostagem: '',
  cepOrigem: '74000000',
  
  servicos: [
    { codigo: '04510', nome: 'PAC' },
    { codigo: '04014', nome: 'SEDEX' }
  ]
};
```

## 💡 Vantagens

### Usando API dos Correios:
- ✅ Valores reais e atualizados automaticamente
- ✅ Prazos de entrega precisos
- ✅ Cálculo baseado em peso e dimensões reais
- ✅ Múltiplos serviços (PAC, SEDEX, SEDEX 10, etc)
- ✅ Sem necessidade de manter tabelas manualmente

### Usando Planilha:
- ✅ Controle total sobre valores
- ✅ Não depende de contrato com Correios
- ✅ Pode criar promoções de frete
- ✅ Valores fixos por região
- ✅ Fácil de atualizar

## 🔧 Personalizações Possíveis

### 1. Passar peso do produto
```liquid
{% render 'frete-planilha', peso: product.weight, valor: product.price %}
```

### 2. Adicionar mais serviços
```javascript
servicos: [
  { codigo: '04510', nome: 'PAC' },
  { codigo: '04014', nome: 'SEDEX' },
  { codigo: '04782', nome: 'SEDEX 10' },
  { codigo: '04790', nome: 'SEDEX Hoje' }
]
```

### 3. Ajustar dimensões padrão
```javascript
pesoKg: 2,           // 2 kg
comprimento: 30,     // 30 cm
altura: 15,          // 15 cm
largura: 20          // 20 cm
```

### 4. Adicionar serviços adicionais
```javascript
maoPropria: 'S',        // Exigir mão própria
valorDeclarado: 100,    // Seguro de R$ 100
avisoRecebimento: 'S'   // Com aviso de recebimento
```

## 📊 Monitoramento

### Ver logs no Apps Script:
1. Abra o Apps Script
2. Clique em "Execuções" (ícone de relógio)
3. Veja todas as chamadas e erros

### Adicionar logs personalizados:
```javascript
Logger.log('CEP consultado: ' + cep);
Logger.log('Opções encontradas: ' + opcoes.length);
```

## ⚠️ Limitações

### Google Apps Script:
- Limite de 20.000 execuções por dia (gratuito)
- Timeout de 30 segundos por execução
- Pode ter latência em horários de pico

### API dos Correios:
- Requer contrato para valores precisos
- Pode estar indisponível ocasionalmente
- Limites de peso e dimensões

## 🆘 Suporte

### Problemas comuns:
- **Erro 401**: Credenciais incorretas
- **Nenhuma opção**: CEP fora da área de cobertura
- **Timeout**: API dos Correios lenta (use cache)
- **Valores errados**: Verifique peso e dimensões

### Documentação:
- `FRETE-PLANILHA-INSTRUCOES.md` - Instruções completas
- `CORREIOS-CODIGOS-SERVICOS.md` - Códigos e serviços

## 🎉 Resultado Final

Seu cliente agora pode:
1. Digitar o CEP na página do produto ou carrinho
2. Ver opções reais de frete (PAC, SEDEX, etc)
3. Comparar preços e prazos
4. Tomar decisão de compra informada

Tudo isso usando a API oficial dos Correios! 🚀
