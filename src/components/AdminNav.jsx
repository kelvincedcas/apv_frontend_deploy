import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

const AdminNav = () => {

    const path = window.location.pathname;

    const perfilPath = '/admin/perfil';
    const editarPerfilPath = '/admin/perfil/editar-perfil'
    const cambiarPasswordPath = '/admin/perfil/cambiar-password'

    return ( 
        <nav className='rounded-full border-1 border-neutral-200 p-1 flex justify-between items-center text-neutral-500 mb-5 text-sm w-full sm:w-90 mx-auto'>
            <Link 
                to={perfilPath}
                className={`${perfilPath == path && 'bg-blue rounded-full text-white'} px-4 py-1`}
            >
                Perfil
            </Link>
            <Link 
                to={editarPerfilPath}
                className={`${editarPerfilPath == path && 'bg-blue rounded-full text-white'} px-4 py-1`}
            >
                Editar perfil
            </Link>
            <Link 
                to={cambiarPasswordPath}
                className={`${cambiarPasswordPath == path && 'bg-blue rounded-full text-white'} px-4 py-1`}
            >
                Cambiar contraseña
            </Link>
        </nav>
     );
}
 
export default AdminNav;