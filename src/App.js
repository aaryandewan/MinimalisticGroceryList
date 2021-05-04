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
      //
    } else if (name && isEditing) {
    } else {
      const newItem = { id: uuidv4(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubit}>
        {alert.show && <Alert />}
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
          <List items={list} />
          <button className="clear-btn">Clear Items</button>
        </div>
      )}
    </section>
  );
}

export default App;
