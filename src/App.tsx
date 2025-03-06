import './App.css'
import addtask from './hooks/addtask'
import getTasks from './hooks/getTask'
import { Task } from './interfaces/tasks'
import { useState, useEffect } from 'react'

function App() {
  const [allTasks, setAllTasks] = useState<Task[]>([])

  useEffect(() => {
    getTasks().then((tasks: Task[]) => {
      setAllTasks(tasks)
    }).catch(error => {
      console.error("Error fetching tasks:", error);
    });
  }, [allTasks])

  return (
    <>
      <div>
        <ul>
          {allTasks.map((task: Task) => (
            <div key={task.id}>
              <span>{task.text}</span>
            </div>
          ))}
        </ul>
      </div>
      <button onClick={() => addtask('hola')}>addtask</button>
    </>
  )
}

export default App