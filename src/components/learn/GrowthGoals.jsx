import React, { useState, useMemo, useEffect } from "react";
import ResourceCard from "./ResourceCard";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell } from "recharts";

const STORAGE_KEY = "aloura_learn_resources";

const GrowthGoals = () => {
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Learn React Basics",
            description: "A beginner-friendly article on React fundamentals.",
            type: "article",
            link: "https://react.dev/learn",
            completed: false,
          },
          {
            id: 2,
            title: "CSS Grid Crash Course",
            description: "YouTube video explaining CSS Grid in detail.",
            type: "video",
            link: "https://www.youtube.com/watch?v=EFafSYg-PkI",
            completed: false,
          },
          {
            id: 3,
            title: "Mindfulness & Productivity",
            description: "Podcast on how mindfulness improves focus.",
            type: "podcast",
            link: "https://example.com/podcast",
            completed: false,
          },
        ];
  });

  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  }, [resources]);

  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    type: "article",
    link: "",
  });

  const toggleComplete = (id) => {
    setResources((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, completed: !res.completed } : res
      )
    );
  };

  const addResource = (e) => {
    e.preventDefault();
    if (!newResource.title || !newResource.link) return;

    const newEntry = {
      id: Date.now(),
      ...newResource,
      completed: false,
    };

    setResources((prev) => [...prev, newEntry]);
    setNewResource({ title: "", description: "", type: "article", link: "" });
  };

  const deleteResource = (id) => {
    setResources((prev) => prev.filter((res) => res.id !== id));
  };

  // Progress
  const completedCount = useMemo(
    () => resources.filter((r) => r.completed).length,
    [resources]
  );
  const total = resources.length;
  const progress = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  const data = [
    { name: "Completed", value: completedCount },
    { name: "Remaining", value: total - completedCount },
  ];
  const COLORS = ["#4ade80", "#e5e7eb"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">📚 Growth Goals</h2>
      <p className="text-gray-600">
        Track your personal development and explore curated learning resources.
      </p>

      {/* Progress Tracker */}
      <div className="flex items-center gap-8 bg-white shadow rounded-2xl p-4 w-fit">
        <PieChart width={100} height={100}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={45}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                cornerRadius={5}
              />
            ))}
          </Pie>
        </PieChart>
        <div>
          <p className="text-lg font-semibold">{progress}% Completed</p>
          <p className="text-sm text-gray-500">
            {completedCount} of {total} resources
          </p>
        </div>
      </div>

      <form
        onSubmit={addResource}
        className="bg-white shadow-md rounded-2xl p-4 space-y-4 max-w-lg"
      >
        <h3 className="text-lg font-semibold text-gray-700">
          ➕ Add a New Resource
        </h3>

        <input
          type="text"
          placeholder="Title"
          value={newResource.title}
          onChange={(e) =>
            setNewResource((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />

        <textarea
          placeholder="Description (optional)"
          value={newResource.description}
          onChange={(e) =>
            setNewResource((prev) => ({ ...prev, description: e.target.value }))
          }
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />

        <select
          value={newResource.type}
          onChange={(e) =>
            setNewResource((prev) => ({ ...prev, type: e.target.value }))
          }
          className="w-full border rounded-lg px-3 py-2 text-sm"
        >
          <option value="article">📖 Article</option>
          <option value="video">🎥 Video</option>
          <option value="podcast">🎙️ Podcast</option>
        </select>

        <input
          type="url"
          placeholder="Link"
          value={newResource.link}
          onChange={(e) =>
            setNewResource((prev) => ({ ...prev, link: e.target.value }))
          }
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-indigo-700"
        >
          Add Resource
        </button>
      </form>

      {/* Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => (
          <ResourceCard
            key={res.id}
            resource={res}
            onToggleComplete={toggleComplete}
            onDelete={deleteResource}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default GrowthGoals;
