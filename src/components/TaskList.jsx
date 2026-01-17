import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({
  tasksFiltered,
  deleteTasks,
  editTasks,
  toggleCompleted,
}) => {
  return (
    <div>
      <ul className="list-task">
        {tasksFiltered.map((task, indexTask) => (
          <TaskItem //Tareas .map
            key={indexTask}
            task={task}
            indexTask={indexTask}
            deleteTasks={deleteTasks}
            editTasks={editTasks}
            toggleCompleted={toggleCompleted}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
