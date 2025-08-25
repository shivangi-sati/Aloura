import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function EnergyTracker({ tasks }) {
  const data = tasks.map((t, i) => ({
    day: `Task ${i + 1}`,
    energy: (t.sessions || 0) * 10 + 50,
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Energy Tracker</h2>
      {data.length === 0 ? (
        <p className="text-gray-500">No energy data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

