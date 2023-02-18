import React, { useContext } from "react";
import { TaskType } from "../../types";
import { TaskContext } from "../../TaskContext";
import TaskItem from "../Task/TaskItem";

const TaskList = () => {
    const { tasks, setTasks } = useContext(TaskContext);
  
    const handleTaskUpdate = (updatedTask) => {
      const updatedTasks = tasks.map((task) => {
        if (task._id === updatedTask._id) {
          return updatedTask;
        }
        return task;
      });
      setTasks(updatedTasks);
    };
  
    return (
      <div>
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} handleTaskUpdate={handleTaskUpdate} />
        ))}
      </div>
    );
  };
  
  export default TaskList;
