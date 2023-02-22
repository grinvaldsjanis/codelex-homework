import React, { useState, useContext } from "react";
import { Priority, TaskType } from "../../types";
import { TaskContext } from "../../components/Context/TaskContext";
import { useQueryClient } from "@tanstack/react-query";

type TaskItemProps = {
  task: TaskType;
};

const TaskItem = ({ task }: TaskItemProps) => {
  const { updateTask, deleteTask } = useContext(TaskContext);
  const [done, setDone] = useState(task.done);
  const [priority, setPriority] = useState(task.priority);
  const queryClient = useQueryClient();

  const handleCheckboxChange = () => {
    setDone(!done);
    updateTask(task._id!, { ...task, done: !done });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priorityValue = e.target.value as unknown as Priority;
    setPriority(priorityValue);
    updateTask(task._id!, { ...task, priority: priorityValue }).then(() => {
      queryClient.invalidateQueries(["tasks"]);
    });
  };

  const handleDeleteTask = () => {
    deleteTask(task._id!);
  };
  
  return (
    <li>
      <input type="checkbox" checked={done} onChange={handleCheckboxChange} />
      <span>{task.title}</span>
      <select value={priority} onChange={handlePriorityChange}>
        <option value="low">Low</option>
        <option value="moderate">Moderate</option>
        <option value="high">High</option>
        <option value="highest">Highest</option>
      </select>
      <button onClick={handleDeleteTask}>Delete</button>
    </li>
  );
};

export default TaskItem;
