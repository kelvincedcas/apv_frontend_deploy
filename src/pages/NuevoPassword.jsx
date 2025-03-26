import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {

    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [passwordsIguales, setPasswordsIguales] = useState(true);
    const [alerta, setAlerta] = useState({});
    const [alertaFlag, setAlertaFlag] = useState(false);
    const [spinnerFlag, setSpinnerFlag] = useState(true);
    const [passwordValidationFlag, setPasswordValidationFlag] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [tokenValido, setTokenValido] = useState(false);

    // Validar que el password cumpla las condiciones
    const [lowerValidated, setLowerValidated] = useState(false);
    const [upperValidated, setUpperValidated] = useState(false);
    const [numberValidated, setNumberValidated] = useState(false);
    const [specialValidated, setSpecialValidated] = useState(false);
    const [lengthValidated, setLengthValidated] = useState(false);


    const {token} = useParams();

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`);
                setTokenValido(true);
            } catch (error) {
                setAlertaFlag(true);
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
            setSpinnerFlag(false);
        }
        comprobarToken();
    }, [])

    useEffect(() => {
        if(password != confirmarPassword && confirmarPassword) {
            setPasswordsIguales(false);
        } else {
            setPasswordsIguales(true);
        }
    }, [password, confirmarPassword]);

    const handleChange  = value => {

        const lower = new RegExp('(?=.*[a-z])');
        const upper = new RegExp('(?=.*[A-Z])');
        const number = new RegExp('(?=.*[0-9])');
        const special = new RegExp('(?=.*[!@#\$%\^&\*._])');
        const length = new RegExp('(?=.{8,})');

            // lowercase validation
            if(lower.test(value)) {
                setLowerValidated(true);
            } else {
                setLowerValidated(false);
            }

            // uppercase validation
            if(upper.test(value)) {
                setUpperValidated(true);
            } else {
                setUpperValidated(false);
            }

            // numbercase validation
            if(number.test(value)) {
                setNumberValidated(true);
            } else {
                setNumberValidated(false);
            }

            // specialcase validation
            if(special.test(value)) {
                setSpecialValidated(true);
            } else {
                setSpecialValidated(false);
            }

            // lengthcase validation
            if(length.test(value)) {
                setLengthValidated(true);
            } else {
                setLengthValidated(false);
            }

            if(lower.test(value) && upper.test(value) && number.test(value) && special.test(value) && length.test(value) ) {
                setPassword(value);
            } else {
                setPassword('');
            }

    }

    const handleChangeConfirmPassword = (valor) => {

        setConfirmarPassword(valor);

        if(valor != password) {
            setPasswordsIguales(false);
        } else {
            setPasswordsIguales(true);
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setSpinnerFlag(true);
        if(!password) {
            setAlertaFlag(true);
            setAlerta({
                msg: 'La contraseña no puede estar vacía',
                error: true
            });
            return;
        }
        try {
            const {data} = await clienteAxios.post(`/veterinarios/olvide-password/${token}`, {password});
            setTokenValido(true);
            setAlertaFlag(true);
            setAlerta({
                msg: data.msg,
                error: false
            });

        } catch (error) {
            setTokenValido(false);
            setAlertaFlag(true);
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
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
                    <div className="mb-2 flex flex-col gap-4">
                        <Alerta 
                            alerta={alerta}
                        />
                        <div className={`${tokenValido ? 'hidden' : 'flex'} flex-col justify-center items-center gap-4`}>
                            <p className="text-sm text-center text-neutral-500">Lo sentimos, no podemos continuar con el proceso de reestablecimiento de tu contraseña.</p>
                            <Link 
                                to="/" 
                                className="text-neutral-500 w-50 flex justify-center items-center gap-2 hover:-translate-x-1 hover:text-neutral-700 duration-200 ease-in peer mx-auto"
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
                    }
                    {!spinnerFlag 
                    ? 
                    <div className={`${tokenValido ? 'block' : 'hidden'}`}>
                        <form 
                        className="flex flex-col gap-3 group" 
                        noValidate
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}>
                        <h2 className="text-center text-2xl font-bold">¡Ingresa tu nueva contraseña!</h2>
                        <div>
                            <p className="text-center text-neutral-400 font-light">Tu identidad ha sido verificada.</p>
                            <p className="text-center text-neutral-400 font-light">Por favor, reestablece tu contraseña</p>
                        </div>
                        <div className={`${passwordValidationFlag ? 'h-61' : 'h-22'} flex flex-col gap-1 duration-200 ease-in overflow-hidden px-1`}>
                            <label htmlFor="password">Contraseña</label>
                            <input 
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Ingresa tu contraseña" className="relative bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue"
                                required
                                pattern=".{8,}"
                                onFocus={() => {
                                    setPasswordValidationFlag(true);
                                }}
                                onChange={(e) => {
                                    handleChange(e.target.value)
                                }}
                                onBlur={() => {
                                    setPasswordValidationFlag(false);
                                }}
                            />
                            <div className="absolute hover:bg-neutral-200 cursor-pointer p-1 rounded-lg duration-200 ease-in mt-10 ml-61 sm:ml-92" 
                            onClick={() => {
                                setShowPassword(!showPassword);
                                }}>
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
                            <div className="p-4 bg-primary text-sm rounded-lg mt-2 font-light flex flex-col gap-1">
                                <div className={`${lowerValidated ? 'text-emerald-400' : 'text-neutral-400'} duration-200 ease-in flex items-center gap-2`}>
                                    {lowerValidated 
                                    ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    }
                                    <p className={lowerValidated && 'text-neutral-700 duration-200 ease-in'}>Una letra minúscula</p>
                                </div>
                                <div className={`${upperValidated ? 'text-emerald-400' : 'text-neutral-400'} duration-200 ease-in flex items-center gap-2`}>
                                    {upperValidated 
                                    ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    }
                                    <p className={upperValidated && 'text-neutral-700 duration-200 ease-in'}>Una letra mayúscula</p>
                                </div>
                                <div className={`${numberValidated ? 'text-emerald-400' : 'text-neutral-400'} duration-200 ease-in flex items-center gap-2`}>
                                    {numberValidated 
                                    ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    }
                                    <p className={numberValidated && 'text-neutral-700 duration-200 ease-in'}>Un número</p>
                                </div>
                                <div className={`${specialValidated ? 'text-emerald-400' : 'text-neutral-400'} duration-200 ease-in flex items-center gap-2`}>
                                    {specialValidated 
                                    ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    }
                                    <p className={specialValidated && 'text-neutral-700 duration-200 ease-in'}>Un carácter especial (@*._#)</p>
                                </div>
                                <div className={`${lengthValidated ? 'text-emerald-400' : 'text-neutral-400'} duration-200 ease-in flex items-center gap-2`}>
                                    {lengthValidated 
                                    ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    }
                                    <p className={lengthValidated && 'text-neutral-700 duration-200 ease-in'}>Una extensión de 8 caracteres</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 px-1">
                            <label htmlFor="password">Confirmar contraseña</label>
                            <input 
                                id="confirmar-password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Ingresa tu contraseña" 
                                className={`${passwordsIguales ? 'outline-primary focus:outline-blue' : 'outline-red-500 focus:outline-red-500'} relative bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2`}
                                required
                                pattern=".{8,}"
                                onChange={(e) => {
                                    handleChangeConfirmPassword(e.target.value);
                                }}
                            />
                            <div className="absolute hover:bg-neutral-200 cursor-pointer p-1 rounded-lg duration-200 ease-in mt-10 ml-61 sm:ml-92" onClick={() => {setShowConfirmPassword(!showConfirmPassword)}}>
                                {showConfirmPassword ? 
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
                                className={`${passwordsIguales ? 'hidden' : 'block'} text-sm text-red-500 mt-1`}
                            >Las contraseñas no coinciden</p>
                        </div>
                        
                        <input 
                            type="submit" 
                            value='Reestablecer contraseña' 
                            className="bg-blue text-white rounded-xl py-4 hover:cursor-pointer active:bg-dark-blue hover:bg-dark-blue duration-200 ease-in mt-2 group-invalid:pointer-events-none group-invalid:opacity-30"
                        />
                        </form>
                        <div className="mt-6 flex justify-center">
                            <Link 
                                to="/" 
                                className="text-neutral-500 w-50 flex justify-center items-center gap-2 hover:-translate-x-1 hover:text-neutral-700 duration-200 ease-in peer"
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
 
export default NuevoPassword;