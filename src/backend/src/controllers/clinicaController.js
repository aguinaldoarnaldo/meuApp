const { pool } = require('../config/database');

// Listar todas as clínicas/farmácias parceiras
const getClinicas = async (req, res) => {
  try {
    const { tipo, ativo } = req.query;

    let query = 'SELECT id, nome, tipo, endereco, telefone, email, codigo_parceiro FROM clinicas WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    if (tipo) {
      query += ` AND tipo = $${paramIndex}`;
      params.push(tipo);
      paramIndex++;
    }

    if (ativo !== undefined) {
      query += ` AND ativo = $${paramIndex}`;
      params.push(ativo === 'true');
      paramIndex++;
    } else {
      query += ' AND ativo = TRUE';
    }

    query += ' ORDER BY nome';

    const result = await pool.query(query, params);

    res.json({ clinicas: result.rows });
  } catch (error) {
    console.error('Erro ao buscar clínicas:', error);
    res.status(500).json({ message: 'Erro ao buscar clínicas', error: error.message });
  }
};

// Buscar clínica por ID
const getClinicaById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM clinicas WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Clínica não encontrada' });
    }

    res.json({ clinica: result.rows[0] });
  } catch (error) {
    console.error('Erro ao buscar clínica:', error);
    res.status(500).json({ message: 'Erro ao buscar clínica', error: error.message });
  }
};

// Criar nova clínica (admin)
const createClinica = async (req, res) => {
  try {
    const { nome, tipo, endereco, telefone, email, codigo_parceiro } = req.body;

    if (!nome || !tipo || !codigo_parceiro) {
      return res.status(400).json({ 
        message: 'Nome, tipo e código parceiro são obrigatórios' 
      });
    }

    if (!['clinica', 'farmacia'].includes(tipo)) {
      return res.status(400).json({ 
        message: 'Tipo deve ser "clinica" ou "farmacia"' 
      });
    }

    const result = await pool.query(
      `INSERT INTO clinicas (nome, tipo, endereco, telefone, email, codigo_parceiro)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, nome, tipo, codigo_parceiro`,
      [nome, tipo, endereco || null, telefone || null, email || null, codigo_parceiro]
    );

    res.status(201).json({
      message: 'Clínica criada com sucesso',
      clinica: result.rows[0],
    });
  } catch (error) {
    if (error.code === '23505') { // Unique violation
      return res.status(400).json({ message: 'Código parceiro já existe' });
    }
    console.error('Erro ao criar clínica:', error);
    res.status(500).json({ message: 'Erro ao criar clínica', error: error.message });
  }
};

module.exports = {
  getClinicas,
  getClinicaById,
  createClinica,
};

