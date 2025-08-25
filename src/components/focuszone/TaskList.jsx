import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  onDeleteTask,
  onToggleComplete,
  onStartPomodoro,
}) {
  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks yet. Add one above!</p>;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onToggleComplete={onToggleComplete}
          onStartPomodoro={onStartPomodoro}
        />
      ))}
    </div>
  );
}


