import { db, auth } from "./firebaseConfig";
import { collection, getDocs, query, where, addDoc, orderBy, limit, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";


// Servicios necesarios

// 1 - Un servicio que traiga el UID del usuario

// 2 - Un servicio que reciba un UID y cree una colección con ese UID 

// 3 - Un servicio que reciba (UID , task y descripción) y cree dentro de la colección que coincida con ese UID una task con la descripción y el nombre que recibe por parámetro

// 4 - Un servicio que reciba un UID y elimine la ultima task de esa colección

// 5 - Un servicio que reciba un UID y traiga todas las tareas de esa coleccion

// 6 - Un servicio que reciba un (UID, nombre) vaya a la coleccion y verifique esa task no se repite



// 1 - Un servicio que traiga el UID del usuario
const getUserUid = (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.uid);
      } else {
        resolve(null);
      }
      unsubscribe();
    }, reject);
  });
};

// 2 - Un servicio que reciba un UID y cree una colección con ese UID 
const createCollection = async (uid: string) => {
}


// 🔹 Validar si una tarea ya existe
export const isTaskDuplicate = async (name: string, description: string): Promise<boolean> => {
  const uid = await getUserUid();
  if (!uid) throw new Error("User not authenticated");

  const tasksCollection = collection(db, `${uid}/tasks`);
  const q = query(tasksCollection, where("name", "==", name), where("description", "==", description));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

// 🔹 Agregar una tarea y devolver su ID
export const addTask = async (name: string, description: string) => {
  const uid = await getUserUid();
  if (!uid) throw new Error("User not authenticated");

  const tasksCollection = collection(db, `${uid}/${name}`);
  const docRef = await addDoc(tasksCollection, {
    name,
    description,
    createdAt: Date.now()
  });
  return docRef.id;
};

// 🔹 Obtener tareas con su ID
export const getAllTasks = async () => {
  const uid = await getUserUid();
  if (!uid) throw new Error("User not authenticated");

  const tasksCollection = collection(db, `${uid}/tasks`);
  const q = query(tasksCollection, orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// 🔹 Eliminar la tarea más antigua (FIFO)
export const removeOldestTask = async () => {
  const uid = await getUserUid();
  if (!uid) throw new Error("User not authenticated");

  const tasksCollection = collection(db, `${uid}/tasks`);
  const q = query(tasksCollection, orderBy("createdAt", "asc"), limit(1));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const oldestTask = querySnapshot.docs[0];
    await deleteDoc(doc(db, `users/${uid}/tasks`, oldestTask.id)); 
  }
};

// 🔹 Eliminar todas las tareas
export const removeAllTasks = async () => {
  const uid = await getUserUid();
  if (!uid) throw new Error("User not authenticated");

  const tasksCollection = collection(db, `${uid}/tasks`);
  const querySnapshot = await getDocs(tasksCollection);
  const batch = writeBatch(db);
  querySnapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();
};

export const deleteTask = async (id: string) => {
  const uid = await getUserUid();
  if (!uid) throw new Error("User not authenticated");

  await deleteDoc(doc(db, `users/${uid}/tasks`, id));
};

import { createUserWithEmailAndPassword } from "firebase/auth";

export const registerUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};




