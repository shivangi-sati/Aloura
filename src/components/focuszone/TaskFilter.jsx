import React from "react";

export default function TaskFilter({ filterTag, setFilterTag }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={filterTag}
        onChange={(e) => setFilterTag(e.target.value)}
        placeholder="Filter tasks by tag..."
        className="border p-2 rounded w-full"
      />
    </div>
  );
}
