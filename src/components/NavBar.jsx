import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css"; // Importa los estilos aquí

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>
      <NavLink
        to="/tareas"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Tareas
      </NavLink>
      <NavLink
        to="/estadisticas"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Estadísticas
      </NavLink>
    </nav>
  );
};

export default NavBar;
