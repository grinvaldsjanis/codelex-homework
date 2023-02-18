import React, { useState } from "react";
import { TaskType } from "../../types";

interface TaskProps {
  task: TaskType;
  handleTaskUpdate: (updatedTask: TaskType) => void;
}

const TaskItem: React.FC<TaskProps> = ({ task, handleTaskUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setTitle(task.title);
    setEditing(false);
  };

  const handleSaveClick = () => {
    const updatedTask = {
      ...task,
      title,
    };
    handleTaskUpdate(updatedTask);
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>Priority: {task.priority}</p>
          <p>Created At: {task.createdAt.toString()}</p>
          <p>Updated At: {task.updatedAt.toString()}</p>
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
