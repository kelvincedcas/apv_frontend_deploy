import usePaciente from "../hooks/usePaciente";
import DataTable from 'react-data-table-component';
import ModalDelete from "../components/ModalDelete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalPaciente from "../components/ModalPaciente";


const AdministrarPacientes = () => {

    const [records, setRecords] = useState([]);
    const {pacientes, spinnerFlagLoading, modalDeleteFlag, setModalDeleteFlag, setEdicion} = usePaciente();
    const [paciente, setPaciente] = useState({});
    const [modalPacienteFlag, setModalPacienteFlag] = useState(false);

    const navigate = useNavigate();
    
    if(!spinnerFlagLoading) {
        console.log(pacientes)
    }

    const columns = [
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'Tipo de mascota',
            selector: row => row.tipo,
            sortable: true
        },
        {
            name: 'Propietario',
            selector: row => row.propietario,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Teléfono',
            selector: row => row.telefono
        },
        {
            name: 'Acciones',
            grow: 1.5,
            cell: (row) => <div 
                className="flex gap-1"
            >

            <button 
            type="button"
            className="cursor-pointer bg-primary p-2 rounded-full text-dark-blue hover:bg-dark-blue hover:text-white active:bg-dark-blue active:text-white duration-200 ease-in"
            onClick={() => {
                setPaciente(row);
                setModalPacienteFlag(true);
            }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

            </button>

            <button 
            type="button"
            className="cursor-pointer bg-primary p-2 rounded-full text-neutral-700 hover:bg-neutral-700 hover:text-white active:bg-neutral-700 active:text-white duration-200 ease-in"
            onClick={(e) => {
                e.preventDefault();
                setEdicion(row);
                navigate('/admin/nuevo-paciente'); 
            }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </button>

            <button 
            type="button"
            className="cursor-pointer bg-primary p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white active:bg-red-500 active:text-white duration-200 ease-in"
            onClick={(e) => {
                e.preventDefault();
                setModalDeleteFlag(true);
                setPaciente(row);
            }
            }
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
            </div>,
        }
    ]
    return ( 
       pacientes.length ?
       <>
       <h2 className="mb-4">Administrar tus pacientes</h2>

       <div className="rounded-2xl overflow-hidden bg-white">
        <DataTable 
                
                columns={columns}
                data={pacientes}
                pagination
                
            />
       </div>

       {modalDeleteFlag && 
       <ModalDelete
           paciente={paciente}
       />}

       {modalPacienteFlag &&
       <ModalPaciente
            paciente={paciente}
            setModalPacienteFlag={setModalPacienteFlag}
       />
       }

        </>
        :
        <p>No hay pacientes</p>
     );
}
 
export default AdministrarPacientes;