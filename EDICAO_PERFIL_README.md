# Sistema de Edição de Perfil com Validação de BI

## Funcionalidades Implementadas

### 1. Campo de Imagem no Banco de Dados
- ✅ Adicionado campo `img` (TEXT) na tabela `users`
- ✅ Suporta URL ou base64 da imagem

### 2. Validação de BI
- ✅ Endpoint para validar BI na base de dados da seguradora
- ✅ Busca dados automaticamente quando BI é encontrado
- ✅ Preenche automaticamente os campos:
  - Data de Nascimento
  - Gênero
  - Nacionalidade
  - Província
  - Município
  - Morada
  - Email
  - Foto de perfil (img)

### 3. Tela de Edição de Perfil
- ✅ Interface completa de edição
- ✅ Upload de foto de perfil
- ✅ Validação de BI com botão dedicado
- ✅ Preenchimento automático de campos
- ✅ Salvamento de alterações

## Estrutura do Banco de Dados

### Tabela `users`
```sql
ALTER TABLE users ADD COLUMN img TEXT;
```

### Tabela `clientes_seguradora` (Opcional)
Para integrar com o sistema principal da seguradora, crie esta tabela:
```sql
CREATE TABLE clientes_seguradora (
  id SERIAL PRIMARY KEY,
  bi VARCHAR(50) UNIQUE NOT NULL,
  nome VARCHAR(255) NOT NULL,
  data_nascimento DATE,
  genero VARCHAR(20),
  nacionalidade VARCHAR(100),
  provincia VARCHAR(100),
  municipio VARCHAR(100),
  morada TEXT,
  email VARCHAR(255),
  telefone VARCHAR(20),
  img TEXT,
  apolice VARCHAR(50),
  validade_cartao DATE,
  ...
);
```

## Como Usar

### 1. Configurar Banco de Dados

Execute os scripts SQL:
```bash
# Adicionar coluna img
psql -U postgres -d seguragps_db -f src/backend/scripts/add_img_column.sql

# Criar tabela de clientes da seguradora (opcional)
psql -U postgres -d seguragps_db -f src/backend/scripts/create_seguradora_table.sql
```

### 2. Instalar Dependências

```bash
npm install
# Ou se já instalou, a nova dependência expo-image-picker será instalada
```

### 3. Usar a Funcionalidade

#### No App:

1. **Ir para Perfil:**
   - Abra o app
   - Vá para a tela de perfil

2. **Editar Perfil:**
   - Clique no ícone de editar (lápis) no canto superior direito
   - Ou clique no ícone de câmera na foto do perfil

3. **Validar BI:**
   - Digite o número do BI no campo de validação
   - Clique em "Validar"
   - Se encontrado, os campos serão preenchidos automaticamente

4. **Alterar Foto:**
   - Toque na foto do perfil
   - Selecione uma foto da galeria
   - A foto será atualizada automaticamente

5. **Salvar:**
   - Revise os dados
   - Clique em "Salvar Alterações"

## Endpoints da API

### Validar BI
```
POST /api/users/validate-bi
Body: { "bi": "00409837BE078" }
Response: {
  "encontrado": true,
  "dados": {
    "bi": "...",
    "data_nascimento": "...",
    "genero": "...",
    ...
  }
}
```

### Atualizar Perfil
```
PUT /api/users/profile
Body: {
  "nome": "...",
  "bi": "...",
  "data_nascimento": "...",
  "img": "data:image/jpeg;base64,...",
  ...
}
```

## Notas Importantes

### Integração com Base da Seguradora

O sistema busca dados na tabela `clientes_seguradora`. Se essa tabela não existir, busca na tabela `users` atual.

Para integração completa:
1. Crie a tabela `clientes_seguradora`
2. Sincronize os dados da seguradora principal
3. O sistema buscará automaticamente nessa tabela

### Armazenamento de Imagens

As imagens podem ser armazenadas como:
- **Base64**: Diretamente no campo `img` (texto)
- **URL**: Caminho para arquivo armazenado externamente

Para produção, recomenda-se:
- Armazenar imagens em serviço de storage (AWS S3, Cloudinary, etc.)
- Salvar apenas a URL no banco de dados

## Arquivos Modificados/Criados

### Backend
- ✅ `src/backend/src/config/database.js` - Adicionado campo img
- ✅ `src/backend/src/controllers/userController.js` - Adicionado validateBI()
- ✅ `src/backend/src/routes/userRoutes.js` - Adicionada rota /validate-bi
- ✅ `src/backend/scripts/add_img_column.sql` - Script SQL
- ✅ `src/backend/scripts/create_seguradora_table.sql` - Script SQL

### Frontend
- ✅ `src/Screens/EditProfileScreen.js` - Nova tela de edição
- ✅ `src/Screens/profileScreen.js` - Atualizado para mostrar foto e navegar
- ✅ `src/services/api.js` - Adicionado método validateBI()
- ✅ `src/routes/index.js` - Adicionada rota EditProfile
- ✅ `package.json` - Adicionado expo-image-picker

## Próximos Passos (Sugestões)

- [ ] Integrar com API real da seguradora
- [ ] Implementar upload de imagens para servidor
- [ ] Adicionar validação de formato de BI
- [ ] Cache de dados validados
- [ ] Histórico de alterações de perfil

