import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import Alerta from "../components/Alerta";
import clienteAxios from '../config/axios';
import useAuth from "../hooks/useAuth";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [spinnerFlag, setSpinnerFlag] = useState(false);

    const navigate = useNavigate();

    const {setAuth} = useAuth();

    const handleSubmit = async e => {
        setAlerta({})
        e.preventDefault();

        if([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }
        const url = '/veterinarios/login';
        setSpinnerFlag(true);
        try {
            const {data} = await clienteAxios.post(url, {email, password});
            setAuth(data);
            localStorage.setItem('token', data.token);
            
            navigate('/admin');

        } catch (error) {
            console.log(error)
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
        setSpinnerFlag(false);
    }

    const {msg} = alerta;

    return ( 
        <>
            <div className="lg:min-h-screen p-6 flex flex-col justify-center items-center gap-4 h-70 lg:h-auto">
                <h1 className="font-bold text-neutral-600 text-5xl">Inicia sesion y <span className="text-blue">administra tus pacientes</span></h1>
                <img src="../images/doctor.svg" alt="img-doctor" className="hidden lg:block h-80"/>
            </div>
            <div className="m-auto w-97 sm:w-lg duration-200 ease-in">
                <div className="bg-white p-10 rounded-4xl text-neutral-600 flex flex-col gap-3 border-2 border-neutral-100 mb-14 md:mb-0 mx-2">
                    {msg &&
                        <Alerta 
                            alerta={alerta}
                        />
                    }
                    <form 
                        className="flex flex-col gap-3 group" 
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <h2 className="text-center text-2xl font-bold mb-4">¡Bienvenido de nuevo!</h2>
                        <div className="flex flex-col gap-1 px-1">
                            <label htmlFor="email" className="after:ml-0.5 after:text-red-500 after:content-['*']">Email</label>
                            <input 
                                id="email"
                                type="email" 
                                placeholder="Ingresa tu email" className="bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue invalid:[&:not(:placeholder-shown):not(:focus)]:outline-red-500 peer"
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value);
                                    setAlerta({});
                                }}
                            />
                            <p 
                                className="hidden text-sm text-red-500 mt-1 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
                            >Por favor, ingresa un email válido</p>
                        </div>
                        <div className="flex flex-col gap-1 px-1">
                            <label htmlFor="password" className="after:ml-0.5 after:text-red-500 after:content-['*']">Contraseña</label>
                            <input 
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Ingresa tu contraseña" className="relative bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue invalid:[&:not(:placeholder-shown):not(:focus)]:outline-red-500 peer"
                                required
                                pattern=".{8,}"
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value);
                                    setAlerta({});
                                }}
                            />
                            <div className="absolute hover:bg-neutral-200 cursor-pointer p-1 rounded-lg duration-200 mt-11 ml-62 sm:ml-92 ease-in" onClick={() => {setShowPassword(!showPassword)}}>
                                {showPassword ? 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="currentColor" className="size-5">
                                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="currentColor" className="size-5">
                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                </svg>
                                }
                            </div>
                            <p 
                                className="hidden text-sm text-red-500 mt-1 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
                            >La contraseña debe tener un mínimo de 8 caracteres</p>
                        </div>
                        <input 
                            type="submit" 
                            value={spinnerFlag ? '' : 'Iniciar sesión'}
                            className={`${spinnerFlag && 'pointer-events-none opacity-30'}  bg-blue text-white rounded-xl py-4 hover:cursor-pointer active:bg-dark-blue hover:bg-dark-blue duration-200 ease-in mt-2 group-invalid:pointer-events-none group-invalid:opacity-30 mx-1`}

                        />
                        {spinnerFlag && <span className="loader mx-auto -mt-14 mb-4"></span>}
                    </form>
                    <div className="text-center my-2">
                        <Link to={'/olvide-password'} className="my-3 font-semibold text-blue active:text-dark-blue hover:text-neutral-600 duration-200 ease-in">¿Olvidaste tu contraseña?</Link>
                    </div>

                    <div className="text-center ">
                        <Link to="/registrar" className="text-neutral-400">¿Aún no tienes una cuenta? <span className="font-semibold text-blue">Crea una aquí</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Login;