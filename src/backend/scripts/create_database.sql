-- Script para criar o banco de dados completo do sistema de seguro de saúde
-- Execute este script no PostgreSQL

-- Criar banco de dados (execute separadamente se necessário)
-- CREATE DATABASE segurogps_db;

-- Conectar ao banco
-- \c segurogps_db;

-- Tabela de usuários (assegurados)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  bi VARCHAR(50),
  data_nascimento DATE,
  genero VARCHAR(20),
  nacionalidade VARCHAR(100),
  provincia VARCHAR(100),
  municipio VARCHAR(100),
  morada TEXT,
  email VARCHAR(255),
  apolice VARCHAR(50),
  validade_cartao DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de clínicas/farmácias parceiras
CREATE TABLE IF NOT EXISTS clinicas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('clinica', 'farmacia')),
  endereco TEXT,
  telefone VARCHAR(20),
  email VARCHAR(255),
  codigo_parceiro VARCHAR(50) UNIQUE NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de notificações
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  lida BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de procedimentos/consultas
CREATE TABLE IF NOT EXISTS procedimentos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  clinica_id INTEGER REFERENCES clinicas(id),
  clinica VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  data_procedimento DATE NOT NULL,
  descricao TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de sessões QR Code (controle anti-fraude)
CREATE TABLE IF NOT EXISTS qr_code_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  qr_code_token VARCHAR(255) UNIQUE NOT NULL,
  tipo_uso VARCHAR(50) NOT NULL CHECK (tipo_uso IN ('consulta', 'medicamento', 'exame')),
  clinica_id INTEGER REFERENCES clinicas(id),
  expira_em TIMESTAMP NOT NULL,
  usado BOOLEAN DEFAULT FALSE,
  usado_em TIMESTAMP,
  usado_por_clinica_id INTEGER REFERENCES clinicas(id),
  usado_por_usuario_id INTEGER,
  invalidado BOOLEAN DEFAULT FALSE,
  motivo_invalidacao TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de registros de uso (auditoria completa)
CREATE TABLE IF NOT EXISTS registros_uso (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  qr_code_session_id INTEGER REFERENCES qr_code_sessions(id),
  clinica_id INTEGER REFERENCES clinicas(id) NOT NULL,
  tipo_uso VARCHAR(50) NOT NULL,
  descricao TEXT,
  valor DECIMAL(10, 2),
  status VARCHAR(50) NOT NULL CHECK (status IN ('pendente', 'confirmado', 'rejeitado', 'suspeito')),
  motivo_rejeicao TEXT,
  dados_geograficos JSONB,
  ip_address VARCHAR(45),
  dispositivo_info TEXT,
  observacoes TEXT,
  validado_por INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_users_telefone ON users(telefone);
CREATE INDEX IF NOT EXISTS idx_users_apolice ON users(apolice);

CREATE INDEX IF NOT EXISTS idx_clinicas_codigo ON clinicas(codigo_parceiro);
CREATE INDEX IF NOT EXISTS idx_clinicas_ativo ON clinicas(ativo);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_lida ON notifications(lida);

CREATE INDEX IF NOT EXISTS idx_procedimentos_user ON procedimentos(user_id);
CREATE INDEX IF NOT EXISTS idx_procedimentos_clinica ON procedimentos(clinica_id);

CREATE INDEX IF NOT EXISTS idx_qr_code_sessions_token ON qr_code_sessions(qr_code_token);
CREATE INDEX IF NOT EXISTS idx_qr_code_sessions_user ON qr_code_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_qr_code_sessions_expira ON qr_code_sessions(expira_em);
CREATE INDEX IF NOT EXISTS idx_qr_code_sessions_usado ON qr_code_sessions(usado);

CREATE INDEX IF NOT EXISTS idx_registros_uso_user ON registros_uso(user_id);
CREATE INDEX IF NOT EXISTS idx_registros_uso_clinica ON registros_uso(clinica_id);
CREATE INDEX IF NOT EXISTS idx_registros_uso_created ON registros_uso(created_at);
CREATE INDEX IF NOT EXISTS idx_registros_uso_status ON registros_uso(status);
CREATE INDEX IF NOT EXISTS idx_registros_uso_session ON registros_uso(qr_code_session_id);

-- Dados de exemplo (opcional - descomente para inserir)
/*
INSERT INTO clinicas (nome, tipo, endereco, telefone, email, codigo_parceiro, ativo)
VALUES
  ('Clínica Girassol', 'clinica', 'Rua da Saúde, 123', '923456789', 'contato@girassol.ao', 'CLI001', TRUE),
  ('Farmacia Central', 'farmacia', 'Avenida Principal, 456', '923456790', 'farmacia@central.ao', 'FAR001', TRUE),
  ('Clinica Naturmed', 'clinica', 'Rua das Flores, 789', '923456791', 'info@naturmed.ao', 'CLI002', TRUE),
  ('Farmacia Saúde Total', 'farmacia', 'Bairro Novo, Rua 12', '923456792', 'saude@total.ao', 'FAR002', TRUE)
ON CONFLICT (codigo_parceiro) DO NOTHING;
*/

-- Comentários nas tabelas
COMMENT ON TABLE users IS 'Usuários do sistema (assegurados)';
COMMENT ON TABLE clinicas IS 'Clínicas e farmácias parceiras autorizadas';
COMMENT ON TABLE notifications IS 'Notificações para os usuários';
COMMENT ON TABLE procedimentos IS 'Histórico de procedimentos/consultas realizados';
COMMENT ON TABLE qr_code_sessions IS 'Sessões de QR Code para controle anti-fraude';
COMMENT ON TABLE registros_uso IS 'Auditoria completa de todos os usos do cartão';

COMMENT ON COLUMN qr_code_sessions.qr_code_token IS 'Token único criptográfico do QR Code';
COMMENT ON COLUMN qr_code_sessions.expira_em IS 'Data e hora de expiração do QR Code (15 minutos)';
COMMENT ON COLUMN registros_uso.status IS 'Status: pendente, confirmado, rejeitado, suspeito';

