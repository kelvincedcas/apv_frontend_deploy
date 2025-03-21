const Alerta = ({alerta}) => {
    
    return ( 
        <div className={`${alerta.error ? 'bg-red-100 border-red-200 text-red-600' : 'bg-emerald-100 border-emerald-200 text-emerald-600'} rounded-xl border-2 text-sm  p-4 flex items-center gap-1 duration-200 ease-in w-full`}>
            <div>
                {alerta.error 
                    ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                }
            </div>
            <div className="w-9/10">
                {alerta.msg}
            </div>
        </div>
     );
}
 
export default Alerta;