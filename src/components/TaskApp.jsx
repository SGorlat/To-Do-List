import React from "react";
import { useState } from "react";
import TaskForm from "./TaskForm";
import SearchTask from "./SearchTask";
import TaskSummary from "./TaskSummary";
import OrderItems from "./OrderItems";
import DeleteDoneButton from "./DeleteDoneButton";
import CategorySelector from "./CategorySelector";
import TaskDisplay from "./TaskDisplay";
import { addTask } from "../api/taskApi";
import { deleteTask } from "../api/taskApi";
import { patchTask } from "../api/taskApi";
import { updateTask } from "../api/taskApi";

function TaskApp({ tasks, setTasks }) {
  const [newTasks, setNewTasks] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
    category: "",
  });
  const [edit, setEdit] = useState(false);
  const [indexEditedTask, setIndexEditedTask] = useState(null);
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (
      newTasks.title.trim() === "" ||
      newTasks.description.trim() === "" ||
      newTasks.dueDate.trim() === "" ||
      newTasks.status.trim() === "" ||
      newTasks.category.trim() === ""
    ) {
      return window.alert("Completa todos los campos");
    }
    if (edit === true) {
      saveChanges(indexEditedTask);
    } else {
      addTasks();
    }
  };
  const saveChanges = async (indexEditedTask) => {
    try {
      const id = tasks[indexEditedTask]._id;
      const response = await updateTask(id, newTasks);
      const data = await response.json();
      const updatedTask = data.updatedTask || data;

      const copyTasks = [...tasks];
      copyTasks[indexEditedTask] = updatedTask;
      setTasks(copyTasks);

      setEdit(false);
      setIndexEditedTask(null);
      resetForm();
    } catch (error) {
      console.error("Error al actualizar la tarea:", error.message);
    }
  };

  const deleteTasks = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta tarea?")) {
      try {
        await deleteTask(id); // 🔄 Llama al backend
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id)); // ❌ Elimina del estado
      } catch (error) {
        console.error("Error al eliminar la tarea:", error.message);
      }
    }
  };

  const editTasks = (indexTask) => {
    setEdit(true);
    setIndexEditedTask(indexTask);
    setNewTasks({
      title: tasks[indexTask].title,
      description: tasks[indexTask].description,
      dueDate: tasks[indexTask].dueDate.split("T")[0],
      status: tasks[indexTask].status,
      category: tasks[indexTask].category || "",
    });
  };

  const addTasks = async () => {
    try {
      const response = await addTask(newTasks); // Llamada al backend usando addTask con los nuevos datos del frontend
      const data = await response.json(); // Esperamos los datos que le han llegado al backend y la respuesta en formato json
      const nuevaTarea = data.newTask;
      console.log("Nueva tarea creada y guardada en backend", nuevaTarea);
      setTasks((prevTasks) => [nuevaTarea, ...prevTasks]); // Se guarda la tarea arriba del todo y actualizamos estado tareas.
      resetForm(); // reseteamos el form
    } catch (error) {
      console.error("Error al crear la tarea:", error.message); // si hay error lanza esto.
    }
  };

  const toggleCompleted = async (indexTask) => {
    try {
      const task = tasks[indexTask];
      const newStatus =
        task.status === "completada" ? "pendiente" : "completada";

      const response = await patchTask(task._id, newStatus);
      const updatedTask = await response.json();

      const updatedTasks = [...tasks];
      updatedTasks[indexTask] = updatedTask;
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error al actualizar el estado:", error.message);
    }
  };

  const tasksFiltered = tasks.filter((task) => {
    const byCategory =
      selectedCategory === "Todas" ||
      task.category.toLowerCase() === selectedCategory.toLowerCase(); // Filtra por categoria seleccionada(si existe)
    // Filtra si el titulo o parte esta incluido en el buscador
    const filteredBySearch = (task.title || "")
      .toLowerCase()
      .includes(search.toLocaleLowerCase());

    return filteredBySearch && byCategory; //Muestro las que nos devuelve el primer filtro en las que coincide el search con el titulo y ademas las del status correspondiente
  });

  const orderTasks = () => {
    const copyTasks = [...tasks];

    copyTasks.sort((a, b) => {
      const DateA = new Date(a.dueDate);
      const DateB = new Date(b.dueDate);

      return ascendingOrder ? DateA - DateB : DateB - DateA;
    });

    setTasks(copyTasks);
    setAscendingOrder(!ascendingOrder);
  };

  const resetForm = () => {
    setNewTasks({
      title: "",
      description: "",
      dueDate: "",
      status: "",
      category: "",
    });
  };

  const deleteDoneTask = () => {
    const filteredByDone = tasks.filter((task) => task.status !== "completada");
    setTasks(filteredByDone);
  };
  const doneTasks = tasks.some((task) => task.status === "completada");
  const totalPendingTasks = tasks.filter(
    (task) => task.status === "pendiente"
  ).length;

  const totalDoneTasks = tasks.filter(
    (task) => task.status === "completada"
  ).length;
  const totalTasks = tasks.length;

  return (
    <div className="main-container">
      <TaskSummary // resumen de tareas: completadas,pendientes y totales
        totalDoneTasks={totalDoneTasks}
        totalPendingTasks={totalPendingTasks}
        totalTasks={totalTasks}
      />
      <div className="app-columns">
        <div className="form-columns">
          <TaskForm //Formulario + filtros
            handleOnSubmit={handleOnSubmit}
            orderTasks={orderTasks}
            ascendingOrder={ascendingOrder}
            newTasks={newTasks}
            setNewTasks={setNewTasks}
            edit={edit}
          />

          <SearchTask search={search} setSearch={setSearch} />
          <OrderItems orderTasks={orderTasks} ascendingOrder={ascendingOrder} />
          <DeleteDoneButton
            doneTasks={doneTasks}
            deleteDoneTask={deleteDoneTask}
          />
        </div>
        <div className="display-columns">
          <CategorySelector
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <TaskDisplay
            selectedCategory={selectedCategory}
            tasksFiltered={tasksFiltered}
            deleteTasks={deleteTasks}
            editTasks={editTasks}
            toggleCompleted={toggleCompleted}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskApp;
