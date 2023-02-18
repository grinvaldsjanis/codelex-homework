import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postTask } from "../api/client";
import { TaskType } from "../../types";

interface AddTaskFormProps {
  newTaskTitle: string;
  newTaskPriority: "highest" | "high" | "moderate" | "low";
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriorityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  newTaskTitle,
  newTaskPriority,
  handleTitleChange,
  handlePriorityChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={newTaskTitle} onChange={handleTitleChange} />
      </label>
      <br />
      <label>
        Priority:
        <select value={newTaskPriority} onChange={handlePriorityChange}>
          <option value="highest">Highest</option>
          <option value="high">High</option>
          <option value="moderate">Moderate</option>
          <option value="low">Low</option>
        </select>
      </label>
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
