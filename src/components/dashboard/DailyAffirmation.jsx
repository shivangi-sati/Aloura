import React from "react";
import { motion } from "framer-motion";

export default function DailyAffirmation() {
  const affirmations = [
    "I am capable and confident 🌸",
    "Today, I choose positivity and focus ✨",
    "I am creating a life I love 💖",
  ];

  const randomAffirmation =
    affirmations[Math.floor(Math.random() * affirmations.length)];

  return (
    <motion.div
      className="bg-[#ebdaf0] p-6 rounded-2xl shadow-md flex flex-col justify-center items-center w-full max-w-md"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <h2 className="text-lg font-semibold mb-4 text-dark">
        Daily Affirmation
      </h2>
      <motion.p
        className="text-center text-xl italic text-dark"
        key={randomAffirmation} 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {randomAffirmation}
      </motion.p>
    </motion.div>
  );
}

