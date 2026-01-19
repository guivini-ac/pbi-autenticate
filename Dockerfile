# Estágio de build para o frontend
FROM node:20-slim AS frontend-builder
WORKDIR /app/frontend
COPY project/package*.json ./
RUN npm install
COPY project/ ./
RUN npm run build

# Estágio final - Backend e servir frontend
FROM node:20-slim
WORKDIR /app

# Instalar dependências de build para sqlite3 se necessário, mas node-slim geralmente resolve
# Copiar arquivos do backend
COPY project/backend/package*.json ./backend/
RUN cd backend && npm install --production

COPY project/backend/ ./backend/

# Copiar build do frontend para o backend servir
COPY --from=frontend-builder /app/frontend/dist ./dist

# Configurações de ambiente
ENV NODE_ENV=production
ENV PORT=8000
ENV JWT_SECRET=change-me-in-production

EXPOSE 8000

WORKDIR /app/backend
CMD ["node", "server.js"]
