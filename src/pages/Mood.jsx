import React, { useState, useEffect } from "react";
import MoodCheckIn from "../components/mood/MoodCheckIn";
import MoodChart from "../components/mood/MoodChart";
import MoodList from "../components/mood/MoodList";

export default function Mood() {
  const [moods, setMoods] = useState([]);

 
  useEffect(() => {
    const storedMoods = localStorage.getItem("moods");
    if (storedMoods) setMoods(JSON.parse(storedMoods));
  }, []);

  
  useEffect(() => {
    localStorage.setItem("moods", JSON.stringify(moods));
  }, [moods]);

  const addMood = (mood) => setMoods([mood, ...moods]);
  const deleteMood = (id) => setMoods(moods.filter((m) => m.id !== id));

  
  const updateMood = (id, updatedMood) => {
    setMoods(moods.map((m) => (m.id === id ? { ...m, ...updatedMood } : m)));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-600">Mood Tracker 🌸</h1>

      <MoodCheckIn onAddMood={addMood} />
      <MoodChart moods={moods} />
      <MoodList moods={moods} onDelete={deleteMood} onUpdate={updateMood} />
    </div>
  );
}
