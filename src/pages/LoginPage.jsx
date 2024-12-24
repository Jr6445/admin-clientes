import React from "react";
import Login from "../components/Login";

const LoginPage = () => {
  const handleLogin = () => {
    // Redirige a la página de administración tras iniciar sesión
    window.location.href = "/admin";
  };

  return (
    <div>
      <Login onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
