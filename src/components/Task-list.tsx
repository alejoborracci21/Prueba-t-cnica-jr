"use client"

import { useState, useEffect } from "react"
import { useTaskContext } from "../context/TaskContext"
import AddTaskForm from "./AddTaskForm"

export default function TaskList() {
  const { tasks, setTasks, refreshTasks } = useTaskContext();
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  useEffect(() => {
    refreshTasks();
  }, []);

  const handleSaveChanges = () => {
    // Validar que no hay tareas predecesoras pendientes
    const hasPendingTasks = tasks.some(task => !task.completed)
    if (hasPendingTasks) {
      alert("There are pending tasks. Please complete them before saving changes.")
      return
    }

    // Guardar cambios (puedes implementar la lógica de guardado aquí)
    alert("Changes saved successfully!")
  }

  return (
    <div className="p-4 bg-gray-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Tasks</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 w-12 text-center">Check</th>
              <th className="py-2 px-4 border-b border-gray-300 text-center">Tasks</th>
              <th className="py-2 px-4 border-b border-gray-300 text-center">Description</th>
              <th className="py-2 px-4 border-b border-gray-300 text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-300 w-12 text-center">
                  <input type="checkbox" checked={task.completed} onChange={() => {
                    setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t))
                  }} />
                </td>
                <td className="py-2 px-4 border-b border-gray-300 text-center">{task.name}</td>
                <td className="py-2 px-4 border-b border-gray-300 text-center">{task.description}</td>
                <td className="py-2 px-4 border-b border-gray-300 text-center">{new Date(task.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleSaveChanges}>
          Save Changes
        </button>
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={() => setShowAddTaskForm(true)}>
          Add New Task
        </button>
      </div>
      {showAddTaskForm && <AddTaskForm onClose={() => setShowAddTaskForm(false)} />}
    </div>
  )
}