import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordValidationFlag, setPasswordValidationFlag] = useState(false);
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [passwordsIguales, setPasswordsIguales] = useState(true);
    const [alerta, setAlerta] = useState({});
    const [spinnerFlag, setSpinnerFlag] = useState(false);


    // Validar que el password cumpla las condiciones
    const [lowerValidated, setLowerValidated] = useState(false);
    const [upperValidated, setUpperValidated] = useState(false);
    const [numberValidated, setNumberValidated] = useState(false);
    const [specialValidated, setSpecialValidated] = useState(false);
    const [lengthValidated, setLengthValidated] = useState(false);

    useEffect(() => {
        if(password != confirmarPassword && confirmarPassword) {
            setPasswordsIguales(false);
        } else {
            setPasswordsIguales(true);
        }
    },[password, confirmarPassword]);

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
        

        if([nombres, apellidos, email, password, confirmarPassword].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true,
            })
            return;
        }
        const datos = {nombres, apellidos, email, password};
        try {
            setSpinnerFlag(true);
            const respuesta = await clienteAxios.post('/veterinarios', datos);
            setAlerta({
                msg: respuesta.data.msg + ', revisa tu email para confirmar tu cuenta',
                error: false
            })
            setNombres('');
            setApellidos('');
            setEmail('');
            setPassword('');
            setConfirmarPassword('');
            setPasswordsIguales(true);
            setLowerValidated(false);
            setUpperValidated(false);
            setNumberValidated(false);
            setSpecialValidated(false);
            setLengthValidated(false);
        } catch (error) {
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
        setTimeout(() => {
            setAlerta({msg:''});
        }, 5000);
    }

    const {msg} = alerta;

    return ( 
        <>
            <div className="lg:min-h-screen p-6 flex flex-col justify-center items-center gap-4 h-70 lg:h-auto">
                <h1 className="font-bold text-neutral-600 text-5xl">Crea tu cuenta y <span className="text-blue">administra tus pacientes</span></h1>
                <img src="../images/doctor.svg" alt="img-doctor" className="hidden lg:block h-80"/>
            </div>
            <div className="m-auto w-97 sm:w-lg duration-200 ease-in">
                <div className="bg-white p-10 rounded-4xl text-neutral-600 flex flex-col gap-3 border-2 border-neutral-100 mb-14 lg:mb-0 mx-2">
                    {msg ?
                    <Alerta
                    alerta={alerta}
                    />
                    :
                    null}
                    <form 
                    id="formulario-registro"
                    className="flex flex-col gap-3 group" 
                    noValidate
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}>
                        <h2 className="text-center text-2xl font-bold mb-4">¡Crea una nueva cuenta!</h2>
                        <div className="flex flex-col md:flex-row w-full justify-between">
                            <div className="flex flex-col gap-1 md:pl-1  md:w-48/100 p-1 md:p-0">
                                <label htmlFor="nombre" className="after:ml-0.5 after:text-red-500 after:content-['*']">Nombres</label>
                                <input 
                                    id="nombre"
                                    type="nombre" 
                                    placeholder="Ingresa tu nombre" className="bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue invalid:[&:not(:placeholder-shown):not(:focus)]:outline-red-500 peer"
                                    required
                                    pattern=".{1,}"
                                    value={nombres}
                                    onChange={(e) => {
                                        setNombres(e.target.value.trim());
                                    }}
                                />
                                <p 
                                    className="hidden text-sm text-red-500 mt-1 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
                                >El campo nombres es obligatorio</p>
                            </div>
                            <div className="flex flex-col gap-1 md:pl-1  md:w-48/100 p-1 md:p-0">
                                <label htmlFor="apellidos" className="after:ml-0.5 after:text-red-500 after:content-['*']">Apellidos</label>
                                <input 
                                    id="apellidos"
                                    type="apellidos" 
                                    placeholder="Ingresa tus apellidos" className="bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue invalid:[&:not(:placeholder-shown):not(:focus)]:outline-red-500 peer"
                                    required
                                    pattern=".{1,}"
                                    value={apellidos}
                                    onChange={(e) => {
                                        setApellidos(e.target.value.trim());
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
                                type="email" 
                                placeholder="Ingresa tu email" className="bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue invalid:[&:not(:placeholder-shown):not(:focus)]:outline-red-500 peer"
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value.trim());
                                }}
                            />
                            <p 
                                className="hidden text-sm text-red-500 mt-1 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
                            >Por favor, ingresa un email válido</p>
                        </div>
                        <div className={`${passwordValidationFlag ? 'h-61' : 'h-22'} flex flex-col gap-1 duration-200 ease-in overflow-hidden px-1`}>
                            <label htmlFor="password" className="after:ml-0.5 after:text-red-500 after:content-['*']">Contraseña</label>
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
                            <div className="absolute hover:bg-neutral-200 cursor-pointer p-1 rounded-lg duration-200 ease-in mt-10 ml-61 sm:ml-91" 
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
                            <label htmlFor="confirmar-password" className="after:ml-0.5 after:text-red-500 after:content-['*']">Confirmar contraseña</label>
                            <input 
                                id="confirmar-password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Ingresa tu contraseña" 
                                className={`${passwordsIguales ? 'outline-primary focus:outline-blue' : 'outline-red-500 focus:outline-red-500'} relative bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2`}
                                required
                                pattern=".{8,}"
                                value={confirmarPassword}
                                onChange={(e) => {
                                    handleChangeConfirmPassword(e.target.value);
                                }}
                            />
                            <div className="absolute hover:bg-neutral-200 cursor-pointer p-1 rounded-lg duration-200 ease-in mt-10 ml-61 sm:ml-91" onClick={() => {setShowConfirmPassword(!showConfirmPassword)}}>
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
                            value={spinnerFlag ? '' : 'Registrar cuenta'}
                            className={`${(password != confirmarPassword ? 'pointer-events-none opacity-30' : 'hover:cursor-pointer')} bg-blue text-white rounded-xl py-4 active:bg-dark-blue hover:bg-dark-blue duration-200 ease-in mt-2 group-invalid:pointer-events-none group-invalid:opacity-30 mx-1`}
                        />
                        {spinnerFlag ?  <span className="loader mx-auto -mt-14 mb-4"></span> : null}
                    </form>
                    <div className="text-center my-2">
                        <Link to={'/olvide-password'} className="font-semibold text-blue active:text-dark-blue hover:text-neutral-600 duration-200 ease-in">¿Olvidaste tu contraseña?</Link>
                    </div>

                    <div className="text-center ">
                        <Link to='/' className="text-neutral-400">¿Ya tienes una cuenta? <span className="font-semibold text-blue">Inicia sesión aquí</span>
                    </Link>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Registrar;