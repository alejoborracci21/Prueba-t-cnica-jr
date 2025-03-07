import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, limit, writeBatch } from "firebase/firestore";

const tasksCollection = collection(db, "tasks");

// 🔹 Agregar una tarea y devolver su ID
export const addTask = async (text: string) => {
  const docRef = await addDoc(tasksCollection, {
    text,
    createdAt: Date.now()
  });
  return docRef.id;
};

// 🔹 Obtener tareas con su ID
export const getAllTasks = async () => {
  const q = query(tasksCollection, orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// 🔹 Eliminar la tarea más antigua (FIFO)
export const removeOldestTask = async () => {
  const q = query(tasksCollection, orderBy("createdAt", "asc"), limit(1));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const oldestTask = querySnapshot.docs[0];
    await deleteDoc(doc(db, "tasks", oldestTask.id)); 
  }
};

// 🔹 Eliminar todas las tareas
export const removeAllTasks = async (collectionName: string) => {
    const tasksCollection = collection(db, collectionName);
    const querySnapshot = await getDocs(tasksCollection);
    const batch = writeBatch(db);
    querySnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  };


export const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
  }