const API_URL = "http://localhost:3000/tasks"; // Indicamos donde estan las tareas

const getTasks = async () => {
  const response = await fetch("http://localhost:3000/tasks");
  if (!response.ok) {
    throw new Error("Error al obtener las tareas");
  }
  return response.json();
};

export { getTasks };

const addTask = async (data) => {
  //funcion asincrona que recibe nuestro objeto(Tarea creada) y hace la peticion post al backend
  const response = await fetch("http://localhost:3000/tasks", {
    method: "POST", // le decimos que el metodo es POST - Enviar datos al backend
    headers: { "Content-Type": "application/json" }, // Le indicamos que le enviamos un objeto json
    body: JSON.stringify(data), // Lo convertimos en Json
  });
  return response; // respuesta del servidor.
};

export { addTask };

const deleteTask = async (id) => {
  const response = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export { deleteTask };

const patchTask = async (id) => {
  const res = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export { patchTask };

const updateTask = async (id, data) => {
  const res = await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res;
};

export { updateTask };
