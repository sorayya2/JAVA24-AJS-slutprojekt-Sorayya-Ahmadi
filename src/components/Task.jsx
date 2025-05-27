import React, { useState } from "react";

function Task({ task, members, assignTask, markAsFinished, deleteTask, status }) {
  const [error, setError] = useState("");
  const assignedMember = members.find((m) => m.id === task.assignedTo);

  const handleAssign = (memberId) => {
    setError(""); 

    const member = members.find((m) => m.id === memberId);
    if (!member) {
      setError("Selected member not found.");
      return;
    }
    if ((member.category?.toLowerCase() || "") !== (task.category?.toLowerCase() || "")) {
      setError("Member category does not match task category.");
      return;
    }

    try {
      assignTask(task.id, memberId);
    } catch {
      setError("Failed to assign task.");
    }
  };

  const handleMarkFinished = () => {
    setError("");
    try {
      markAsFinished(task.id);
    } catch {
      setError("Failed to mark task as finished.");
    }
  };

  const handleDelete = () => {
    setError("");
    try {
      deleteTask(task.id);
    } catch {
      setError("Failed to delete task.");
    }
  };

  return (
    <div
      className="task"
      style={{
        backgroundColor: "white",
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
        boxShadow: "0 1px 3px rgba(25, 21, 21, 0.1)",
      }}
    >
      <div>
        <strong>{task.content}</strong>
        <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
          <div>
            <em>Created:</em> {task.timestamp}
          </div>
          <div>
            <em>Category:</em> {task.category || "Unknown"}
          </div>
          {assignedMember && (
            <div>
              <em>Tilldela till...</em> {assignedMember.name} ({assignedMember.category})
            </div>
          )}
        </div>
      </div>

      <div style={{ marginLeft: 10, display: "flex", flexDirection: "column", gap: 6 }}>
        {status === "new" && (
          <>
            <select
              onChange={(e) => handleAssign(e.target.value)}
              defaultValue=""
              aria-label={`Assign task ${task.content}`}
            >
              <option value="" disabled>
               Tilldela till...
              </option>
              {task.category &&
                members
                  .filter(
                    (m) =>
                      (m.category?.toLowerCase() || "") === (task.category?.toLowerCase() || "")
                  )
                  .map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.category})
                    </option>
                  ))}
            </select>
            {error && (
              <p style={{ color: "red", marginTop: 4, fontSize: 12 }}>
                {error}
              </p>
            )}
          </>
        )}

        {status === "in progress" && (
          <>
            <button onClick={handleMarkFinished}>Klarmarkera</button>
            {error && (
              <p style={{ color: "red", marginTop: 4, fontSize: 12 }}>
                {error}
              </p>
            )}
          </>
        )}

        {status === "finished" && (
          <>
            <button onClick={handleDelete}>	Ta bort</button>
            {error && (
              <p style={{ color: "red", marginTop: 4, fontSize: 12 }}>
                {error}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Task;
