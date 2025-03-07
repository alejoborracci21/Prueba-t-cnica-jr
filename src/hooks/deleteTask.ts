import { deleteTask } from '../firebase/firebaseServices';


export default async function deleteTaskId(id: string) {
        await deleteTask(id);
        return 'collection deleted'
    }
