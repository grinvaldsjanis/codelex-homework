import React, { createContext, useState, useEffect } from "react";
import { TaskType } from "./types";

interface TaskContextType {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  setTasks: () => {},
});

interface TaskContextProviderProps {
  children: React.ReactNode;
}

const TaskContextProvider: React.FC<TaskContextProviderProps> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskContextProvider };
