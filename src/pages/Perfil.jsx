import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import usePaciente from "../hooks/usePaciente";

const Perfil = () => {
    

    const {auth} = useAuth();
    const {pacientes} = usePaciente();

    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha)
    }


    return ( 
        <>
         <AdminNav/>
            <section className="border-1 border-neutral-200 w-full flex flex-col mx-auto mt-15 rounded-3xl p-10">
                <header className="text-center">
                    <div className="w-30 h-30 overflow-hidden mx-auto rounded-2xl bg-white -mt-20">
                        <img src="../images/perfil.png" alt="imagen-perfil"
                        className="h-full"
                        />
                    </div>
                    <div className="mt-3">
                        <p className="text-xl font-bold">{auth.nombres} {auth.apellidos}</p>
                        <span className="text-sm font-normal text-neutral-500">Médico veterinario</span>
                        <p className="text-sm font-semibold">Miembro desde: <span className="font-normal text-neutral-400">{formatearFecha(auth.createdAt)}</span></p>
                    </div>
                </header>
                <main>
                    <div className="border-t-1 my-3 border-t-neutral-200 w-full"></div>
                    <div className="flex flex-col lg:flex-row justify-center items-center text-sm gap-4 flex-wrap">
                        <div className="flex flex-col items-center gap-2 w-3/10">
                            <div className="bg-primary p-2 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                </svg>
                            </div>
                            <div className="text-neutral-500">
                                <p>{auth.email}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 w-3/10">
                            <div className="bg-primary p-2 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                                </svg>

                            </div>
                            <div className="text-neutral-500">
                                <p>{auth.telefono}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 w-3/10">
                            <div className="bg-primary p-2 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.262 6.072a8.25 8.25 0 1 0 10.562-.766 4.5 4.5 0 0 1-1.318 1.357L14.25 7.5l.165.33a.809.809 0 0 1-1.086 1.085l-.604-.302a1.125 1.125 0 0 0-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z" clipRule="evenodd" />
                                </svg>

                            </div>
                            <div className="text-neutral-500">
                                <p>{auth.web}</p>
                            </div>
                        </div>
                    </div>

                </main>
                {/* <div className="flex gap-2">
                    <div className="flex flex-col items-center">
                        <p className="bg-primary py-3 px-8 rounded-lg">{pacientes.length}</p>
                        <span>Paciente{pacientes.length > 1 && 's'}</span>
                    </div>
                    <div className="flex flex-col items-center bg-primary p-3 rounded-lg">
                        <p>{pacientes.length}</p>
                        <span>Total paciente{pacientes.length > 1 && 's'}</span>
                    </div>
                </div> */}
            </section>
        </>
     );
}
 
export default Perfil;