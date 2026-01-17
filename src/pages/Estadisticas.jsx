import "../styles/Estadisticas.css";

const Estadisticas = ({ tasks }) => {
  const totalTasks = tasks.length;
  const totalDoneTasks = tasks.filter((t) => t.status === "completada").length;
  const totalPendingTasks = tasks.filter(
    (task) => task.status === "pendiente"
  ).length;

  // Categorías que tenemos con su color
  const categorias = [
    { nombre: "Trabajo", color: "blue" },
    { nombre: "Casa", color: "green" },
    { nombre: "Personal", color: "orange" },
    { nombre: "Otras", color: "gray" },
  ];

  // Creamos un array con solo las categorías que tengan tareas
  const categoriasConTareas = categorias
    .map((categoria) => {
      const cantidad = tasks.filter(
        (task) => task.category.toLowerCase() === categoria.nombre.toLowerCase()
      ).length;
      return {
        nombre: categoria.nombre,
        color: categoria.color,
        cantidad: cantidad,
      };
    })
    .filter((categoria) => categoria.cantidad > 0); // Solo mostramos si hay al menos 1 tarea

  return (
    <div className="estadisticas-container">
      <h2>📊 Estadísticas de tus tareas</h2>
      <p id="estadisticas-total">Total de tareas: {totalTasks}</p>
      <p id="estadisticas-completadas">✅ Completadas: {totalDoneTasks}</p>
      <p id="estadisticas-pendientes">🕒 Pendientes: {totalPendingTasks}</p>

      <h3>📁 Tareas por categoría:</h3>
      <div className="categorias-grid">
        {categoriasConTareas.map((categoria) => (
          <div
            key={categoria.nombre}
            className={`categoria-card categoria-${categoria.color}`}
          >
            {categoria.nombre}: {categoria.cantidad} tarea
            {categoria.cantidad !== 1 && "s"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Estadisticas;
