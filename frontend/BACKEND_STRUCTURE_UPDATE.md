# 🔄 Atualização - Estrutura do Backend

## ✅ Mudanças Aplicadas

Todo o frontend foi atualizado para refletir a estrutura **REAL** das entidades do backend.

---

## 📋 Employee (Funcionário)

### Campos da Entidade Backend:
- `id` (Long)
- `name` (String)
- `hireDate` (LocalDate) - Data de admissão
- `salary` (BigDecimal) - Salário
- `status` (EmployeeStatus enum) - ACTIVE ou INACTIVE

### O que foi removido do frontend:
- ❌ `email`
- ❌ `position` (cargo)
- ❌ `department` (departamento)

### O que foi adicionado:
- ✅ `hireDate` (Data de admissão)
- ✅ `salary` (Salário em BRL)

### Componentes atualizados:
- ✅ `EmployeeListDto.js`
- ✅ `EmployeeRequestDto.js`
- ✅ `EmployeeResponseDto.js`
- ✅ `EmployeeTable.jsx` - com formatação de data e moeda BRL
- ✅ `EmployeeForm.jsx` - input de data e número para salário
- ✅ `EmployeesPage.jsx` - atualizado com novos campos

---

## 👤 User (Usuário)

### Campos da Entidade Backend:
- `id` (Long)
- `name` (String)
- `login` (String, unique)
- `password` (String)
- `email` (String, nullable, unique)
- `userGroup` (UserGroup) - Relação ManyToOne
- `enabled` (Boolean) - Ativo ou não
- `apiKeyEvolution` (String, nullable, unique)
- `instanceNameEvolution` (String, nullable, unique)

### O que foi removido do frontend:
- ❌ `role` (perfil ADMIN/USER)
- ❌ `active` (substituído por `enabled`)

### O que foi adicionado:
- ✅ `enabled` (Boolean)
- ✅ `userGroup` (objeto completo ou apenas ID)
- ✅ `apiKeyEvolution` (opcional)
- ✅ `instanceNameEvolution` (opcional)

### Componentes atualizados:
- ✅ `UserListDto.js`
- ✅ `UserRequestDto.js`
- ✅ `UserResponseDto.js`
- ✅ `UserTable.jsx` - mostra grupo e status enabled
- ✅ `UserForm.jsx` - select para UserGroup e campos opcionais
- ✅ `UsersPage.jsx` - carrega lista de UserGroups
- ✅ **NOVO:** `UserGroupService.js` - busca grupos do backend

---

## 🆕 UserGroup Service

Foi criado um novo service para buscar os grupos de usuários disponíveis:

```javascript
// src/services/UserGroupService.js
UserGroupService.findAll() // Lista todos os grupos
UserGroupService.findById(id) // Busca um grupo específico
```

**Endpoint esperado do backend:**
- `GET /api/v1/user-groups` ou `GET /api/v1/usergroups`

⚠️ **IMPORTANTE:** Você precisa verificar qual é a URL correta no seu backend e ajustar no `UserGroupService.js` se necessário.

---

## 🎨 Melhorias Visuais Adicionadas

### Employee Table:
- ✅ Formatação de data brasileira (dd/MM/yyyy)
- ✅ Formatação de moeda BRL (R$ 5.000,00)
- ✅ Estilo especial para coluna de salário (verde, monospace)

### Employee Form:
- ✅ Input `type="date"` para data de admissão
- ✅ Input `type="number"` com step="0.01" para salário
- ✅ Conversão automática para número antes de enviar

### User Table:
- ✅ Badge para mostrar o nome do UserGroup
- ✅ Badge de status (Ativo/Inativo) baseado em `enabled`

### User Form:
- ✅ Select dinâmico de UserGroups
- ✅ Campos opcionais claramente marcados
- ✅ Login desabilitado em modo edição
- ✅ Password opcional em edição

---

## 🔧 Endpoints do Backend Esperados

### Authentication:
- `POST /api/v1/auth/login` - Login

### Employees:
- `GET /api/v1/employees` - Listar
- `GET /api/v1/employees/{id}` - Buscar por ID
- `POST /api/v1/employees` - Criar
- `PUT /api/v1/employees/{id}` - Atualizar
- `DELETE /api/v1/employees/{id}` - Deletar

### Users:
- `GET /api/v1/users` - Listar
- `GET /api/v1/users/{id}` - Buscar por ID
- `POST /api/v1/users` - Criar
- `PUT /api/v1/users/{id}` - Atualizar
- `DELETE /api/v1/users/{id}` - Deletar

### UserGroups:
- `GET /api/v1/user-groups` - Listar (⚠️ **VERIFIQUE A URL NO SEU BACKEND**)
- `GET /api/v1/user-groups/{id}` - Buscar por ID

---

## 📝 Formatos de Dados

### Employee Request (POST/PUT):
```json
{
  "name": "João Silva",
  "hireDate": "2024-01-15",
  "salary": 5000.50,
  "status": "ACTIVE"
}
```

### User Request (POST/PUT):
```json
{
  "name": "Admin User",
  "login": "admin",
  "password": "senha123",
  "email": "admin@empresa.com",
  "userGroupId": 1,
  "enabled": true,
  "apiKeyEvolution": null,
  "instanceNameEvolution": null
}
```

⚠️ Nota: Na edição, `password` é opcional (se vazio, não deve ser enviado).

---

## ✅ Checklist de Verificação

- [ ] Backend retorna `accessToken` no login? ✅ **JÁ CORRIGIDO**
- [ ] Endpoint de UserGroups está correto? ⚠️ **VERIFICAR URL**
- [ ] Status do Employee é enum? (ACTIVE/INACTIVE)
- [ ] Campo `enabled` do User é Boolean?
- [ ] Formato de data aceito pelo backend (ISO: YYYY-MM-DD)
- [ ] Formato do salário (número decimal)

---

## 🚀 Próximos Passos

1. ✅ **Login funcionando** - Token sendo salvo e enviado
2. ⚠️ **Verificar URL do UserGroup** - Ajustar se necessário
3. ✅ **Testar CRUD de Employees** - Criar, editar, listar, deletar
4. ✅ **Testar CRUD de Users** - Verificar se UserGroup está sendo enviado corretamente
5. 📊 **Validar formatações** - Data e moeda funcionando corretamente

---

## 🐛 Se algo não funcionar:

### Erro ao criar Employee:
- Verifique se o backend aceita `hireDate` no formato ISO (YYYY-MM-DD)
- Verifique se `salary` está sendo recebido como número

### Erro ao criar User:
- Verifique se o backend espera `userGroupId` (ID) ou `userGroup` (objeto completo)
- Se for objeto completo, ajustar `UserRequestDto.js`

### UserGroups não aparecem no select:
- Verifique a URL do endpoint no `UserGroupService.js`
- Abra o console do navegador para ver o erro exato

---

**Tudo pronto! Teste o sistema agora! 🎉**
