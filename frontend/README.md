# People Manager - Frontend

Interface moderna e responsiva para gestão de funcionários, construída com React e Vite.

## 🎨 Tecnologias & Bibliotecas

* **React 18**: Biblioteca principal para construção da UI.
* **Vite**: Build tool extremamente rápida.
* **React Router DOM 6**: Gerenciamento de rotas e navegação.
* **Axios**: Cliente HTTP para comunicação com a API (com Interceptors configurados).
* **CSS Modules**: Estilização modular e escopada.
* **Context API**: Gerenciamento de estado global (Autenticação).
* **React Toastify**: Notificações de usuário elegantes.

## 🚀 Desenvolvimento Local

Para rodar o frontend isoladamente em modo de desenvolvimento:

1. **Instale as dependências**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```
   Acesse em [http://localhost:5173](http://localhost:5173).

## 📦 Scripts Disponíveis

* `npm run dev`: Inicia servidor local.
* `npm run build`: Gera o bundle de produção na pasta `dist`.
* `npm run preview`: Visualiza o build de produção localmente.
* `npm run lint`: Executa verificação de código (ESLint).

## 🌐 Estrutura de Pastas

* `/src/api`: Configuração do Axios e interceptors.
* `/src/components`: Componentes reutilizáveis (botões, inputs, tabelas).
* `/src/context`: Estados globais (AuthContext).
* `/src/pages`: Páginas da aplicação.
* `/src/services`: Camada de serviço para chamadas à API.
* `/src/styles`: Estilos globais e variáveis CSS.
