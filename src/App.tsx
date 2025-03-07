import TaskList from "./components/Task-list"
import AddTaskForm from "./components/Add-task-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-black text-white p-4">
        <h1 className="text-sm font-medium">Tasks table</h1>
      </header>
      <div className="flex flex-col md:flex-row p-4 gap-4">
        <div className="w-full md:w-1/2 bg-white rounded-lg shadow-sm p-6">
          <TaskList />
        </div>
        <div className="w-full md:w-1/2 bg-white rounded-lg shadow-sm p-6">
          <AddTaskForm />
        </div>
      </div>
    </main>
  )
}
