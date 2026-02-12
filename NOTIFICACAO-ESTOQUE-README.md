# Funcionalidade: Notificação de Estoque

## O que foi implementado

Sistema de notificação por e-mail quando produtos esgotados voltarem ao estoque.

## Como funciona

1. **Quando um produto está esgotado**, aparece automaticamente um formulário abaixo do botão "Esgotado"
2. **Cliente preenche o e-mail** e clica em "Notificar-me"
3. **Sistema salva a solicitação** e envia para o e-mail da loja
4. **Cliente recebe confirmação** na tela

## Como ativar/desativar

1. Vá em **Temas → Personalizar**
2. Abra uma **página de produto**
3. Clique na seção do produto
4. Procure por **"Ativar notificação de estoque"**
5. Marque/desmarque a opção
6. Salve

## Arquivos criados

- `snippets/back-in-stock-notification.liquid` - Formulário de notificação
- `snippets/back-in-stock-script.liquid` - JavaScript para controlar o formulário

## Arquivos modificados

- `snippets/product-info.liquid` - Adicionado formulário após botão esgotado
- `sections/product-template.liquid` - Adicionada configuração no schema

## Como receber as notificações

Atualmente, o sistema envia as solicitações para o **e-mail de contato da loja** via formulário de contato do Shopify.

Você receberá um e-mail com:
- E-mail do cliente
- Nome do produto
- ID do produto e variante

## Melhorias futuras (opcional)

Para um sistema mais robusto, você pode integrar com:

1. **Apps do Shopify**:
   - Back in Stock
   - Klaviyo
   - Omnisend

2. **Webhook personalizado**:
   - Integrar com seu próprio sistema de e-mail
   - Salvar em banco de dados externo
   - Automação de envio quando produto voltar

3. **Shopify Flow** (planos avançados):
   - Criar automação para enviar e-mails automaticamente

## Dados salvos

Os dados também são salvos no **localStorage do navegador** como backup, permitindo que você acesse via console do navegador:

```javascript
// Ver todas as notificações salvas
JSON.parse(localStorage.getItem('backInStockNotifications'))
```

## Suporte

Se precisar de ajuda ou quiser implementar melhorias, entre em contato!
