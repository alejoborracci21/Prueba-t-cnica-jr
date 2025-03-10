import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllTasks } from '../firebase/firebaseServices';
import { Task } from '../interfaces/tasks';

interface TaskContextProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addTask: (task: Task) => void;
  refreshTasks: () => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    refreshTasks();
  }, []);

  const refreshTasks = async () => {
    const tasksFromFirestore = await getAllTasks();
    setTasks(tasksFromFirestore as Task[]);
  };

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, refreshTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};