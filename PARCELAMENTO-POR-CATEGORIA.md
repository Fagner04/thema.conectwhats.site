# Parcelamento por Categoria

Este sistema permite configurar parcelas diferentes para categorias específicas da sua loja.

## ⚠️ IMPORTANTE: Como ver as novas configurações

Após instalar este código, você precisa:

1. **Salvar o tema** no editor do Shopify
2. **Fechar** o editor de personalização
3. **Abrir novamente** o editor (Personalizar tema)
4. Ir em **Configurações do tema** (ícone de engrenagem)
5. Rolar até a seção **"Parcelamentos"**
6. **Role para baixo** - você verá um novo cabeçalho: **"Parcelamento por Categoria"**

### Se as novas opções não aparecerem:

- Verifique se o arquivo `config/settings_schema.json` foi salvo corretamente
- Tente fazer um "hard refresh" (Ctrl + Shift + R no Windows, Cmd + Shift + R no Mac)
- Em último caso, faça upload do tema novamente

### Como deve aparecer:

Você verá estas novas opções abaixo das configurações normais de parcelamento:

```
📋 Parcelamento por Categoria
├─ ☑️ Ativar parcelamento especial por categoria
├─ 📝 Coleções promocionais (campo de texto)
├─ 🔢 Parcelas para categorias promocionais (1-12)
├─ 📊 Informar juros nas parcelas promocionais (dropdown)
└─ 💯 Porcentagem de juros para categorias promocionais (campo de texto)
```

## Como Funciona

O tema agora suporta duas configurações de parcelamento:

1. **Parcelamento Padrão**: Aplicado a todos os produtos
2. **Parcelamento Promocional**: Aplicado apenas a produtos de categorias específicas

## Configuração

### 1. Acesse as Configurações do Tema

No admin da Shopify, vá em:
- **Loja Online** > **Temas** > **Personalizar**
- Clique em **Configurações do tema** (ícone de engrenagem)
- Procure pela seção **"Parcelamentos"**

### 2. Configure o Parcelamento Padrão

Estas configurações se aplicam a todos os produtos:

- **Mostrar parcelamento**: Ativa/desativa o parcelamento
- **Informar juros nas parcelas**: Escolha como exibir (com juros, sem juros, ou ocultar)
- **Porcentagem de juros**: Digite 1 para sem juros, ou o multiplicador desejado
- **Em até quantas vezes**: Número máximo de parcelas (1-12)

### 3. Configure o Parcelamento por Categoria

Role até a seção **"Parcelamento por Categoria"**:

#### Ativar parcelamento especial por categoria
Marque esta opção para habilitar o sistema.

#### Coleções promocionais
Digite os **handles** das coleções separados por vírgula.

**Exemplo**: `promocao,outlet,liquidacao`

**Como encontrar o handle de uma coleção:**
1. Vá em **Produtos** > **Coleções**
2. Clique na coleção desejada
3. O handle está na URL: `admin.shopify.com/store/sua-loja/collections/HANDLE-AQUI`

#### Parcelas para categorias promocionais
Defina quantas parcelas serão oferecidas para produtos dessas categorias.

**Exemplo**: 3 (para "até 3x sem juros")

#### Informar juros nas parcelas promocionais
Escolha como exibir:
- **Informar juros**: Mostra "com juros"
- **Informar sem juros**: Mostra "sem juros" (recomendado para promoções)
- **Ocultar juros**: Não mostra informação sobre juros

#### Porcentagem de juros para categorias promocionais
Digite **1** para sem juros (recomendado para promoções).

## Exemplo de Uso

### Cenário: Promoção "Até 3x sem juros"

1. Crie uma coleção chamada "Promoção" (handle: `promocao`)
2. Adicione os produtos promocionais a essa coleção
3. Configure:
   - ✅ Ativar parcelamento especial por categoria
   - **Coleções promocionais**: `promocao`
   - **Parcelas para categorias promocionais**: 3
   - **Informar juros**: Informar sem juros
   - **Porcentagem de juros**: 1

Agora:
- Produtos da coleção "Promoção" mostrarão: **"em até 3x de R$ XX,XX sem juros"**
- Outros produtos continuarão com o parcelamento padrão

## Múltiplas Categorias Promocionais

Você pode ter várias categorias com o mesmo parcelamento especial:

**Exemplo**: `promocao,outlet,liquidacao,black-friday`

Todos os produtos dessas 4 coleções terão o parcelamento promocional.

## Dicas

- Um produto pode estar em várias coleções. Se estiver em pelo menos uma coleção promocional, receberá o parcelamento especial
- Os handles devem ser separados por vírgula, sem espaços extras
- Teste sempre após configurar para garantir que está funcionando corretamente
- O parcelamento é atualizado automaticamente quando o usuário seleciona variantes

## Suporte e Debug

### Como verificar se está funcionando

1. Abra a página de um produto no navegador
2. Pressione **F12** para abrir o Console do navegador
3. Procure por mensagens começando com `===`
4. Você verá informações detalhadas sobre:
   - Qual método conseguiu detectar o preço
   - Se o parcelamento está ativado
   - Quais coleções o produto pertence
   - Se o produto está em categoria promocional
   - Qual configuração está sendo aplicada

### Problemas Comuns

#### O parcelamento não aparece (Preço NaN)
Este é o erro mais comum. O sistema tenta 4 métodos diferentes para detectar o preço:

1. **Método 1**: Busca em `window.theme.product.price` (mais confiável)
2. **Método 2**: Busca no elemento `.price--highlight`
3. **Método 3**: Busca em elementos com classe `.price`
4. **Método 4**: Busca qualquer texto que pareça "R$ XX,XX"

**Solução**: 
- Verifique no Console qual método está funcionando
- Se nenhum funcionar, me envie uma captura de tela do HTML da página (aba Elements no DevTools)
- O script mostrará exatamente onde está tentando buscar o preço

#### O parcelamento promocional não funciona
- Verifique no Console se `categoryEnabled` está `true`
- Confirme que os handles das coleções estão corretos (sem espaços extras)
- Verifique se o produto realmente pertence à coleção configurada
- O Console mostrará: "Produto está em categoria promocional? true/false"

#### Como encontrar o handle correto
1. Vá em **Produtos** > **Coleções** no admin
2. Clique na coleção
3. Veja a URL: `admin.shopify.com/store/sua-loja/collections/HANDLE-AQUI`
4. Use exatamente esse handle (em minúsculas)

### Mensagens do Console

Quando tudo estiver funcionando, você verá algo como:

```
=== Função parcelamento() iniciada ===
Preço detectado: 99.90
Configurações de parcelamento: {show: true, maxInstallments: 12, ...}
Sistema de categoria ativado!
Coleções promocionais configuradas: promocao,outlet
Coleções do produto: ["promocao", "novidades"]
Produto está em categoria promocional? true
Usando configurações promocionais - Parcelas: 3 Juros: 1 Modo: info_sem_juros
Texto final do parcelamento: em até 3x de R$ 33,30 sem juros
=== Função parcelamento() finalizada ===
```

Se tiver dúvidas ou problemas, verifique:
1. Se os handles das coleções estão corretos
2. Se a opção "Ativar parcelamento especial por categoria" está marcada
3. Se os produtos estão realmente nas coleções configuradas
4. As mensagens no Console do navegador (F12)
