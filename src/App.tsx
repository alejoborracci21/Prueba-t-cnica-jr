import TaskList from "./components/Task-list"
import { TaskProvider } from "./context/TaskContext"

export default function Home() {
  return (
    <TaskProvider>
      <main className="min-h-screen bg-gray-200">
        <div className="flex flex-col items-center p-4 w-full">
          <div className="w-full bg-white rounded-lg shadow-md p-6">
            <TaskList />
          </div>
        </div>
      </main>
    </TaskProvider>
  )
}