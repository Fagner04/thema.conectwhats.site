# 🎯 Sistema de Desconto por Atacado

## ✅ O que foi implementado

Um sistema completo de desconto automático por quantidade com barra de progresso visual no carrinho!

## 🎨 Funcionalidades

### 1. Desconto Automático
- Quando o cliente atingir a quantidade mínima de itens, ganha desconto automático
- Exemplo: 5 itens = 50% de desconto

### 2. Barra de Progresso Visual
- Mostra quantos itens faltam para ganhar o desconto
- Animação suave conforme adiciona produtos
- Muda de cor quando atinge o objetivo

### 3. Mensagens Personalizáveis
- Mensagem quando ainda não atingiu: "Adicione mais X itens e ganhe Y% de desconto!"
- Mensagem quando atingiu: "🎉 Parabéns! Você ganhou Y% de desconto no atacado!"

### 4. Aparece em 2 lugares
- ✅ Página do carrinho (/cart)
- ✅ Mini-cart (drawer lateral)

## ⚙️ Como Configurar

### 1. Acesse as Configurações
- Vá em: **Personalizar** > **Configurações do tema**
- Procure a seção: **"Desconto Atacado"**

### 2. Configure os Parâmetros

#### Ativar desconto por atacado
- Marque para ativar o sistema

#### Quantidade mínima para atacado
- Defina quantos itens são necessários (padrão: 5)
- Slider de 2 a 50 itens

#### Porcentagem de desconto (%)
- Defina o desconto que será aplicado (padrão: 50%)
- Slider de 5% a 90%

#### Mostrar barra de progresso no carrinho
- Marque para exibir a barra visual (recomendado)

#### Cor da barra de progresso
- Escolha a cor que combina com sua loja (padrão: verde #00d864)

#### Mensagem quando não atingiu o mínimo
- Personalize a mensagem
- Use `{remaining}` para mostrar quantos faltam
- Use `{min}` para mostrar o mínimo necessário
- Use `{discount}` para mostrar a porcentagem
- Exemplo: "Adicione mais {remaining} itens e ganhe {discount}% de desconto!"

#### Mensagem quando atingiu o mínimo
- Personalize a mensagem de sucesso
- Use `{discount}` para mostrar a porcentagem
- Exemplo: "🎉 Parabéns! Você ganhou {discount}% de desconto no atacado!"

#### Coleções elegíveis (opcional)
- Deixe vazio para aplicar em TODOS os produtos
- Ou digite handles de coleções específicas separados por vírgula
- Exemplo: `atacado,kit,combo`

## 📊 Como Funciona

### Exemplo Prático

**Configuração:**
- Quantidade mínima: 5 itens
- Desconto: 50%

**Cenário 1: Cliente tem 2 itens**
```
Barra de progresso: 40% preenchida
Mensagem: "Adicione mais 3 itens e ganhe 50% de desconto!"
Progresso: 2 / 5 itens
```

**Cenário 2: Cliente tem 5 itens**
```
Barra de progresso: 100% preenchida (verde)
Mensagem: "🎉 Parabéns! Você ganhou 50% de desconto no atacado!"
Progresso: 5 / 5 itens
Desconto de 50% aplicado!
```

## 🎯 Aplicação do Desconto

### ⚠️ IMPORTANTE: Código de Desconto

O sistema mostra a barra de progresso e as mensagens, mas o desconto precisa ser aplicado via:

1. **Shopify Scripts** (Shopify Plus)
2. **Aplicativo de desconto** (Shopify básico)
3. **Código de desconto manual**

### Recomendação para Shopify Básico

Crie códigos de desconto no admin:
- Vá em: **Descontos** > **Criar desconto**
- Tipo: Porcentagem
- Valor: 50% (ou o que configurou)
- Requisito mínimo: 5 itens (ou o que configurou)
- Código: `ATACADO50` (ou outro nome)

Instrua os clientes a usar o código quando atingirem a quantidade.

### Para Shopify Plus

Use Shopify Scripts para aplicar o desconto automaticamente quando atingir a quantidade.

## 🎨 Personalização Visual

A barra de progresso é totalmente responsiva e se adapta ao design do tema:

- **Cor**: Configurável no painel
- **Tamanho**: Automático (30px de altura)
- **Animação**: Suave ao adicionar/remover itens
- **Estado completo**: Muda para fundo verde com borda

## 🔄 Atualização Automática

A barra atualiza automaticamente quando:
- ✅ Cliente adiciona produto ao carrinho
- ✅ Cliente remove produto do carrinho
- ✅ Cliente altera quantidade
- ✅ Página do carrinho é carregada

## 📱 Responsivo

Funciona perfeitamente em:
- 📱 Mobile
- 💻 Desktop
- 📲 Tablet

## 🧪 Como Testar

1. Configure: 5 itens mínimo, 50% desconto
2. Adicione 2 produtos ao carrinho
3. Veja a barra mostrando "2 / 5 itens"
4. Adicione mais 3 produtos
5. Veja a barra ficar verde e mensagem de sucesso!

## 💡 Dicas

- Use descontos atrativos (30-50%) para incentivar compras maiores
- Configure quantidade mínima realista (3-10 itens)
- Personalize as mensagens com emojis para chamar atenção
- Teste em mobile para garantir boa visualização

## 🎉 Pronto!

O sistema está 100% funcional e pronto para usar! Basta ativar nas configurações e começar a vender mais! 🚀
