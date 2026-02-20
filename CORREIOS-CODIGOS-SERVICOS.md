# 📮 Códigos de Serviços dos Correios

## Serviços Disponíveis

### Serviços Nacionais

| Código | Nome | Descrição |
|--------|------|-----------|
| 04014 | SEDEX | Serviço expresso com prazo de entrega diferenciado |
| 04510 | PAC | Encomenda econômica com prazo de entrega estendido |
| 04782 | SEDEX 10 | Entrega no mesmo dia ou dia seguinte até às 10h |
| 04790 | SEDEX Hoje | Entrega no mesmo dia |
| 04804 | SEDEX 12 | Entrega no mesmo dia ou dia seguinte até às 12h |
| 40169 | SEDEX 12 (Contrato) | SEDEX 12 com contrato |
| 40215 | SEDEX 10 (Contrato) | SEDEX 10 com contrato |
| 40290 | SEDEX Hoje (Contrato) | SEDEX Hoje com contrato |
| 40096 | SEDEX (Contrato) | SEDEX com contrato |
| 40436 | PAC (Contrato) | PAC com contrato |
| 40444 | PAC (Contrato Grande) | PAC para grandes volumes |
| 81019 | e-SEDEX | SEDEX para e-commerce (requer contrato) |
| 81027 | e-SEDEX Prioritário | e-SEDEX com prioridade |
| 81035 | e-SEDEX Express | e-SEDEX com entrega expressa |
| 81868 | PAC Mini | PAC para pequenos objetos |
| 03220 | SEDEX Reverso | Logística reversa SEDEX |
| 03298 | PAC Reverso | Logística reversa PAC |

### Serviços Internacionais

| Código | Nome | Descrição |
|--------|------|-----------|
| 03085 | Exporta Fácil | Exportação simplificada |
| 03115 | SEDEX Mundi | Encomenda expressa internacional |
| 03123 | Leve Internacional | Encomenda econômica internacional |

## Configuração Recomendada

### Para E-commerce COM Contrato

```javascript
servicos: [
  { codigo: '40436', nome: 'PAC' },           // PAC com contrato
  { codigo: '40096', nome: 'SEDEX' },         // SEDEX com contrato
  { codigo: '81019', nome: 'e-SEDEX' },       // e-SEDEX (mais barato)
  { codigo: '40215', nome: 'SEDEX 10' }       // SEDEX 10 com contrato
]
```

### Para E-commerce SEM Contrato (Testes)

```javascript
servicos: [
  { codigo: '04510', nome: 'PAC' },           // PAC sem contrato
  { codigo: '04014', nome: 'SEDEX' },         // SEDEX sem contrato
  { codigo: '04782', nome: 'SEDEX 10' },      // SEDEX 10 sem contrato
  { codigo: '04790', nome: 'SEDEX Hoje' }     // SEDEX Hoje sem contrato
]
```

### Configuração Mínima (Mais Comum)

```javascript
servicos: [
  { codigo: '04510', nome: 'PAC' },           // Econômico
  { codigo: '04014', nome: 'SEDEX' }          // Expresso
]
```

## Parâmetros de Formato

### nCdFormato (Formato da Embalagem)

| Código | Descrição | Uso |
|--------|-----------|-----|
| 1 | Caixa/Pacote | Padrão para a maioria dos produtos |
| 2 | Rolo/Prisma | Objetos cilíndricos (tubos, rolos) |
| 3 | Envelope | Documentos e objetos planos |

## Limites de Peso e Dimensões

### PAC e SEDEX

- **Peso mínimo**: 0,3 kg
- **Peso máximo**: 30 kg
- **Comprimento**: 16 cm a 105 cm
- **Largura**: 11 cm a 105 cm
- **Altura**: 2 cm a 105 cm
- **Soma (C+L+A)**: Máximo 200 cm

### Envelope

- **Peso máximo**: 1 kg
- **Comprimento**: 16 cm a 60 cm
- **Largura**: 11 cm a 60 cm
- **Altura**: Até 5 cm

## Serviços Adicionais

### sCdMaoPropria (Mão Própria)

- **S**: Sim - Entrega somente ao destinatário
- **N**: Não - Pode ser entregue a terceiros

**Custo adicional**: Consulte tabela dos Correios

### sCdAvisoRecebimento (Aviso de Recebimento)

- **S**: Sim - Comprovante de entrega
- **N**: Não - Sem comprovante

**Custo adicional**: Consulte tabela dos Correios

### nVlValorDeclarado (Valor Declarado)

- Valor do produto para seguro
- **0**: Sem seguro
- **> 0**: Com seguro (taxa adicional)

**Taxa**: Percentual sobre o valor declarado

## Exemplo Completo de Configuração

```javascript
const CONFIG = {
  // Credenciais
  usuario: 'seu_usuario',
  senha: 'sua_senha',
  codigoAdministrativo: '12345678',
  cartaoPostagem: '0123456789',
  apiToken: 'seu_token_api',  // Token de autenticação (opcional)
  
  // Origem
  cepOrigem: '74000000',
  
  // Serviços (escolha os que você oferece)
  servicos: [
    { codigo: '04510', nome: 'PAC - Econômico' },
    { codigo: '04014', nome: 'SEDEX - Expresso' },
    { codigo: '04782', nome: 'SEDEX 10 - Entrega até 10h' }
  ],
  
  // Dimensões padrão (ajuste conforme seus produtos)
  pesoKg: 1,           // 1 kg
  formato: 1,          // Caixa/Pacote
  comprimento: 20,     // 20 cm
  altura: 10,          // 10 cm
  largura: 15,         // 15 cm
  diametro: 0,         // 0 cm (não usado para caixa)
  
  // Serviços adicionais
  maoPropria: 'N',     // Não exigir mão própria
  valorDeclarado: 0,   // Sem seguro (ou passe o valor do produto)
  avisoRecebimento: 'N' // Sem aviso de recebimento
};
```

## Dicas de Otimização

### 1. Escolha os serviços certos

Não ofereça todos os serviços. Escolha 2-3 opções:
- Uma econômica (PAC)
- Uma expressa (SEDEX)
- Uma premium opcional (SEDEX 10)

### 2. Configure dimensões realistas

Use as dimensões médias dos seus produtos ou a maior embalagem que você usa.

### 3. Peso variável

Se seus produtos têm pesos muito diferentes, passe o peso real:
```javascript
// Na URL: ?cep=01310100&peso=2.5
```

### 4. Cache de resultados

Considere cachear resultados por CEP para reduzir chamadas à API:
```javascript
const cache = CacheService.getScriptCache();
const cacheKey = 'frete_' + cep;
const cached = cache.get(cacheKey);

if (cached) {
  return JSON.parse(cached);
}

// Consultar API...
cache.put(cacheKey, JSON.stringify(resultado), 3600); // 1 hora
```

## Links Úteis

- [Documentação Oficial dos Correios](http://www.correios.com.br/para-voce/correios-de-a-a-z/pdf/calculador-remoto-de-precos-e-prazos/manual-de-implementacao-do-calculo-remoto-de-precos-e-prazos)
- [Simulador de Preços e Prazos](http://www2.correios.com.br/sistemas/precosPrazos/)
- [Contrate Serviços dos Correios](https://www.correios.com.br/enviar/precisa-de-ajuda/contrato-nacional)
