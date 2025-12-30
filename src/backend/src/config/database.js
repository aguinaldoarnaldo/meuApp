const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'seguragps_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'Aguinaldo',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Test connection
pool.on('connect', () => {
    console.log('✅ Conectado ao banco de dados PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Erro inesperado no cliente do banco de dados:', err);
    process.exit(-1);
});

// Função para criar as tabelas
async function createTables() {
    try {
        // Tabela de usuários
        await pool.query(`
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
        img TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Adicionar coluna img se não existir (para atualizações)
        await pool.query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='users' AND column_name='img') THEN
          ALTER TABLE users ADD COLUMN img TEXT;
        END IF;
      END $$;
    `);

        // Tabela de notificações
        await pool.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        titulo VARCHAR(255) NOT NULL,
        descricao TEXT NOT NULL,
        tipo VARCHAR(50) NOT NULL,
        lida BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Tabela de procedimentos/consultas
        await pool.query(`
      CREATE TABLE IF NOT EXISTS procedimentos (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        clinica_id INTEGER,
        clinica VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL,
        data_procedimento DATE NOT NULL,
        descricao TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        // Tabela de clínicas/farmácias parceiras
        await pool.query(`
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
      )
    `);

        // Tabela de sessões QR Code (para controle anti-fraude)
        await pool.query(`
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
      )
    `);

        // Tabela de registros de uso (auditoria completa)
        await pool.query(`
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
      )
    `);

        // Índices para melhor performance
        await pool.query('CREATE INDEX IF NOT EXISTS idx_qr_code_sessions_token ON qr_code_sessions(qr_code_token)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_qr_code_sessions_user ON qr_code_sessions(user_id)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_qr_code_sessions_expira ON qr_code_sessions(expira_em)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_registros_uso_user ON registros_uso(user_id)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_registros_uso_clinica ON registros_uso(clinica_id)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_registros_uso_created ON registros_uso(created_at)');
        await pool.query('CREATE INDEX IF NOT EXISTS idx_procedimentos_user ON procedimentos(user_id)');

        console.log('✅ Tabelas criadas com sucesso');
    } catch (error) {
        console.error('❌ Erro ao criar tabelas:', error);
    }
}

module.exports = { pool, createTables };

