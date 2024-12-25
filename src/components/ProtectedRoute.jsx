import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // Verificar si el token existe
  const isTokenValid = () => {
    if (!token) return false;
    const parts = token.split('.');
    return parts.length === 3;
  };

  return isTokenValid() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
