import { Task } from "../interfaces/tasks";

// Función para obtener todas las tareas del localStorage
export const getAllTasksFromLocalStorage = (): Task[] => {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  return tasks;
};

// Función para agregar una nueva tarea al localStorage
export const addTaskToLocalStorage = (task: Task): void => {
  const tasks = getAllTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Función para eliminar una tarea específica del localStorage
export const deleteTaskFromLocalStorage = (taskId: string): void => {
  const tasks = getAllTasksFromLocalStorage();
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
};

// Función para eliminar todas las tareas del localStorage
export const removeAllTasksFromLocalStorage = (): void => {
  localStorage.removeItem("tasks");
};

// Función para eliminar la tarea más antigua del localStorage
export const removeOldestTaskFromLocalStorage = (): void => {
  const tasks = getAllTasksFromLocalStorage();
  if (tasks.length > 0) {
    tasks.sort((a, b) => a.createdAt - b.createdAt);
    tasks.shift();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};