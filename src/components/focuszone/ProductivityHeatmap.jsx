import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function ProductivityHeatmap({ tasks }) {

  const data = tasks.map((t) => ({
    name: t.title,
    sessions: t.sessions || 0,
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Productivity Heatmap</h2>
      {data.length === 0 ? (
        <p className="text-gray-500">No productivity data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sessions" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}



