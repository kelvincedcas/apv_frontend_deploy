import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const OlvidePassword = () => {
    
    const [email, setEmail] = useState('');
    const [spinnerFlag, setSpinnerFlag] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [alertaFlag, setAlertaFlag] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === ''){
            setAlertaFlag(true);
            setAlerta({
                msg: 'El campo email es obligatorio',
                error: true
            })
            return;
        }
        setSpinnerFlag(true);
        try {
            const respuesta = await clienteAxios.post('/veterinarios/olvide-password', {email});
            setAlertaFlag(true);
            setAlerta({
                msg: respuesta.data.msg,
                error: false
            })
        } catch (error) {
            setAlertaFlag(true);
            if(error.response) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
            if(error.code == 'ERR_NETWORK') {
                setAlerta({
                    msg: 'Error de conexión',
                    error: true
                })
            }
        }
        setTimeout(() => {
            setAlertaFlag(false);
        }, 4000);
        setSpinnerFlag(false);

    }
    return ( 
        <>
            <div className="lg:min-h-screen p-6 flex flex-col justify-center items-center gap-4 h-70 lg:h-auto">
                <h1 className="font-bold text-neutral-600 text-5xl">Recupera tu cuenta y no pierdas el <span className="text-blue">acceso a tus pacientes</span></h1>
                <img src="../images/forgot-password.svg" alt="img-doctor" className="hidden lg:block h-80"/>
            </div>
            <div className="m-auto w-97 sm:w-lg duration-200 ease-in">
                <div className="bg-white p-10 rounded-4xl text-neutral-600 flex flex-col gap-3 border-2 border-neutral-100 mb-14 md:mb-0 min-h-105 duration-200 ease-in justify-center mx-2">
                    {alertaFlag && 
                    <div className="mb-2">
                        <Alerta 
                            alerta={alerta}
                        />
                    </div>
                    }
                    {!spinnerFlag 
                    ? 
                    <div>
                        <form 
                        className="flex flex-col gap-3 group" 
                        noValidate
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}>
                        <h2 className="text-center text-2xl font-bold">¿Olvidaste tu contraseña?</h2>
                        <p className="text-center text-neutral-400 font-light">No te preocupes, proporciona tu email y te enviaremos las instrucciones para reestablecerla.</p>
                        <div className="flex flex-col gap-1 px-1">
                            <label htmlFor="email" className="after:ml-0.5 after:text-red-500 after:content-['*']">Email</label>
                            <input 
                                id="email"
                                type="email" 
                                placeholder="Ingresa tu email" className="bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue invalid:[&:not(:placeholder-shown):not(:focus)]:outline-red-500 peer"
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                onChange={(e)=>{
                                    setEmail(e.target.value.trim());
                                    {alertaFlag && setAlertaFlag(false)}
                                }}
                            />
                            <p 
                                className="hidden text-sm text-red-500 mt-1 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
                            >Por favor, ingresa un email válido</p>
                        </div>
                        
                        <input 
                            type="submit" 
                            value='Reestablecer contraseña' 
                            className="bg-blue text-white rounded-xl py-4 hover:cursor-pointer active:bg-dark-blue hover:bg-dark-blue duration-200 ease-in mt-2 group-invalid:pointer-events-none group-invalid:opacity-30 mx-1"
                        />
                        </form>
                        <div className="mt-6 flex justify-center">
                            <Link 
                                to="/" 
                                className="text-neutral-500 w-60 flex justify-center items-center gap-2 hover:-translate-x-1 hover:text-neutral-700 duration-200 ease-in peer"
                            >
                                <span className="font-semibold text-blue">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 peer-hover:-translate-x-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                    </svg>
                                </span>
                                Regresar a iniciar sesión
                            </Link>
                        </div>
                    </div>
                    :
                    <div className="flex flex-col items-center gap-2">
                        <span className="loader-black"></span> 
                        <p className="text-sm text-neutral-400">Por favor, espera...</p>
                    </div>
                    }
                </div>
            </div>
        </>
     );
}
 
export default OlvidePassword;