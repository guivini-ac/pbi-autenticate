#!/usr/bin/env node

const { Command } = require('commander');
const bcrypt = require('bcryptjs');
const Database = require('./database');

const program = new Command();
const db = new Database();

program
  .name('powerbi-cli')
  .description('CLI para administração do Portal Power BI')
  .version('1.0.0');

// Comando para criar usuário
program
  .command('create-user <username> <password>')
  .description('Criar um novo usuário no sistema')
  .action((username, password) => {
    console.log(`\n🔐 Criando usuário: ${username}`);
    
    // Criptografar senha
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    // Criar usuário
    db.createUser(username, hashedPassword, function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          console.error(`❌ Erro: Usuário '${username}' já existe`);
        } else {
          console.error('❌ Erro ao criar usuário:', err.message);
        }
      } else {
        console.log(`✅ Usuário '${username}' criado com sucesso (ID: ${this.lastID})`);
      }
      db.close();
    });
  });

// Comando para visualizar logs
program
  .command('view-logs')
  .description('Visualizar logs de acesso do sistema')
  .option('-l, --limit <number>', 'número de logs para exibir', '10')
  .action((options) => {
    const limit = parseInt(options.limit) || 10;
    console.log(`\n📋 Últimos ${limit} logs de acesso:\n`);
    
    db.getAccessLogs(limit, (err, logs) => {
      if (err) {
        console.error('❌ Erro ao buscar logs:', err.message);
        db.close();
        return;
      }

      if (logs.length === 0) {
        console.log('📝 Nenhum log encontrado');
        db.close();
        return;
      }

      // Exibir logs em formato de tabela
      console.table(logs.map(log => ({
        ID: log.id,
        Usuario: log.username,
        Acao: log.action,
        IP: log.ip_address,
        Data: new Date(log.timestamp).toLocaleString('pt-BR')
      })));

      db.close();
    });
  });

// Comando para listar usuários
program
  .command('list-users')
  .description('Listar todos os usuários cadastrados')
  .action(() => {
    console.log('\n👥 Lista de usuários cadastrados:\n');
    
    db.getAllUsers((err, users) => {
      if (err) {
        console.error('❌ Erro ao buscar usuários:', err.message);
        db.close();
        return;
      }

      if (users.length === 0) {
        console.log('👤 Nenhum usuário encontrado');
        db.close();
        return;
      }

      // Exibir usuários em formato de tabela
      console.table(users.map(user => ({
        ID: user.id,
        Usuario: user.username,
        'Data Criacao': new Date(user.created_at).toLocaleString('pt-BR')
      })));

      db.close();
    });
  });

// Comando para deletar usuário
program
  .command('delete-user <username>')
  .description('Deletar um usuário do sistema')
  .action((username) => {
    console.log(`\n🗑️  Deletando usuário: ${username}`);
    
    db.deleteUser(username, function(err, changes) {
      if (err) {
        console.error('❌ Erro ao deletar usuário:', err.message);
      } else if (changes === 0) {
        console.error(`❌ Usuário '${username}' não encontrado`);
      } else {
        console.log(`✅ Usuário '${username}' deletado com sucesso`);
      }
      db.close();
    });
  });

// Tratamento de erro para comandos inválidos
program.on('command:*', () => {
  console.error('❌ Comando inválido: %s\nVeja --help para comandos disponíveis.', program.args.join(' '));
  process.exit(1);
});

// Parse dos argumentos
program.parse(process.argv);

// Se nenhum comando foi passado, mostrar help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}