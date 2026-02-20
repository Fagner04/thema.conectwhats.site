# Parcelamento por Categoria

Este sistema permite configurar parcelas diferentes para categorias específicas da sua loja.

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

## Suporte

Se tiver dúvidas ou problemas, verifique:
1. Se os handles das coleções estão corretos
2. Se a opção "Ativar parcelamento especial por categoria" está marcada
3. Se os produtos estão realmente nas coleções configuradas
