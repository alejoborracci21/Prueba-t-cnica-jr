"use client"

import { useState } from "react"
import getTasks from "../hooks/getTask"
import { Task } from "../interfaces/tasks"
import { useEffect } from "react"

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksFromFirestore = await getTasks()
      setTasks(tasksFromFirestore as Task[])
    }

    fetchTasks()
  }, [])

  // const toggleTaskCompletion = (taskId: number) => {
  //   setTasks(tasks.map((task) => (task.id == taskId ? { ...task, completed: !task.completed } : task)))
  // }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start gap-3">

            <div>
              <label htmlFor={`task-${task.id}`} className="font-medium cursor-pointer">
                {task.name}
              </label>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

