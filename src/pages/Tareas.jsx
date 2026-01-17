import TaskApp from "../components/TaskApp";

const Tareas = ({ tasks, setTasks }) => {
  return (
    <>
      <TaskApp tasks={tasks} setTasks={setTasks} />
    </>
  );
};

export default Tareas;
