import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import usePaciente from "../hooks/usePaciente";
import { useNavigate } from "react-router-dom";

const NuevoPaciente = () => {

    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaAlta, setFechaAlta] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);

    const {spinnerFlag, finalizado, guardarPaciente, alertaProvider, paciente} = usePaciente();

    useEffect(() => {
        if(paciente?.nombre) {
            setNombre(paciente.nombre);
            setTipo(paciente.tipo);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setTelefono(paciente.telefono);
            setFechaAlta(paciente.fechaAlta);
            setSintomas(paciente.sintomas);
            setId(paciente._id);

        }
    }, [paciente]);

    const navigate = useNavigate();
     
    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, tipo, propietario, email, telefono, fechaAlta, sintomas].includes('')) {
            return;
        }
        await guardarPaciente({nombre, tipo, propietario, email, telefono, fechaAlta, sintomas, id});

        {finalizado &&
            setNombre('');
            setTipo('');
            setPropietario('');
            setEmail('');
            setTelefono('');
            setFechaAlta('');
            setSintomas('');
            setId(null);
            setTimeout(() => {
                navigate('/admin/administrar-pacientes')
            }, 3000);
        }
    }

    const {msg} = alertaProvider;

    return ( 
        <>
        <div className="m-auto w-99/100 lg:w-7/10 xl:w-5/10 duration-200 ease-in">
            <div className="bg-white p-10 rounded-4xl text-neutral-600 flex flex-col gap-3 border-2 border-neutral-100 duration-200 ease-in justify-center">
                <form 
                    className="flex flex-col gap-3 group" 
                    noValidate
                    onSubmit={handleSubmit}>
                        {id ? <h2 className="text-center text-2xl font-bold">¡Edita un paciente existente!</h2> : <h2 className="text-center text-2xl font-bold">¡Registra un nuevo paciente!</h2>}
                        <p className="text-center text-neutral-400 font-light">Ingresa toda la información pertinente, para registrar un nuevo paciente.</p>
                        <div className="flex flex-col gap-1 px-1">
                                <label htmlFor="nombre" className="after:ml-0.5 after:text-red-500 after:content-['*']">Nombres</label>
                                <input 
                                    id="nombre"
                                    type="text" 
                                    placeholder="Ingresa el nombre del paciente" className="bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue invalid:[&:not(:placeholder-shown):not(:focus)]:outline-red-500 peer"
                                    required
                                    pattern=".{2,}"
                                    value={nombre}
                                    onChange={(e) => {
                                        setNombre(e.target.value);
                                    }}
                                />
                                <p 
                                    className="hidden text-sm text-red-500 mt-1 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
                                >El campo nombre es obligatorio</p>
                        </div>

                        <div className="flex flex-col gap-1 px-1">
                            <label htmlFor="tipo" className="after:ml-0.5 after:text-red-500 after:content-['*']">Tipo de mascota</label>
                            <select 
                            id="tipo"
                            className="bg-primary rounded-lg transition duration-100 ease-in p-4 outline-2 outline-primary  focus:outline-blue text-neutral-400 font-normal"
                            value={tipo}
                            onChange={e => {setTipo(e.target.value)}}
                            >
                                <option disabled value="">Selecciona un tipo de mascota</option>
                                <option value="Perro">Perro</option>
                                <option value="Gato">Gato</option>
                                <option value="Loro">Loro</option>
                                <option value="Perico">Perico</option>
                                <option value="Ardilla">Ardilla</option>
                                <option value="Conejo">Conejo</option>
                                <option value="Hamster">Hamster</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1 px-1">
                                <label htmlFor="propietario" className="after:ml-0.5 after:text-red-500 after:content-['*']">Propietario</label>
                                <input 
                                    id="propietario"
                                    type="text" 
                                    placeholder="Ingresa el nombre del propietario" className="bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue invalid:[&:not(:placeholder-shown):not(:focus)]:outline-red-500 peer"
                                    required
                                    pattern=".{3,}"
                                    value={propietario}
                                    onChange={(e) => {
                                        setPropietario(e.target.value);
                                    }}
                                />
                                <p 
                                    className="hidden text-sm text-red-500 mt-1 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
                                >El campo propietario es obligatorio</p>
                        </div>
                        <div className="flex flex-col gap-1 px-1">
                            <label htmlFor="email" className="after:ml-0.5 after:text-red-500 after:content-['*']">Email</label>
                            <input 
                                id="email"
                                type="email" 
                                placeholder="Ingresa el email del propietario" 
                                className="bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue invalid:[&:not(:placeholder-shown):not(:focus)]:outline-red-500 peer"
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
                        <div className="flex flex-col gap-3 lg:flex-row justify-between px-1">
                            <div className="flex flex-col gap-1 lg:w-6/10">
                                    <label htmlFor="telefono" className="after:ml-0.5 after:text-red-500 after:content-['*']">Teléfono</label>
                                    <input 
                                        inputMode="numeric"
                                        id="telefono"
                                        type="number" 
                                        placeholder="Ingresa el telefono del propietario" className="bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue invalid:[&:not(:placeholder-shown):not(:focus)]:outline-red-500 peer"
                                        required
                                        pattern=".{7,}"
                                        min={0}
                                        value={telefono}
                                        onChange={(e) => {
                                            setTelefono(e.target.value.trim());
                                        }}
                                    />
                                    <p 
                                        className="hidden text-sm text-red-500 mt-1 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
                                    >El campo teléfono es obligatorio</p>
                            </div>
                            <div className="flex flex-col gap-1 lg:w-4/10">
                                    <label htmlFor="fechaAlta" className="after:ml-0.5 after:text-red-500 after:content-['*']">Fecha de alta</label>
                                    <input 
                                        id="fechaAlta"
                                        type="date" 
                                        className="bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue text-neutral-400"
                                        required
                                        pattern=".{1,}"
                                        value={fechaAlta}
                                        onChange={(e) => {
                                            setFechaAlta(e.target.value.trim());
                                        }}
                                    />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 px-1">
                            <label htmlFor="sintomas" className="after:ml-0.5 after:text-red-500 after:content-['*']">Síntomas</label>
                            <textarea 
                                id="sintomas"
                                placeholder="Ingresa los síntomas del paciente" 
                                className="bg-primary p-4 rounded-lg transition duration-100 ease-in outline-2 outline-primary  focus:outline-blue invalid:[&:not(:placeholder-shown):not(:focus)]:outline-red-500 peer"
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                value={sintomas}
                                onChange={(e) => {
                                    setSintomas(e.target.value);
                                }}
                            />
                            <p 
                                className="hidden text-sm text-red-500 mt-1 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block"
                            >Por favor, ingresa un email válido</p>
                        </div>
                        
                        <input 
                            type="submit" 
                            value={spinnerFlag ? '' : `${id ? 'Guardar cambios': 'Registrar paciente' }`}
                            className="z-0 bg-blue text-white rounded-xl py-4 hover:cursor-pointer active:bg-dark-blue hover:bg-dark-blue duration-200 ease-in mt-2 group-invalid:pointer-events-none group-invalid:opacity-30"
                        />
                        {spinnerFlag ?  <span className="loader mx-auto -mt-14 mb-4"></span> : null}
                </form>
                {msg &&
                <Alerta
                    alerta={alertaProvider}
                />}
            </div>
        </div>         
        </>
     );
}
 
export default NuevoPaciente;