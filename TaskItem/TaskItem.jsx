import React from 'react';

export function TaskItem({ task, onToggle }) {
  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <span>{task.completed ? 'Completed' : 'Not completed'}</span>
      <button onClick={() => onToggle(task.id)}>
        Toggle Status
      </button>
    </div>
  );
}