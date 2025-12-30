# 🧪 Teste de Validação de BI - Instruções Rápidas

## 📋 Dados de Teste

### **Número de BI para Teste:**
```
00409837BE078
```

### Dados que serão preenchidos automaticamente:
- ✅ **Nome:** Délcio Manuel da Silva
- ✅ **Data de Nascimento:** 12/01/2003
- ✅ **Género:** Masculino
- ✅ **Nacionalidade:** Angolana
- ✅ **Província:** Bié
- ✅ **Município:** Kuito
- ✅ **Morada:** Rua da Saúde, Bairro Central
- ✅ **Email:** delciomanuelsilva12@gmail.com

---

## 🚀 Passos Rápidos para Teste

### 1️⃣ Preparar Banco de Dados

Execute este comando no terminal:

```bash
psql -U postgres -d seguragps_db -f src/backend/scripts/insert_test_user.sql
```

OU execute no pgAdmin ou psql:

```sql
-- Criar tabela (se não existir)
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

-- Inserir dados de teste
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

### 2️⃣ Testar no App

1. **Fazer Login** no app (qualquer usuário existente)

2. **Ir para Perfil:**
   - Clique no ícone de pessoa no header

3. **Editar Perfil:**
   - Clique no ícone de lápis (editar) no canto superior direito

4. **Validar BI:**
   - No campo "Validação de BI", digite: `00409837BE078`
   - Clique no botão **"Validar"**
   - ✅ Deve aparecer: "BI validado! Dados preenchidos automaticamente."
   - ✅ Todos os campos devem ser preenchidos automaticamente

5. **Salvar:**
   - Clique em **"Salvar Alterações"**
   - ✅ Deve voltar automaticamente para tela de Perfil

6. **Verificar Resultado:**
   - ✅ Todos os campos devem estar preenchidos (não mais "Não informado")
   - ✅ Dados devem corresponder aos dados de teste acima

---

## ✅ Checklist de Validação

Após salvar, verifique na tela de Perfil:

- [ ] **BI:** 00409837BE078
- [ ] **Nome:** Délcio Manuel da Silva
- [ ] **Data de Nascimento:** 12/01/2003
- [ ] **Género:** Masculino
- [ ] **Nacionalidade:** Angolana
- [ ] **Província:** Bié
- [ ] **Município:** Kuito
- [ ] **Morada:** Rua da Saúde, Bairro Central
- [ ] **Email:** delciomanuelsilva12@gmail.com

---

## 🔍 Verificar no Banco de Dados

Para confirmar que os dados foram salvos:

```sql
SELECT 
  id, nome, telefone, bi, data_nascimento, genero,
  nacionalidade, provincia, municipio, morada, email
FROM users 
WHERE telefone = 'SEU_TELEFONE_AQUI';
```

---

## ❗ Problemas Comuns

### BI não encontrado:
- Verifique se executou o script SQL
- Verifique se o BI está correto: `00409837BE078`
- Verifique se a tabela `clientes_seguradora` existe

### Dados não preenchem:
- Verifique se o backend está rodando
- Verifique o console do backend para erros
- Verifique a conexão com o banco de dados

### Dados não aparecem no Perfil:
- Certifique-se de que clicou em "Salvar Alterações"
- Verifique se voltou para a tela de Perfil
- Feche e reabra o app se necessário

---

## 📝 Resultado Esperado

**Antes da validação:**
- Campos vazios ou "Não informado"

**Após validação e salvamento:**
- ✅ Todos os campos preenchidos
- ✅ Dados persistem após fechar app
- ✅ Foto aparece se foi adicionada

---

**🎯 BI para Teste: `00409837BE078`**

