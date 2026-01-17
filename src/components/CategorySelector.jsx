import React from "react";
import "../App.css"; // Asegúrate de que la ruta sea correcta

const categorias = [
  { nombre: "Todas", color: "indigo" },
  { nombre: "Trabajo", color: "blue" },
  { nombre: "Casa", color: "green" },
  { nombre: "Personal", color: "orange" },
  { nombre: "Otras", color: "gray" },
];

const CategorySelector = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="categorias-grid">
      {categorias.map((cat) => (
        <div
          key={cat.nombre}
          className={`categoria-card categoria-${cat.color} ${
            selectedCategory === cat.nombre ? "active" : ""
          }`}
          onClick={() => setSelectedCategory(cat.nombre)}
        >
          {cat.nombre}
        </div>
      ))}
    </div>
  );
};

export default CategorySelector;
