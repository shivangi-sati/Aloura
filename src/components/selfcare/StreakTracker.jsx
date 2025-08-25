import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STORAGE_KEY = "aloura_selfcare_checkins";

const StreakTracker = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const entries = JSON.parse(saved);
    const dates = entries.map((e) => e.date);

    let currentStreak = 0;
    let today = new Date();

    for (let i = 0; ; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toLocaleDateString();

      if (dates.includes(dateStr)) {
        currentStreak++;
      } else {
        break;
      }
    }

    setStreak(currentStreak);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-2xl shadow-md"
    >
      <h2 className="text-xl font-bold">🔥 Streak Tracker</h2>
      <p className="text-lg mt-2">You’re on a {streak}-day streak!</p>
    </motion.div>
  );
};

export default StreakTracker;
