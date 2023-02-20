import React from "react";
import { TaskType } from "../../types";
import { useTask } from "../Context/TaskContext";

type TaskItemProps = {
  task: TaskType;
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask } = useTask();
  // console.log("TaskItem rendered with task", task);

  const handleTaskToggle = () => {
    if (!task._id) return; // type guard
    const updatedTask: TaskType = {
      _id: task._id,
      title: task.title,
      done: !task.done,
      priority: task.priority,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
    updateTask(task._id, updatedTask);
  };

  const handlePriorityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (!task._id) return; // type guard
    const updatedTask: TaskType = {
      _id: task._id,
      title: task.title,
      done: task.done,
      priority: event.target.value as TaskType["priority"],
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
    updateTask(task._id, updatedTask);
  };

  return (
    <div className="task-item">
      <input type="checkbox" checked={task.done} onChange={handleTaskToggle} />
      <span className={task.done ? "task-title task-done" : "task-title"}>
        {task.title}
      </span>
      <select value={task.priority} onChange={handlePriorityChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {task.createdAt && (
        <span className="task-created-at">
          {new Date(task.createdAt).toLocaleString()}
        </span>
      )}
      {task.updatedAt && (
        <span className="task-updated-at">
          {new Date(task.updatedAt).toLocaleString()}
        </span>
      )}
    </div>
  );
};

export default TaskItem;
