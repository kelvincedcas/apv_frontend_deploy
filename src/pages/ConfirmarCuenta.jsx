import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {

    const {token} = useParams();
    console.log(token)

    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [spinnerFlag, setSpinnerFlag] = useState(true);
    const [alerta, setAlerta] = useState({});

    let msg;


    useEffect(() => {
        const confirmarCuenta = async() => {
            try {
                const { data } = await clienteAxios(`/veterinarios/confirmar/${token}`);
                setCuentaConfirmada(true);
                setAlerta({
                    msg: data.msg,
                    error: false
                })
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
            setSpinnerFlag(false);
        }

        confirmarCuenta();
    }, [])


    return ( 
        <>
            <div className="lg:min-h-screen p-6 flex flex-col justify-center items-center gap-4 lg:h-auto">
                <h1 className="font-bold text-neutral-600 text-5xl">Confirma tu cuenta y <span className="text-blue">administra tus pacientes</span></h1>
                <img src="../images/confirm-account.svg" alt="img-doctor" className="hidden lg:block h-80"/>
            </div>
            <div className="mx-auto lg:my-auto w-97 sm:w-lg duration-200 ease-in">
                <div className={`${cuentaConfirmada ? 'h-123' : 'h-90'} h-123 bg-white p-10 rounded-4xl text-neutral-600 flex flex-col gap-3 border-2 border-neutral-100 mb-14 lg:mb-0 justify-center duration-200 ease-in`}>

                    {spinnerFlag 
                        ?  
                        <span className="loader-black m-auto"></span> 
                        : 
                        <div className="flex flex-col gap-6">
                            <img src={cuentaConfirmada ? '../images/confirmed.svg' : '../images/no-confirmed.svg'} alt="img-doctor" className="lg:block h-40"/>
                            <Alerta
                                alerta={alerta}
                             />
                            {cuentaConfirmada ? <p className="text-sm text-neutral-400">Tu cuenta ha sido confirmada correctamente, ya puedes iniciar sesión</p>  : <p className="text-sm text-neutral-400">Lo sentimos, no ha sido posible confirmar tu cuenta</p>}
                            
                            {cuentaConfirmada &&
                            <Link
                                to='/'
                                className="bg-blue text-white rounded-xl py-4 hover:cursor-pointer active:bg-dark-blue hover:bg-dark-blue duration-200 ease-in mt-2 text-center w-full"
                            >Iniciar sesión</Link>}
                        </div>
                    }
                </div>
            </div>
        </>
     );
}
 
export default ConfirmarCuenta;