import usePaciente from "../hooks/usePaciente";

const ModalDelete = ({paciente}) => {

    const {setModalDeleteFlag, eliminarPaciente} = usePaciente();

    return ( 
        <div className="fixed inset-0 bg-neutral-600/30 z-20 scrollbar-none flex justify-center items-center">
            <div className="bg-white p-10 rounded-2xl flex flex-col items-center gap-6 w-9/10 lg:w-auto">
                <div className="bg-rose-500 text-white p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="flex flex-col gap-2">
                    <p>¿Estás seguro que deseas <span className="font-bold">eliminar</span> al paciente <span className="font-bold">{paciente.nombre}</span>?</p>
                    <span className="text-sm text-neutral-400 font-light">Esta acción no puede deshacerse.</span>
                </div>
                <div className="flex w-full gap-3 justify-between">
                    <button
                        type="button"
                        className="bg-rose-500 text-white  py-3 rounded-xl px-6 hover:bg-rose-600 cursor-pointer active:bg-rose-600 duration-200 ease-in w-48/100"
                        onClick={(e) => {
                            eliminarPaciente(e, paciente._id);
                            setModalDeleteFlag(false);
                        }}
                    >Si, eliminar</button>
                    <button
                        type="button"
                        className="bg-neutral-700 text-white  py-3 rounded-xl px-6 hover:bg-neutral-800 cursor-pointer active:bg-neutral-800 duration-200 ease-in w-48/100"
                        onClick={() => {setModalDeleteFlag(false)}}
                    >Cancelar</button>
                </div>
            </div>
        </div>
     );
}
 
export default ModalDelete;