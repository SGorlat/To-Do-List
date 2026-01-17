import React from "react";
import TaskList from "./TaskList";

const TaskDisplay = ({
  selectedCategory,
  tasksFiltered,
  deleteTasks,
  editTasks,
  toggleCompleted,
}) => {
  return (
    <div>
      <h2 className="titulo-tareas">Mis tareas</h2>

      {tasksFiltered.length === 0 ? (
        <p className="sintareas">📝 No hay tareas.</p>
      ) : (
        <>
          {selectedCategory !== "Todas" && (
            <h3 className="subtitulo-categoria">
              Tareas de la categoría: {selectedCategory}
            </h3>
          )}

          <TaskList
            tasksFiltered={tasksFiltered}
            deleteTasks={deleteTasks}
            editTasks={editTasks}
            toggleCompleted={toggleCompleted}
          />
        </>
      )}
    </div>
  );
};

export default TaskDisplay;
