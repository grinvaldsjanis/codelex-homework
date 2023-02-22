import React, { useContext } from "react";
import { TaskType } from "../../types";
import { TaskContext } from "../Context/TaskContext";
import TaskItem from "../TaskItem/TaskItem";

const TaskList = () => {
  const { tasks, isLoading } = useContext(TaskContext);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const sortedTasks = tasks.sort((a: TaskType, b: TaskType) => (a.priority - b.priority));

  return (
    <div>
      <h2>Task List</h2>
      {tasks && tasks.length ? (
        <ul>
          {sortedTasks.map((task: TaskType) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </ul>
      ) : (
        <p>No tasks yet!</p>
      )}
    </div>
  );
};

export default TaskList;
