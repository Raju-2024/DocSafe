// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA41JlK4DFnvZHgEwOKrjGVnoyxuBT0gTU",
  authDomain: "docsafe-8552c.firebaseapp.com",
  projectId: "docsafe-8552c",
  storageBucket: "docsafe-8552c.firebasestorage.app",
  messagingSenderId: "175930029593",
  appId: "1:175930029593:web:0709f4de268b0b01945c88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);