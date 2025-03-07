"use client"

import React, { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { isTaskDuplicate, addTask } from "../firebase/firebaseServices"

export default function AddTaskForm() {
  const [taskName, setTaskName] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar que el nombre y la descripción no se repitan
    const isDuplicate = await isTaskDuplicate(taskName, description)

    if (isDuplicate) {
      setError("El nombre o la descripción de la tarea ya existe.")
      return
    }

    // Agregar la tarea a Firestore
    await addTask(taskName, description)

    // Limpiar el formulario
    setTaskName("")
    setDescription("")
    setError("")
  }

  return (
    <div>
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
            onChange={(e) => setTaskName(e.target.value)}
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
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
          Add
        </Button>
      </form>
    </div>
  )
}