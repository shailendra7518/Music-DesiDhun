
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
import { toast } from 'react-toastify';

function PrivateRoute() {

   const { currentUser } = useSelector((state: any) => state.user)
   if (!currentUser) {
      toast.warn("Please SignIn to access page")
   }
    return (
       currentUser?  <Outlet/> :<Navigate to={'/signup'}/>
    
  )
}

export default PrivateRoute