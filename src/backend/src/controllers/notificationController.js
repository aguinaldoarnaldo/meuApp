const { pool } = require('../config/database');

// Buscar todas as notificações do usuário
const getNotifications = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `SELECT id, titulo, descricao, tipo, lida, created_at 
       FROM notifications 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [userId]
    );

    // Seeding automático se estiver vazio
    if (result.rows.length === 0) {
      const sampleNotifications = [
        { titulo: 'Bem-vindo ao SeguroGPS', descricao: 'Sua conta foi ativada com sucesso.', tipo: 'info' },
        { titulo: 'Pagamento Confirmado', descricao: 'Sua mensalidade de Janeiro foi processada.', tipo: 'success' },
        { titulo: 'Agende sua Consulta', descricao: 'Não se esqueça de agendar seu check-up anual.', tipo: 'warning' },
        { titulo: 'Nova Clínica Parceira', descricao: 'A Clínica Girassol agora atende SeguroGPS.', tipo: 'info' }
      ];

      for (const notif of sampleNotifications) {
        await pool.query(
          'INSERT INTO notifications (user_id, titulo, descricao, tipo, created_at) VALUES ($1, $2, $3, $4, NOW())',
          [userId, notif.titulo, notif.descricao, notif.tipo]
        );
      }

      // Buscar novamente
      const seededResult = await pool.query(
        `SELECT id, titulo, descricao, tipo, lida, created_at 
         FROM notifications 
         WHERE user_id = $1 
         ORDER BY created_at DESC`,
        [userId]
      );
      
      const notifications = seededResult.rows.map(notif => ({
        ...notif,
        created_at: new Date(notif.created_at).toLocaleDateString('pt-PT', {
          day: '2-digit', month: '2-digit', year: 'numeric'
        }),
      }));
      return res.json({ notifications });
    }

    // Formatar datas
    const notifications = result.rows.map(notif => ({
      ...notif,
      created_at: new Date(notif.created_at).toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
    }));

    res.json({ notifications });
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    res.status(500).json({ message: 'Erro ao buscar notificações', error: error.message });
  }
};

// Marcar notificação como lida
const markAsRead = async (req, res) => {
  try {
    const userId = req.userId;
    const { notificationId } = req.params;

    const result = await pool.query(
      `UPDATE notifications 
       SET lida = TRUE 
       WHERE id = $1 AND user_id = $2 
       RETURNING id`,
      [notificationId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Notificação não encontrada' });
    }

    res.json({ message: 'Notificação marcada como lida' });
  } catch (error) {
    console.error('Erro ao marcar notificação como lida:', error);
    res.status(500).json({ message: 'Erro ao marcar notificação como lida', error: error.message });
  }
};

// Deletar notificação
const deleteNotification = async (req, res) => {
  try {
    const userId = req.userId;
    const { notificationId } = req.params;

    const result = await pool.query(
      'DELETE FROM notifications WHERE id = $1 AND user_id = $2 RETURNING id',
      [notificationId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Notificação não encontrada' });
    }

    res.json({ message: 'Notificação deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar notificação:', error);
    res.status(500).json({ message: 'Erro ao deletar notificação', error: error.message });
  }
};

// Deletar todas as notificações
const deleteAllNotifications = async (req, res) => {
  try {
    const userId = req.userId;

    await pool.query('DELETE FROM notifications WHERE user_id = $1', [userId]);

    res.json({ message: 'Todas as notificações foram deletadas' });
  } catch (error) {
    console.error('Erro ao deletar todas as notificações:', error);
    res.status(500).json({ message: 'Erro ao deletar notificações', error: error.message });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  deleteNotification,
  deleteAllNotifications,
};

