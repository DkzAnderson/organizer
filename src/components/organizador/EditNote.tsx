import { useState } from 'react'
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


    return (
        <section className='flex w-full min-h-screen relative '>
            <div className='z-10 flex flex-col min-h-screen w-full relative'>
                <input
                    className='w-full flex h-14 py-2 pl-2 pr-12 truncate  text-lg font-bold dark:text-[var(--txt-2)] text-[var(--txt-2)] focus:dark:text-[var(--txt)] focus:text-[var(--txt)] border-b-2 dark:border-[var(--rd)] border-[var(--rd)] focus:bg-[var(--rd)] dark:focus:focus:bg-[var(--rd)] outline-none'
                    placeholder='Título'
                    defaultValue={initialData.name}
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button 
                    className='fixed right-2 top-12 text-3xl dark:text-[var(--txt)] text-[var(--txt)]'
                    onClick={GetData}
                >
                    <FaSave />
                </button>

                <textarea
                    className='p-2 dark:text-[var(--txt-2)] text-[var(--txt-2)] focus:dark:text-[var(--txt)] focus:text-[var(--txt)] outline-none w-full h-full focus:bg-[var(--rd)] dark:focus:focus:bg-[var(--rd)]'
                    placeholder='Escriba su nota aquí...'
                    defaultValue={initialData.text}
                    onChange={(e) => setData(e.target.value)}
                >

                </textarea>
            </div>
        </section>
    )
}
