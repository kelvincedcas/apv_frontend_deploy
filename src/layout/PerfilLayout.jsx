import { Outlet } from "react-router-dom";
import AdminNav from "../components/AdminNav";

const PerfilLayout = () => {
    return ( 
        <div className="bg-white p-8 md:p-10 rounded-4xl w-full lg:w-6/10 xl:w-5/10 mx-auto">
            <Outlet/>
        </div>
     );
}
 
export default PerfilLayout;