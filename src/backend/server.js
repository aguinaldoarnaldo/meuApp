const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createTables } = require('./src/config/database');

// Importar rotas
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const procedimentoRoutes = require('./src/routes/procedimentoRoutes');
const qrcodeRoutes = require('./src/routes/qrcodeRoutes');
const clinicaRoutes = require('./src/routes/clinicaRoutes');
const auditoriaRoutes = require('./src/routes/auditoriaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/procedimentos', procedimentoRoutes);
app.use('/api/qrcode', qrcodeRoutes);
app.use('/api/clinicas', clinicaRoutes);
app.use('/api/auditoria', auditoriaRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API do meuApp está funcionando!' });
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Inicializar servidor
async function startServer() {
  try {
    // Criar tabelas se não existirem
    await createTables();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📍 URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();

