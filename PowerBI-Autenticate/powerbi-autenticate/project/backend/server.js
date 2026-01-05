const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();
const Database = require('./database');

const app = express();
const PORT = process.env.PORT || 8000;
const db = new Database();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

// Rota de login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ 
      message: 'Username e password são obrigatórios' 
    });
  }

  // Buscar usuário no banco
  db.getUserByUsername(username, (err, user) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ 
        message: 'Erro interno do servidor' 
      });
    }

    if (!user) {
      return res.status(401).json({ 
        message: 'Credenciais inválidas' 
      });
    }

    // Verificar senha
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'Credenciais inválidas' 
      });
    }

    // Registrar log de acesso
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    db.logAccess(user.id, 'LOGIN_SUCCESS', clientIP, (logErr) => {
      if (logErr) {
        console.error('Erro ao registrar log:', logErr);
      }
    });

    // Gerar JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username 
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  });
});

// Rota de verificação de saúde
app.get('/api/health', (req, res) => {
  res.json({ message: 'API funcionando corretamente' });
});

// Serve SPA in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ 
    message: 'Erro interno do servidor' 
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 API disponível em: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Encerrando servidor...');
  db.close();
  process.exit(0);
});