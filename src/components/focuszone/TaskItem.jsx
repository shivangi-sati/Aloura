import { useState } from "react";
import PomodoroTimer from "./PomodoroTimer";

export default function TaskItem({
  task,
  onDeleteTask,
  onToggleComplete,
  onStartPomodoro,
}) {
  return (
    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
      <div>
        <h3 className={`font-medium ${task.completed ? "line-through" : ""}`}>
          {task.title}
        </h3>
        <p className="text-sm text-gray-500">
          {task.tags?.length ? task.tags.join(", ") : "No tags"}
        </p>
        <p className="text-xs text-gray-400">
          Sessions: {task.sessions || 0}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          {task.completed ? "Undo" : "Done"}
        </button>
        <button
          onClick={() => onStartPomodoro(task)}
          className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Start Timer
        </button>
        <button
          onClick={() => onDeleteTask(task.id)}
          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}




