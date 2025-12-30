# Instruções para Teste de Validação de BI

## Dados de Teste Configurados

### Número de BI para Teste:
```
00409837BE078
```

### Dados que serão preenchidos automaticamente:
- **Nome:** Délcio Manuel da Silva
- **Data de Nascimento:** 12/01/2003
- **Género:** Masculino
- **Nacionalidade:** Angolana
- **Província:** Bié
- **Município:** Kuito
- **Morada:** Rua da Saúde, Bairro Central
- **Email:** delciomanuelsilva12@gmail.com

## Passos para Teste

### 1. Preparar o Banco de Dados

Execute o script SQL para criar os dados de teste:

```bash
psql -U postgres -d seguragps_db -f src/backend/scripts/insert_test_user.sql
```

OU execute manualmente no PostgreSQL:

```sql
-- Criar/atualizar tabela de clientes da seguradora
CREATE TABLE IF NOT EXISTS clientes_seguradora (
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
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados de teste na tabela clientes_seguradora
INSERT INTO clientes_seguradora (
  bi, nome, data_nascimento, genero, nacionalidade,
  provincia, municipio, morada, email, telefone,
  apolice, validade_cartao
)
VALUES (
  '00409837BE078',
  'Délcio Manuel da Silva',
  '2003-01-12',
  'Masculino',
  'Angolana',
  'Bié',
  'Kuito',
  'Rua da Saúde, Bairro Central',
  'delciomanuelsilva12@gmail.com',
  '923456789',
  '20251220',
  '2026-12-31'
)
ON CONFLICT (bi) DO UPDATE 
SET 
  nome = EXCLUDED.nome,
  data_nascimento = EXCLUDED.data_nascimento,
  genero = EXCLUDED.genero,
  nacionalidade = EXCLUDED.nacionalidade,
  provincia = EXCLUDED.provincia,
  municipio = EXCLUDED.municipio,
  morada = EXCLUDED.morada,
  email = EXCLUDED.email,
  telefone = EXCLUDED.telefone,
  apolice = EXCLUDED.apolice,
  validade_cartao = EXCLUDED.validade_cartao,
  updated_at = CURRENT_TIMESTAMP;
```

### 2. Criar Usuário no App (se ainda não tiver)

1. Abra o app
2. Vá para tela de registro
3. Registre com:
   - **Nome:** Qualquer nome
   - **Telefone:** 923456789
   - **Senha:** 123456 (ou qualquer senha)

### 3. Testar Validação de BI

1. **Fazer Login** no app
2. **Ir para Perfil** (ícone de pessoa)
3. **Clicar no ícone de editar** (lápis no canto superior direito)
4. **Na tela de edição:**
   - Digite no campo BI: `00409837BE078`
   - Clique no botão **"Validar"**
   - ✅ Deve aparecer mensagem de sucesso
   - ✅ Todos os campos devem ser preenchidos automaticamente:
     - Data de Nascimento: 2003-01-12
     - Género: Masculino
     - Nacionalidade: Angolana
     - Província: Bié
     - Município: Kuito
     - Morada: Rua da Saúde, Bairro Central
     - Email: delciomanuelsilva12@gmail.com

5. **Clique em "Salvar Alterações"**
6. **Verificar na tela de Perfil:**
   - ✅ Deve voltar automaticamente para tela de Perfil
   - ✅ Todos os campos devem estar preenchidos (não mais "Não informado")
   - ✅ BI: 00409837BE078
   - ✅ Data de Nascimento: 12/01/2003
   - ✅ Género: Masculino
   - ✅ Nacionalidade: Angolana
   - ✅ Província: Bié
   - ✅ Município: Kuito
   - ✅ Morada: Rua da Saúde, Bairro Central
   - ✅ Email: delciomanuelsilva12@gmail.com

### 4. Testar Upload de Foto

1. Na tela de edição, **toque na foto do perfil**
2. Selecione uma foto da galeria
3. A foto deve aparecer no lugar
4. Clique em "Salvar Alterações"
5. Na tela de perfil, a foto deve aparecer

## Resultado Esperado

### Antes da Validação:
- Campos vazios ou com "Não informado"

### Após Validação e Salvamento:
- Todos os campos preenchidos com dados da seguradora
- Foto de perfil atualizada (se adicionada)
- Dados persistem após fechar e reabrir o app

## Verificação no Banco de Dados

Para verificar se os dados foram salvos:

```sql
SELECT 
  id, nome, telefone, bi, data_nascimento, genero,
  nacionalidade, provincia, municipio, morada, email, img
FROM users 
WHERE telefone = '923456789';
```

## Troubleshooting

### BI não encontrado:
- Verifique se executou o script SQL corretamente
- Verifique se o BI está correto: `00409837BE078`
- Verifique se a tabela `clientes_seguradora` foi criada

### Dados não preenchem:
- Verifique se o backend está rodando
- Verifique o console do backend para erros
- Verifique a conexão com o banco de dados

### Dados não salvam:
- Verifique se clicou em "Salvar Alterações"
- Verifique se há erros no console
- Verifique se o token de autenticação está válido

