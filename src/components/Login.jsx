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
    <div className="container d-flex justify-content-center align-items-center" style={{height:'80vh'}}>
      <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <div className='text-center' style={{fill:'#019df4'}}>
        <svg id="logo-movistar-svg" x="0px" y="0px" width="52px" height="38px" viewBox="0 0 52 38" className="navigation__logo--svg"> <path id="logo-movistar" d="M9.835,4.473c-2.424,0.038-6.898,1.233-8.942,9.58c-0.891,3.638-1.235,7.429-0.473,11.94c0.703,4.162,1.948,7.754,2.787,9.733c0.29,0.683,0.738,1.394,1.084,1.832c0.996,1.259,2.654,1.179,3.35,0.835c0.76-0.374,1.633-1.276,1.317-3.337c-0.153-0.996-0.593-2.452-0.841-3.263c-0.761-2.484-1.773-5.482-1.861-7.617c-0.119-2.857,1.008-3.23,1.756-3.396c1.258-0.277,2.312,1.104,3.314,2.835c1.195,2.066,3.245,5.728,4.916,8.522c1.509,2.524,4.293,5.227,8.765,5.042c4.56-0.19,7.92-1.93,9.651-7.405c1.295-4.097,2.178-7.159,3.6-10.294c1.633-3.605,3.813-5.535,5.648-4.946c1.704,0.548,2.129,2.213,2.15,4.661c0.018,2.166-0.233,4.554-0.427,6.308c-0.071,0.637-0.199,1.916-0.147,2.628c0.103,1.397,0.708,2.794,2.282,3.017c1.676,0.238,3.021-1.102,3.558-2.721c0.212-0.64,0.393-1.615,0.49-2.309c0.493-3.5,0.621-5.852,0.398-9.433c-0.259-4.188-1.078-8.005-2.508-11.31c-1.368-3.159-3.565-5.186-6.381-5.364c-3.119-0.197-6.698,1.872-8.575,5.886c-1.73,3.7-3.115,7.499-3.955,9.437c-0.851,1.967-2.103,3.179-4.027,3.382c-2.353,0.246-4.381-1.462-5.866-3.897c-1.295-2.123-3.86-6.165-5.233-7.523C14.375,6.021,12.902,4.425,9.835,4.473"> </path> </svg>
        </div>
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
