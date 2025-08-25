import React, { useState } from "react";

export default function MoodCheckIn({ onAddMood }) {
  const [mood, setMood] = useState("😊");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMood = {
      id: Date.now(),
      mood,
      date: new Date().toLocaleString(),
    };

    onAddMood(newMood);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg shadow space-y-3">
      <h2 className="text-lg font-bold">How are you feeling today? 🌸</h2>

      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="😊">😊 Happy</option>
        <option value="😐">😐 Neutral</option>
        <option value="😞">😞 Sad</option>
        <option value="😴">😴 Tired</option>
        <option value="😡">😡 Angry</option>
      </select>

      <button
        type="submit"
        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
      >
        Save Mood
      </button>
    </form>
  );
}
