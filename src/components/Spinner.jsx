const Spinner = () => {
    return ( 
        <div className="fixed inset-0 flex flex-col gap-2 items-center justify-center">
            <span className="loader-black"></span>
            <p className="text-neutral-400 text-sm font-light">Cargando...</p>
        </div>
     );
}
 
export default Spinner;