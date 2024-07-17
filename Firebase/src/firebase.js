// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJu9yQUC3tNuBlSBoS18lk5dz9iQmd6C4",
  authDomain: "firabase-f133b.firebaseapp.com",
  projectId: "firabase-f133b",
  storageBucket: "firabase-f133b.appspot.com",
  messagingSenderId: "662421566914",
  appId: "1:662421566914:web:00611f3768be575f88d25b",
  measurementId: "G-ZCPQ6D2VRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
