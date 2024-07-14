import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyB15n5DA8A1iAXzC6UCNI1OtGzxk3n015U",
  authDomain: "tabel-62a00.firebaseapp.com",
  projectId: "tabel-62a00",
  storageBucket: "tabel-62a00.appspot.com",
  messagingSenderId: "360138574028",
  appId: "1:360138574028:web:a98077ea1fd4eeeed8da69",
  measurementId: "G-Z8EF7VE83T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const studentsCollection = collection(db, "students");

export const addStudent = async (student) => {
  await addDoc(studentsCollection, student);
};

export const getStudents = async () => {
  const querySnapshot = await getDocs(studentsCollection);
  const students = [];
  querySnapshot.forEach((doc) => {
    students.push({ ...doc.data(), id: doc.id });
  });
  return students;
};

export const updateStudent = async (id, student) => {
  const studentDoc = doc(db, "students", id);
  await updateDoc(studentDoc, student);
};

export const deleteStudent = async (id) => {
  const studentDoc = doc(db, "students", id);
  await deleteDoc(studentDoc);
};
