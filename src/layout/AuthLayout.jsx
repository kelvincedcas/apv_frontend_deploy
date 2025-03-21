import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";

const AuthLayout = () => {
   const {auth, cargando} = useAuth();

   if(cargando) return <Spinner/>

    return ( 
        <>
           <div className="w-99/100 md:w-9/10 lg:grid lg:grid-cols-2 m-auto lg:gap-14 py-5 min-h-screen flex flex-col justify-center">
                {!auth?._id ? <Outlet/> : <Navigate to='/admin' />}
           </div>
        </>
     );
}
 
export default AuthLayout;