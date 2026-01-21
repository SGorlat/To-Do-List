import React from "react";
import { FaTrash, FaEdit, FaCheck, FaUndo } from "react-icons/fa";
import { useState } from "react";

const TaskItem = ({
  task,
  indexTask,
  deleteTasks,
  toggleCompleted,
  editTasks,
}) => {
  const [expanded, setExpanded] = useState(false);
  const status = task.status ?? (task.completed ? "completada" : "pendiente");

  console.log(
    "dueDate raw:",
    task.dueDate,
    typeof task.dueDate,
    "parsed:",
    new Date(task.dueDate),
  );

  return (
    <li
      className={`task-card ${expanded ? "expanded" : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="task-container">
        {status === "completada" ? (
          <del>
            <strong>{task.title}</strong> <strong>-</strong> {task.description}{" "}
            <strong>-</strong>{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString("es-ES")
              : "Sin fecha"}
            <span className={`tag categoria-${task.category.toLowerCase()}`}>
              {task.category}
            </span>
            {task.completedAt && (
              <p className="fecha-completado">
                Completada el:{" "}
                {task.completedAt
                  ? new Date(task.completedAt).toLocaleDateString("es-ES")
                  : ""}
              </p>
            )}
          </del>
        ) : (
          <>
            <strong>{task.title}</strong> <strong>-</strong> {task.description}{" "}
            <strong>-</strong>{" "}
            {new Date(task.dueDate).toLocaleDateString("es-ES")}{" "}
            <span className={`tag categoria-${task.category?.toLowerCase()}`}>
              {task.category}
            </span>
          </>
        )}
        <p className={`tag tag-${status}`}>{status.toUpperCase()}</p>
      </div>
      <div className="task-actions">
        <button className="btn-icon" onClick={() => deleteTasks(task)}>
          <FaTrash />
        </button>
        <button className="btn-icon" onClick={() => editTasks(indexTask)}>
          <FaEdit />
        </button>
        <button className="btn-icon" onClick={() => toggleCompleted(indexTask)}>
          {status === "completada" ? <FaUndo /> : <FaCheck />}
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
