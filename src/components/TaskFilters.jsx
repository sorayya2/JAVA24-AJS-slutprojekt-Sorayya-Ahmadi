import React from "react";

function TaskFilters({ members, filters, setFilters }) {
  return (
    <div style={{ marginBottom: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
      <select
        value={filters.memberId}
        onChange={(e) => setFilters((f) => ({ ...f, memberId: e.target.value }))}
      >
        <option value="">Alla medlemmar</option>
        {members.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>

      <select
        value={filters.category}
        onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
      >
        <option value="">Alla kategorier</option>
        <option value="UX">UX</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
      </select>

      <select
        value={filters.sortBy}
        onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value }))}
      >
        <option value="timestampDesc">Datum: Nyast först</option>
        <option value="timestampAsc">Datum: Äldst först</option>
        <option value="titleAsc">Titel: A–Ö</option>
        <option value="titleDesc">Titel: Ö–A</option>
      </select>
    </div>
  );
}

export default TaskFilters;
