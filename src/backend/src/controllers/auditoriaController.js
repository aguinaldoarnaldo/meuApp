const { pool } = require('../config/database');

// Buscar histórico completo de uso do usuário (auditoria)
const getAuditoriaUsuario = async (req, res) => {
  try {
    const userId = req.userId;
    const { limite = 100, offset = 0 } = req.query;

    const result = await pool.query(
      `SELECT 
        ru.id,
        ru.tipo_uso,
        ru.descricao,
        ru.valor,
        ru.status,
        ru.created_at as data_uso,
        c.nome as clinica_nome,
        c.tipo as clinica_tipo,
        qs.qr_code_token,
        qs.usado_em,
        qs.expira_em
       FROM registros_uso ru
       LEFT JOIN clinicas c ON ru.clinica_id = c.id
       LEFT JOIN qr_code_sessions qs ON ru.qr_code_session_id = qs.id
       WHERE ru.user_id = $1
       ORDER BY ru.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, parseInt(limite), parseInt(offset)]
    );

    // Contar total
    const countResult = await pool.query(
      'SELECT COUNT(*) as total FROM registros_uso WHERE user_id = $1',
      [userId]
    );

    res.json({
      registros: result.rows,
      total: parseInt(countResult.rows[0].total),
      limite: parseInt(limite),
      offset: parseInt(offset),
    });
  } catch (error) {
    console.error('Erro ao buscar auditoria:', error);
    res.status(500).json({ message: 'Erro ao buscar auditoria', error: error.message });
  }
};

// Buscar registros suspeitos (para administradores)
const getRegistrosSuspeitos = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        ru.*,
        u.nome as usuario_nome,
        u.telefone as usuario_telefone,
        u.apolice,
        c.nome as clinica_nome
       FROM registros_uso ru
       JOIN users u ON ru.user_id = u.id
       LEFT JOIN clinicas c ON ru.clinica_id = c.id
       WHERE ru.status = 'suspeito'
       ORDER BY ru.created_at DESC
       LIMIT 50`
    );

    res.json({ registros: result.rows });
  } catch (error) {
    console.error('Erro ao buscar registros suspeitos:', error);
    res.status(500).json({ message: 'Erro ao buscar registros suspeitos', error: error.message });
  }
};

module.exports = {
  getAuditoriaUsuario,
  getRegistrosSuspeitos,
};

