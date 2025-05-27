import React, { useState } from "react";

function AddTask({ categories, onAddTask }) {
  const [content, setContent] = useState("");   
  const [category, setCategory] = useState(categories[0]); 

  const handleAdd = () => {
    if (!content.trim()) return;  
    onAddTask(content, category);  
    setContent("");                
    setCategory(categories[0]);    
  };

  return (
    <div style={{ marginBottom: 40 }}>
      <h3>Lägg till ny uppgift</h3>
      <label
        htmlFor="taskContentInput"
        style={{ color: "#d94f6e", fontWeight: 600, marginRight: 8, userSelect: "none" }}
      >
        	Uppgift:
      </label>
      <input
        id="taskContentInput"
        placeholder="Skriv in uppgift"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ marginRight: 10, width: 300 }}
      />
      <label
        htmlFor="taskCategorySelect"
        style={{ color: "#d94f6e", fontWeight: 600, marginRight: 8, userSelect: "none" }}
      >
      Roll:
      </label>
      <select
        id="taskCategorySelect"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginRight: 10 }}
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <button onClick={handleAdd}>Lägg till uppgift</button>
    </div>
  );
}

export default AddTask;
