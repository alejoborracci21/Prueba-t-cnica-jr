"use client"

import { useState, useEffect } from "react"
import AddTaskForm from "./AddTaskForm"
import { completeTasks, getUserUid } from "../firebase/firebaseServices"
import { Task } from "../interfaces/tasks"
import { getAllTasksFromLocalStorage } from "../hooks/storageServices"
import { useTaskContext } from "../context/useContext"

export default function TaskList() {
  const { tasks, setTasks, refreshTasks } = useTaskContext();
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      const userId = await getUserUid();
      if (userId) {
        // Si el usuario está autenticado, cargar las tareas desde Firestore
        await refreshTasks();
      } else {
        // Si el usuario no está autenticado, cargar las tareas desde el localStorage
        const tasksFromLocalStorage = getAllTasksFromLocalStorage();
        setTasks(tasksFromLocalStorage);
      }
    };

    loadTasks();
  }, [setTasks, refreshTasks]);

  const handleCompleteTask = async (taskId: string) => {
    const userId = await getUserUid();
    if (userId) {
      // Si el usuario está autenticado, completar la tarea en Firestore
      await completeTasks([taskId]);
      await refreshTasks();
    } else {
      // Si el usuario no está autenticado, completar la tarea en el localStorage
      const tasksFromLocalStorage = getAllTasksFromLocalStorage();
      const updatedTasks = tasksFromLocalStorage.map((task: Task) =>
        task.id === taskId ? { ...task, completed: true } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    }
  };

  // Verificar que tasks no sea undefined antes de aplicar filter
  const incompleteTasks = tasks ? tasks.filter(task => !task.completed) : [];

  return (
    <div className="p-4 bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Tasks</h2>
      <div className="overflow-x-auto">
        {incompleteTasks.length === 0 ? (
          <p className="text-center text-gray-500">No pending tasks</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-[#fb6946] text-white">
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 w-12 text-center">Check</th>
                <th className="py-2 px-4 border-b border-gray-300 text-center">Tasks</th>
                <th className="py-2 px-4 border-b border-gray-300 text-center">Description</th>
                <th className="py-2 px-4 border-b border-gray-300 text-center">Date</th>
              </tr>
            </thead>
            <tbody>
              {incompleteTasks.map((task) => (
                <tr key={task.id} className="hover:bg-[#ffe5e0]">
                  <td className="py-2 px-4 border-b border-gray-300 w-12 text-center">
                    <input
                      type="checkbox"
                      checked={selectedTaskId === task.id}
                      onChange={() => {
                        setSelectedTaskId(task.id);
                        handleCompleteTask(task.id);
                      }}
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center">{task.name}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center">{task.description}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-center">{new Date(task.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button className="bg-[#fb6946] text-white py-2 px-4 rounded hover:bg-[#e05c3e]" onClick={() => setShowAddTaskForm(true)}>
          Add New Task
        </button>
      </div>
      {showAddTaskForm && <AddTaskForm onClose={() => setShowAddTaskForm(false)} />}
    </div>
  )
}