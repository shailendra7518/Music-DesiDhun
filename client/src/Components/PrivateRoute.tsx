import React,{useState} from 'react'
import { Navigate, Outlet } from 'react-router'

function PrivateRoute() {
   const [currentUser,setCurrentUser]=useState(null)
    return (
       currentUser ? <Outlet/> :<Navigate to={'/authentication'}/>
    
  )
}

export default PrivateRoute