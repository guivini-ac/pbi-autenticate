# Portal de Autenticação Power BI

## Overview

A full-stack web portal that provides secure authentication and access control for Power BI reports. The application requires users to authenticate before viewing embedded Power BI reports in an iframe. Built with React/Vite on the frontend and Express.js/SQLite on the backend, with JWT-based authentication and comprehensive access logging.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and dev server (port 5000)
- Hot Module Replacement (HMR) configured for development with WebSocket support

**UI Layer**
- Material-UI (MUI) v7 as the primary component library
- Custom Material-UI theme with blue primary palette (#1976d2)
- TailwindCSS for utility-first styling alongside MUI
- Lucide React for additional icon support

**State Management**
- Context API for authentication state (AuthContext)
- Local state management with React hooks
- User session persisted in localStorage (token and user data)

**Routing**
- React Router DOM v7 for client-side routing
- PrivateRoute component for route protection
- Main routes: Login (/login) and Report (/report)
- Automatic redirect to login when unauthenticated

**HTTP Client**
- Axios configured with base URL '/api' for backend communication
- Proxy configuration in Vite to forward /api requests to backend (port 8000)
- JWT token included in request headers after authentication

### Backend Architecture

**Server Framework**
- Express.js v5 for REST API
- Runs on port 8000 (or configurable via PORT env variable)
- Morgan middleware for HTTP request logging
- CORS enabled for cross-origin requests

**Database Layer**
- SQLite3 for embedded relational database
- Database file: `backend/database.db`
- Two main tables:
  - `users`: Stores user credentials (id, username, hashed password, created_at)
  - `access_logs`: Records user activity (id, user_id, action, ip_address, timestamp)
- Default admin user created on first run

**Authentication & Security**
- JWT (jsonwebtoken) for stateless authentication
- Token expiration set to 8 hours
- bcryptjs for password hashing (salt rounds: 10)
- Passwords never stored in plain text
- Token stored in localStorage on client side

**API Endpoints**
- POST `/api/login`: Authenticates user and returns JWT token
- Additional health check and logging endpoints (referenced in codebase)

**CLI Administration Tool**
- Commander.js-based CLI for administrative tasks
- Commands for user creation and viewing access logs
- Script: `backend/cli.js` (can be run via npm script)

### Database Schema

**users table**
```
id (INTEGER PRIMARY KEY AUTOINCREMENT)
username (TEXT UNIQUE NOT NULL)
password (TEXT NOT NULL) - bcrypt hashed
created_at (DATETIME DEFAULT CURRENT_TIMESTAMP)
```

**access_logs table**
```
id (INTEGER PRIMARY KEY AUTOINCREMENT)
user_id (INTEGER NOT NULL, FOREIGN KEY to users)
action (TEXT NOT NULL)
ip_address (TEXT)
timestamp (DATETIME DEFAULT CURRENT_TIMESTAMP)
```

### Design Patterns

**Authentication Flow**
1. User submits credentials via LoginPage component
2. Frontend calls `/api/login` endpoint with username/password
3. Backend validates credentials against SQLite database
4. If valid, JWT token generated and returned with user data
5. Frontend stores token and user in localStorage
6. AuthContext updates to mark user as authenticated
7. PrivateRoute component allows access to protected routes
8. Token included in subsequent API requests via axios interceptors

**Session Management**
- JWT tokens expire after 8 hours (server-side configuration)
- Client checks for token in localStorage on app initialization
- Logout clears token and user data from localStorage
- No server-side session storage (stateless design)

**Error Handling**
- Backend returns appropriate HTTP status codes (400, 401, 500)
- Frontend displays user-friendly error messages via MUI Snackbar/Alert
- Loading states prevent duplicate submissions
- Try-catch blocks around async operations

## External Dependencies

### Third-Party Services
- **Power BI**: Embedded reports displayed in iframe (URL not hardcoded in repository)
- Reports accessed after successful authentication

### Development Tools
- **TypeScript**: Static type checking (v5.5.3)
- **ESLint**: Code linting with React-specific plugins
- **Vite**: Development server with HMR and production builds

### Key npm Packages

**Frontend Runtime**
- `react` & `react-dom`: Core framework
- `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`: UI components
- `react-router-dom`: Routing
- `axios`: HTTP client
- `lucide-react`: Additional icons

**Backend Runtime**
- `express`: Web server framework
- `sqlite3`: Database driver
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT generation/validation
- `cors`: Cross-origin resource sharing
- `morgan`: HTTP logging
- `commander`: CLI framework
- `dotenv`: Environment variable management

**Build & Development**
- `vite`: Build tool and dev server
- `@vitejs/plugin-react`: React plugin for Vite
- `typescript`: TypeScript compiler
- `tailwindcss`, `autoprefixer`, `postcss`: CSS processing

### Environment Variables
- `PORT`: Backend server port (default: 8000)
- `JWT_SECRET`: Secret key for JWT signing (should be configured)
- `VITE_*`: Vite-specific environment variables for frontend

### Database
- **SQLite**: Embedded SQL database (no external service required)
- Database file created automatically on first run
- No migration system implemented (tables created via `CREATE TABLE IF NOT EXISTS`)