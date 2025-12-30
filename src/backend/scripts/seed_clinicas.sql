-- Script para popular clínicas/farmácias parceiras de exemplo
-- Execute este script no PostgreSQL após criar as tabelas

INSERT INTO clinicas (nome, tipo, endereco, telefone, email, codigo_parceiro, ativo)
VALUES
  ('Clínica Girassol', 'clinica', 'Rua da Saúde, 123', '923456789', 'contato@girassol.ao', 'CLI001', TRUE),
  ('Farmacia Central', 'farmacia', 'Avenida Principal, 456', '923456790', 'farmacia@central.ao', 'FAR001', TRUE),
  ('Clinica Naturmed', 'clinica', 'Rua das Flores, 789', '923456791', 'info@naturmed.ao', 'CLI002', TRUE),
  ('Farmacia Saúde Total', 'farmacia', 'Bairro Novo, Rua 12', '923456792', 'saude@total.ao', 'FAR002', TRUE)
ON CONFLICT (codigo_parceiro) DO NOTHING;

