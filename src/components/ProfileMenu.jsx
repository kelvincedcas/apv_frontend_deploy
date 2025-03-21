import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const ProfileMenu = ({profileMenuFlag, setProfileMenuFlag, navbarFlag, setNavbarFlag}) => {
    
const {cerrarSesion} = useAuth();
    return ( 
        <>
            {profileMenuFlag &&
            <div className="bg-white border-1 border-neutral-100 p-3 w-45 text-neutral-600 text-sm rounded-lg flex flex-col absolute mt-1 duration-200 ease-in -ml-4">
                <Link 
                className="p-3 hover:bg-primary rounded-lg w-full duration-200 ease-in border-b-1 border-b-primary"
                to='/admin/perfil'
                onClick={() => {
                    setProfileMenuFlag(!profileMenuFlag);
                    {!navbarFlag && setNavbarFlag(!navbarFlag);}
                }}
                >Mi perfil</Link>
                <button 
                    className="p-3 hover:bg-primary rounded-lg w-full flex justify-between group/item duration-200 ease-in hover:cursor-pointer"
                    onClick={cerrarSesion}
                >
                    Cerrar sesion
                    <span className="invisible group-hover/item:visible">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 rotate-180 group-hover/item:translate-x-0.5 duration-200 ease-in">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                    </span>
                </button>
            </div>
            }
        </>
     );
}
 
export default ProfileMenu;