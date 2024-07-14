// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ1OGWdeTo2mbCUgzqS4PlNkB0-8HcmZc",
  authDomain: "login-page-69be3.firebaseapp.com",
  projectId: "login-page-69be3",
  storageBucket: "login-page-69be3.appspot.com",
  messagingSenderId: "167858456346",
  appId: "1:167858456346:web:706c922a3d99289dbe4ea3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export default app