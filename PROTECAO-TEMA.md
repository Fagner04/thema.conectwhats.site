# 🔒 Sistema de Proteção do Tema

## ✅ Implementado

O tema agora está protegido contra uso não autorizado!

## 🛡️ Como Funciona

1. Quando alguém instalar o tema em uma loja nova, aparecerá um popup pedindo senha
2. Sem a senha correta, o tema não funciona
3. Após 3 tentativas erradas, o tema é bloqueado
4. A ativação fica salva no navegador da loja

## 🔑 Senha Atual

**Senha padrão**: `CONECTWHATS2024`

## ⚙️ Como Mudar a Senha

1. Vá em: **Loja Online** > **Temas** > **Ações** > **Editar código**
2. Abra: `snippets/theme-protection.liquid`
3. Procure por:

```javascript
var SENHA_CORRETA = 'CONECTWHATS2024'; // MUDE ESTA SENHA!
```

4. Mude para sua senha personalizada:

```javascript
var SENHA_CORRETA = 'MINHASENHA123';
```

5. Clique em **Salvar**

## 🎯 Recursos de Proteção

### 1. Popup de Ativação
- Aparece 2 segundos após carregar a loja
- Solicita senha de ativação
- Não funciona no editor do Shopify (para você poder editar)

### 2. Limite de Tentativas
- Máximo de 3 tentativas
- Após 3 erros, tema é bloqueado
- Mostra mensagem de contato

### 3. Verificação Periódica
- Verifica a cada 1 minuto se ainda está ativado
- Impede que removam a ativação via console

### 4. Marca d'água
- Adiciona "© ConectWhats Theme" no rodapé
- Pequena e discreta
- Não pode ser removida facilmente

### 5. Bloqueio por Loja
- Ativação é vinculada ao domínio da loja
- Se copiar para outra loja, precisa ativar novamente

## 📋 Cenários de Uso

### Cenário 1: Cliente Legítimo
1. Cliente instala o tema
2. Aparece popup de senha
3. Cliente digita: `CONECTWHATS2024`
4. Tema ativado! ✅
5. Funciona normalmente

### Cenário 2: Uso Não Autorizado
1. Alguém copia o tema
2. Instala em outra loja
3. Aparece popup de senha
4. Não sabe a senha
5. Tema não funciona ❌

### Cenário 3: Tentativas Erradas
1. Tenta senha errada (1ª tentativa)
2. Tenta senha errada (2ª tentativa)
3. Tenta senha errada (3ª tentativa)
4. Tema bloqueado! ⛔
5. Precisa limpar dados ou contatar suporte

## 🔓 Como Desbloquear

Se um cliente legítimo foi bloqueado:

1. Peça para abrir o Console do navegador (F12)
2. Digite:
```javascript
localStorage.clear();
location.reload();
```
3. Página recarrega
4. Pode tentar novamente com a senha correta

## ⚠️ Importante

### O que a proteção FAZ:
- ✅ Impede uso sem senha
- ✅ Bloqueia após tentativas erradas
- ✅ Verifica periodicamente
- ✅ Adiciona marca d'água

### O que a proteção NÃO FAZ:
- ❌ Não impede 100% (nada é 100% seguro)
- ❌ Não funciona no editor (para você poder editar)
- ❌ Não bloqueia quem sabe JavaScript avançado

## 🎨 Personalizar Mensagens

No arquivo `snippets/theme-protection.liquid`, você pode personalizar:

### Mensagem de Bloqueio
```javascript
document.body.innerHTML = '<div>...SUA MENSAGEM...</div>';
```

### Informações de Contato
```javascript
<strong>Suporte:</strong> conectwhats.com<br>
<strong>Email:</strong> suporte@conectwhats.com
```

### Número de Tentativas
```javascript
var MAX_TENTATIVAS = 3; // Mude para 5, 10, etc
```

## 🚀 Ativação para Clientes

Quando vender o tema para um cliente:

1. Envie a senha: `CONECTWHATS2024`
2. Instrua o cliente:
   - "Ao abrir a loja, aparecerá um popup"
   - "Digite a senha que enviei"
   - "O tema será ativado automaticamente"

## 💡 Dicas de Segurança

1. **Mude a senha regularmente**
2. **Use senhas fortes** (letras, números, símbolos)
3. **Não compartilhe publicamente**
4. **Crie senhas diferentes** para cada cliente (se quiser)
5. **Mantenha registro** de quem tem acesso

## 🔧 Desativar Proteção

Se quiser desativar temporariamente:

1. Abra `layout/theme.liquid`
2. Comente a linha:
```liquid
{% comment %} {% render 'theme-protection' %} {% endcomment %}
```

3. Salve

## ✅ Está Funcionando!

O sistema de proteção está ativo e funcionando. Teste em uma loja de desenvolvimento para ver como funciona!
