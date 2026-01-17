import React from "react";

const TaskSummary = ({ totalDoneTasks, totalTasks, totalPendingTasks }) => {
  return (
    <div className="task-summary">
      <span className="pending">
        Tareas pendientes: {totalPendingTasks}/{totalTasks}
      </span>{" "}
      -{" "}
      <span className="completed">
        Tareas completadas: {totalDoneTasks}/{totalTasks}
      </span>
    </div>
  );
};

export default TaskSummary;
