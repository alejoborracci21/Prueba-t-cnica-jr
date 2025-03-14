import TaskList from "./components/TaskList";
import { TaskProvider } from "./context/TaskContext";
import UserMenu from "./components/UserMenu";

export default function Home() {
  return (
    <TaskProvider>
      <main className="min-h-screen bg-gray-200">
        <div className="relative">
          <UserMenu />
        </div>
        <TaskList />
      </main>
    </TaskProvider>
  );
}