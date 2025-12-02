import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress } from '@mui/material';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

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

  // Se não estiver autenticado, redirecionar para login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderizar componente
  return children;
};

export default PrivateRoute;