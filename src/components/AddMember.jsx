import React, { useState } from "react";

function AddMember({ categories, onAddMember }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const handleAdd = () => {
  if (!name.trim()) return; 
  onAddMember(name, category);
  setName("");
  setCategory(categories[0]); 
};


  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Lägg till ny medlem</h3>
      <label
        htmlFor="memberNameInput"
        style={{ color: "#d94f6e", fontWeight: 600, marginRight: 8, userSelect: "none" }}
      >
        Namn:
      </label>
      <input
        id="memberNameInput"
        placeholder="Enter member name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <label
        htmlFor="memberCategorySelect"
        style={{ color: "#d94f6e", fontWeight: 600, marginRight: 8, userSelect: "none" }}
      >
       	Roll:
      </label>
      <select
        id="memberCategorySelect"
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
      <button onClick={handleAdd}>Lägg till ny medlem</button>
    </div>
  );
}

export default AddMember;
