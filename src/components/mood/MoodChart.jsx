import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function MoodChart({ moods }) {
  if (moods.length === 0) {
    return <p className="text-gray-500 italic mt-4">No mood data yet 📊</p>;
  }

  
  const moodScale = {
    "😊": 3,
    "😐": 2,
    "😞": 1,
    "😴": 1,
    "😡": 0,
  };

  const chartData = moods.map((m) => ({
    date: m.date.split(",")[0],
    moodValue: moodScale[m.mood],
    mood: m.mood,
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-6">
      <h2 className="text-lg font-bold mb-3">Mood Trends 📊</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 3]} tickFormatter={(v) => ["😡","😞","😐","😊"][v]} />
          <Tooltip formatter={(value, name, props) => props.payload.mood} />
          <Line type="monotone" dataKey="moodValue" stroke="#8b5cf6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
