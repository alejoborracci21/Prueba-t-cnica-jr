import { removeAllTasks } from '../firebase/firebaseServices';


export default async function deleteCollection(collectionName: string) {
        await removeAllTasks(collectionName);
        return 'collection deleted'
    }
