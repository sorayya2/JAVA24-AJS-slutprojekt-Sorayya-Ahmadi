import TaskColumn from "./Taskcolumn";

function Board({ tasksByStatus, members, assignTask, markAsFinished, deleteTask }) {
  return (
    <div
      className="board"
      style={{ display: "flex", gap: 20, overflowX: "auto", paddingBottom: 20 }}
    >
      {Object.entries(tasksByStatus).map(([status, tasks]) => (
        <TaskColumn
          key={status}
          status={status}
          tasks={tasks}
          members={members}
          assignTask={assignTask}
          markAsFinished={markAsFinished}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}

export default Board;
