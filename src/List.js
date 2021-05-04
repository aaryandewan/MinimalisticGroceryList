import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        return (
          <article key={item.id} className="grocery-item">
            <p className="title">{item.title}</p>
            <button className="edit-btn">
              <FaEdit />
            </button>
            <button className="delete-btn">
              <FaTrash />
            </button>
          </article>
        );
      })}
    </div>
  );
};

export default List;
