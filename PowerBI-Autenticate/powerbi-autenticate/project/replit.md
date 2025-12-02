# Portal de Autenticação Power BI - Replit

## Visão Geral
Portal web full-stack para acesso seguro a relatórios Power BI com autenticação local usando SQLite.

## Estado Atual
- ✅ Frontend React + Vite rodando na porta 5000
- ✅ Backend Node.js/Express rodando na porta 8000
- ✅ Autenticação local com SQLite
- ✅ Usuário admin padrão criado

## Arquitetura

### Frontend (Porta 5000)
- **Framework**: React 18 + Vite + TypeScript
- **UI**: Material-UI (MUI) + TailwindCSS
- **Roteamento**: React Router DOM
- **Estado**: Context API para autenticação
- **HTTP Client**: Axios

### Backend (Porta 8000)
- **Framework**: Express.js
- **Banco de Dados**: SQLite
- **Autenticação**: JWT (8h de expiração)
- **Segurança**: bcryptjs para senhas

## Estrutura do Projeto

```
project/
├── src/                      # Frontend React
│   ├── components/          # Componentes React
│   │   ├── LoginPage.jsx   # Página de login
│   │   ├── ReportPage.jsx  # Página do relatório Power BI
│   │   └── PrivateRoute.jsx # Proteção de rotas
│   ├── context/            # Gerenciamento de estado
│   │   └── AuthContext.tsx # Contexto de autenticação
│   ├── lib/                # Bibliotecas
│   │   └── api.ts          # Cliente API axios
│   └── App.tsx             # Componente principal
├── backend/                 # Backend Node.js
│   ├── server.js           # Servidor Express
│   ├── database.js         # Configuração SQLite
│   ├── cli.js             # CLI administrativa
│   ├── .env               # Variáveis de ambiente
│   └── database.db        # Banco SQLite (gerado automaticamente)
├── vite.config.ts          # Configuração Vite
└── package.json            # Dependências

```

## Mudanças Recentes (Nov 17, 2025)

### Migração de Supabase para SQLite Local
- ❌ Removido: Supabase Auth e dependências
- ✅ Adicionado: Backend Express local com SQLite
- ✅ Atualizado: AuthContext para usar API local
- ✅ Configurado: Vite para Replit (porta 5000, host 0.0.0.0)

## Configuração Replit

### Workflows
- **frontend**: `cd project && npm run dev` (porta 5000, webview)
- **backend**: `cd project/backend && npm start` (porta 8000, console)

### Proxy Vite
O frontend usa proxy Vite para comunicar com o backend:
- Requisições para `/api` são redirecionadas para `http://localhost:8000`
- Isso resolve problemas de CORS e portas diferentes no Replit

### Variáveis de Ambiente
Backend (.env):
- `JWT_SECRET`: Chave secreta para tokens JWT
- `PORT`: 8000

### Deployment
Para publicar a aplicação:
1. Use o botão "Deploy" no Replit
2. Tipo: VM (mantém estado do servidor)
3. Comando: `bash -c "cd project/backend && npm start & cd project && npm run dev & wait"`
4. Isso inicia ambos os servidores simultaneamente

## Credenciais Padrão

**Usuário**: admin  
**Senha**: senha123

## Como Usar

### Fazer Login
1. Acesse a aplicação
2. Use as credenciais padrão (admin/senha123)
3. Você será redirecionado para a página do relatório Power BI

### Criar Novos Usuários
```bash
cd project/backend
node cli.js create-user <username> <password>
```

### Ver Logs de Acesso
```bash
cd project/backend
node cli.js view-logs --limit 20
```

### Listar Usuários
```bash
cd project/backend
node cli.js list-users
```

## Banco de Dados

### Tabela: users
- `id`: INTEGER PRIMARY KEY
- `username`: TEXT UNIQUE
- `password`: TEXT (bcrypt hash)
- `created_at`: DATETIME

### Tabela: access_logs
- `id`: INTEGER PRIMARY KEY
- `user_id`: INTEGER (FK)
- `action`: TEXT
- `ip_address`: TEXT
- `timestamp`: DATETIME

## Segurança

- ✅ Senhas criptografadas com bcrypt (10 rounds)
- ✅ Tokens JWT com expiração de 8 horas
- ✅ CORS configurado
- ✅ Logs de acesso detalhados
- ✅ Rotas protegidas no frontend

## Tecnologias

### Frontend
- React 18
- Vite 5
- TypeScript
- Material-UI 7
- Axios
- React Router DOM 7

### Backend
- Node.js
- Express 5
- SQLite3
- bcryptjs
- jsonwebtoken
- Morgan (logging)
- Commander (CLI)

## Próximos Passos

- [ ] Adicionar refresh tokens
- [ ] Implementar recuperação de senha
- [ ] Dashboard administrativo
- [ ] Métricas de uso
- [ ] Backup automático do banco
