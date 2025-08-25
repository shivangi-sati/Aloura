import React, { useState, useEffect } from "react";

const WellnessTips = () => {
  const [tips, setTips] = useState([]);
  const [newTip, setNewTip] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("wellnessTips");
    if (saved) setTips(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("wellnessTips", JSON.stringify(tips));
  }, [tips]);

  const handleAddTip = () => {
    if (!newTip.trim()) return;

    const tip = {
      id: Date.now(),
      text: newTip.trim(),
    };

    setTips([tip, ...tips]);
    setNewTip("");
  };

  const handleDelete = (id) => {
    setTips(tips.filter((t) => t.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Wellness Tips</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border rounded p-2 flex-1"
          placeholder="Add your wellness tip..."
          value={newTip}
          onChange={(e) => setNewTip(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleAddTip}
        >
          Add
        </button>
      </div>

      {tips.length === 0 ? (
        <p className="text-gray-500">No tips added yet.</p>
      ) : (
        <ul className="space-y-2">
          {tips.map((tip) => (
            <li
              key={tip.id}
              className="border p-3 rounded bg-gray-50 flex justify-between items-center"
            >
              {tip.text}
              <button
                onClick={() => handleDelete(tip.id)}
                className="text-red-600 hover:text-red-800 ml-4"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WellnessTips;

