const ModalPaciente = ({paciente, setModalPacienteFlag}) => {

    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha)
    }

    return ( 
        <div className="fixed inset-0 bg-neutral-600/30 z-20  flex justify-center items-center">
            <div className="bg-white p-10 rounded-2xl flex flex-col gap-6 w-9/10 sm:w-7/10 md:w-6/10 lg:w-4/10 transition-all duration-200 ease-in max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center w-full">
                    <p className="font-base text-neutral-400">Detalle de paciente</p>
                    <button
                        type="button"
                        className="p-1 bg-neutral-100 rounded-full cursor-pointer hover:bg-neutral-200 duration-200 ease-in active:bg-neutral-200"
                        onClick={() => {setModalPacienteFlag(false)}}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>
                <div className="border-t-2 border-t-neutral-100 w-full"></div>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-2 w-5/10">
                            <p className="font-semibold">Nombres:</p>
                            <span className="block bg-primary p-4 rounded-lg text-neutral-500">{paciente.nombre}</span>
                        </div>
                        <div className="flex flex-col gap-2 w-5/10">
                            <p className="font-semibold">Tipo de mascota:</p>
                            <span className="block bg-primary p-4 rounded-lg text-neutral-500">{paciente.tipo}</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-2 w-4/10 md:w-5/10">
                            <p className="font-semibold">Propietario:</p>
                            <span className="block bg-primary p-4 rounded-lg overflow-hidden text-neutral-500">{paciente.propietario}</span>
                        </div>
                        <div className="flex flex-col gap-2 w-6/10 md:w-5/10">
                            <p className="font-semibold">Email:</p>
                            <span className="block bg-primary p-4 rounded-lg text-neutral-500">{paciente.email}</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-3 flex-col md:flex-row">
                        <div className="flex flex-col gap-2 md:w-5/10">
                            <p className="font-semibold">Teléfono:</p>
                            <span className="block bg-primary p-4 rounded-lg text-neutral-500">{paciente.telefono}</span>
                        </div>
                        <div className="flex flex-col gap-2 md:w-5/10">
                            <p className="font-semibold">Fecha de alta:</p>
                            <span className="block bg-primary p-4 rounded-lg overflow-hidden text-neutral-500">{formatearFecha(paciente.fechaAlta)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">Síntomas:</p>
                        <span className="block bg-primary p-4 rounded-lg text-neutral-500">{paciente.sintomas}</span>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ModalPaciente;