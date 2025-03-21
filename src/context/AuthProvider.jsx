import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [cargando, setCargando] = useState(true); 
    const [auth, setAuth] = useState({});
    const [spinnerFlag, setSpinnerFlag] = useState(false);
    const [alerta, setAlerta] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const autenticarUsuario = async() => {
            const token = localStorage.getItem('token');
            if(!token){
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await clienteAxios('/veterinarios/perfil', config);

                setAuth(data);

            } catch (error) {
                if(error.response) {
                    console.log(error.response.data.msg);
                }
                console.log(error)
                setAuth({});
            }
            setCargando(false);
        } 
        autenticarUsuario();
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    };

    const actualizarPerfil = async datos => {
        const {nombres, apellidos, email} = datos;
        if([nombres, apellidos, email].includes('')) {
            setAlerta({
                msg: 'Nombres, apellidos y email son obligatorios',
                error: true
            })
            return;
        }
        setSpinnerFlag(true);
        const token = localStorage.getItem('token');
        if(!token) {
            setSpinnerFlag(false);
            return;
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const url = `veterinarios/perfil/${datos._id}`
            const {data} = await clienteAxios.put(url, datos, config);
            setAlerta({
                msg: 'Información actualizada correctamente',
                error: false
            })
            setAuth(data);

            setTimeout(() => {
                navigate('/admin/perfil');
                setAlerta({});
            }, 2000);
            
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
        setSpinnerFlag(false);
        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

    const cambiarPassword = async datos => {
        setAlerta({})
        if(Object.values(datos).some(campo => campo === '')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }
        setSpinnerFlag(true);
        const token = localStorage.getItem('token');
        if(!token){
            setSpinnerFlag(false);
            return;
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = 'veterinarios/cambiar-password';
            console.log(datos)
            const {data} = await clienteAxios.put(url, datos, config);
            setAlerta({
                msg: data.msg
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
        setTimeout(() => {
            setAlerta({})
        }, 3000);
        setSpinnerFlag(false);
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                spinnerFlag,
                cerrarSesion,
                alerta,
                actualizarPerfil,
                cambiarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;