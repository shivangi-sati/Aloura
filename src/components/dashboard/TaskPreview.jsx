import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskPreview() {
  const [tasks, setTasks] = useState([
    { title: "Submit Resume", done: false },
    { title: "Yoga & Hydrate", done: true },
    { title: "Write Journal Entry", done: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const toggleTask = (index) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks((prev) => [...prev, { title: newTask, done: false }]);
    setNewTask("");
  };

  return (
    <motion.div
      className="bg-[#FFE6E0] p-6 rounded-2xl shadow-md w-full max-w-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-lg font-semibold text-dark mb-4">Today's Tasks</h2>

      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <motion.button
          type="submit"
          className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          Add
        </motion.button>
      </form>

      <ul className="space-y-2">
        <AnimatePresence>
          {tasks.map((task, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-xl flex items-center justify-between ${
                task.done ? "bg-[#C3E8BD]/30 line-through" : "bg-base"
              }`}
            >
              <span
                onClick={() => toggleTask(index)}
                className="cursor-pointer flex-1"
              >
                {task.title}
              </span>
              <div className="flex gap-2">
                {task.done && (
                  <motion.span
                    className="text-success"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    ✔
                  </motion.span>
                )}
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✖
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
}
