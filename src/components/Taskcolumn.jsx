import React, { useState } from "react";
import Task from "./task";

const statusColors = {
  new: "#fff0f6",
  "in progress": "#fff0f6",
  finished: "#fff0f6",
};

function TaskColumn({ status, tasks, members, assignTask, markAsFinished, deleteTask }) {
  const [error, setError] = useState("");

  return (
    <div
      className="column"
      style={{
        minWidth: 280,
        backgroundColor: statusColors[status],
        padding: 15,
        borderRadius: 10,
        boxShadow: "0 1px 5px rgba(240, 48, 48, 0.1)",
        flexShrink: 0,
      }}
    >
      <h2 className="column-title">
  {status === "new" && "Ny"}
  {status === "in progress" && "Pågående"}
  {status === "finished" && "Klar"}
</h2>


      {error && <p style={{ color: "blue", fontWeight: "bold" }}>{error}</p>}

{tasks.length === 0 && <p style={{ fontStyle: "italic" }}>Inga uppgifter</p>}

      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          members={members}
          assignTask={assignTask}
          markAsFinished={markAsFinished}
          deleteTask={deleteTask}
          status={status}
          setError={setError} 
        />
      ))}
    </div>
  );
}

export default TaskColumn;
