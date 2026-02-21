# 💰 Preço de Atacado - ConectWhats

## ✅ Implementado

Badge de preço atacadista integrado com o app ConectWhats!

## 🎯 Como Funciona

O badge aparece automaticamente nos produtos que têm preço de atacado configurado no app ConectWhats.

## 📋 Metafields Utilizados

O app ConectWhats cria automaticamente estes metafields:

- `custom.wholesale_price` — Preço de atacado (number_decimal)
- `custom.wholesale_min_qty` — Quantidade mínima (number_integer)
- `custom.wholesale_min_value` — Valor mínimo do pedido (number_decimal)

## ⚙️ Como Configurar

### 1. No App ConectWhats

1. Acesse o app ConectWhats no Shopify
2. Configure os preços de atacado para seus produtos
3. Clique em **"Atacado → Shopify"** para sincronizar
4. Os metafields são criados automaticamente!

### 2. No Tema (Já Implementado)

O badge já está implementado em:
- ✅ Página do produto
- ✅ Listagens (coleções, home, busca)

## 🎨 Onde Aparece

### Página do Produto
```
┌─────────────────────────────────────┐
│ Atacado: R$ 45,00 (mín. 10 un.)    │
└─────────────────────────────────────┘
```

### Listagens
```
┌─────────────────────────────────────┐
│ Atacado: R$ 45,00 (mín. 10 un.)    │
└─────────────────────────────────────┘
```

## 🔄 Sincronização

Sempre que alterar preços de atacado no app:

1. Vá no app ConectWhats
2. Clique em **"Atacado → Shopify"**
3. Os metafields são atualizados automaticamente
4. O badge aparece/atualiza no tema

## 💡 Exemplo de Uso

### Produto com Atacado Configurado
```
Produto: Camiseta Básica
Preço Normal: R$ 59,90
Preço Atacado: R$ 45,00
Quantidade Mínima: 10 unidades

Badge mostra: "Atacado: R$ 45,00 (mín. 10 un.)"
```

### Produto sem Atacado
```
Produto: Camiseta Premium
Preço Normal: R$ 89,90
Preço Atacado: (não configurado)

Badge não aparece
```

## 🎨 Personalizar Cores

Se quiser mudar as cores do badge, edite os arquivos:
- `snippets/product-info.liquid` (página do produto)
- `snippets/product-item.liquid` (listagens)

Procure por:
```liquid
background: #FFF7ED;  /* Cor de fundo */
border: 1px solid #FDBA74;  /* Cor da borda */
color: #9A3412;  /* Cor do texto */
color: #C2410C;  /* Cor do preço */
```

## ⚠️ Importante

### O Badge Apenas MOSTRA o Preço
- ✅ Mostra o preço de atacado
- ✅ Informa a quantidade mínima
- ❌ NÃO aplica o desconto automaticamente

### Aplicação do Desconto

O desconto é aplicado pelo próprio app ConectWhats durante o checkout.

## 🆘 Troubleshooting

### Badge não aparece?

1. **Verifique no app ConectWhats:**
   - O produto tem preço de atacado configurado?
   - Você clicou em "Atacado → Shopify"?

2. **Verifique os metafields:**
   - Vá no produto no Shopify Admin
   - Role até "Metafields"
   - Procure por `custom.wholesale_price`
   - Se não existir, sincronize novamente no app

3. **Limpe o cache:**
   - Ctrl + Shift + R (Windows)
   - Cmd + Shift + R (Mac)

### Badge aparece mas preço está errado?

1. Atualize os preços no app ConectWhats
2. Clique em "Atacado → Shopify"
3. Aguarde alguns segundos
4. Recarregue a página do produto

## ✅ Está Funcionando!

O badge está implementado e funcionando! Configure os preços de atacado no app ConectWhats e eles aparecerão automaticamente no tema.

## � Responsivo

O badge se adapta automaticamente a todos os dispositivos:
- � Mobile
- 💻 Desktop
- 📲 Tablet

## 🎉 Pronto para Usar!

Tudo está configurado! Basta usar o app ConectWhats para gerenciar os preços de atacado.
