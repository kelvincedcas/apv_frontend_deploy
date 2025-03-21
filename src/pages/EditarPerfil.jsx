import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {

    const [perfil, setPerfil] = useState({});

    const {auth, spinnerFlag, actualizarPerfil, alerta} = useAuth();

    useEffect(() => {
        setPerfil(auth);
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault();
        await actualizarPerfil(perfil);
    }

    const {msg} = alerta;

    return ( 
        <>
         <AdminNav/>
            <div className="flex items-center flex-col gap-4">
                {msg &&
                    <Alerta
                    alerta={alerta}
                />
                }
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Editar Perfil</h2>
                    <p className="text-neutral-400 text-sm">Modifica tu <span className="font-semibold text-blue">información aquí</span></p>
                </div>
                <div className="text-neutral-600 flex flex-col gap-3 w-full">
                    <form 
                        noValidate
                        className="flex flex-col gap-3 group" 
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col md:flex-row w-full justify-between gap-3">
                                <div className="flex flex-col gap-1 md:pl-1  md:w-48/100 p-1 md:p-0">
                                    <label htmlFor="nombres" className="after:ml-0.5 after:text-red-500 after:content-['*']">Nombres</label>
                                    <input 
                                        id="nombres"
                                        name="nombres"
                                        type="text" 
                                        placeholder="Ingresa tu nombre" className="bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue invalid:[&:not(:placeholder-shown):not(:focus)]:outline-red-500 peer"
                                        required
                                        pattern=".{1,}"
                                        value={perfil.nombres || ''}
                                        onChange={e => {
                                            setPerfil({
                                                ...perfil,
                                                [e.target.name] : e.target.value
                                            })
                                        }}
                                    />
                                    <p 
                                        className="hidden text-sm text-red-500 mt-1 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
                                    >El campo nombres es obligatorio</p>
                                </div>
                                <div className="flex flex-col gap-1 md:pr-1  md:w-48/100 p-1 md:p-0">
                                    <label htmlFor="apellidos" className="after:ml-0.5 after:text-red-500 after:content-['*']">Apellidos</label>
                                    <input 
                                        id="apellidos"
                                        name="apellidos"
                                        type="text" 
                                        placeholder="Ingresa tus apellidos" className="bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue invalid:[&:not(:placeholder-shown):not(:focus)]:outline-red-500 peer"
                                        required
                                        pattern=".{1,}"
                                        value={perfil.apellidos || ''}
                                        onChange={e => {
                                            setPerfil({
                                                ...perfil,
                                                [e.target.name] : e.target.value
                                            })
                                        }}
                                    />
                                    <p 
                                        className="hidden text-sm text-red-500 mt-1 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
                                    >Por favor, ingresa un email válido</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 px-1">
                                <label htmlFor="email" className="after:ml-0.5 after:text-red-500 after:content-['*']">Email</label>
                                <input 
                                    id="email"
                                    name="email"
                                    type="email" 
                                    placeholder="Ingresa tu email" className="bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue invalid:[&:not(:placeholder-shown):not(:focus)]:outline-red-500 peer"
                                    required
                                    value={perfil.email || ''}
                                        onChange={e => {
                                            setPerfil({
                                                ...perfil,
                                                [e.target.name] : e.target.value
                                            })
                                        }}
                                />
                                <p 
                                    className="hidden text-sm text-red-500 mt-1 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
                                >Por favor, ingresa un email válido</p>
                            </div>
                            <div className="flex flex-col gap-1 px-1">
                                <label htmlFor="web">Sitio web</label>
                                <input 
                                    id="web"
                                    name="web"
                                    type="text" 
                                    placeholder="Ingresa tu sitio web" className="bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue invalid:[&:not(:placeholder-shown):not(:focus)]:outline-red-500 peer"
                                    value={perfil.web || ''}
                                    onChange={e => {
                                        setPerfil({
                                            ...perfil,
                                            [e.target.name] : e.target.value
                                        })
                                    }}
                                />
                                <p 
                                    className="hidden text-sm text-red-500 mt-1 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
                                >Por favor, ingresa una web válida</p>
                            </div>
                            <div className="flex flex-col gap-1 px-1">
                                <label htmlFor="telefono">Teléfono</label>
                                <input 
                                    id="telefono"
                                    name="telefono"
                                    type="number" 
                                    placeholder="Ingresa tu número de teléfono" className="bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue invalid:[&:not(:placeholder-shown):not(:focus)]:outline-red-500 peer"
                                    min={0}
                                    value={perfil.telefono || ''}
                                    onChange={e => {
                                        setPerfil({
                                            ...perfil,
                                            [e.target.name] : e.target.value
                                        })
                                    }}
                                />
                                <p 
                                    className="hidden text-sm text-red-500 mt-1 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
                                >Por favor, ingresa una web válida</p>
                            </div>
                            <input 
                                type="submit" 
                                value={spinnerFlag ? '' : 'Guardar cambios'}
                                className={`${spinnerFlag && 'pointer-events-none opacity-30'}  bg-blue text-white rounded-xl py-4 hover:cursor-pointer active:bg-dark-blue hover:bg-dark-blue duration-200 ease-in mt-2 group-invalid:pointer-events-none group-invalid:opacity-30 mx-1`}

                            />
                            {spinnerFlag && <span className="loader mx-auto -mt-14 mb-4"></span>}
                    </form>
                </div>
            </div>
        </>
     );
}
 
export default EditarPerfil;