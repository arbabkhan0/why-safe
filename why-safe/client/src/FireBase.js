// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuD7knCAXGqi-vTQuEwE7yzUZPf-HII2s",
  authDomain: "why-safe-d895b.firebaseapp.com",
  projectId: "why-safe-d895b",
  storageBucket: "why-safe-d895b.firebasestorage.app",
  messagingSenderId: "646749671066",
  appId: "1:646749671066:web:e06fd709bcebd35c6f9923",
  measurementId: "G-3BW9Z22FWX"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export const logout = () => {
  return signOut(auth);
};
