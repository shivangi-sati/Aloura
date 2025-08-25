import React, { useState } from "react";

const moodOptions = [
  { emoji: "😊", feeling: "Happy" },
  { emoji: "😔", feeling: "Sad" },
  { emoji: "😡", feeling: "Angry" },
  { emoji: "😌", feeling: "Calm" },
  { emoji: "😴", feeling: "Tired" },
];

export default function MoodList({ moods, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editedMood, setEditedMood] = useState({ emoji: "", feeling: "", note: "" });

  const startEdit = (mood) => {
    setEditingId(mood.id);
    setEditedMood({ emoji: mood.emoji, feeling: mood.feeling, note: mood.note });
  };

  const saveEdit = (id) => {
    onUpdate(id, editedMood);
    setEditingId(null);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Mood History</h2>
      {moods.length === 0 && <p className="text-gray-500">No moods logged yet.</p>}
      {moods.map((mood) => (
        <div
          key={mood.id}
          className="flex items-center justify-between p-3 bg-purple-50 rounded-xl shadow-sm"
        >
          <div className="space-y-1">
            <span className="ml-2 text-gray-500 text-sm">
              {new Date(mood.date).toLocaleDateString()}
            </span>

            {editingId === mood.id ? (
              <div className="flex flex-col gap-2">
                {/* Mood dropdown */}
                <select
                  value={editedMood.feeling}
                  onChange={(e) => {
                    const selected = moodOptions.find((m) => m.feeling === e.target.value);
                    setEditedMood({ ...editedMood, feeling: selected.feeling, emoji: selected.emoji });
                  }}
                  className="border rounded px-2 py-1"
                >
                  {moodOptions.map((option) => (
                    <option key={option.feeling} value={option.feeling}>
                      {option.emoji} {option.feeling}
                    </option>
                  ))}
                </select>

                {/* Note input */}
                <input
                  value={editedMood.note}
                  onChange={(e) => setEditedMood({ ...editedMood, note: e.target.value })}
                  className="border rounded px-2 py-1 text-sm"
                  placeholder="Add a note..."
                />
              </div>
            ) : (
              <>
                <span className="font-medium">
                  {mood.emoji} {mood.feeling}
                </span>
                <div className="text-gray-600 text-sm">{mood.note}</div>
              </>
            )}
          </div>

          <div className="flex gap-2">
            {editingId === mood.id ? (
              <button
                onClick={() => saveEdit(mood.id)}
                className="text-green-600 hover:underline"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => startEdit(mood)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => onDelete(mood.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
