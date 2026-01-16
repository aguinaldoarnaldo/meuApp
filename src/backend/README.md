# Backend - SeguroGPS

Backend Node.js com Express e PostgreSQL para o aplicativo SeguroGPS.

## Configuração

### 1. Instalar dependências

```bash
cd src/backend
npm install
```

### 2. Configurar banco de dados PostgreSQL

1. Instale o PostgreSQL no seu sistema
2. Crie um banco de dados:
```sql
CREATE DATABASE segurogps_db;
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `src/backend` baseado no `.env.example`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=segurogps_db
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui

PORT=3000
NODE_ENV=development

JWT_SECRET=seu_jwt_secret_super_seguro_aqui
```

### 4. Executar o servidor

```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

O servidor estará rodando em `http://localhost:3000`

## Estrutura do Banco de Dados

O sistema cria automaticamente as seguintes tabelas:

- **users**: Usuários do sistema (assegurados)
- **notifications**: Notificações dos usuários
- **procedimentos**: Procedimentos/consultas realizadas
- **clinicas**: Clínicas e farmácias parceiras autorizadas
- **qr_code_sessions**: Sessões de QR Code (controle anti-fraude)
- **registros_uso**: Auditoria completa de todos os usos do cartão

### Scripts SQL

Execute o script `scripts/create_database.sql` para criar todas as tabelas e índices.
Execute `scripts/seed_clinicas.sql` para popular dados de exemplo (opcional).

## Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/verify` - Verificar token (requer autenticação)

### Usuário
- `GET /api/users/profile` - Buscar perfil do usuário (requer autenticação)
- `PUT /api/users/profile` - Atualizar perfil (requer autenticação)
- `POST /api/users/change-password` - Alterar senha (requer autenticação)
- `GET /api/users/health-card` - Buscar dados do cartão de saúde (requer autenticação)

### Notificações
- `GET /api/notifications` - Listar notificações (requer autenticação)
- `PUT /api/notifications/:id/read` - Marcar como lida (requer autenticação)
- `DELETE /api/notifications/:id` - Deletar notificação (requer autenticação)
- `DELETE /api/notifications` - Deletar todas as notificações (requer autenticação)

### Procedimentos
- `GET /api/procedimentos` - Listar procedimentos (requer autenticação)
- `POST /api/procedimentos` - Criar procedimento (requer autenticação)

### QR Code (Sistema Anti-Fraude)
- `POST /api/qrcode/generate` - Gerar novo QR Code (requer autenticação)
- `POST /api/qrcode/validate` - Validar QR Code (público - usado por clínicas)
- `POST /api/qrcode/invalidate` - Cancelar QR Code (requer autenticação)
- `GET /api/qrcode/history` - Histórico de QR Codes do usuário (requer autenticação)

### Clínicas/Farmácias Parceiras
- `GET /api/clinicas` - Listar clínicas parceiras
- `GET /api/clinicas/:id` - Detalhes de clínica
- `POST /api/clinicas` - Criar clínica (admin)

### Auditoria
- `GET /api/auditoria/usuario` - Auditoria completa do usuário (requer autenticação)
- `GET /api/auditoria/suspeitos` - Registros suspeitos (admin)

## Autenticação

A maioria dos endpoints requer autenticação via JWT. Envie o token no header:

```
Authorization: Bearer SEU_TOKEN_AQUI
```

