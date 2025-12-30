const { pool } = require('../config/database');
const crypto = require('crypto');

// Gerar novo QR Code para uso
const generateQRCode = async (req, res) => {
  try {
    const userId = req.userId;
    const { tipo_uso, clinica_id } = req.body; // tipo_uso: 'consulta', 'medicamento', 'exame'

    // Validações
    if (!tipo_uso || !['consulta', 'medicamento', 'exame'].includes(tipo_uso)) {
      return res.status(400).json({ 
        message: 'Tipo de uso inválido. Use: consulta, medicamento ou exame' 
      });
    }

    // Verificar se o usuário tem cartão válido
    const userResult = await pool.query(
      'SELECT id, nome, apolice, validade_cartao FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const user = userResult.rows[0];

    // Verificar validade do cartão
    if (user.validade_cartao) {
      const validade = new Date(user.validade_cartao);
      const hoje = new Date();
      if (validade < hoje) {
        return res.status(400).json({ 
          message: 'Cartão de saúde expirado. Renove sua apólice.' 
        });
      }
    }

    // Gerar token único para o QR Code
    const qrCodeToken = crypto.randomBytes(32).toString('hex');

    // QR Code expira em 15 minutos
    const expiraEm = new Date();
    expiraEm.setMinutes(expiraEm.getMinutes() + 15);

    // Criar sessão de QR Code
    const sessionResult = await pool.query(
      `INSERT INTO qr_code_sessions 
       (user_id, qr_code_token, tipo_uso, clinica_id, expira_em) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, qr_code_token, expira_em, tipo_uso`,
      [userId, qrCodeToken, tipo_uso, clinica_id || null, expiraEm]
    );

    const session = sessionResult.rows[0];

    // Dados para incluir no QR Code
    const qrCodeData = {
      token: session.qr_code_token,
      userId: userId,
      tipoUso: tipo_uso,
      expiraEm: expiraEm.toISOString(),
      apolice: user.apolice,
    };

    res.json({
      message: 'QR Code gerado com sucesso',
      qrCodeToken: session.qr_code_token,
      qrCodeData: JSON.stringify(qrCodeData),
      expiraEm: session.expira_em,
      tipoUso: session.tipo_uso,
    });
  } catch (error) {
    console.error('Erro ao gerar QR Code:', error);
    res.status(500).json({ message: 'Erro ao gerar QR Code', error: error.message });
  }
};

// Validar e usar QR Code (chamado pela clínica/farmácia)
const validateQRCode = async (req, res) => {
  try {
    const { qr_code_token } = req.body;
    const clinicaId = req.clinicaId || req.body.clinica_id; // Se houver middleware de autenticação de clínica

    if (!qr_code_token) {
      return res.status(400).json({ message: 'Token do QR Code é obrigatório' });
    }

    // Buscar sessão do QR Code
    const sessionResult = await pool.query(
      `SELECT qs.*, u.nome, u.apolice, u.validade_cartao 
       FROM qr_code_sessions qs
       JOIN users u ON qs.user_id = u.id
       WHERE qs.qr_code_token = $1`,
      [qr_code_token]
    );

    if (sessionResult.rows.length === 0) {
      return res.status(404).json({ 
        message: 'QR Code inválido ou não encontrado',
        status: 'invalido'
      });
    }

    const session = sessionResult.rows[0];

    // Validar expiração
    const agora = new Date();
    const expiraEm = new Date(session.expira_em);

    if (expiraEm < agora) {
      // Marcar como expirado
      await pool.query(
        'UPDATE qr_code_sessions SET invalidado = TRUE, motivo_invalidacao = $1 WHERE id = $2',
        ['QR Code expirado', session.id]
      );

      return res.status(400).json({ 
        message: 'QR Code expirado',
        status: 'expirado'
      });
    }

    // Verificar se já foi usado
    if (session.usado) {
      return res.status(400).json({ 
        message: 'QR Code já foi utilizado',
        status: 'usado',
        usadoEm: session.usado_em,
        usadoPor: session.usado_por_clinica_id
      });
    }

    // Verificar se foi invalidado
    if (session.invalidado) {
      return res.status(400).json({ 
        message: 'QR Code foi invalidado',
        status: 'invalidado',
        motivo: session.motivo_invalidacao
      });
    }

    // Verificar validade do cartão
    if (session.validade_cartao) {
      const validade = new Date(session.validade_cartao);
      if (validade < agora) {
        await pool.query(
          'UPDATE qr_code_sessions SET invalidado = TRUE, motivo_invalidacao = $1 WHERE id = $2',
          ['Cartão do usuário expirado', session.id]
        );

        return res.status(400).json({ 
          message: 'Cartão de saúde do usuário está expirado',
          status: 'cartao_expirado'
        });
      }
    }

    // Buscar informações da clínica se fornecido
    let clinicaNome = 'Clínica Parceira';
    if (clinicaId) {
      const clinicaResult = await pool.query(
        'SELECT nome FROM clinicas WHERE id = $1 AND ativo = TRUE',
        [clinicaId]
      );
      if (clinicaResult.rows.length > 0) {
        clinicaNome = clinicaResult.rows[0].nome;
      }
    }

    // Marcar QR Code como usado
    await pool.query(
      `UPDATE qr_code_sessions 
       SET usado = TRUE, usado_em = CURRENT_TIMESTAMP, usado_por_clinica_id = $1
       WHERE id = $2`,
      [clinicaId || null, session.id]
    );

    // Criar registro de uso
    const registroResult = await pool.query(
      `INSERT INTO registros_uso 
       (user_id, qr_code_session_id, clinica_id, tipo_uso, status, dados_geograficos) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id`,
      [
        session.user_id,
        session.id,
        clinicaId || null,
        session.tipo_uso,
        'confirmado',
        JSON.stringify({ timestamp: agora.toISOString() })
      ]
    );

    // Criar procedimento automaticamente
    await pool.query(
      `INSERT INTO procedimentos (user_id, clinica_id, clinica, status, data_procedimento, descricao)
       VALUES ($1, $2, $3, $4, CURRENT_DATE, $5)`,
      [
        session.user_id,
        clinicaId || null,
        clinicaNome,
        'Confirmado',
        `Uso do cartão - ${session.tipo_uso}`
      ]
    );

    res.json({
      message: 'QR Code validado e processado com sucesso',
      status: 'valido',
      usuario: {
        nome: session.nome,
        apolice: session.apolice,
      },
      tipoUso: session.tipo_uso,
      registroId: registroResult.rows[0].id,
    });
  } catch (error) {
    console.error('Erro ao validar QR Code:', error);
    res.status(500).json({ message: 'Erro ao validar QR Code', error: error.message });
  }
};

// Invalidar QR Code (por exemplo, se o usuário cancelar)
const invalidateQRCode = async (req, res) => {
  try {
    const userId = req.userId;
    const { qr_code_token } = req.body;

    const result = await pool.query(
      `UPDATE qr_code_sessions 
       SET invalidado = TRUE, motivo_invalidacao = $1 
       WHERE qr_code_token = $2 AND user_id = $3 AND usado = FALSE
       RETURNING id`,
      ['Cancelado pelo usuário', qr_code_token, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'QR Code não encontrado ou já utilizado' });
    }

    res.json({ message: 'QR Code invalidado com sucesso' });
  } catch (error) {
    console.error('Erro ao invalidar QR Code:', error);
    res.status(500).json({ message: 'Erro ao invalidar QR Code', error: error.message });
  }
};

// Buscar histórico de QR Codes do usuário
const getQRCodeHistory = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `SELECT qs.*, c.nome as clinica_nome, ru.status as registro_status
       FROM qr_code_sessions qs
       LEFT JOIN clinicas c ON qs.usado_por_clinica_id = c.id
       LEFT JOIN registros_uso ru ON ru.qr_code_session_id = qs.id
       WHERE qs.user_id = $1
       ORDER BY qs.created_at DESC
       LIMIT 50`,
      [userId]
    );

    const historico = result.rows.map(row => ({
      id: row.id,
      tipoUso: row.tipo_uso,
      token: row.qr_code_token.substring(0, 8) + '...', // Mostrar apenas parte do token
      expiraEm: row.expira_em,
      usado: row.usado,
      usadoEm: row.usado_em,
      clinica: row.clinica_nome,
      status: row.registro_status || (row.usado ? 'usado' : 'pendente'),
      invalidado: row.invalidado,
    }));

    res.json({ historico });
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).json({ message: 'Erro ao buscar histórico', error: error.message });
  }
};

module.exports = {
  generateQRCode,
  validateQRCode,
  invalidateQRCode,
  getQRCodeHistory,
};

