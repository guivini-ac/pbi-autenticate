const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'database.db');

class Database {
  constructor() {
    this.db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
      } else {
        console.log('Conectado ao banco SQLite com sucesso');
        this.initTables();
      }
    });
  }

  initTables() {
    // Criar tabela users
    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar tabela users:', err);
      } else {
        this.createDefaultUser();
      }
    });

    // Criar tabela access_logs
    this.db.run(`
      CREATE TABLE IF NOT EXISTS access_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        action TEXT NOT NULL,
        ip_address TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar tabela access_logs:', err);
      }
    });
  }

  createDefaultUser() {
    // Verificar se já existe usuário admin
    this.db.get('SELECT * FROM users WHERE username = ?', ['admin'], (err, row) => {
      if (err) {
        console.error('Erro ao verificar usuário admin:', err);
        return;
      }

      if (!row) {
        // Criar usuário admin padrão
        const hashedPassword = bcrypt.hashSync('senha123', 10);
        this.db.run(
          'INSERT INTO users (username, password) VALUES (?, ?)',
          ['admin', hashedPassword],
          (err) => {
            if (err) {
              console.error('Erro ao criar usuário admin:', err);
            } else {
              console.log('Usuário admin criado com sucesso (username: admin, password: senha123)');
            }
          }
        );
      }
    });
  }

  // Método para buscar usuário por username
  getUserByUsername(username, callback) {
    this.db.get('SELECT * FROM users WHERE username = ?', [username], callback);
  }

  // Método para criar novo usuário
  createUser(username, hashedPassword, callback) {
    this.db.run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      callback
    );
  }

  // Método para registrar log de acesso
  logAccess(userId, action, ipAddress, callback) {
    this.db.run(
      'INSERT INTO access_logs (user_id, action, ip_address) VALUES (?, ?, ?)',
      [userId, action, ipAddress],
      callback
    );
  }

  // Método para buscar logs com join
  getAccessLogs(limit, callback) {
    const query = `
      SELECT 
        al.id,
        u.username,
        al.action,
        al.ip_address,
        al.timestamp
      FROM access_logs al
      JOIN users u ON al.user_id = u.id
      ORDER BY al.timestamp DESC
      LIMIT ?
    `;
    this.db.all(query, [limit], callback);
  }

  // Método para listar todos os usuários
  getAllUsers(callback) {
    this.db.all('SELECT id, username, created_at FROM users ORDER BY created_at DESC', callback);
  }

  // Método para deletar um usuário
  deleteUser(username, callback) {
    this.db.run(
      'DELETE FROM users WHERE username = ?',
      [username],
      function(err) {
        if (callback) {
          callback(err, this.changes);
        }
      }
    );
  }

  // Método para fechar conexão
  close() {
    this.db.close();
  }
}

module.exports = Database;