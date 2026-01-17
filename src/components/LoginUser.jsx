import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginUser.css";

const LoginUser = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // evita recargar la página
    navigate("/tareas"); // redirige a la ruta de tareas
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Usuario" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Login</button>
        <h6>¿No tienes cuenta? Registrate aqui.</h6>
      </form>
    </div>
  );
};

export default LoginUser;
