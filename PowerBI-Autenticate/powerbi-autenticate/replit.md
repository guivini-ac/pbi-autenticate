# Portal de Autenticação Power BI

## Overview

A full-stack web portal that provides secure authentication and access control for Power BI reports. The application requires users to authenticate before viewing embedded Power BI reports in an iframe. Built with React/Vite on the frontend and Express.js/SQLite on the backend, with JWT-based authentication and comprehensive access logging.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (Port 5000)
- **Framework**: React 18 + Vite + TypeScript
- **UI**: Material-UI (MUI) v7 + TailwindCSS
- **Routing**: React Router DOM v7
- **State**: Context API for authentication
- **HTTP Client**: Axios

### Backend (Port 8000)
- **Framework**: Express.js
- **Database**: SQLite3 (embedded)
- **Authentication**: JWT (8h expiration)
- **Security**: bcryptjs for password hashing

## Project Structure

```
PowerBI-Autenticate/powerbi-autenticate/project/
├── src/                      # Frontend React
│   ├── components/          # React components
│   │   ├── LoginPage.jsx   # Login page
│   │   ├── ReportPage.jsx  # Power BI report page
│   │   └── PrivateRoute.jsx # Route protection
│   ├── context/            # State management
│   │   └── AuthContext.tsx # Authentication context
│   ├── lib/                # Libraries
│   │   └── api.ts          # Axios API client
│   └── App.tsx             # Main component
├── backend/                 # Backend Node.js
│   ├── server.js           # Express server
│   ├── database.js         # SQLite configuration
│   ├── cli.js             # Admin CLI
│   └── database.db        # SQLite database (auto-generated)
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies
```

## Replit Configuration

### Workflows
- **Frontend**: `cd PowerBI-Autenticate/powerbi-autenticate/project && npm run dev` (port 5000, webview)
- **Backend API**: `cd PowerBI-Autenticate/powerbi-autenticate/project/backend && node server.js` (port 8000, console)

### Vite Proxy
Frontend uses Vite proxy to communicate with backend:
- Requests to `/api` are forwarded to `http://localhost:8000`
- Configured with `allowedHosts: true` for Replit proxy compatibility

### Environment Variables
- `JWT_SECRET`: Secret key for JWT signing (configured in Replit secrets)

### Deployment
- Type: Autoscale
- Build: `npm run build` in project directory
- Run: Backend serves static files in production mode

## Default Credentials

**Username**: admin
**Password**: senha123

## CLI Commands

```bash
cd PowerBI-Autenticate/powerbi-autenticate/project/backend
node cli.js create-user <username> <password>
node cli.js view-logs --limit 20
node cli.js list-users
```

## Recent Changes (January 2026)

- Configured for Replit environment
- Set vite.config.ts with allowedHosts: true
- Backend configured to serve static files in production
- Deployment configured for autoscale
