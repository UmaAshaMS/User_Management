// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-8d878.firebaseapp.com",
  projectId: "mern-auth-8d878",
  storageBucket: "mern-auth-8d878.firebasestorage.app",
  messagingSenderId: "61937551307",
  appId: "1:61937551307:web:3fb6ca824646cd5bd9984e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);