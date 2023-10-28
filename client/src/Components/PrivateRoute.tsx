import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

function PrivateRoute() {
   const [currentUser, setCurrentUser] = useState(null)
   const {user}=useSelector((state:any)=>state.user)
    return (
       user ? <Outlet/> :<Navigate to={'/signup'}/>
    
  )
}

export default PrivateRoute