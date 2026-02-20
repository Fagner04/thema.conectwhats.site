# 🚀 COMO INSTALAR O PARCELAMENTO POR CATEGORIA

## ⚠️ ATENÇÃO: Você está editando LOCALMENTE!

As alterações que fiz estão nos arquivos do seu computador. Para que apareçam no Shopify, você precisa fazer UPLOAD.

## 📋 Passo a Passo para Instalar

### Opção 1: Upload via Shopify Admin (RECOMENDADO)

1. **Compacte a pasta do tema**
   - Selecione TODOS os arquivos e pastas do tema
   - Clique com botão direito > "Enviar para" > "Pasta compactada (zip)"
   - OU use um programa como WinRAR/7-Zip

2. **Faça upload no Shopify**
   - Vá em: **Loja Online** > **Temas**
   - Clique em **Adicionar tema** > **Fazer upload do arquivo ZIP**
   - Selecione o arquivo .zip que você criou
   - Aguarde o upload completar

3. **Publique o tema**
   - Depois do upload, clique em **Ações** > **Publicar**
   - OU clique em **Personalizar** para testar antes

4. **Configure**
   - Clique em **Personalizar**
   - Vá em **Configurações do tema** (ícone de engrenagem)
   - Role até **"Parcelamentos"**
   - **Role mais para baixo** - você verá "Parcelamento por Categoria"

### Opção 2: Editar Arquivos Diretamente no Shopify

Se preferir não fazer upload do tema completo:

1. **Vá em Loja Online > Temas > Ações > Editar código**

2. **Edite estes 3 arquivos:**

   **A) config/settings_schema.json**
   - Procure pela seção `"name": "Parcelamentos"`
   - Adicione as novas configurações (já estão no seu arquivo local)

   **B) layout/theme.liquid**
   - Procure por `installments: {`
   - Adicione as novas propriedades (já estão no seu arquivo local)

   **C) assets/custom.js**
   - Substitua a função `parcelamento()` pela nova versão
   - Adicione os novos event listeners

   **D) snippets/product-info.liquid**
   - Adicione o script que passa as coleções do produto

3. **Salve cada arquivo** após editar

4. **Recarregue** a página de personalização

## ✅ Como Verificar se Funcionou

1. Vá em **Personalizar tema**
2. Clique em **Configurações do tema** (engrenagem)
3. Procure **"Parcelamentos"**
4. Role para baixo
5. Você deve ver:
   ```
   Parcelamento por Categoria
   ☑️ Ativar parcelamento especial por categoria
   📝 Coleções promocionais
   🔢 Parcelas para categorias promocionais
   📊 Informar juros nas parcelas promocionais
   💯 Porcentagem de juros para categorias promocionais
   ```

## 🆘 Ainda não apareceu?

### Verifique:
- ✅ Você fez upload do tema OU editou os arquivos no Shopify?
- ✅ Você salvou todos os arquivos?
- ✅ Você recarregou a página de personalização?
- ✅ Você está olhando no tema CORRETO (o que você acabou de editar)?

### Teste o JSON:
1. Copie o conteúdo de `config/settings_schema.json`
2. Cole em: https://jsonlint.com/
3. Clique em "Validate JSON"
4. Se der erro, me avise qual é o erro

## 📁 Arquivos Modificados

Estes são os arquivos que foram alterados:

1. ✅ `config/settings_schema.json` - Novas configurações
2. ✅ `layout/theme.liquid` - Passa configurações para JavaScript
3. ✅ `assets/custom.js` - Lógica de parcelamento por categoria
4. ✅ `snippets/product-info.liquid` - Informações das coleções

## 🎯 Próximos Passos Após Instalar

1. Ative "Parcelamento especial por categoria"
2. Digite os handles das coleções (ex: `promocao,outlet`)
3. Configure 3 parcelas sem juros
4. Teste em um produto da coleção promocional
5. Abra o Console (F12) para ver os logs de debug

---

**Precisa de ajuda?** Abra o Console do navegador (F12) e me envie o que aparecer lá!
