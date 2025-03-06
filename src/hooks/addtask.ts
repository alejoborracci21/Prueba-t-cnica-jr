import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";


export default async function addtask(text: string) {
    const tasksCollection = collection(db, "tasks");
    try {
        await addDoc(tasksCollection, {
            text,
            createdAt: Date.now()
        });
        return 'tarea agregada'
    } catch (error) {
        return error
    }
    return 
    }