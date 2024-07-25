import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { doSignOut } from '../auth'
import { Button } from '@mui/material';
function Header() {
  const navigate =useNavigate();
  const {currentUser,userLoggedIn}=useAuth();
  return (
    <nav>
        {
          userLoggedIn?
          <>
          <Button onClick={()=>{doSignOut().then(()=>{navigate('/login')})}}
            variant="contained"
            >Logout</Button>
            <p>Hello user:{currentUser.email}</p>
          
          </>
          :
          <>
          <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>Register</Link>
          </>
          
        }
    </nav>
  )
}
export default Header