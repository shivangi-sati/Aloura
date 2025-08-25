import React from "react";
import { motion } from "framer-motion";
import { BookOpen, PlayCircle, Podcast, Trash2 } from "lucide-react";

const ResourceCard = ({ resource, onToggleComplete, onDelete }) => {
  const icons = {
    article: <BookOpen className="w-5 h-5 text-indigo-500" />,
    video: <PlayCircle className="w-5 h-5 text-red-500" />,
    podcast: <Podcast className="w-5 h-5 text-green-500" />,
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white shadow-md rounded-2xl p-4 flex flex-col gap-2 relative"
    >
      {/* Delete Button */}
      <button
        onClick={() => onDelete(resource.id)}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2">
        {icons[resource.type]}
        <h3 className="font-semibold text-lg">{resource.title}</h3>
      </div>
      <p className="text-sm text-gray-600">{resource.description}</p>
      <a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 text-sm hover:underline"
      >
        Visit Resource →
      </a>
      <button
        onClick={() => onToggleComplete(resource.id)}
        className={`mt-2 px-3 py-1 rounded-lg text-sm ${
          resource.completed
            ? "bg-green-100 text-green-600"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {resource.completed ? "Completed" : "Mark as Complete"}
      </button>
    </motion.div>
  );
};

export default ResourceCard;

