import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  CircularProgress
} from '@mui/material';
import { LogOut, BarChart3, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ReportPage = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Verificar autenticação
  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Se não estiver autenticado, não renderizar nada (redirecionamento em andamento)
  if (!isAuthenticated()) {
    return null;
  }

  const powerBiUrl = "https://app.powerbi.com/view?r=eyJrIjoiMDM4OGZmODYtMmM4OC00OTdhLTg4YjctOWE1MzQ4NjljOTZiIiwidCI6IjljOGEzMjFhLTcyNzktNDE5NS1hZjNkLTRjYmViMzY3YjA5ZSJ9&pageName=1ee9f0f6b13337dc9e0b";

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Barra de Navegação */}
      <AppBar 
        position="sticky" 
        sx={{ 
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)'
        }}
      >
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <BarChart3 size={28} style={{ marginRight: 12 }} />
            <Typography 
              variant="h6" 
              component="h1" 
              fontWeight="bold"
              sx={{ flexGrow: 1 }}
            >
              Portal Power BI - Relatórios
            </Typography>
          </Box>

          {/* Informações do usuário */}
          <Box display="flex" alignItems="center" gap={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <User size={20} />
              <Typography variant="body2">
                Olá, {user?.email}
              </Typography>
            </Box>
            
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogOut size={18} />}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Sair
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Container do Relatório */}
      <Box 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f5f5f5',
          padding: 2
        }}
      >
        <Container maxWidth={false} sx={{ height: '100%' }}>
          <Paper
            elevation={8}
            sx={{
              height: '100%',
              borderRadius: 2,
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* Iframe do Power BI */}
            <Box
              component="iframe"
              src={powerBiUrl}
              sx={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: 2
              }}
              title="Relatório Power BI"
              allowFullScreen
            />
            
            {/* Overlay de loading (caso o iframe demore para carregar) */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
                display: 'none' // Pode ser controlado por estado se necessário
              }}
            >
              <CircularProgress size={60} />
              <Typography variant="body2" textAlign="center" mt={2}>
                Carregando relatório...
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default ReportPage;