"use client"

import React, { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { isTaskDuplicate, addTask } from "../firebase/firebaseServices"
import { useTaskContext } from "../context/useContext"
import { getUserUid } from "../firebase/firebaseServices"
import { addTaskToLocalStorage } from "../hooks/storageServices"

export default function AddTaskForm({ onClose }: { onClose: () => void }) {
  const [taskName, setTaskName] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const { addTask: addTaskToContext, refreshTasks } = useTaskContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const userId = await getUserUid()

    if (!userId) {
      // Agregar la tarea al localStorage
      const newTask = {
        id: Date.now().toString(),
        name: taskName,
        description,
        createdAt: Date.now(),
        completed: false,
      };
      addTaskToLocalStorage(newTask);

      // Agregar la tarea al contexto
      addTaskToContext(newTask);

      // Limpiar el formulario
      setTaskName("");
      setDescription("");
      setError("");
      onClose();
      return;
    }

    // Validar que el nombre y la descripción no se repitan
    const isDuplicate = await isTaskDuplicate(taskName, description);

    if (isDuplicate) {
      setError("The task name or description already exists.");
      return;
    }

    // Agregar la tarea a Firestore
    const newTaskId = await addTask(taskName, description) as string

    // Agregar la tarea al contexto
    addTaskToContext({ id: newTaskId, name: taskName, description, createdAt: Date.now(), completed: false })

    // Refrescar las tareas desde Firestore
    await refreshTasks();

    // Limpiar el formulario
    setTaskName("")
    setDescription("")
    setError("")
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Add a new task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-2">
            <label htmlFor="taskName" className="block text-sm font-medium">
              Task name
            </label>
            <Input
              id="taskName"
              placeholder="Type task name"
              value={taskName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Type a description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" className="bg-gray-500 hover:bg-gray-600" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}