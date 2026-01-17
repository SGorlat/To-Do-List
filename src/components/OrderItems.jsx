import React from "react";

const OrderItems = ({ orderTasks, ascendingOrder }) => {
  return (
    <>
      <button id="btn-order" onClick={orderTasks} type="button">
        Ordenar por fecha {ascendingOrder ? "▲" : "▼"}
      </button>
    </>
  );
};

export default OrderItems;
