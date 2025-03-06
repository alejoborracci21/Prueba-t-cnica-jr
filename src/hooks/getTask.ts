import { getAllTasks } from "../firebase/firebaseServices";
import { Task } from '../interfaces/tasks';

export default async function getTasks(): Promise<Task[]> {
        const tasks = await getAllTasks();
        console.log(tasks)
        return tasks as Task[];
    }
