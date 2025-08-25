import React, { useState } from "react";
import QuoteGenerator from "./QuoteGenerator";

export default function JournalEntry({ onAddEntry }) {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("😊");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newEntry = {
      id: Date.now(),
      content,
      mood,
      date: new Date().toLocaleString(),
    };

    onAddEntry(newEntry);
    setContent(""); // reset
    setMood("😊");
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow">
      <QuoteGenerator />

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts..."
          className="w-full p-2 border rounded-lg"
          rows="3"
        />

        {/* Mood Picker */}
        <div className="flex items-center gap-3">
          <label className="font-medium">Mood:</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="😊">😊 Happy</option>
            <option value="😐">😐 Neutral</option>
            <option value="😞">😞 Sad</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
}
