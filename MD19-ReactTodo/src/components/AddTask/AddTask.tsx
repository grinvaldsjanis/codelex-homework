import React, { useState } from "react";
import { TaskContext } from "../Context/TaskContext";

interface AddTaskProps {}

const AddTask: React.FC<AddTaskProps> = () => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskPriority, setNewTaskPriority] = useState<
    "highest" | "high" | "moderate" | "low"
  >("low");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priorityValue = e.target.value as "highest" | "high" | "moderate" | "low";
    if (priorityValue === "highest" || priorityValue === "high" || priorityValue === "moderate" || priorityValue === "low") {
      setNewTaskPriority(priorityValue);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, addTask: (newTaskTitle: string) => Promise<void>) => {
    e.preventDefault();
    addTask(newTaskTitle);
    setNewTaskTitle("");
    setNewTaskPriority("low");
  };

  return (
    <TaskContext.Consumer>
      {({ addTask }) => (
        <form onSubmit={(e) => handleSubmit(e, addTask)}>
          <label htmlFor="new-task-title">Task:</label>
          <input
            type="text"
            id="new-task-title"
            value={newTaskTitle}
            onChange={handleTitleChange}
          />

          <label htmlFor="new-task-priority">Priority:</label>
          <select
            id="new-task-priority"
            value={newTaskPriority}
            onChange={handlePriorityChange}
          >
            <option value="lowest">Lowest</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
            <option value="highest">Highest</option>
          </select>

          <button type="submit">Add Task</button>
        </form>
      )}
    </TaskContext.Consumer>
  );
};

export default AddTask;
