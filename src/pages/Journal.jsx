import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import JournalEntry from "../components/journal/JournalEntry";
import JournalList from "../components/journal/JournalList";

export default function Journal() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("journalEntries");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry) => {
    setEntries((prev) => [entry, ...prev]);
  };

  const deleteEntry = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        My Journal 🪶
      </motion.h1>

      {/* Form entry animation */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <JournalEntry onAddEntry={addEntry} />
      </motion.div>

      {/* List animation */}
      <AnimatePresence>
        <JournalList entries={entries} onDelete={deleteEntry} />
      </AnimatePresence>
    </motion.div>
  );
}
