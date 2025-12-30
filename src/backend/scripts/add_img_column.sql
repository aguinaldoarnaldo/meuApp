-- Script para adicionar coluna img na tabela users
-- Execute este script se a coluna ainda não existir

-- Adicionar coluna img se não existir
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'img'
  ) THEN
    ALTER TABLE users ADD COLUMN img TEXT;
    RAISE NOTICE 'Coluna img adicionada com sucesso';
  ELSE
    RAISE NOTICE 'Coluna img já existe';
  END IF;
END $$;

