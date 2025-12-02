# Portal de Autenticação Power BI

## 📊 Sobre o Projeto

Portal web full-stack para acesso seguro a relatórios Power BI. A aplicação exige autenticação antes de permitir visualização dos relatórios em iframe integrado.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React** com Vite
- **Material-UI (MUI)** para interface moderna
- **React Router DOM** para roteamento
- **Axios** para requisições HTTP
- **Context API** para gerenciamento de estado

### Backend
- **Node.js** com Express.js
- **SQLite** para banco de dados
- **bcryptjs** para criptografia de senhas
- **jsonwebtoken** para autenticação JWT
- **Commander** para CLI administrativa

## 🎯 Funcionalidades

### Autenticação
- Login seguro com JWT (8h de expiração)
- Senhas criptografadas com bcrypt
- Proteção de rotas privadas
- Sistema de logs de acesso

### Interface
- Design responsivo e moderno
- Tema personalizado Material-UI
- Feedback visual para ações do usuário
- Loading states e tratamento de erros

### Administração
- CLI para criação de usuários
- Visualização de logs de acesso
- Listagem de usuários cadastrados

## 📁 Estrutura do Projeto

```
projeto/
├── backend/                 # Servidor Node.js/Express
│   ├── server.js           # Servidor principal
│   ├── database.js         # Configuração SQLite
│   ├── cli.js             # Ferramenta CLI
│   ├── .env               # Variáveis de ambiente
│   └── package.json       # Dependências backend
├── src/                    # Frontend React
│   ├── components/        # Componentes React
│   ├── context/          # Context para autenticação
│   └── App.tsx           # Componente principal
└── README.md
```

## 🛠️ Instalação e Execução

### 1. Instalar Dependências Backend
```bash
cd backend
npm install
```

### 2. Instalar Dependências Frontend
```bash
npm install
```

### 3. Executar Backend
```bash
cd backend
npm start
# Servidor rodará em http://localhost:4000
```

### 4. Executar Frontend
```bash
npm run dev
# Aplicação rodará em http://localhost:5173
```

## 👤 Credenciais Padrão

- **Usuário**: admin
- **Senha**: senha123

## 🔧 CLI Administrativa

### Criar Usuário
```bash
cd backend
node cli.js create-user <username> <password>
```

### Visualizar Logs
```bash
node cli.js view-logs --limit 20
```

### Listar Usuários
```bash
node cli.js list-users
```

## 🔒 Segurança

- Senhas criptografadas com bcrypt (salt rounds: 10)
- Tokens JWT com expiração de 8 horas
- CORS configurado para desenvolvimento
- Logs detalhados de acesso com IP e timestamp
- Proteção contra acesso não autorizado

## 🎨 Características da Interface

- **Design Responsivo**: Funciona em desktop, tablet e mobile
- **Material-UI**: Componentes consistentes e acessíveis
- **Animações**: Transições suaves e feedback visual
- **Temas**: Paleta de cores corporativa azul
- **Loading States**: Indicadores visuais durante operações

## 📊 Relatório Power BI

O iframe integrado exibe um relatório público do Power BI com dados de exemplo. Em produção, substitua pela URL do seu relatório específico.

## ⚙️ Configuração de Ambiente

### Backend (.env)
```
JWT_SECRET=meu_super_secreto_jwt_key_12345
PORT=4000
```

### Frontend (Vite)
As configurações do Vite estão no `vite.config.ts` para otimização de build e desenvolvimento.

## 🔄 Fluxo de Autenticação

1. **Login**: Usuário informa credenciais
2. **Verificação**: Backend valida no SQLite
3. **Token**: JWT gerado com 8h de expiração
4. **Storage**: Token armazenado no localStorage
5. **Acesso**: Rotas protegidas verificam token
6. **Logout**: Token removido e redirecionamento

## 📝 Logs e Auditoria

Todas as ações de login são registradas com:
- ID do usuário
- Ação realizada (LOGIN_SUCCESS)
- Endereço IP
- Timestamp

## 🚨 Tratamento de Erros

- Validação de dados de entrada
- Mensagens de erro user-friendly  
- Logs detalhados para debugging
- Graceful shutdown do servidor
- Fallbacks para falhas de conexão

## 🎯 Próximos Passos

- [ ] Implementar refresh tokens
- [ ] Adicionar autenticação de dois fatores
- [ ] Dashboard de administração web
- [ ] Integração com Active Directory
- [ ] Métricas de uso dos relatórios
- [ ] Backup automático do banco de dados

## 📞 Suporte

Para dúvidas ou problemas, consulte os logs do servidor ou use a ferramenta CLI para diagnóstico.