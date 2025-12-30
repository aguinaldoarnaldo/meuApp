# Configuração do Projeto meuApp

Este documento explica como configurar e executar o projeto completo (frontend + backend).

## Pré-requisitos

1. Node.js (versão 14 ou superior)
2. PostgreSQL (versão 12 ou superior)
3. Expo CLI (instalado globalmente: `npm install -g expo-cli`)

## Configuração do Backend

### 1. Instalar dependências do backend

```bash
cd src/backend
npm install
```

### 2. Configurar PostgreSQL

1. Instale o PostgreSQL
2. Crie o banco de dados:
```sql
CREATE DATABASE meuapp_db;
```

3. Crie o arquivo `.env` em `src/backend/.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=meuapp_db
DB_USER=postgres
DB_PASSWORD=sua_senha_postgres
PORT=3000
NODE_ENV=development
JWT_SECRET=seu_jwt_secret_super_seguro_aqui
```

### 3. Executar o backend

```bash
cd src/backend
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

## Configuração do Frontend

### 1. Instalar dependências do frontend

Na raiz do projeto:

```bash
npm install
```

### 2. Configurar URL da API

Edite o arquivo `src/services/api.js` e ajuste a constante `API_BASE_URL`:

- **iOS Simulador**: `http://localhost:3000/api`
- **Android Emulador**: `http://10.0.2.2:3000/api`
- **Dispositivo físico**: `http://SEU_IP_LOCAL:3000/api` (ex: `http://192.168.1.100:3000/api`)

Para descobrir seu IP local:
- Windows: `ipconfig` no CMD
- Mac/Linux: `ifconfig` no Terminal

### 3. Executar o frontend

```bash
npm start
```

Ou para dispositivo específico:

```bash
npm run android  # Android
npm run ios      # iOS
npm run web      # Web
```

## Estrutura do Projeto

```
meuApp/
├── src/
│   ├── backend/          # Backend Node.js + Express + PostgreSQL
│   │   ├── src/
│   │   │   ├── config/   # Configuração do banco de dados
│   │   │   ├── controllers/  # Lógica de negócio
│   │   │   ├── routes/   # Rotas da API
│   │   │   └── middleware/   # Middlewares (auth, etc)
│   │   └── server.js     # Arquivo principal do servidor
│   ├── services/         # Serviços de API do frontend
│   │   └── api.js        # Cliente HTTP para a API
│   ├── Screens/          # Telas do aplicativo
│   │   ├── LoginScreen.js
│   │   ├── regitar.js    # RegisterScreen
│   │   ├── HomeScreen.js
│   │   ├── profileScreen.js
│   │   └── NotificationsScreen.js
│   └── routes/           # Navegação
├── App.js
└── package.json
```

## Funcionalidades Implementadas

✅ **Autenticação**
- Registro de usuário
- Login com telefone e senha
- Autenticação JWT

✅ **Perfil do Usuário**
- Visualização de perfil completo
- Atualização de dados do perfil
- Alteração de senha

✅ **Cartão de Saúde**
- Exibição de dados do cartão na HomeScreen
- Informações de apólice e validade

✅ **Notificações**
- Listagem de notificações
- Deletar notificações

✅ **Procedimentos**
- Listagem de procedimentos/consultas
- Exibição na HomeScreen

## Testando a Aplicação

1. Execute o backend primeiro
2. Execute o frontend
3. Registre um novo usuário na tela de registro
4. Faça login com as credenciais criadas
5. Explore as funcionalidades do app

## Notas Importantes

- Certifique-se de que o PostgreSQL está rodando antes de iniciar o backend
- As tabelas são criadas automaticamente na primeira execução
- Para desenvolvimento local, você pode precisar ajustar a URL da API conforme a plataforma (iOS/Android)
- O token JWT é armazenado localmente usando AsyncStorage

