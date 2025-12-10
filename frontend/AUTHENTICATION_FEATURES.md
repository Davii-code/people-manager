# 🔐 Recursos de Autenticação e Logout

## ✅ Recursos Implementados

### 1. 🔄 Logout Automático por Token Expirado

Quando o token JWT expira ou é invalidado, o sistema **automaticamente**:

#### **Quando recebe erro 401 (Unauthorized):**
1. ⚠️ Mostra toast: "Sessão expirada. Faça login novamente."
2. 🗑️ Remove o token do localStorage
3. ⏳ Aguarda 1 segundo (para o usuário ver o toast)
4. 🔄 Redireciona para `/login`

#### **Quando recebe erro 403 (Forbidden):**
- Se a mensagem de erro contém palavras relacionadas a autenticação (`token`, `autenticação`, `authentication`):
  1. ⚠️ Mostra toast com a mensagem do servidor
  2. 🗑️ Remove o token do localStorage
  3. ⏳ Aguarda 1 segundo
  4. 🔄 Redireciona para `/login`
- Caso contrário, apenas mostra o toast (sem logout)

#### **Código responsável:**
- `src/api/axios.js` (Response Interceptor)

---

### 2. 🚪 Botão "Sair" no Header

O header possui um botão de logout com as seguintes funcionalidades:

#### **Fluxo do Logout Manual:**
1. 👤 Usuário clica no botão "🚪 Sair"
2. ❓ Aparece confirmação: "Deseja realmente sair do sistema?"
3. ✅ Se confirmar:
   - 💬 Mostra toast: "Até logo! 👋"
   - 🔄 Botão muda para "🔄 Saindo..." (desabilitado)
   - 🗑️ Remove o token do localStorage
   - 🔓 Limpa o estado do AuthContext (isAuthenticated, token, user)
   - 🔄 Redireciona para `/login`

#### **Componentes envolvidos:**
- `src/components/layout/Header.jsx` - Botão e confirmação
- `src/context/AuthContext.jsx` - Limpeza do estado
- `src/services/AuthService.js` - Remoção do token

---

## 📊 Fluxograma de Logout

```
┌─────────────────────────────────────────────────────────┐
│            LOGOUT AUTOMÁTICO (Token Expirado)           │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │  Requisição à API    │
                 └──────────────────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Resposta: 401 ou 403 │
                 └──────────────────────┘
                            │
                            ▼
              ┌─────────────────────────────┐
              │ Axios Response Interceptor  │
              └─────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
            401 │                   403 │
                │                       │
                ▼                       ▼
    ┌─────────────────┐    ┌──────────────────────┐
    │ Toast: Sessão   │    │ Verifica mensagem    │
    │ expirada        │    │ de erro              │
    └─────────────────┘    └──────────────────────┘
                │                       │
                │                       │
                │         ┌─────────────┴─────────────┐
                │         │ Contém palavras-chave     │
                │         │ de autenticação?          │
                │         └─────────────┬─────────────┘
                │                       │
                │                   Sim │   Não
                │                       │    │
                │                       │    ▼
                │                       │ ┌──────────┐
                │                       │ │ Apenas   │
                │                       │ │ Toast    │
                │                       │ └──────────┘
                │                       │
                └───────────────────────┘
                            │
                            ▼
                ┌──────────────────────┐
                │ Remove token do      │
                │ localStorage         │
                └──────────────────────┘
                            │
                            ▼
                  ┌────────────────┐
                  │ Aguarda 1s     │
                  └────────────────┘
                            │
                            ▼
                ┌──────────────────────┐
                │ Redireciona para     │
                │ /login               │
                └──────────────────────┘
```

