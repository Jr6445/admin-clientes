import React, { useState } from 'react';
import api from '../services/api';

const Login = ({ onLogin }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { nombreUsuario, contrasena });
      localStorage.setItem('token', response.data.token); // Guardar el token en localStorage
      onLogin();
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre de Usuario:</label>
            <input
              type="text"
              className="form-control"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              placeholder="Ingrese su nombre de usuario"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" style={{backgroundColor:'#019df4', border:'none'}}>Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
