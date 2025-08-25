import React from "react";

export default function JournalList({ entries, onDelete }) {
  if (entries.length === 0) {
    return (
      <p className="text-gray-500 italic mt-4">
        No journal entries yet. Start writing your thoughts 🌸
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="bg-white p-4 rounded-lg shadow flex justify-between items-start"
        >
          <div>
            <p className="text-gray-700 whitespace-pre-line">{entry.content}</p>
            <p className="mt-2">Mood: {entry.mood}</p>
            <p className="text-sm text-gray-400">{entry.date}</p>
          </div>
          <button
            onClick={() => onDelete(entry.id)}
            className="text-red-500 hover:underline ml-4"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}