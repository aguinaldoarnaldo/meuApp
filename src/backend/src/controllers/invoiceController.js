const { pool } = require('../config/database');

// Listar faturas do usuário
const getMyInvoices = async (req, res) => {
    try {
        const userId = req.userId;

        // Verificar se usuário tem faturas, se não, criar dados de exemplo (SEED)
        const check = await pool.query('SELECT COUNT(*) FROM invoices WHERE user_id = $1', [userId]);
        
        if (parseInt(check.rows[0].count) === 0) {
            await seedInvoicesForUser(userId);
        }

        // Buscar faturas ordenadas (Pendentes primeiro, depois por data)
        const result = await pool.query(`
            SELECT *,
            CASE 
                WHEN status = 'atrasado' THEN 1
                WHEN status = 'pendente' THEN 2
                ELSE 3 
            END as prioridade
            FROM invoices 
            WHERE user_id = $1 
            ORDER BY prioridade ASC, data_vencimento DESC
        `, [userId]);

        res.json({ invoices: result.rows });
    } catch (error) {
        console.error('Erro ao buscar faturas:', error);
        res.status(500).json({ message: 'Erro ao carregar faturas' });
    }
};

// Função auxiliar para criar dados falsos
async function seedInvoicesForUser(userId) {
    const hoje = new Date();
    
    // 1. Fatura Pendente (Mês Atual)
    const vencimentoAtual = new Date(hoje.getFullYear(), hoje.getMonth(), 25);
    
    // 2. Fatura Atrasada (Mês Passado)
    const vencimentoPassado = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 25);

    // 3. Faturas Pagas (2 anteriores)
    const pag1 = new Date(hoje.getFullYear(), hoje.getMonth() - 2, 25);
    const pag2 = new Date(hoje.getFullYear(), hoje.getMonth() - 3, 25);

    const faturas = [
        {
            ref: `REF-${hoje.getFullYear()}${hoje.getMonth() + 1}-001`,
            desc: `Mensalidade Seguro Saúde - ${getMonthName(hoje.getMonth())}`,
            valor: 15000.00,
            vencimento: vencimentoAtual,
            status: 'pendente',
            data_pagamento: null
        },
        {
            ref: `REF-${hoje.getFullYear()}${hoje.getMonth()}-002`,
            desc: `Mensalidade Seguro Saúde - ${getMonthName(hoje.getMonth() - 1)}`,
            valor: 15000.00,
            vencimento: vencimentoPassado,
            status: 'atrasado', // Simulando atraso
            data_pagamento: null
        },
        {
            ref: `REF-${hoje.getFullYear()}${hoje.getMonth() - 1}-003`,
            desc: `Mensalidade Seguro Saúde - ${getMonthName(hoje.getMonth() - 2)}`,
            valor: 15000.00,
            vencimento: pag1,
            status: 'pago',
            data_pagamento: pag1
        },
        {
            ref: `REF-${hoje.getFullYear()}${hoje.getMonth() - 2}-004`,
            desc: `Mensalidade Seguro Saúde - ${getMonthName(hoje.getMonth() - 3)}`,
            valor: 15000.00,
            vencimento: pag2,
            status: 'pago',
            data_pagamento: pag2
        }
    ];

    for (const fat of faturas) {
        await pool.query(`
            INSERT INTO invoices (user_id, referencia, descricao, valor, data_vencimento, status, data_pagamento)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [userId, fat.ref, fat.desc, fat.valor, fat.vencimento, fat.status, fat.data_pagamento]);
    }
}

function getMonthName(monthIndex) {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    // Ajuste para índices negativos (ano anterior)
    let idx = monthIndex;
    while (idx < 0) idx += 12;
    return months[idx];
}

module.exports = { getMyInvoices };
