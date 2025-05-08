import { useState, useEffect } from 'react'
import { FaSave } from "react-icons/fa";
import { Note } from '../../types/Note';

interface Props {
    initialData: Note;
    changeInterface: Function;
    fetch : Function;
}


export const EditNote: React.FC< Props > = ({initialData,changeInterface,fetch}) => {
    const [title, setTitle] = useState(initialData.name);
    const [data, setData] = useState(initialData.text);

    function GetData() {
        // edicion y guardado en firebase
        initialData.id && initialData.edit(title,data,initialData.id);
        // Volver a la lista de notas
        changeInterface(false);
        fetch();  
        
    }

    useEffect(() => {
        const handleBackButton = () => {
          // Aquí rediriges a una sección específica
          changeInterface(false)
        };
      
        // Escucha el evento de retroceso del historial
        window.addEventListener("popstate", handleBackButton);
      
        return () => {
          // Limpia el evento al desmontar el componente
          window.removeEventListener("popstate", handleBackButton);
        };
      }, []);

    return (
        <section className='flex w-full min-h-screen relative pt-20'>
            <div className='z-10 flex flex-col min-h-full w-full relative'>
                <button
                    className='overflow-hidden flex relative group hover:bg-transparent cursor-pointer text-center text-lg font-bold w-full py-4 dark:bg-[var(--nd)] bg-[var(--nd)] duration-500 transition-all ease-in-out'
                    onClick={() => changeInterface(false)}
                >
                    <div className='h-full w-[107.5%] rounded bottom-7 absolute z-0 bg-gradient-to-br from-[var(--th)]/75 to-[var(--rd)]/75 -skew-x-46 translate-x-[110%] group-hover:translate-x-[3%] duration-500 transition-all ease-in-out'>

                    </div>
                    <div className='h-full w-[107.5%] rounded -bottom-7 absolute z-0 bg-gradient-to-br from-[var(--th)]/75 to-[var(--rd)]/75 skew-x-46 translate-x-[110%] group-hover:translate-x-[3%] duration-500 transition-all ease-in-out'>

                    </div>
                    <h1 className='w-full text-center z-20 dark:text-[var(--txt)] text-[var(--txt)]'>
                        Volver al inicio
                    </h1>
                </button>
                <div className='w-full flex relative'>
                <input
                    className='w-full flex h-14 py-2 pl-4 pr-12 truncate text-lg font-bold dark:text-[var(--txt-2)] text-[var(--txt-2)] focus:dark:text-[var(--txt)] focus:text-[var(--txt)] border-b-2 dark:border-[var(--rd)] border-[var(--rd)] focus:bg-[var(--rd)] dark:focus:focus:bg-[var(--rd)] outline-none'
                    placeholder='Título'
                    defaultValue={initialData.name}
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                />
    
                <button 
                    className='absolute cursor-pointer z-20 right-2 top-2 text-4xl dark:text-[var(--txt)] text-[var(--txt)]'
                    onClick={GetData}
                >
                    <FaSave />
                </button>
                </div>


                <textarea
                    className='p-4 text-lg font-semibold bg-[var(--nd)] dark:text-[var(--txt-2)] text-[var(--txt-2)] focus:dark:text-[var(--txt)] focus:text-[var(--txt)] outline-none w-full h-full focus:bg-[var(--rd)] dark:focus:focus:bg-[var(--rd)]'
                    placeholder='Escriba su nota aquí...'
                    defaultValue={initialData.text}
                    onChange={(e) => setData(e.target.value)}
                >

                </textarea>
            </div>
        </section>
    )
}
