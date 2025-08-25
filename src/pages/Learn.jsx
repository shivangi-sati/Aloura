import React from "react";
import { motion } from "framer-motion";
import GrowthGoals from "../components/learn/GrowthGoals";

const Learn = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-purple-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <GrowthGoals />
      </motion.div>
    </motion.div>
  );
};

export default Learn;

