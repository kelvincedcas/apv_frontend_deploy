import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";

import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";

const AdminLayout = () => {

    const {auth, cargando} = useAuth();

    if(cargando) return <Spinner/>

    return ( 
        <>
            <Header/>
            <main className="text-neutral-600 mx-auto md:ml-70 p-4 md:p-8 mt-20">
                {auth?._id ? <Outlet/> : <Navigate to='/' />}
            </main>
        </>
     );
}
 
export default AdminLayout;