import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";


export default async function addtask(name: string, description: string) {
    const tasksCollection = collection(db, "tasks");
    try {
        await addDoc(tasksCollection, {
            name,
            description,
            createdAt: Date.now()
        });
        return 'Tarea agregada'
    } catch (error) {
        return error
    }
    }