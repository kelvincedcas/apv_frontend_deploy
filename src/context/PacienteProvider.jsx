import {useState, createContext, useEffect} from 'react';
import clienteAxios from '../config/axios';

const PacienteContext = createContext();

const PacienteProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const [finalizado, setFinalizado] = useState(false);
    const [spinnerFlag, setSpinnerFlag] = useState(false);
    const [spinnerFlagLoading, setSpinnerFlagLoading] = useState(true);
    const [alertaProvider, setAlertaProvider] = useState({});
    const [modalDeleteFlag, setModalDeleteFlag] = useState(false);

    useEffect(() => {
        const obtenerPacientes = async () => {
            const token = localStorage.getItem('token');
            if(!token) {
                setSpinnerFlagLoading(false);
                setFinalizado(true);
                return;
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await clienteAxios('/pacientes', config);
                setPacientes(data);
            } catch (error) {
                console.log(error);
            }
            setSpinnerFlagLoading(false);
            setFinalizado(true);
        }
        obtenerPacientes();
    }, [])

    const setEdicion = (paciente) => {
        setPaciente(paciente);
    }

    const eliminarPaciente = async(e, id) => {
        e.preventDefault();
        setModalDeleteFlag(true)
        const token = localStorage.getItem('token');
        if(!token) return;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
    
        try {
            const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        const pacientesActualizado = pacientes.filter(paciente => paciente._id !== id);
        setPacientes(pacientesActualizado);
    }

    const guardarPaciente = async (paciente) => {
        
        setSpinnerFlag(true);
        setFinalizado(false);
        const token = localStorage.getItem('token');
        if(!token) {
            setSpinnerFlag(false);
            setFinalizado(true);
            return;
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        if(paciente.id){
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
                setAlertaProvider({
                    msg: 'Paciente actualizado correctamente',
                    error: false
                });

                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);
                setPacientes(pacientesActualizado);
            } catch (error) {
                setAlertaProvider({
                    msg: 'Ha ocurrido un error',
                    error: true
                })
            }
        }else{
            console.log('nuevo')
            try {
                const {data} = await clienteAxios.post('/pacientes', paciente, config);
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data;
                setPacientes([pacienteAlmacenado, ...pacientes]);
                setAlertaProvider({
                    msg: 'Paciente registrado correctamente',
                    error: false
                });
            } catch (error) {
                console.log(error);
                setAlertaProvider({
                    msg: 'Hubo un error',
                    error: true
                });
            }
        }
        setSpinnerFlag(false);
        setFinalizado(true);
        setPaciente({});
        
        setTimeout(() => {
            setAlertaProvider({})
        }, 3000);
    } 

    return(
        <PacienteContext.Provider
            value={{
                pacientes,
                spinnerFlag,
                spinnerFlagLoading,
                finalizado,
                guardarPaciente,
                alertaProvider,
                eliminarPaciente,
                modalDeleteFlag,
                setModalDeleteFlag,
                setEdicion,
                paciente,
            }}
        >
            {children}
        </PacienteContext.Provider>
    )
};

export {PacienteProvider};

export default PacienteContext;