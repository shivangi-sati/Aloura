// src/pages/FocusZone.jsx
import React, { useState, useEffect } from "react";
import TaskForm from "../components/focuszone/TaskForm";
import TaskList from "../components/focuszone/TaskList";
import TaskFilter from "../components/focuszone/TaskFilter";
import PomodoroTimer from "../components/focuszone/PomodoroTimer";
import ProductivityHeatmap from "../components/focuszone/ProductivityHeatmap";
import EnergyTracker from "../components/focuszone/EnergyTracker";
import { motion, AnimatePresence } from "framer-motion";

export default function FocusZone() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filterTag, setFilterTag] = useState("");
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [
      ...prev,
      { ...task, id: Date.now(), completed: false, sessions: 0 },
    ]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const incrementSessions = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, sessions: task.sessions + 1 } : task
      )
    );
  };

  const filteredTasks = filterTag
    ? tasks.filter((task) =>
        task.tags?.some((tag) =>
          tag.toLowerCase().includes(filterTag.toLowerCase())
        )
      )
    : tasks;

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Focus Zone
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TaskForm onAddTask={addTask} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <TaskFilter filterTag={filterTag} setFilterTag={setFilterTag} />
      </motion.div>

      <AnimatePresence>
        <motion.div
          key="tasklist"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <TaskList
            tasks={filteredTasks}
            onDeleteTask={deleteTask}
            onToggleComplete={toggleComplete}
            onStartPomodoro={(task) => setActiveTask(task)}
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {activeTask && (
          <motion.div
            key="pomodoro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            <PomodoroTimer
              task={activeTask}
              onClose={() => setActiveTask(null)}
              onSessionComplete={() => incrementSessions(activeTask.id)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        <motion.div
          variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
        >
          <ProductivityHeatmap tasks={tasks} />
        </motion.div>

        <motion.div
          variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
        >
          <EnergyTracker tasks={tasks} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}


