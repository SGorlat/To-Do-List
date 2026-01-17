import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Tareas from "./pages/Tareas";
import Estadisticas from "./pages/Estadisticas";
import { getTasks } from "./api/taskApi";
import "./App.css";
import { Calendar } from "calendar";

function App() {
  const [tasks, setTasks] = useState([]); // Estado global

  useEffect(() => {
    fetch("http://localhost:3000/tasks");
    getTasks()
      .then((data) => {
        // Data es lo que recibimos del backend,le hacemos un sort para ordenar,compara ambas tareas y decide cual se coloca antes en base a su creacion,b-a es positivo,b va antes.
        const ordenadas = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTasks(ordenadas);
        console.log("Tareas cargadas desde el backend:", ordenadas);
      })
      .catch((error) => console.error("Error al obtener tareas:", error));
  }, []);

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route
          path="/tareas"
          element={<Tareas tasks={tasks} setTasks={setTasks} />}
        />

        <Route path="/estadisticas" element={<Estadisticas tasks={tasks} />} />
      </Routes>
    </>
  );
}

export default App;
