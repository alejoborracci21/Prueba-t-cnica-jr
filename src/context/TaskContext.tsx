import React, { useState, useEffect } from 'react';
import { getAllTasks } from '../firebase/firebaseServices';
import { Task } from '../interfaces/tasks';
import { TaskContext } from './useContext';


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
