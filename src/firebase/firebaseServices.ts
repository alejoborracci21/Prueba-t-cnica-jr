import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, limit } from "firebase/firestore";

const tasksCollection = collection(db, "tasks");

// 🔹 Agregar una tarea y devolver su ID
export const addTask = async (text: string) => {
  const docRef = await addDoc(tasksCollection, {
    text,
    createdAt: Date.now()
  });
  return docRef.id; // 🔥 Aquí obtenemos el ID del documento
};

// 🔹 Obtener tareas con su ID
export const getAllTasks = async () => {
  const q = query(tasksCollection, orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // 🔥 Incluimos el ID
};

// 🔹 Eliminar la tarea más antigua (FIFO)
export const removeOldestTask = async () => {
  const q = query(tasksCollection, orderBy("createdAt", "asc"), limit(1));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const oldestTask = querySnapshot.docs[0];
    await deleteDoc(doc(db, "tasks", oldestTask.id)); // 🔥 Usamos el ID para eliminar
  }
};
