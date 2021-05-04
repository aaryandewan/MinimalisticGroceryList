import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "danger", "Please enter a value");
      //
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          } else {
            return item;
          }
        })
      );
      setIsEditing(false);
      showAlert(true, "success", "Item edited");
      setName("");
    } else {
      showAlert(true, "success", "Item Submitted");

      const newItem = { id: uuidv4(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const editItem = (id) => {
    setEditID(id);
    setIsEditing(true);
    const itemToEdit = list.find((item) => item.id === id);
    setName(itemToEdit.title);
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const removeItem = (id) => {
    const itemToDelete = list.find((item) => item.id === id);
    showAlert(true, "danger", `${itemToDelete.title} deleted`);
    setList(() => list.filter((item) => item.id !== id));
  };

  const clearItems = () => {
    setList([]);
    showAlert(true, "danger", "All items cleared");
  };
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>Grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            placeholder="ex: cheesecake"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearItems}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
