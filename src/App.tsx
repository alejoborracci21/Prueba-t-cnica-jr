import TaskList from "./components/TaskList";
import { TaskProvider } from "./context/TaskContext";

export default function Home() {
  return (
    <TaskProvider>
      <main className="min-h-screen bg-gray-200">
        <TaskList />
      </main>
    </TaskProvider>
  );
}