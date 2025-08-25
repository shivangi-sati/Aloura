import React, { useState, useEffect } from "react";

export default function PomodoroTimer({ task, onClose, onSessionComplete }) {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((t) => t - 1), 1000);
    } else if (time === 0) {
      setIsRunning(false);
      onSessionComplete();
      alert(`Session complete for "${task.title}" 🎉`);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-xl font-semibold mb-4">Pomodoro for {task.title}</h2>
        <p className="text-4xl font-bold mb-4">{formatTime(time)}</p>
        <div className="flex justify-center gap-4">
          {!isRunning ? (
            <button
              onClick={() => setIsRunning(true)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Start
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(false)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Pause
            </button>
          )}
          <button
            onClick={() => setTime(25 * 60)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}





