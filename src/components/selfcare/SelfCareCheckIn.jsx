import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const STORAGE_KEY = "aloura_selfcare_checkins";

const SelfCareCheckIn = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({ mood: "", activity: "" });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = (e) => {
    e.preventDefault();
    if (!form.mood || !form.activity) return;

    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      ...form,
    };

    setEntries((prev) => [newEntry, ...prev]);
    setForm({ mood: "", activity: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800">🧘 Self-Care Check-In</h2>

      {/* Check-in Form */}
      <form onSubmit={addEntry} className="space-y-3">
        <select
          value={form.mood}
          onChange={(e) => setForm((p) => ({ ...p, mood: e.target.value }))}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">How do you feel?</option>
          <option value="😊 Happy">😊 Happy</option>
          <option value="😐 Neutral">😐 Neutral</option>
          <option value="😔 Sad">😔 Sad</option>
          <option value="😤 Stressed">😤 Stressed</option>
        </select>

        <input
          type="text"
          placeholder="What self-care activity did you do?"
          value={form.activity}
          onChange={(e) =>
            setForm((p) => ({ ...p, activity: e.target.value }))
          }
          className="w-full border rounded-lg px-3 py-2"
        />

        <button className="w-full bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700">
          Save Check-In
        </button>
      </form>

      {/* Recent Entries */}
      <div className="space-y-2">
        <h3 className="text-md font-semibold text-gray-700">Recent Check-Ins</h3>
        {entries.length === 0 ? (
          <p className="text-gray-500 text-sm">No check-ins yet.</p>
        ) : (
          <ul className="space-y-2">
            {entries.slice(0, 5).map((e) => (
              <li
                key={e.id}
                className="border rounded-lg p-2 text-sm flex justify-between"
              >
                <span>
                  {e.date}: {e.mood} – {e.activity}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default SelfCareCheckIn;
