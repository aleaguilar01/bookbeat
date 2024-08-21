import { useAuth } from '../../context/auth-context';
import { Outlet, Navigate} from "react-router-dom";


const PrivateRoute = () =>{
  const { user } = useAuth()
  return(
        user && user.token ? <Outlet /> : <Navigate to="login" />
      )
}

export default PrivateRoute;