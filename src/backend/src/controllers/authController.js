const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar novo usuário
const register = async (req, res) => {
    try {
        const { nome, telefone, senha, confirmar } = req.body;

        // Validações
        if (!nome || !telefone || !senha || !confirmar) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        if (senha !== confirmar) {
            return res.status(400).json({ message: 'As senhas não coincidem' });
        }

        if (senha.length < 6) {
            return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
        }

        // Verificar se telefone já existe
        const userExists = await pool.query(
            'SELECT id FROM users WHERE telefone = $1',
            [telefone]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Este telefone já está registrado' });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Inserir usuário
        const result = await pool.query(
            `INSERT INTO users (nome, telefone, senha) 
       VALUES ($1, $2, $3) 
       RETURNING id, nome, telefone, created_at`,
            [nome, telefone, hashedPassword]
        );

        const user = result.rows[0];

        // Gerar token JWT
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'seu_jwt_secret_super_seguro_aqui',
            { expiresIn: '30d' }
        );

        res.status(201).json({
            message: 'Usuário criado com sucesso',
            user: {
                id: user.id,
                nome: user.nome,
                telefone: user.telefone,
            },
            token,
        });
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { telefone, senha } = req.body;

        if (!telefone || !senha) {
            return res.status(400).json({ message: 'Telefone e senha são obrigatórios' });
        }

        // Buscar usuário
        const result = await pool.query(
            'SELECT id, nome, telefone, senha FROM users WHERE telefone = $1',
            [telefone]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Telefone ou senha inválidos' });
        }

        const user = result.rows[0];

        // Verificar senha
        const validPassword = await bcrypt.compare(senha, user.senha);

        if (!validPassword) {
            return res.status(401).json({ message: 'Telefone ou senha inválidos' });
        }

        // Gerar token JWT
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'seu_jwt_secret_super_seguro_aqui',
            { expiresIn: '30d' }
        );

        res.json({
            message: 'Login realizado com sucesso',
            user: {
                id: user.id,
                nome: user.nome,
                telefone: user.telefone,
            },
            token,
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
    }
};

// Verificar token (usado para validar se usuário está autenticado)
const verifyToken = async (req, res) => {
    try {
        // Se chegou aqui, o middleware já validou o token
        const result = await pool.query(
            'SELECT id, nome, telefone FROM users WHERE id = $1',
            [req.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json({ user: result.rows[0] });
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        res.status(500).json({ message: 'Erro ao verificar token', error: error.message });
    }
};

module.exports = {
    register,
    login,
    verifyToken,
};

