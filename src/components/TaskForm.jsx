import React, { useRef, useEffect } from "react"; //useRef sirve para apuntar al formulario y ir hacia su posicion
import "../styles/TaskForm.css";

const TaskForm = ({ handleOnSubmit, newTasks, setNewTasks, edit }) => {
  const formRef = useRef(null); // Creamos una referencia para el formulario,empieza en null ya que no apunta a nada hasta que lo asignamos cuando se salte el usse efect u apunte al formRef.current que esta enlazado en el <form>
  // formRef es un hook que nos permite acceder a un elemento del DOM directamente, es un objeto que en su interior tiene {current: null} y cuando se asigna a un elemento del DOM (en este caso el form de abajo), el current se convierte en una referencia a ese elemento. En este caso, formRef.current apunta al formulario.

  //cada vez que se "refresque" y cambie el valor de edit,al ser edit true entramos en modo edición y entonces haz scroll hasta el formulario de referencia.
  useEffect(() => {
    if (edit && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [edit]);

  return (
    //conectamos ref(referencia)con el formulario completo,con la posicion creada
    <form ref={formRef} onSubmit={handleOnSubmit} className="form">
      <div className="form-group">
        <input
          value={newTasks.title}
          type="text"
          onChange={(event) =>
            setNewTasks({ ...newTasks, title: event.target.value })
          }
          placeholder="Nombre de la tarea..."
        />
      </div>

      <div className="form-group">
        <input
          value={newTasks.description}
          type="text"
          onChange={(event) =>
            setNewTasks({ ...newTasks, description: event.target.value })
          }
          placeholder="Describe la tarea..."
        />
      </div>

      <div className="form-group">
        <input
          value={newTasks.dueDate}
          type="date"
          min={new Date().toISOString().split("T")[0]} // Establece la fecha mínima como la fecha actual asegurando no poder selecc.menos del dia actual.
          onChange={(event) =>
            setNewTasks({ ...newTasks, dueDate: event.target.value })
          }
        />
      </div>

      <div className="form-group">
        <select
          value={newTasks.status}
          onChange={(event) =>
            setNewTasks({ ...newTasks, status: event.target.value })
          }
        >
          <option value="" disabled>
            Selecciona un estado
          </option>
          <option value="No-iniciada">No Iniciada</option>
          <option value="pendiente">Pendiente</option>
          <option value="completada">Completada</option>
        </select>
      </div>

      <div className="form-group">
        <select
          value={newTasks.category}
          onChange={(event) =>
            setNewTasks({ ...newTasks, category: event.target.value })
          }
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>
          <option value="trabajo">Trabajo</option>
          <option value="casa">Casa</option>
          <option value="personal">Personal</option>
          <option value="otras">Otras</option>
        </select>
      </div>

      <button type="submit">
        {edit ? "Guardar Cambios" : "Agregar Tarea"}
      </button>
    </form>
  );
};

export default TaskForm;
