import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import QuickLinks from "../components/dashboard/QuickLinks";
import TaskPreview from "../components/dashboard/TaskPreview";
import DailyAffirmation from "../components/dashboard/DailyAffirmation";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUserName(savedName);
    } else {
      setShowModal(true);
    }
  }, []);

  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserName(tempName);
      localStorage.setItem("userName", tempName);
      setShowModal(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col w-full min-h-screen items-center gap-9 flex-wrap mt-0.5 space-y-6"
    >

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="m-5 text-center"
      >
        <h1 className="font-extrabold italic text-4xl">
          Hello, {userName || "Friend"} 🌻
        </h1>
        <p className="px-4 md:px-24 italic font-light">
          Here's your day at a glance...🌟
        </p>
      </motion.div>

     
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
        className="flex flex-col flex-wrap items-center gap-9"
      >
        <QuickLinks />
        <TaskPreview />
        <DailyAffirmation />
      </motion.div>

     
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center"
          >
            <h2 className="text-xl font-bold mb-4">Welcome! 🌸</h2>
            <p className="mb-3">What's your name?</p>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              onClick={handleSaveName}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
            >
              Save
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;


