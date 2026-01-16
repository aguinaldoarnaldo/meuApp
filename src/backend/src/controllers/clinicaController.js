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

    // Seeding automático se tabela estiver vazia (apenas se não houver filtros específicos)
    if (result.rows.length === 0 && !tipo && ativo === undefined) {
      const count = await pool.query('SELECT COUNT(*) FROM clinicas');
      if (parseInt(count.rows[0].count) === 0) {
        const sampleClinicas = [
          { nome: 'Clínica Girassol', tipo: 'clinica', endereco: 'Luanda, Morro Bento', codigo: 'CL001', telefone: '923000001' },
          { nome: 'Clínica Sagrada Esperança', tipo: 'clinica', endereco: 'Luanda, Ilha do Cabo', codigo: 'CL002', telefone: '923000002' },
          { nome: 'Clínica Multiperfil', tipo: 'clinica', endereco: 'Luanda, Alvalade', codigo: 'CL003', telefone: '923000003' },
          { nome: 'Farmácia de Angola', tipo: 'farmacia', endereco: 'Luanda, Talatona', codigo: 'FA001', telefone: '923000004' },
          { nome: 'Mecofarma', tipo: 'farmacia', endereco: 'Viana, Estrada Direta', codigo: 'FA002', telefone: '923000005' },
          { nome: 'Centro Médico da Paz', tipo: 'clinica', endereco: 'Benguela, Centro', codigo: 'CL004', telefone: '923000006' }
        ];

        for (const item of sampleClinicas) {
          await pool.query(
            'INSERT INTO clinicas (nome, tipo, endereco, codigo_parceiro, telefone, ativo) VALUES ($1, $2, $3, $4, $5, TRUE)',
            [item.nome, item.tipo, item.endereco, item.codigo, item.telefone]
          );
        }
        
        // Buscar novamente após seed
        const seededResult = await pool.query('SELECT id, nome, tipo, endereco, telefone, email, codigo_parceiro FROM clinicas ORDER BY nome');
        return res.json({ clinicas: seededResult.rows });
      }
    }

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

