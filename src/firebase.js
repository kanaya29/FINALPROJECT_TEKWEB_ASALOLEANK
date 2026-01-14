import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB82UAsGQaBLrRekqVOnQxJOOZ6oDkRlvg",
  authDomain: "authmonggoticket.firebaseapp.com",
  projectId: "authmonggoticket",
  storageBucket: "authmonggoticket.firebasestorage.app",
  messagingSenderId: "708816274074",
  appId: "1:708816274074:web:1150ed2758428445381523",
  measurementId: "G-Y1PMZ8HQ98"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
