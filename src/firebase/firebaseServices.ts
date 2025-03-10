import { db, auth } from "./firebaseConfig";
import { collection, getDocs, query, where, addDoc, orderBy, limit, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

//! 1 - Un servicio que traiga el UID del usuario
export const getUserUid = (): Promise<string | null> => {
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


//! 2 - Un servicio que reciba un UID y cree una colección con ese UID 
export const createCollection = async (uid: string) => {
  const tasksCollection = collection(db, `users/${uid}/tasks`);
  // No es necesario crear explícitamente la colección, Firestore la crea automáticamente cuando se agrega el primer documento.
  return tasksCollection;
};

//! 3 - Un servicio que reciba (UID , task y descripción) y cree dentro de la colección que coincida con ese UID una task con la descripción y el nombre que recibe por parámetro
export const addTask = async (name: string, description: string) => {
  const uid = await getUserUid();

  if (!uid) throw new Error("User not authenticated");

  const tasksCollection = collection(db, `users/${uid}/tasks`);
  const docRef = await addDoc(tasksCollection, {
    name,
    description,
    createdAt: Date.now(),
    completed: false
  });
  return docRef.id;
};

//! 4 - Un servicio que reciba un UID y elimine la ultima task de esa colección
export const removeOldestTask = async () => {
  const uid = await getUserUid();
  if (!uid) throw new Error("User not authenticated");

  const tasksCollection = collection(db, `users/${uid}/tasks`);
  const q = query(tasksCollection, orderBy("createdAt", "asc"), limit(1));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const oldestTask = querySnapshot.docs[0];
    await deleteDoc(doc(db, `users/${uid}/tasks`, oldestTask.id)); 
  }
};

//! 5 - Un servicio que reciba un UID y traiga todas las tareas de esa coleccion
export const getAllTasks = async () => {
  const uid = await getUserUid();
  if (!uid) throw new Error("User not authenticated");

  const tasksCollection = collection(db, `users/${uid}/tasks`);
  const q = query(tasksCollection, orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

//! 6 - Un servicio que reciba un (UID, nombre) vaya a la coleccion y verifique esa task no se repite
export const isTaskDuplicate = async (name: string, description: string): Promise<boolean> => {
  const uid = await getUserUid();
  if (!uid) throw new Error("User not authenticated");

  const tasksCollection = collection(db, `users/${uid}/tasks`);
  const q = query(
    tasksCollection,
    where("name", "==", name),
    where("description", "==", description),
    where("completed", "==", false) // Ignorar tareas completadas
  );
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

//! Eliminar todas las tareas
//? No se si lo voy a necesitar
export const removeAllTasks = async () => {
  const uid = await getUserUid();
  if (!uid) throw new Error("User not authenticated");

  const tasksCollection = collection(db, `users/${uid}/tasks`);
  const querySnapshot = await getDocs(tasksCollection);
  const batch = writeBatch(db);
  querySnapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();
};

//! Servicio que elimina una tarea especifica
export const deleteTask = async (id: string) => {
  const uid = await getUserUid();
  if (!uid) throw new Error("User not authenticated");

  await deleteDoc(doc(db, `users/${uid}/tasks`, id));
};


//!
export const completeTasks = async (taskIds: string[]) => {
  const uid = await getUserUid();
  if (!uid) throw new Error("User not authenticated");

  const batch = writeBatch(db);
  taskIds.forEach((taskId) => {
    const taskDocRef = doc(db, `users/${uid}/tasks`, taskId);
    batch.update(taskDocRef, { completed: true });
  });
  await batch.commit();
};


import { createUserWithEmailAndPassword } from "firebase/auth";

export const registerUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};




