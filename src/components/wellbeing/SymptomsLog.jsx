import React, { useState, useEffect } from "react";

const SymptomsLog = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [date, setDate] = useState("");
  const [symptom, setSymptom] = useState("");
  const [note, setNote] = useState("");

  const symptomOptions = [
    "Cramps",
    "Headache",
    "Back Pain",
    "Mood Swings",
    "Fatigue",
    "Bloating",
    "Acne",
    "Other",
  ];

  useEffect(() => {
    const saved = localStorage.getItem("symptomsLog");
    if (saved) setSymptoms(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("symptomsLog", JSON.stringify(symptoms));
  }, [symptoms]);

  const handleAdd = () => {
    if (!date || !symptom) return;

    const newEntry = {
      id: Date.now(),
      date,
      symptom,
      note,
    };

    setSymptoms([newEntry, ...symptoms]);
    setDate("");
    setSymptom("");
    setNote("");
  };

  const handleDelete = (id) => {
    setSymptoms(symptoms.filter((s) => s.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Log Symptoms</h2>

      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="date"
          className="border rounded p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          className="border rounded p-2"
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
        >
          <option value="">Select Symptom</option>
          {symptomOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="border rounded p-2 flex-1"
          placeholder="Optional note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">Logged Entries</h3>
      {symptoms.length === 0 ? (
        <p className="text-gray-500">No symptoms logged yet.</p>
      ) : (
        <ul className="space-y-2">
          {symptoms.map((entry) => (
            <li
              key={entry.id}
              className="border p-3 rounded bg-gray-50 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{entry.symptom}</p>
                <p className="text-sm text-gray-600">
                  {entry.date} {entry.note && `- ${entry.note}`}
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

export default SymptomsLog;