```
┌─────────────────────────────────────────────────────────┐
│              LOGOUT MANUAL (Botão "Sair")               │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Usuário clica em     │
                 │ botão "🚪 Sair"      │
                 └──────────────────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Confirmação:         │
                 │ "Deseja sair?"       │
                 └──────────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
           Não  │                  Sim  │
                │                       │
                ▼                       ▼
        ┌───────────┐        ┌─────────────────┐
        │ Cancela   │        │ Toast: Até logo!│
        │ operação  │        └─────────────────┘
        └───────────┘                   │
                                        ▼
                            ┌──────────────────────┐
                            │ Botão mostra:        │
                            │ "🔄 Saindo..."       │
                            └──────────────────────┘
                                        │
                                        ▼
                            ┌──────────────────────┐
                            │ AuthContext.logout() │
                            └──────────────────────┘
                                        │
                                        ▼
                            ┌──────────────────────┐
                            │ AuthService.logout() │
                            │ - Remove token       │
                            └──────────────────────┘
                                        │
                                        ▼
                            ┌──────────────────────┐
                            │ Limpa estado:        │
                            │ - isAuthenticated    │
                            │ - token              │
                            │ - user               │
                            └──────────────────────┘
                                        │
                                        ▼
                            ┌──────────────────────┐
                            │ navigate('/login')   │
                            └──────────────────────┘
```

---

## 🧪 Como Testar

### Teste 1: Logout Manual
1. Faça login no sistema
2. Clique no botão "🚪 Sair" no header
3. Confirme a ação
4. Verifique:
   - ✅ Toast "Até logo! 👋" aparece
   - ✅ Você é redirecionado para `/login`
   - ✅ Console mostra os logs de logout

### Teste 2: Token Expirado (Simulação)
1. Faça login no sistema
2. Abra DevTools (F12) > Application > Local Storage
3. Edite ou delete o valor de `auth_token`
4. Tente acessar qualquer página protegida (Funcionários ou Usuários)
5. Verifique:
   - ✅ Toast "Sessão expirada..." aparece
   - ✅ Você é redirecionado para `/login` após 1 segundo

### Teste 3: Token Expirado (Real - Aguardar 1 hora)
1. Faça login no sistema
2. Aguarde 1 hora (baseado em `token-expire-in=3600`)
3. Tente fazer qualquer operação
4. Verifique:
   - ✅ Backend retorna 401
   - ✅ Logout automático acontece

---

## 📝 Logs no Console

### Logout Manual:
```console
🔓 AuthContext.logout - Limpando estado...
🚪 AuthService.logout - Fazendo logout...
✅ Token removido do localStorage
✅ Logout concluído
✅ AuthContext - Estado limpo
```

### Logout Automático (401):
```console
⚠️ Token expirado ou inválido - redirecionando para login
```

### Logout Automático (403 com auth):
```console
⚠️ Acesso negado (403)
⚠️ 403 relacionado a autenticação - fazendo logout
```

---

## 🔧 Arquivos Modificados

| Arquivo | Modificação |
|---------|-------------|
| `src/api/axios.js` | ✅ Melhorado tratamento de 401 e 403 com delay de 1s |
| `src/components/layout/Header.jsx` | ✅ Botão com confirmação, feedback visual e ícones |
| `src/services/AuthService.js` | ✅ Limpeza completa no logout |
| `src/context/AuthContext.jsx` | ✅ Logs adicionados ao logout |

---

## 🎯 Recursos Extras Implementados

1. ✅ **Confirmação antes de sair** - Evita logout acidental
2. ✅ **Feedback visual** - Botão mostra "Saindo..." enquanto processa
3. ✅ **Toast de despedida** - Mensagem amigável ao sair
4. ✅ **Delay inteligente** - 1 segundo para o usuário ver o toast antes de redirecionar
5. ✅ **Logs detalhados** - Para debug e monitoramento
6. ✅ **Tratamento de 403** - Detecta problemas de autenticação em erros 403
7. ✅ **Limpeza completa** - Remove token e limpa todo o estado da aplicação

---

## ⚙️ Configurações

### Tempo de expiração do token (Backend):
```properties
api.security.jwt.token-expire-in=3600  # 1 hora
```

### Delay antes de redirecionar (Frontend):
```javascript
// Em axios.js, linha 66
setTimeout(() => {
  window.location.href = '/login';
}, 1000); // 1 segundo
```

---

**Tudo funcionando! 🎉**

Agora o sistema:
- ✅ Detecta automaticamente quando o token expira
- ✅ Redireciona para login com feedback visual
- ✅ Permite logout manual com confirmação
- ✅ Limpa completamente o estado da aplicação
