import addtask from '../hooks/addtask'
import deleteCollection from '../hooks/deleteColleccion'
import getTasks from '../hooks/getTask'
import { Task } from '../interfaces/tasks'
import { useState, useEffect } from 'react'
import deleteTaskId from '../hooks/deleteTask'

export default function Table() {
  const [allTasks, setAllTasks] = useState<Task[]>([])

  useEffect(() => {
    getTasks().then((tasks: Task[]) => {
      setAllTasks(tasks)
    }).catch(error => {
      console.error("Error fetching tasks:", error);
    });
  }, [allTasks])

  return (
      <div className="flex justify-center items-center bg-slate-900">
        <ul className=" p-4 rounded-lg text-cyan-50 text-lg w-1/2">
          {allTasks.map((task: Task) => (
            <div key={task.id} className="flex justify-between items-center">
              <span>{task.text}</span>
              <button
                className="bg-red-400 p-2 m-2"
                onClick={() => deleteTaskId(task.id)}
              >
                delete
              </button>
            </div>
          ))}
        </ul>
        <button
          className="bg-green-600 p-4 w-1/2"
          onClick={() => addtask("hola")}
        >
          addtask
        </button>
        <button
          className="bg-red-600 p-4 w-1/2"
          onClick={() => deleteCollection("tasks")}
        >
          clean tasks
        </button>
      </div>
  );
}