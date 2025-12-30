-- Script para inserir dados de teste na tabela clientes_seguradora
-- Execute este script no PostgreSQL para testar a funcionalidade de validação de BI

-- Criar tabela de clientes da seguradora (se não existir)
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

-- Inserir dados de teste na tabela de clientes da seguradora
INSERT INTO clientes_seguradora (
  bi,
  nome,
  data_nascimento,
  genero,
  nacionalidade,
  provincia,
  municipio,
  morada,
  email,
  telefone,
  apolice,
  validade_cartao
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

-- Verificar se os dados foram inseridos
SELECT '✅ Dados de teste inseridos com sucesso!' as status;
SELECT 'BI para teste: 00409837BE078' as bi_teste;
SELECT id, nome, bi, email FROM clientes_seguradora WHERE bi = '00409837BE078';
