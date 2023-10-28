import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

function PrivateRoute() {

   const {currentUser}=useSelector((state:any)=>state.user)
    return (
       currentUser? <Outlet/> :<Navigate to={'/signup'}/>
    
  )
}

export default PrivateRoute