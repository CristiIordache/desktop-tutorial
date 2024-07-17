import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
  addDoc
} from "firebase/firestore";
import "./App.css";
import RegistrationForm from "./regist";

function App() {
  return (
    <div className="App">
      <h1>Apartment Management</h1>
      <RegistrationForm />
    </div>
  );
}


// function App() {
//   const [apartments, setApartments] = useState([]);
//   //primeste toate datele din apartament
//   // const apartmentsCollection=collection(db,"apartaments");

//   //specifica cautare

//   // const apartmentsCollection = query(
//   //   collection(db, "apartaments"),
//   //   where("ap_number", "==", 1221)
//   // );

//   //dupa id
//   const apartmentsCollection = doc(db, "apartaments", "vsPR9sn58p1mSxb1jfxy");

//   const getApartments = async () => {
//     //functionare cu sortare prin query
//     // const data = await getDocs(apartmentsCollection);
//     // data.docs.map((map) => {
//     //   let test = map.data();
//     //   console.log(test);
//     // });
//     // setApartments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     // const data = await getDoc(apartmentsCollection);
//     // const apartaments = data.data()
//     // console.log(apartaments)

//     // let apartmentsToUpdate = doc(db, "apartaments", "vsPR9sn58p1mSxb1jfxy");

//     // await updateDoc(apartmentsToUpdate, { ap_number: 991 });
//     // let ap = doc(db, "apartaments", "vsPR9sn58p1mSxb1jfxy");

//     // let data = await getDoc(ap);

//     // let apartaments = data.data();

//     // //delet
//     // let apdel = doc(db, "apartaments", "vsPR9sn58p1mSxb1jfxy")
//     // await deleteDoc(apdel)


//     //inserere document nou

//     const apartamentscolectie = collection(db, "apartaments")
//     await addDoc(apartamentscolectie, {
//       ap_nr: 12, ap_size:12,city:"braila"})


//     setApartments([{ ...apartaments }]);
//   };
//   useEffect(() => {
//     getApartments();
//   }, []);

//   return (
//     <>
//       {apartments.map((ap) => {
//         return (
//           <div key={ap.id}>
//             Apartment number: {ap.ap_number}
//             <br />
//             Apartment size: {ap.ap_size}
//             <br />
//             Street: {ap.street}
//             <hr />
//           </div>
//         );
//       })}
//     </>
//   );
// }

export default App;
