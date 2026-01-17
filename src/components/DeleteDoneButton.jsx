import React from "react";

const DeleteDoneButton = ({ doneTasks, deleteDoneTask }) => {
  return (
    <>
      {doneTasks && (
        <button onClick={deleteDoneTask}>Eliminar Completadas</button>
      )}
    </>
  );
};

export default DeleteDoneButton;
