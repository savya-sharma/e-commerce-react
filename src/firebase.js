// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSQ3MxqTbo0bVPeiTZmJ7kJT4CiML5hek",
  authDomain: "e-commerce-e8494.firebaseapp.com",
  projectId: "e-commerce-e8494",
  storageBucket: "e-commerce-e8494.firebasestorage.app",
  messagingSenderId: "902992278502",
  appId: "1:902992278502:web:8a491e1563449f23915c27",
  measurementId: "G-T6SKFTKC70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);