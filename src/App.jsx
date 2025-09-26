import React, { useEffect } from 'react'
import Home from './pages/home/home'
import Player from './pages/player/player'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/login/login'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { toast , ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const App = () => {

  const navigate = useNavigate()

useEffect(()=>{

onAuthStateChanged(auth,async (user)=>{
if(user){
  console.log("logged In")
  navigate('/')
}else{
  console.log("logged Out")
  navigate('/login')
}


})

},[])



  return (
    <div>
      <ToastContainer  theme='dark'   />
        <Routes>
          <Route  path='/' element={<Home/>}/>
          <Route  path='/login' element={<Login/>}/>
          <Route  path='/player/:id' element={<Player/>}/>
        </Routes>



      
    </div>
  )
}

export default App
