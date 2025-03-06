// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcZUlOrlkIvXI5vMV-ezsHjn2PvbjC8pw",
  authDomain: "loginusers-d78c7.firebaseapp.com",
  projectId: "loginusers-d78c7",
  storageBucket: "loginusers-d78c7.firebasestorage.app",
  messagingSenderId: "634361084443",
  appId: "1:634361084443:web:c538d05dad8834506856be",
  measurementId: "G-RLL0TLTQCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);