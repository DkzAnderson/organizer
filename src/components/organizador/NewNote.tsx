import { useState, useEffect } from 'react'
import { FaSave } from "react-icons/fa";
import { Note } from '../../types/Note';
import { Link, useNavigate } from 'react-router';



export const NewNote = () => {

    const [title, setTitle] = useState('');
    const [data, setData] = useState('');
    const navigate = useNavigate()

    function GetData() {
        // creación de nota
        const newNote = new Note ({name: title, text: data});
        // guardado en firebase
        newNote.save();
        
        setTimeout(()=>{
            navigate('/notes')
        },2500)
    }

        useEffect(() => {
            const handleBackButton = () => {
              // Aquí rediriges a una sección específica
              window.location.href = "/notes";
            };
          
            // Escucha el evento de retroceso del historial
            window.addEventListener("popstate", handleBackButton);
          
            return () => {
              // Limpia el evento al desmontar el componente
              window.removeEventListener("popstate", handleBackButton);
            };
          }, []);

    return (
        <section className='flex w-full relative'>
            <div className='z-10 flex flex-col min-h-screen w-full relative'>
                <Link 
                    className='text-center text-lg font-bold w-full py-4 dark:bg-[var(--nd)] bg-[var(--nd)] dark:text-[var(--txt)] text-[var(--txt)]'
                    to={'/notes'}
                >
                    Volver al inicio
                </Link>

                <span className='relative'>
                    <input
                        className='flex h-14 w-full py-2 pl-2 pr-12 truncate  text-lg font-bold dark:text-[var(--txt-2)] text-[var(--txt-2)] focus:dark:text-[var(--txt)] focus:text-[var(--txt)] border-b-2 dark:border-[var(--rd)] border-[var(--rd)] focus:bg-[var(--rd)] dark:focus:focus:bg-[var(--rd)] outline-none'
                        placeholder='Título'
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                        className='absolute right-2 top-3 text-3xl dark:text-[var(--txt)] text-[var(--txt)]'
                        onClick={GetData}
                    >
                        <FaSave />
                    </button>
                </span>

                <textarea
                    className='p-2 dark:text-[var(--txt-2)] text-[var(--txt-2)] focus:dark:text-[var(--txt)] focus:text-[var(--txt)] outline-none w-full h-full focus:bg-[var(--rd)] dark:focus:focus:bg-[var(--rd)]'
                    placeholder='Escriba su nota aquí...'
                    onChange={(e) => setData(e.target.value)}
                >

                </textarea>
            </div>
        </section>
    )
}
