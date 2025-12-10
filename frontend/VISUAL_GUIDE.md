# 🎨 Guia Visual da Aplicação People Manager

## 📱 Telas da Aplicação

### 1. Tela de Login (`/login`)

**Layout:**
- Fundo com gradiente roxo (#667eea → #764ba2)
- Card branco centralizado com sombra elegante
- Título "People Manager" com gradiente
- Subtítulo "Sistema de Gestão de Funcionários"

**Campos:**
- ✉️ Login (input text)
- 🔒 Senha (input password)
- 🔵 Botão "ENTRAR" com gradiente

**Animações:**
- Fade-in suave ao carregar
- Hover effects nos botões
- Shadow elevation no submit

---

### 2. Layout Autenticado (após login)

**Header Fixo:**
- Fundo com gradiente roxo
- Logo "People Manager" à esquerda
- Saudação "Olá, [nome]" à direita
- Botão "Sair" com efeito glassmorphism

**Sidebar:**
- Largura fixa (260px)
- Navegação com ícones:
  - 👥 Funcionários
  - 👤 Usuários
- Estados: hover e ativo com indicador visual
- Animação de slideX no hover

**Área de Conteúdo:**
- Fundo cinza claro (#f9fafb)
- Padding consistente
- Animação fade-in ao trocar de página

---

### 3. Página de Funcionários (`/employees`)

**Cabeçalho da Página:**
- Título "Funcionários" (H1, bold 800)
- Subtítulo "Gerencie todos os funcionários da empresa"
- Botão "+ Novo Funcionário" (gradiente, canto superior direito)

**Tabela:**
- Header com gradiente roxo
- Colunas:
  - ID
  - Nome (bold)
  - Email
  - Cargo
  - Departamento
  - Status (badge verde/vermelho)
  - Ações (✏️ Editar | 🗑️ Excluir)

**Badges de Status:**
- 🟢 ATIVO: gradiente verde (#10b981 → #059669)
- 🔴 INATIVO: gradiente vermelho (#ef4444 → #dc2626)

**Hover Effects:**
- Linha da tabela: background gradient suave
- Botões de ação: scale 1.1 + fundo colorido

**Formulário (quando visível):**
- Aparece abaixo da tabela
- Grid responsivo (2 colunas)
- Campos:
  - Nome*
  - Email*
  - Cargo*
  - Departamento*
  - Status* (select: Ativo/Inativo)
- Botões:
  - Cancelar (cinza)
  - Criar/Atualizar (gradiente roxo)

---

### 4. Página de Usuários (`/users`)

**Cabeçalho da Página:**
- Título "Usuários" (H1, bold 800)
- Subtítulo "Gerencie os usuários do sistema"
- Botão "+ Novo Usuário" (gradiente, canto superior direito)

**Tabela:**
- Header com gradiente roxo
- Colunas:
  - ID
  - Login (monospace style)
  - Nome
  - Email
  - Perfil (badge laranja/azul)
  - Status (badge verde/vermelho)
  - Ações (✏️ Editar | 🗑️ Excluir)

**Badges de Perfil:**
- 🟠 ADMIN: gradiente laranja (#f59e0b → #d97706)
- 🔵 USER: gradiente azul (#3b82f6 → #2563eb)

**Badges de Status:**
- 🟢 Ativo: gradiente verde
- 🔴 Inativo: gradiente vermelho

**Formulário (quando visível):**
- Grid responsivo (2 colunas)
- Campos:
  - Login* (desabilitado na edição)
  - Senha* (opcional na edição)
  - Nome*
  - Email*
  - Perfil* (select: Usuário/Administrador)
  - Checkbox: Usuário ativo
- Botões:
  - Cancelar (cinza)
  - Criar/Atualizar (gradiente roxo)

---

## 🎨 Paleta de Cores

### Primárias
- **Roxo Início:** #667eea
- **Roxo Fim:** #764ba2
- **Texto Escuro:** #1f2937
- **Texto Médio:** #374151
- **Texto Claro:** #6b7280
- **Texto Placeholder:** #9ca3af

### Secundárias
- **Verde (Ativo):** #10b981 → #059669
- **Vermelho (Inativo):** #ef4444 → #dc2626
- **Laranja (Admin):** #f59e0b → #d97706
- **Azul (User):** #3b82f6 → #2563eb

### Backgrounds
- **Branco:** #ffffff
- **Cinza Muito Claro:** #f9fafb
- **Cinza Claro:** #f3f4f6
- **Borda:** #e5e7eb

---

## 🔔 Notificações (Toast)

**Posição:** Top-right
**Duração:** 3 segundos
**Tipos:**

1. **Sucesso** (verde gradient)
   - "Login realizado com sucesso!"
   - "Funcionário criado com sucesso!"
   - "Usuário atualizado com sucesso!"

2. **Erro** (vermelho gradient)
   - "Erro ao fazer login. Verifique suas credenciais."
   - "Erro ao carregar funcionários"
   - "Você não tem permissão para acessar este recurso."

3. **Info** (azul gradient)
   - Mensagens informativas gerais

4. **Warning** (laranja gradient)
   - Avisos importantes

---

## ✨ Animações e Micro-interações

### Transições de Página
- **Fade-in:** 300ms ease-in
- **Slide-up:** 300ms ease-out (tabelas e formulários)

### Hover Effects
- **Botões:** translateY(-2px) + shadow elevation
- **Links do menu:** translateX(4px) + background gradient
- **Linhas da tabela:** background gradient suave
- **Ícones de ação:** scale(1.1) + background colorido

### Loading States
- Texto "Carregando..." centralizado
- Botão de submit mostra "Entrando..." durante login

### Focus States
- Inputs: border azul + shadow ring (4px, 10% opacity)
- Elementos focáveis: outline visível

---

## 📱 Responsividade

### Breakpoints

**Desktop (>1024px):**
- Sidebar fixa (260px)
- Grid de formulários: 2-3 colunas
- Tabela completa visível

**Tablet (768px - 1023px):**
- Grid de formulários: 2 colunas
- Tabela com scroll horizontal se necessário

**Mobile (<767px):**
- Sidebar: considerar menu hamburger (não implementado ainda)
- Grid de formulários: 1 coluna
- Botões full-width
- Tabela com scroll horizontal

---

## 🔒 Estados de Autenticação

### Não Autenticado
- Acesso apenas a `/login`
- Tentativa de acessar rotas protegidas → redirect para login

### Autenticado
- Acesso a `/employees` e `/users`
- Header mostra nome do usuário
- Token JWT enviado em todas as requisições
- Botão de logout disponível

### Sessão Expirada (401)
- Toast de erro: "Sessão expirada. Faça login novamente."
- Redirect automático para `/login`
- Token removido do localStorage

---

## 🎯 Fluxos de Usuário

### Fluxo de Login
1. Usuário acessa `/login`
2. Insere credenciais
3. Clica em "ENTRAR"
4. Sistema valida
5. ✅ Sucesso → Toast + redirect para `/employees`
6. ❌ Erro → Toast com mensagem do backend

### Fluxo de CRUD (Funcionários/Usuários)

**Listagem:**
1. Página carrega
2. Mostra "Carregando..."
3. Dados aparecem na tabela
4. Badges coloridos indicam status

**Criação:**
1. Clica em "+ Novo [Entidade]"
2. Formulário aparece (slide-up)
3. Preenche campos
4. Clica em "CRIAR"
5. Toast de sucesso
6. Formulário fecha
7. Lista recarrega

**Edição:**
1. Clica em ✏️ na linha
2. Formulário aparece com dados preenchidos
3. Edita campos
4. Clica em "ATUALIZAR"
5. Toast de sucesso
6. Formulário fecha
7. Lista recarrega

**Exclusão:**
1. Clica em 🗑️ na linha
2. Confirm dialog: "Tem certeza que deseja excluir?"
3. ✅ Confirma → requisição + toast + recarrega lista
4. ❌ Cancela → nada acontece

---

## 🚀 Performance

- **Lazy loading:** Não implementado (futuro)
- **Memoization:** Não implementado (futuro)
- **Code splitting:** Automático pelo Vite
- **Build otimizado:** Minificação + tree-shaking

---

## 🔧 Configurações

### Variáveis de Ambiente
```env
VITE_API_URL=http://localhost:8080/api/v1
```

### LocalStorage
- **Chave:** `auth_token`
- **Valor:** JWT string
- **Limpeza:** Logout ou erro 401

---

**Desenvolvido com foco em UX/UI premium e acessibilidade** 🎨✨
