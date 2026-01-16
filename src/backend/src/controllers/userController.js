const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

// Buscar perfil do usuário
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `SELECT id, nome, telefone, bi, data_nascimento, genero, nacionalidade, 
       provincia, municipio, morada, email, apolice, validade_cartao, img
       FROM users WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const user = result.rows[0];

    // Formatar data de nascimento
    if (user.data_nascimento) {
      const date = new Date(user.data_nascimento);
      user.data_nascimento_formatada = date.toLocaleDateString('pt-PT');
    }

    // Formatar validade do cartão
    if (user.validade_cartao) {
      const date = new Date(user.validade_cartao);
      user.validade_cartao_formatada = date.toLocaleDateString('pt-PT', {
        month: '2-digit',
        year: '2-digit'
      });
    }

    res.json({ user });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ message: 'Erro ao buscar perfil', error: error.message });
  }
};

// Validar BI e buscar dados da seguradora
const validateBI = async (req, res) => {
  try {
    const { bi } = req.body;

    if (!bi) {
      return res.status(400).json({ message: 'Número de BI é obrigatório' });
    }

    // Buscar dados do cliente pelo BI na base de dados da seguradora
    // NOTA: Este é um exemplo. Você precisará ajustar para buscar na base real da seguradora
    // Pode ser outra tabela, API externa, etc.

    // Por enquanto, vamos buscar em uma tabela de clientes da seguradora
    // Se não existir, vamos criar uma consulta que busca na tabela users atual
    // mas idealmente deve haver uma tabela separada com dados da seguradora

    // Tentar buscar primeiro na tabela de clientes da seguradora (se existir)
    let seguradoraResult;
    try {
      seguradoraResult = await pool.query(
        `SELECT bi, nome, data_nascimento, genero, nacionalidade, provincia, 
         municipio, morada, email, img 
         FROM clientes_seguradora 
         WHERE bi = $1`,
        [bi]
      );
    } catch (err) {
      // Se a tabela não existir, buscar na tabela users
      seguradoraResult = await pool.query(
        `SELECT bi, nome, data_nascimento, genero, nacionalidade, provincia, 
         municipio, morada, email, img 
         FROM users 
         WHERE bi = $1`,
        [bi]
      );
    }

    if (seguradoraResult.rows.length === 0) {
      return res.status(404).json({
        message: 'BI não encontrado na base de dados da seguradora',
        encontrado: false
      });
    }

    const dadosCliente = seguradoraResult.rows[0];

    res.json({
      message: 'BI encontrado com sucesso',
      encontrado: true,
      dados: {
        bi: dadosCliente.bi,
        nome: dadosCliente.nome,
        data_nascimento: dadosCliente.data_nascimento,
        genero: dadosCliente.genero,
        nacionalidade: dadosCliente.nacionalidade,
        provincia: dadosCliente.provincia,
        municipio: dadosCliente.municipio,
        morada: dadosCliente.morada,
        email: dadosCliente.email,
        img: dadosCliente.img, // URL ou base64 da imagem
      }
    });
  } catch (error) {
    console.error('Erro ao validar BI:', error);
    res.status(500).json({ message: 'Erro ao validar BI', error: error.message });
  }
};

// Atualizar perfil do usuário
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      nome, bi, data_nascimento, genero, nacionalidade,
      provincia, municipio, morada, email, img
    } = req.body;

    // Usar COALESCE apenas para campos opcionais, garantindo que valores válidos sejam atualizados
    const result = await pool.query(
      `UPDATE users 
       SET nome = COALESCE(NULLIF($1, ''), nome),
           bi = COALESCE(NULLIF($2, ''), bi),
           data_nascimento = CASE WHEN $3 IS NOT NULL AND $3 != '' THEN $3::DATE ELSE data_nascimento END,
           genero = COALESCE(NULLIF($4, ''), genero),
           nacionalidade = COALESCE(NULLIF($5, ''), nacionalidade),
           provincia = COALESCE(NULLIF($6, ''), provincia),
           municipio = COALESCE(NULLIF($7, ''), municipio),
           morada = COALESCE(NULLIF($8, ''), morada),
           email = COALESCE(NULLIF($9, ''), email),
           img = CASE WHEN $10 IS NOT NULL THEN $10 ELSE img END,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $11
       RETURNING id, nome, telefone, bi, data_nascimento, genero, nacionalidade, 
                 provincia, municipio, morada, email, img`,
      [nome, bi, data_nascimento, genero, nacionalidade, provincia, municipio, morada, email, img, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ message: 'Perfil atualizado com sucesso', user: result.rows[0] });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ message: 'Erro ao atualizar perfil', error: error.message });
  }
};

// Alterar senha
const changePassword = async (req, res) => {
  try {
    const userId = req.userId;
    const { senha_atual, nova_senha, confirmar_senha } = req.body;

    if (!senha_atual || !nova_senha || !confirmar_senha) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    if (nova_senha !== confirmar_senha) {
      return res.status(400).json({ message: 'As novas senhas não coincidem' });
    }

    if (nova_senha.length < 6) {
      return res.status(400).json({ message: 'A nova senha deve ter pelo menos 6 caracteres' });
    }

    // Buscar senha atual
    const userResult = await pool.query('SELECT senha FROM users WHERE id = $1', [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const user = userResult.rows[0];

    // Verificar senha atual
    const validPassword = await bcrypt.compare(senha_atual, user.senha);

    if (!validPassword) {
      return res.status(401).json({ message: 'Senha atual incorreta' });
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(nova_senha, 10);

    // Atualizar senha
    await pool.query(
      'UPDATE users SET senha = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [hashedPassword, userId]
    );

    res.json({ message: 'Senha alterada com sucesso' });
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({ message: 'Erro ao alterar senha', error: error.message });
  }
};

// Buscar dados do cartão de saúde (para HomeScreen)
const getHealthCard = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `SELECT nome, data_nascimento, apolice, validade_cartao 
       FROM users WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const user = result.rows[0];

    // SEED: Se não tiver apólice ou data de nascimento, atualizar com dados dummy
    let updated = false;
    let newApolice = user.apolice;
    let newValidade = user.validade_cartao;
    let newNascimento = user.data_nascimento;

    if (!user.apolice) {
        newApolice = '2025' + Math.floor(1000 + Math.random() * 9000); // 2025XXXX
        updated = true;
    }

    if (!user.validade_cartao) {
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        newValidade = nextYear;
        updated = true;
    }

    if (!user.data_nascimento) {
        // Data aleatoria entre 1980 e 2000
        const randomYear = 1980 + Math.floor(Math.random() * 20);
        newNascimento = new Date(`${randomYear}-01-15`);
        updated = true;
    }

    if (updated) {
        await pool.query(
            `UPDATE users 
             SET apolice = $1, validade_cartao = $2, data_nascimento = $3
             WHERE id = $4`,
            [newApolice, newValidade, newNascimento, userId]
        );
        // Atualizar objeto local
        user.apolice = newApolice;
        user.validade_cartao = newValidade;
        user.data_nascimento = newNascimento;
    }

    // Formatar datas
    let dataNascimentoFormatada = null;
    if (user.data_nascimento) {
      const date = new Date(user.data_nascimento);
      dataNascimentoFormatada = date.toLocaleDateString('pt-PT');
    }

    let validadeFormatada = null;
    if (user.validade_cartao) {
      const date = new Date(user.validade_cartao);
      validadeFormatada = date.toLocaleDateString('pt-PT', {
        month: '2-digit',
        year: '2-digit'
      });
    }

    res.json({
      nome: user.nome,
      data_nascimento: dataNascimentoFormatada,
      apolice: user.apolice,
      validade: validadeFormatada,
    });
  } catch (error) {
    console.error('Erro ao buscar cartão de saúde:', error);
    res.status(500).json({ message: 'Erro ao buscar cartão de saúde', error: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  getHealthCard,
  validateBI,
};
