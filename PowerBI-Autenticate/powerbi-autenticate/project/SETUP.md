# Portal de Autenticacao Power BI - Configuracao

## Criacao de Usuario Administrador

Para criar o primeiro usuario administrador, use o Supabase Dashboard:

1. Acesse o Supabase Dashboard: https://supabase.com/dashboard
2. Navegue ate Authentication > Users
3. Clique em "Add user" > "Create new user"
4. Preencha:
   - Email: admin@exemplo.com (ou o email desejado)
   - Password: senha123 (ou a senha desejada)
   - Email Confirm: marque para confirmar automaticamente
5. Clique em "Create user"

## Autenticacao

A aplicacao agora usa Supabase Auth para autenticacao segura:

- Senhas sao gerenciadas pelo Supabase (bcrypt com salt)
- Tokens JWT com expiracao automatica
- Row Level Security (RLS) ativo em todas as tabelas
- Logs de acesso registrados automaticamente

## Estrutura do Banco de Dados

### Tabela: access_logs
- Registra todos os acessos ao sistema
- Campos: user_id, action, ip_address, user_agent, created_at
- RLS ativo: usuarios podem ver apenas seus proprios logs

## Variveis de Ambiente

As seguintes variveis ja estao configuradas no .env:

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

## Como Executar

```bash
npm install
npm run dev
```

A aplicacao estara disponivel em http://localhost:5173
