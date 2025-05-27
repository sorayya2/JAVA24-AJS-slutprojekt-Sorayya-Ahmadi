import { db, ref, push, onValue, update, remove } from "../firebase/config";
import React, { useState, useEffect, useRef } from "react";
import AddMember from "./AddMember";
import AddTask from "./AddTask";
import Board from "./Board";
import TaskFilters from "./TaskFilters";

export const CATEGORIES = ["UX", "Frontend", "Backend"];

function App() {
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    memberId: "",
    category: "",
    sortBy: "timestampDesc",
  });

  const [error, setError] = useState("");
  const errorTimeoutRef = useRef(null);

  const showError = (msg) => {
    setError(msg);
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    errorTimeoutRef.current = setTimeout(() => {
      setError("");
    }, 5000);
  };

  useEffect(() => {
    const membersRef = ref(db, "members");
    onValue(membersRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data).map(([id, item]) => ({
        id,
        ...item,
      }));
      setMembers(list);
    });
  }, []);

  useEffect(() => {
    const tasksRef = ref(db, "assignments");
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data).map(([id, item]) => ({
        id,
        ...item,
      }));
      setTasks(list);
    });
  }, []);

  const addMember = (name, category) => {
    if (!name.trim()) {
      showError("Member name cannot be empty.");
      return;
    }
    const newMember = {
      name: name.trim(),
      category: category,
    };
    push(ref(db, "members"), newMember).catch(() =>
      showError("Failed to add member.")
    );
  };

  const addTask = (content, category) => {
    if (!content.trim()) {
      showError("Task content cannot be empty.");
      return;
    }
    const newTask = {
      content: content.trim(),
      category,
      timestamp: new Date().toISOString(),
      status: "new",
      assignedTo: null,
    };
    push(ref(db, "assignments"), newTask).catch(() =>
      showError("Failed to add task.")
    );
  };

  const assignTask = (taskId, memberId) => {
    setError(""); 

    const member = members.find((m) => m.id === memberId);
    const task = tasks.find((t) => t.id === taskId);

    if (!task || !member) {
      showError("Task or member not found.");
      return;
    }
    if (task.status !== "new") {
      showError("Task is not new and cannot be assigned.");
      return;
    }
    if (
      (member.category?.toLowerCase() || "") !==
      (task.category?.toLowerCase() || "")
    ) {
      showError("Member category does not match task category.");
      return;
    }

    update(ref(db, `assignments/${taskId}`), {
      assignedTo: memberId,
      status: "in progress",
    }).catch(() => showError("Failed to assign task."));
  };

  const markAsFinished = (taskId) => {
    setError("");
    update(ref(db, `assignments/${taskId}`), {
      status: "finished",
    }).catch(() => showError("Failed to mark task as finished."));
  };

  const deleteTask = (taskId) => {
    setError("");
    remove(ref(db, `assignments/${taskId}`)).catch(() =>
      showError("Failed to delete task.")
    );
  };

  function getFilteredAndSortedTasks(tasks, filters) {
    let result = [...tasks];

    if (filters.memberId) {
      result = result.filter((t) => t.assignedTo === filters.memberId);
    }
    if (filters.category) {
      result = result.filter((t) => t.category === filters.category);
    }

    result.sort((a, b) => {
      if (filters.sortBy === "timestampAsc") {
        return new Date(a.timestamp) - new Date(b.timestamp);
      } else if (filters.sortBy === "timestampDesc") {
        return new Date(b.timestamp) - new Date(a.timestamp);
      } else if (filters.sortBy === "titleAsc") {
        return a.content.localeCompare(b.content);
      } else if (filters.sortBy === "titleDesc") {
        return b.content.localeCompare(a.content);
      }
      return 0;
    });

    return result;
  }

  const filteredTasks = getFilteredAndSortedTasks(tasks, filters);

  const tasksByStatus = {
    new: filteredTasks.filter((t) => t.status === "new"),
    "in progress": filteredTasks.filter((t) => t.status === "in progress"),
    finished: filteredTasks.filter((t) => t.status === "finished"),
  };

  return (
    <div
      className="app-container"
      style={{ maxWidth: 960, margin: "auto", padding: 20 }}
    >
      <h1 className="app-title">Scrum Board 📋</h1>

   
      {error && (
        <div
          role="alert"
          style={{
            color: "white",
            backgroundColor: "#d94f6e",
            padding: 12,
            borderRadius: 6,
            marginBottom: 20,
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      <AddMember categories={CATEGORIES} onAddMember={addMember} />
      <AddTask categories={CATEGORIES} onAddTask={addTask} />

      <TaskFilters members={members} filters={filters} setFilters={setFilters} />

      <Board
        tasksByStatus={tasksByStatus}
        members={members}
        assignTask={assignTask}
        markAsFinished={markAsFinished}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
