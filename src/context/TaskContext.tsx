import React, { useState, useEffect, useCallback } from 'react';
import { getAllTasks } from '../firebase/firebaseServices';
import { Task } from '../interfaces/tasks';
import { TaskContext } from './useContext';

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

   useEffect(() => {
    refreshTasks();
  });
  
  const refreshTasks = useCallback(async () => {
    const tasksFromFirestore = await getAllTasks();
    setTasks(tasksFromFirestore as Task[]);
  }, []);
  
 

  const addTask = useCallback((task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, refreshTasks }}>
      {children}
    </TaskContext.Provider>
  );
};