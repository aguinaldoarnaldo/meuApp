const { pool } = require('../config/database');

// Buscar todos os procedimentos do usuário
const getProcedimentos = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `SELECT id, clinica, status, data_procedimento, descricao, created_at 
       FROM procedimentos 
       WHERE user_id = $1 
       ORDER BY data_procedimento DESC, created_at DESC`,
      [userId]
    );

    // Seeding automático se tabela estiver vazia
    if (result.rows.length === 0) {
      const sampleProcedimentos = [
        { clinica: 'Clínica Girassol', status: 'Confirmado', dias_atras: 2, descricao: 'Consulta de Clínica Geral' },
        { clinica: 'Clínica Sagrada Esperança', status: 'Pendente', dias_atras: 0, descricao: 'Exames Laboratoriais' },
        { clinica: 'Mecofarma', status: 'Confirmado', dias_atras: 15, descricao: 'Compra de Medicamentos' }
      ];

      for (const proc of sampleProcedimentos) {
        const dataProc = new Date();
        dataProc.setDate(dataProc.getDate() - proc.dias_atras);
        
        await pool.query(
          'INSERT INTO procedimentos (user_id, clinica, status, data_procedimento, descricao) VALUES ($1, $2, $3, $4, $5)',
          [userId, proc.clinica, proc.status, dataProc, proc.descricao]
        );
      }

      // Buscar novamente
      const seededResult = await pool.query(
        `SELECT id, clinica, status, data_procedimento, descricao, created_at 
         FROM procedimentos 
         WHERE user_id = $1 
         ORDER BY data_procedimento DESC, created_at DESC`,
        [userId]
      );

      const procedimentos = seededResult.rows.map(proc => {
        const dataProc = new Date(proc.data_procedimento);
        const hoje = new Date();
        const diffTime = Math.abs(hoje - dataProc);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
        let tempoRelativo = '';
        if (diffDays === 0) tempoRelativo = 'Hoje';
        else if (diffDays === 1) tempoRelativo = 'Ontem';
        else if (diffDays <= 7) tempoRelativo = `Há ${diffDays} dias`;
        else tempoRelativo = dataProc.toLocaleDateString('pt-PT');
  
        return {
          ...proc,
          data_procedimento_formatada: dataProc.toLocaleDateString('pt-PT'),
          tempo_relativo: tempoRelativo,
        };
      });
      return res.json({ procedimentos });
    }

    // Formatar datas
    const procedimentos = result.rows.map(proc => {
      const dataProc = new Date(proc.data_procedimento);
      const hoje = new Date();
      const diffTime = Math.abs(hoje - dataProc);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let tempoRelativo = '';
      if (diffDays === 0) {
        tempoRelativo = 'Hoje';
      } else if (diffDays === 1) {
        tempoRelativo = 'Ontem';
      } else if (diffDays <= 7) {
        tempoRelativo = `Á ${diffDays} dias`;
      } else {
        tempoRelativo = dataProc.toLocaleDateString('pt-PT');
      }

      return {
        ...proc,
        data_procedimento_formatada: dataProc.toLocaleDateString('pt-PT'),
        tempo_relativo: tempoRelativo,
      };
    });

    res.json({ procedimentos });
  } catch (error) {
    console.error('Erro ao buscar procedimentos:', error);
    res.status(500).json({ message: 'Erro ao buscar procedimentos', error: error.message });
  }
};

// Criar novo procedimento
const createProcedimento = async (req, res) => {
  try {
    const userId = req.userId;
    const { clinica, status, data_procedimento, descricao } = req.body;

    if (!clinica || !status || !data_procedimento) {
      return res.status(400).json({ message: 'Clínica, status e data são obrigatórios' });
    }

    const result = await pool.query(
      `INSERT INTO procedimentos (user_id, clinica, status, data_procedimento, descricao) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, clinica, status, data_procedimento, descricao, created_at`,
      [userId, clinica, status, data_procedimento, descricao || null]
    );

    res.status(201).json({
      message: 'Procedimento criado com sucesso',
      procedimento: result.rows[0],
    });
  } catch (error) {
    console.error('Erro ao criar procedimento:', error);
    res.status(500).json({ message: 'Erro ao criar procedimento', error: error.message });
  }
};

module.exports = {
  getProcedimentos,
  createProcedimento,
};

