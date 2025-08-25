import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";  // import Link

const QuickLinks = () => {
  const links = [
    { name: "FocusZone", icon: "📝", path: "/focuszone" },
    { name: "Mood", icon: "😊", path: "/mood" },
    { name: "Self-Care", icon: "🌿", path: "/selfcare" },
    { name: "Learn & Grow", icon: "📚", path: "/learn" },
    { name: "Journal", icon: "📖", path: "/journal" },
    { name: "Wellbeing", icon: "💖", path: "/wellbeing" },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 gap-7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.2 }}
    >
      {links.map((link) => (
        <motion.div
          key={link.name}
          whileHover={{ scale: 1.08, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to={link.path}
            className="block bg-[#ebdaf0] text-dark p-6 rounded-2xl shadow-md hover:shadow-lg hover:bg-[#FFE6E0] transition"
          >
            <div className="text-2xl mb-2">{link.icon}</div>
            <div className="font-semibold">{link.name}</div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default QuickLinks;
