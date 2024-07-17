import { useState,useEffect } from 'react'
import {db} from "./firebase"
import { collection,getDocs } from 'firebase/firestore'
import './App.css'

function App() {

  const [apartments,setApartments]=useState([]);

  const apartmentsCollection=collection(db,"apartaments");
  const getApartments =async () =>{
    const data = await getDocs(apartmentsCollection);
    data.docs.map((map)=>{
      let test = map.data();
      console.log(test);
    })
    setApartments(data.docs.map((doc)=>({...doc.data(),id:doc.id})));

  }
  useEffect(()=>{
    getApartments();
  },[])

  return (
    <>
     {apartments.map((ap)=>{
      return (
        <div key={ap.id}>
          Apartment number: {ap.ap_number}
          <br />
          Apartment size: {ap.ap_size}
          <br />
          Street: {ap.street}
          <hr />
        </div>
      )
     })}
    </>
  )
}

export default App