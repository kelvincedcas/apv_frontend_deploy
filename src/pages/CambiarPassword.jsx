import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";

const CambiarPassword = () => {

    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
    });

    const {spinnerFlag, alerta, cambiarPassword} = useAuth();

    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [passwordValidationFlag, setPasswordValidationFlag] = useState(false);
    const [showPasswordActual, setShowPasswordActual] = useState(false);
    const [showPasswordNuevo, setShowPasswordNuevo] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsIguales, setPasswordsIguales] = useState(true);

    // Validar que el password cumpla las condiciones
    const [lowerValidated, setLowerValidated] = useState(false);
    const [upperValidated, setUpperValidated] = useState(false);
    const [numberValidated, setNumberValidated] = useState(false);
    const [specialValidated, setSpecialValidated] = useState(false);
    const [lengthValidated, setLengthValidated] = useState(false);

    useEffect(() => {
        if(password.pwd_nuevo != confirmarPassword && confirmarPassword) {
            setPasswordsIguales(false);
        } else {
            setPasswordsIguales(true);
        }
    }, [password.pwd_nuevo, confirmarPassword]);

    const {msg} = alerta;

    const handleChange  = e => {

        const value = e.target.value

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
                setPassword({
                    ...password,
                    [e.target.name] : e.target.value
                });
            } else {
                setPassword({
                    ...password,
                    [e.target.name] : ""
                });
            }

    }

    const handleChangeConfirmPassword = (valor) => {

        setConfirmarPassword(valor);

        if(valor != password.pwd_nuevo) {
            setPasswordsIguales(false);
        } else {
            setPasswordsIguales(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await cambiarPassword(password);
        setPassword({
            pwd_actual: '',
            pwd_nuevo: ''
        })
        setConfirmarPassword('');
        document.querySelector('#passwordNuevo').value = '';
    }

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
                    <h2 className="text-3xl font-bold">Cambiar contraseña</h2>
                    <p className="text-neutral-400 text-sm">Modifica tu <span className="font-semibold text-blue">contraseña aquí</span></p>
                </div>
                <div className="text-neutral-600 flex flex-col gap-3 w-full">
                    <form 
                        noValidate
                        className="flex flex-col gap-3 group" 
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col gap-1 px-1">
                            <label htmlFor="pwdActual" className="after:ml-0.5 after:text-red-500 after:content-['*']">Contraseña actual</label>
                            <div className="relative">
                                <input 
                                    id="pwdActual"
                                    name= "pwd_actual"
                                    type={showPasswordActual ? "text" : "password"}
                                    placeholder="Ingresa tu contraseña" 
                                    className="outline-primary focus:outline-blue bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 w-full"
                                    required
                                    pattern=".{8,}"
                                    value={password.pwd_actual}
                                    onChange={(e) => {
                                        setPassword({
                                            ...password,
                                            [e.target.name] : e.target.value
                                        })
                                    }}
                                />
                                <div className="absolute hover:bg-neutral-200 cursor-pointer p-1 rounded-lg duration-200 ease-in right-0 top-0 mt-3 mr-3" onClick={() => {setShowPasswordActual(!showPasswordActual)}}>
                                    {showPasswordActual ? 
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
                            </div>
                        </div>
                        <div className={`${passwordValidationFlag ? 'h-61' : 'h-22'} flex flex-col gap-1 duration-200 ease-in overflow-hidden px-1`}>
                            <label htmlFor="password" className="after:ml-0.5 after:text-red-500 after:content-['*']">Contraseña nueva</label>
                            <div className="relative">
                                <input 
                                    id="passwordNuevo"
                                    name="pwd_nuevo"
                                    type={showPasswordNuevo ? "text" : "password"}
                                    placeholder="Ingresa tu contraseña" className=" bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue w-full"
                                    required
                                    pattern=".{8,}"
                                    onFocus={() => {
                                        setPasswordValidationFlag(true);
                                    }}
                                    onChange={handleChange}
                                    onBlur={() => {
                                        setPasswordValidationFlag(false);
                                    }}
                                />
                                <div className="absolute hover:bg-neutral-200 cursor-pointer p-1 rounded-lg duration-200 ease-in right-0 top-0 mt-3 mr-3" 
                                onClick={() => {
                                    setShowPasswordNuevo(!showPasswordNuevo);
                                    }}>
                                    {showPasswordNuevo ? 
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
                            <label htmlFor="confirmar-password" className="after:ml-0.5 after:text-red-500 after:content-['*']">Confirmar contraseña nueva</label>
                            <div className="relative">
                                <input 
                                    id="confirmar-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Ingresa tu contraseña" 
                                    className={`${passwordsIguales ? 'outline-primary focus:outline-blue' : 'outline-red-500 focus:outline-red-500'} bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 w-full`}
                                    required
                                    pattern=".{8,}"
                                    value={confirmarPassword}
                                    onChange={(e) => {
                                        handleChangeConfirmPassword(e.target.value);
                                    }}
                                />
                                <div className="absolute hover:bg-neutral-200 cursor-pointer p-1 rounded-lg duration-200 ease-in right-0 top-0 mt-3 mr-3" onClick={() => {setShowConfirmPassword(!showConfirmPassword)}}>
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
                            </div>
                            <p 
                                className={`${passwordsIguales ? 'hidden' : 'block'} text-sm text-red-500 mt-1`}
                            >Las contraseñas no coinciden</p>
                        </div>
                       
                            <input 
                                type="submit" 
                                value={spinnerFlag ? '' : 'Cambiar contraseña'}
                                className={`${spinnerFlag && 'pointer-events-none opacity-30'}  bg-blue text-white rounded-xl py-4 hover:cursor-pointer active:bg-dark-blue hover:bg-dark-blue duration-200 ease-in mt-2 group-invalid:pointer-events-none group-invalid:opacity-30 mx-1`}

                            />
                            {spinnerFlag && <span className="loader mx-auto -mt-14 mb-4"></span>}
                    </form>
                </div>
            </div>
        </>
    )
}


export default CambiarPassword;