-- Script para criar tabela de clientes da seguradora
-- Esta tabela contém os dados oficiais dos clientes da seguradora
-- Os dados são atualizados a partir do sistema principal da seguradora

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
  img TEXT, -- URL ou base64 da foto do cliente
  apolice VARCHAR(50),
  validade_cartao DATE,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para busca rápida por BI
CREATE INDEX IF NOT EXISTS idx_clientes_seguradora_bi ON clientes_seguradora(bi);

-- Comentário na tabela
COMMENT ON TABLE clientes_seguradora IS 'Base de dados oficial de clientes da seguradora';

-- Inserir dados de exemplo (opcional - remover em produção)
-- INSERT INTO clientes_seguradora (bi, nome, data_nascimento, genero, nacionalidade, provincia, municipio, morada, email, telefone, apolice)
-- VALUES 
--   ('00409837BE078', 'Délcio Manuel da Silva', '2003-01-12', 'Masculino', 'Angolana', 'Bié', 'XXXX', 'XXXXXXX', 'delciomanuelsilva12@gmail.com', '922000000', '20251220')
-- ON CONFLICT (bi) DO NOTHING;

