import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
    const {auth} = useAuth();

    const [profileMenuFlag, setProfileMenuFlag] = useState(false);
    const [navbarFlag, setNavbarFlag] = useState(true);
    // const [tooltipMenuFlag, setTooltipMenuFlag] = useState(false);
    // const [tooltipFlag, setTooltipFlag] = useState(false);

    const path = window.location.pathname;

    

    const vistaGeneralPath = '/admin';
    const pacientesPath = '/admin/administrar-pacientes';
    const configuracionPath = '/admin/configuracion';

    return ( 
        <>
            <header className="bg-white p-4 flex justify-between md:justify-end items-center fixed top-0 left-0 right-0 z-10">
                <div className="md:hidden flex ">
                    <button 
                        className="p-2 border-1 border-neutral-200 rounded-lg hover:cursor-pointer hover:bg-neutral-100 duration-200 ease-in"
                        onClick={() => {setNavbarFlag(!navbarFlag)}}
                        // onMouseEnter={() => {setTooltipMenuFlag(true)}}
                        // onMouseLeave={() => {setTooltipMenuFlag(false)}}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    </button>
                    {/* <div>
                        <span className={`${tooltipMenuFlag && 'visible'} text-sm border-1 mt-1 ml-1 invisible  border-neutral-200 bg-primary py-1 px-2 rounded-md absolute text-neutral-600 `}>Abrir menú</span>
                    </div> */}
                </div>

                <div className="relative">
                    <div 
                        className="text-sm flex gap-2 hover:cursor-pointer hover:bg-primary active:bg-primary duration-200 ease-in p-3 rounded-lg"
                        onClick={() => {
                            setProfileMenuFlag(!profileMenuFlag);
                            {!navbarFlag && setNavbarFlag(!navbarFlag)};
                        }}
                    >
                        <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-blue">
                            <img src="../images/perfil.png" alt="imagen-perfil"/>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-neutral-600">{auth.nombres || " "} {auth.apellidos || " "}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`${profileMenuFlag && 'rotate-180'} size-4 duration-200 ease-in text-neutral-400`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </div>
                    <ProfileMenu
                        profileMenuFlag={profileMenuFlag}
                        setProfileMenuFlag={setProfileMenuFlag}
                        navbarFlag={navbarFlag}
                        setNavbarFlag={setNavbarFlag}
                    />
                </div>
            </header>
            
                    <aside className={`${navbarFlag ? '-translate-x-full': 'translate-x-0'} w-70 fixed flex flex-col gap-10 bg-white top-0 left-0 px-8 py-8 h-screen transition-transform -translate-x-full md:translate-x-0 z-10 border-r-2 border-r-neutral-100 md:border-0`}>
                        <div className="flex justify-between items-center md:justify-center">
                            <p className="font-bold text-lg text-blue">APV</p>
                            <div className="flex">
                                <button
                                className="p-2 border-1 border-neutral-200 rounded-lg hover:cursor-pointer hover:bg-neutral-100 duration-200 ease-in md:hidden"
                                onClick={() => {setNavbarFlag(!navbarFlag)}}
                                // onMouseEnter={() => {setTooltipFlag(true)}}
                                // onMouseLeave={() => {setTooltipFlag(false)}}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                {/* <div className="absolute w-35">
                                    <span className={`${tooltipFlag && 'visible'} text-sm border-1 border-neutral-200 bg-primary py-1 px-2 rounded-md absolute text-neutral-600 mt-1 ml-10 invisible`}>Cerrar menú</span>
                                </div> */}
                            </div>
                        </div>
                        <Link 
                        className="bg-blue text-white rounded-xl py-4 hover:cursor-pointer active:bg-dark-blue hover:bg-dark-blue duration-200 ease-in w-full flex justify-center items-center gap-2"
                        to='/admin/nuevo-paciente'
                        onClick={() => {setNavbarFlag(!navbarFlag)}}
                        >Registrar paciente
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </Link>

                        <nav className= 'text-neutral-500 flex flex-col gap-2'>
                            <Link to='/admin'
                                className={`${vistaGeneralPath == path && 'bg-neutral-100 text-neutral-800'} flex gap-4 hover:text-neutral-700 px-6 py-4 transition-colors duration-200 ease-in hover:bg-primary rounded-lg`}
                                onClick={() => {setNavbarFlag(!navbarFlag)}}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${vistaGeneralPath == path && 'text-blue'} size-6`}>
                            <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clipRule="evenodd" />
                            </svg>

                            Vista general</Link>

                            <Link to='/admin/administrar-pacientes'
                                className={`${pacientesPath == path && 'bg-neutral-100 text-neutral-800'} flex gap-4 hover:text-neutral-700 px-6 py-4 transition-colors duration-200 ease-in hover:bg-primary rounded-lg`}
                                onClick={() => {setNavbarFlag(!navbarFlag)}}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${pacientesPath == path && 'text-blue'} size-6`}>
                            <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                            </svg>

                            Pacientes</Link>

                        </nav>

                        <div className="border-t-1 border-t-neutral-200"></div>
                        
                        <Link to='/admin/configuracion'
                                className={`${configuracionPath == path && 'bg-neutral-100 text-neutral-800'} flex gap-4 hover:text-neutral-700 px-6 py-4 transition-colors duration-200 ease-in hover:bg-primary rounded-lg text-neutral-500`}
                                onClick={() => {setNavbarFlag(!navbarFlag)}}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${configuracionPath == path && 'text-blue'} size-6`}>
                            <path fillRule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                            </svg>


                            Configuración</Link>
                        
                        <div className="text-sm text-neutral-400 flex justify-between">
                            <p>Versión</p>
                            <span className="text-blue">1.0</span>
                        </div>
                    </aside>
        </>
     );
}
 
export default Header;