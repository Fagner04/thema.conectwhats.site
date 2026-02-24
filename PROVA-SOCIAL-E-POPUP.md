# Prova Social e Popup de Saída

Sistema completo de conversão com notificações de prova social em tempo real e popup de saída com cupom de desconto.

## 📋 Funcionalidades

### 1. Prova Social em Tempo Real
Mostra notificações de compras recentes para criar senso de urgência e aumentar conversão.

### 2. Popup de Saída com Cupom
Captura visitantes que estão prestes a sair oferecendo um cupom de desconto.

---

## ⚙️ Configuração

### Prova Social

Acesse: **Temas → Personalizar → Configurações do tema → Prova Social**

#### Configurações Disponíveis:

1. **Ativar prova social**
   - Liga/desliga as notificações de prova social

2. **Intervalo mínimo entre notificações**
   - Tempo mínimo entre cada notificação (3-30 segundos)
   - Padrão: 5 segundos

3. **Intervalo máximo entre notificações**
   - Tempo máximo entre cada notificação (10-60 segundos)
   - Padrão: 15 segundos

4. **Tempo de exibição**
   - Quanto tempo cada notificação fica visível (3-15 segundos)
   - Padrão: 5 segundos

5. **Número máximo de notificações**
   - Quantas notificações mostrar por sessão (3-20)
   - Padrão: 10 notificações

#### Como Funciona:

- Notificações aparecem no canto inferior esquerdo
- Mostra nomes aleatórios de cidades brasileiras
- Ações variadas: "acabou de comprar", "comprou há 5 minutos", etc.
- Animação suave de entrada e saída
- Botão para fechar manualmente
- Totalmente responsivo (mobile e desktop)

---

### Popup de Saída

Acesse: **Temas → Personalizar → Configurações do tema → Popup de Saída**

#### Configurações Disponíveis:

1. **Ativar popup de saída**
   - Liga/desliga o popup de saída

2. **Título do popup**
   - Texto principal do popup
   - Padrão: "Espere! Não vá embora!"

3. **Mensagem do popup**
   - Texto descritivo
   - Padrão: "Ganhe um desconto especial na sua primeira compra!"

4. **Rótulo do cupom**
   - Texto acima do código do cupom
   - Padrão: "Use o cupom:"

5. **Código do cupom**
   - O código que será copiado pelo cliente
   - Padrão: "BEMVINDO10"
   - ⚠️ **IMPORTANTE**: Crie este cupom no painel da Shopify!

6. **Texto do desconto**
   - Descrição do desconto oferecido
   - Padrão: "10% OFF na sua primeira compra"

7. **Texto do botão**
   - Texto do botão de ação
   - Padrão: "Continuar Comprando"

8. **Atraso para mostrar popup**
   - Tempo de espera após mouse sair (0-3000ms)
   - Padrão: 1000ms (1 segundo)

9. **Mostrar apenas uma vez por sessão**
   - Se ativado, popup aparece só uma vez
   - Padrão: Ativado

#### Como Funciona:

- Detecta quando mouse sai da área da página
- Aguarda o tempo configurado antes de mostrar
- Cupom pode ser copiado com um clique
- Feedback visual quando cupom é copiado
- Pode ser fechado clicando no X, fora do popup ou ESC
- Design moderno com gradientes e animações
- Totalmente responsivo

---

## 🎨 Personalização Visual

### Prova Social

O design é fixo mas você pode editar o arquivo `snippets/social-proof.liquid` para:
- Mudar cores (borda verde, fundo branco)
- Alterar posição (atualmente: inferior esquerdo)
- Modificar ícone (atualmente: 🛍️)
- Ajustar tamanhos de fonte

### Popup de Saída

O design usa gradientes modernos:
- **Cupom**: Gradiente roxo (#667eea → #764ba2)
- **Botão**: Gradiente verde (#4CAF50 → #45a049)

Para personalizar, edite `snippets/exit-popup.liquid`:
- Cores dos gradientes
- Tamanhos e espaçamentos
- Animações
- Ícone (atualmente: 🎁)

---

## 📱 Responsividade

Ambas funcionalidades são totalmente responsivas:

### Mobile
- Notificações ocupam largura total (com margens)
- Popup ajusta tamanho e espaçamentos
- Fontes reduzidas para melhor leitura
- Touch-friendly (botões maiores)

### Desktop
- Notificações fixas no canto inferior esquerdo
- Popup centralizado com largura máxima de 500px
- Hover effects nos botões

---

## 🔧 Arquivos Modificados

### Novos Arquivos:
- `snippets/social-proof.liquid` - Notificações de prova social
- `snippets/exit-popup.liquid` - Popup de saída com cupom
- `PROVA-SOCIAL-E-POPUP.md` - Esta documentação

### Arquivos Editados:
- `config/settings_schema.json` - Adicionadas configurações
- `layout/theme.liquid` - Incluídos os snippets

---

## 💡 Dicas de Uso

### Prova Social:

1. **Intervalo ideal**: 5-15 segundos entre notificações
2. **Quantidade**: 8-10 notificações por sessão é suficiente
3. **Tempo de exibição**: 5 segundos é o ideal
4. **Quando usar**: Sempre! Aumenta confiança e urgência

### Popup de Saída:

1. **Cupom real**: Sempre crie o cupom no painel da Shopify
2. **Desconto atrativo**: 10-15% é um bom começo
3. **Delay**: 1 segundo evita popup muito agressivo
4. **Mostrar uma vez**: Recomendado para não irritar
5. **Quando usar**: Páginas de produto e coleções

---

## 🎯 Estratégias de Conversão

### Combinação Poderosa:

1. **Prova Social** → Cria urgência e confiança
2. **Popup de Saída** → Captura quem está saindo
3. **Resultado**: Mais conversões e menos abandono

### Teste A/B:

- Teste diferentes textos no popup
- Varie o valor do desconto
- Ajuste intervalos da prova social
- Monitore taxa de conversão

---

## ⚠️ Importante

### Criar Cupom na Shopify:

1. Acesse: **Descontos** no painel da Shopify
2. Clique em **Criar desconto**
3. Escolha **Código de desconto**
4. Configure:
   - Código: Use o mesmo do popup (ex: BEMVINDO10)
   - Tipo: Porcentagem ou valor fixo
   - Valor: 10% (ou o que preferir)
   - Requisitos: Primeira compra (opcional)
   - Validade: Configure data de expiração

### Performance:

- Ambas funcionalidades são leves
- JavaScript otimizado
- Não afeta velocidade da página
- Usa localStorage para controle de exibição

---

## 🐛 Solução de Problemas

### Prova Social não aparece:
- Verifique se está ativada nas configurações
- Aguarde o intervalo mínimo configurado
- Limpe cache do navegador

### Popup não aparece:
- Verifique se está ativado nas configurações
- Mova o mouse para fora da página (topo)
- Limpe localStorage: `localStorage.removeItem('exitPopupShown')`

### Cupom não funciona:
- Verifique se criou o cupom no painel da Shopify
- Confirme que o código está correto
- Verifique validade e requisitos do cupom

---

## 📊 Métricas para Acompanhar

1. **Taxa de conversão geral**
2. **Taxa de abandono de carrinho**
3. **Uso do cupom** (quantas vezes foi aplicado)
4. **Tempo médio no site**
5. **Taxa de rejeição**

---

## 🚀 Próximos Passos

1. Ative as funcionalidades nas configurações
2. Crie o cupom no painel da Shopify
3. Teste em diferentes dispositivos
4. Monitore resultados por 1-2 semanas
5. Ajuste configurações conforme necessário

---

**Desenvolvido por ConectWhats.com**
