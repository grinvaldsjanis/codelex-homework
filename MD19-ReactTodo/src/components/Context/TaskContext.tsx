import { createContext, useContext, useState, useEffect } from 'react';
import { TaskType } from '../../types';
import { getTasksData, postTaskData, deleteTaskData, updateTaskData } from '../api/client';

type TaskContextType = {
  tasks: TaskType[];
  addTask: (title: string) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, updatedTaskData: TaskType) => void;
  updateTaskDone: (taskId: string, done: boolean) => void;
};

export const TaskContext = createContext<TaskContextType | null>(null);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

type TaskProviderProps = {
  children: React.ReactNode;
};

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTasksData();
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const addTask = async (title: string) => {
    const newTask: TaskType = {
      _id: String(Date.now()),
      title,
      done: false,
      priority: "low"
    };
    try {
      const data = await postTaskData(newTask);
      setTasks((prevTasks) => [...prevTasks, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await deleteTaskData(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (taskId: string, dataToUpdate: TaskType) => {
    try {
      const data = await updateTaskData(taskId, dataToUpdate);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === data.id ? data : task))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskDone = async (taskId: string, done: boolean) => {
    try {
      const taskToUpdate = tasks.find((task) => task._id === taskId);
      if (!taskToUpdate) {
        console.log(`Task with ID ${taskId} not found`);
        return;
      }
      const updatedTask = {
        ...taskToUpdate,
        done: done,
      };
      
      console.log('Before updateTaskData:', updatedTask);
      const data = await updateTaskData(taskId, updatedTask);
      console.log('After updateTaskData:', data);
      
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === data._id ? data : task))
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask, updateTaskDone }}>
      {children}
    </TaskContext.Provider>
  );
};
