# 🔧 Guia de Troubleshooting - Token JWT

## 🐛 Problema Identificado

**Sintoma:** Após o login, o sistema redireciona de volta para a tela de login e o backend mostra erro:
```
com.auth0.jwt.exceptions.JWTDecodeException: The token was expected to have 3 parts, but got 0.
```

**Causa:** O token JWT não está sendo enviado corretamente ou está vazio.

---

## 🔍 Debug Adicionado

Foi adicionado logging detalhado em:

### 1. `AuthService.js`
- ✅ Log da resposta completa do login
- ✅ Log do token extraído
- ✅ Log ao salvar no localStorage
- ✅ Log ao recuperar do localStorage

### 2. `axios.js` (Interceptor)
- ✅ Log da URL da requisição
- ✅ Log se é rota de autenticação
- ✅ Log do token recuperado do localStorage
- ✅ Log ao adicionar header Authorization

---

## 📋 Passos para Testar

### 1. Abra o DevTools do Navegador
- Pressione `F12` no Chrome/Edge
- Vá para a aba **Console**

### 2. Faça Login
1. Acesse `http://localhost:5173`
2. Digite login e senha
3. Clique em "ENTRAR"

### 3. Observe os Logs no Console

Você deve ver algo como:

```
🔐 AuthService.login - Fazendo login...
⏭️ Axios Interceptor - Pulando autenticação (rota de login)
✅ AuthService.login - Response completo: { ... }
📦 AuthService.login - Response.data: { token: "...", user: {...} }
🔑 TokenData extraído: { token: "...", user: {...} }
✅ Token extraído com sucesso: eyJhbGciOiJIUzI1NiIs...
💾 AuthService.setToken - Salvando token: eyJhbGciOiJIUzI1NiIs...
✅ Token salvo com sucesso no localStorage
```

### 4. Verifique o LocalStorage
1. No DevTools, vá para a aba **Application** (Chrome) ou **Armazenamento** (Firefox)
2. Navegue: Storage > Local Storage > `http://localhost:5173`
3. Procure pela chave `auth_token`
4. Verifique se o valor é um JWT válido (formato: `xxxxx.yyyyy.zzzzz`)

---

## ⚠️ Possíveis Cenários de Erro

### Cenário 1: "Response.data está vazio"
**Solução:** O backend não está retornando nada. Verifique se o endpoint `/auth/login` está funcionando.

### Cenário 2: "Token não encontrado na resposta"
**Causa:** A estrutura do response é diferente do esperado.

**Ação:** Veja o log `Response.data` e me envie a estrutura exata. 

Pode ser que o backend retorne em um formato diferente, como:
- `{ accessToken: "...", user: {...} }` ao invés de `{ token: "...", user: {...} }`
- `{ data: { token: "...", user: {...} } }` (token dentro de `data`)

### Cenário 3: "Tentando salvar token vazio"
**Causa:** O token está chegando `null` ou `undefined` do backend.

**Ação:** Verifique o backend e confirme que está retornando o token.

### Cenário 4: Token salvo, mas não enviado
**Logs esperados após redirect:**
```
🔑 AuthService.getToken - Token encontrado no

 localStorage
📤 Axios Interceptor - URL: /employees
📤 Axios Interceptor - É rota de auth? false
🔑 Axios Interceptor - Token do localStorage: eyJhbGciOiJIUzI1NiIs...
✅ Axios Interceptor - Header Authorization adicionado
```

Se você ver "Nenhum token no localStorage", o token não foi salvo corretamente.

---

## 🛠️ Soluções Baseadas na Estrutura do Backend

### Se o backend retornar: `{ token: "...", user: {...} }`
✅ **Código já está preparado para isso!**

### Se o backend retornar: `{ accessToken: "...", user: {...} }`
**Editar `AuthService.js` linha 37-40:**
```javascript
if (!tokenData.token && !tokenData.accessToken) {
  console.error('❌ Token não encontrado na resposta:', tokenData);
  throw new Error('Token não retornado pelo servidor');
}

const finalToken = tokenData.token || tokenData.accessToken;
console.log('✅ Token extraído com sucesso:', finalToken.substring(0, 20) + '...');

return {
  token: finalToken,
  user: tokenData.user
};
```

### Se o backend retornar: `{ data: { token: "...", user: {...} } }`
✅ **Código já está preparado para isso!** (veja linhas 27-31)

### Se o backend retornar apenas o token (string pura)
**Editar `AuthService.js` linha 24-44:**
```javascript
// Se for uma string pura
if (typeof response.data === 'string') {
  console.log('📦 Token retornado como string pura');
  return {
    token: response.data,
    user: null
  };
}
```

---

## 📝 Checklist de Verificação

- [ ] O backend está rodando em `http://localhost:8080`?
- [ ] O frontend está acessando `http://localhost:8080/api/v1/auth/login`?
- [ ] O login funciona no Swagger?
- [ ] O console do navegador mostra os logs?
- [ ] O token aparece no localStorage?
- [ ] O token tem o formato JWT válido (3 partes separadas por ponto)?
- [ ] O header `Authorization: Bearer <token>` está sendo enviado nas próximas requisições?

---

## 🎯 Próximos Passos

1. **Teste o login** e observe os logs no console
2. **Copie a estrutura exata** do `Response.data` que aparece no console
3. **Me envie** essa estrutura para eu ajustar o código se necessário

Exemplo do que enviar:
```javascript
Response.data: {
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  refreshToken: "...",
  user: {
    id: 1,
    login: "admin",
    name: "Administrator"
  },
  expiresIn: 3600
}
```

---

## 🔧 Comandos Úteis de Debug

### Ver todos os itens do localStorage (Console do navegador)
```javascript
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
}
```

### Limpar localStorage
```javascript
localStorage.clear();
```

### Ver token
```javascript
console.log(localStorage.getItem('auth_token'));
```

---

**Aguardo seus logs para resolver o problema! 🚀**
