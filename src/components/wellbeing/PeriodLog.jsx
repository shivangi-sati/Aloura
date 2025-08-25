import React, { useState, useEffect } from "react";

const PeriodLog = () => {
  const [periods, setPeriods] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("periodLogs");
    if (saved) setPeriods(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("periodLogs", JSON.stringify(periods));
  }, [periods]);

  const handleAdd = () => {
    if (!startDate || !endDate) return;

    const newEntry = {
      id: Date.now(),
      startDate,
      endDate,
    };

    setPeriods([newEntry, ...periods]);
    setStartDate("");
    setEndDate("");
  };

  const handleDelete = (id) => {
    setPeriods(periods.filter((p) => p.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Log Period</h2>

      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="date"
          className="border rounded p-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border rounded p-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">Logged Periods</h3>
      {periods.length === 0 ? (
        <p className="text-gray-500">No periods logged yet.</p>
      ) : (
        <ul className="space-y-2">
          {periods.map((entry) => (
            <li
              key={entry.id}
              className="border p-3 rounded bg-gray-50 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  {entry.startDate} → {entry.endDate}
                </p>
              </div>
              <button
                onClick={() => handleDelete(entry.id)}
                className="text-red-600 hover:text-red-800"
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

export default PeriodLog;
