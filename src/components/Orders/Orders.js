import React from "react";
import "./Orders.css";

const Orders = ({ orders, handleDelete }) => {
  const orderEls = orders.map((order) => {
    return (
      <div key={order.id} className="order">
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient) => {
            return <li key={Math.random() * 100}>{ingredient}</li>;
          })}
        </ul>
        <button id={order.id} onClick={(e) => handleDelete(e)}>DELETE</button>
      </div>
    );
  });

  return (
    <section className="orders-container">{orderEls.length ? orderEls : <p>No orders yet!</p>}</section>
  );
};

export default Orders;