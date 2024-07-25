import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import{doCreateUserWithEmailAndPassword} from '../auth'
import { Button, TextField } from '@mui/material'
import Header from './header';
import { db } from '../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

function Register() {
  const [email,setEmail]=useState("")
    const [password, setPassword] = useState("")
    const [isReg, setISReg] = useState(false)
    const [errorMessage, setErrorMassage] = useState("")
    const { currentUser, userLoggedIn } = useAuth()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (currentUser) {
            navigate('/')
        }
    })


  async  function   handleClick() {
       //asta face sa nu poti sa apesi de mai multe ori cont 
        if (!isReg) {
            setISReg(true)
            await doCreateUserWithEmailAndPassword(email, password).then(async (user) => {
                setISReg(false)

                const userCollection = collection(db, "users")

                await setDoc(doc(db, "users", user.user.uid), { email: email, password: password })
                
                
                setEmail("")
                setPassword("")
                navigate('/')
            }).catch((error) => {
                console.log(error)
                setISReg(false)
            })
      }
  }
  return (
      <>
          <Header></Header>
   <TextField
   required
   id="email"
   label="Email:"
   onChange={(e)=>{setEmail(e.target.value)}}/>
   <TextField
   required
   id="password"
   label="Password:"
   onChange={(e)=>{setPassword(e.target.value)}}/>
   <Button variant="contained" onClick={handleClick}>Register</Button> 
   </>
  )
}
export default Register