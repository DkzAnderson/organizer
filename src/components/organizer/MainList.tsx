import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { FaTrashCan } from "react-icons/fa6";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from '../../config/firebase';
import { fromFirebase, getNotes, DeleteNote } from '../../services/notesServices';
import { Note } from '../../types/Note';
import { FaPlusCircle } from "react-icons/fa";
import { EditNote } from '../organizador/EditNote';


export const MainList = () => {
    // Estados principales
    const [data, setData] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [noteSelected, selectNote] = useState<Note>();
    const [deleteInterface, setDeleteInterface] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    // Función para obtener notas desde el cache local
    const getCachedNotes = (): Note[] => {
        const cachedNotes: any[] = JSON.parse(localStorage.getItem('notes') || '[]');
        return cachedNotes.map(fromFirebase); // Transformar datos con `fromFirebase`
    };

    const answerDeleteNote = (values: Note) => {
        selectNote(values);
        setDeleteInterface(true);
    }

    const deleteNote = () => {
        if (noteSelected && noteSelected.id) {
            DeleteNote(noteSelected.id);
        }
        FetchData();
        setDeleteInterface(false);
    }

    const editNote = (value: Note) => {
        selectNote(value);
        setEditMode(true);
    }

    const newNote = ()=>{
        navigate('/notes/new')
      }


    const fetchInitialData = async () =>{
        const cachedNotes = getCachedNotes();

        if (cachedNotes.length > 0) {
            setData(cachedNotes);
            setLoading(false);
        } else {
            const notesData = await getNotes({ type: 'date', order: 'desc'});
            setData(notesData);
            localStorage.setItem('notes', JSON.stringify(notesData));
            setLoading(false);
        }
    }

    // Función para escuchar cambios en tiempo real desde Firebase

    const FetchData = () => {
        // Realiza una consulta con orden por fecha en Firebase
        const notesQuery = query(
            collection(db, "notes"),
            orderBy("date", "desc") // Ordena por el campo "date" en orden descendente
        );
    
        const unsubscribe = onSnapshot(notesQuery, (snapshot) => {
            const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const updatedNotes = result.map(fromFirebase);
    
            setData(updatedNotes); // Actualizar el estado local
            setLoading(false);
    
            // Actualizar el cache local
            localStorage.setItem('notes', JSON.stringify(updatedNotes));
        });
    
        return unsubscribe; // Retorna la limpieza de la suscripción
    };

    // Carga inicial desde el cache y Firebase
    useEffect(() => {
        fetchInitialData();
    }, []);

    // Escuchar cambios en tiempo real según el orden seleccionado
    useEffect(() => {
        setLoading(true); // Mostrar indicador de carga
        const unsubscribe = FetchData();
        return () => unsubscribe(); // Limpia la suscripción al desmontar el componente
    }, []);

    if (editMode && noteSelected){
        return(
            <section className='w-full min-h-screen'>
                <EditNote initialData={noteSelected} changeInterface={setEditMode} fetch={FetchData}/>
            </section>
        )
    }

    return (
        <section className='relative flex pt-16 md:justify-center'>
            {/* Interfaz para Eliminar nota */}
            {deleteInterface &&  (
            <div className='absolute z-20 flex items-center justify-center min-h-screen w-full bg-black/75'>
            <div className='flex flex-col items-center justify-center p-5'>
                <h1 className='text-[var(--txt)] dark:text-[var(--txt)] text-2xl font-bold p-5 bg-[var(--rd)]/75 rounded-lg'>
                    ¿ Estas seguro de que quieres eliminar la nota: <b className='text-[var(--th)]'>{noteSelected?.name}</b>?
                </h1>
                <span className='w-full mt-10 flex gap-2 h-12 text-2xl font-bold'>

                    <button
                        className='bg-[var(--nd)] dark:bg-[var(--nd)] size-full rounded text-[var(--txt)] dark:text-[var(--txt)]'
                        onClick={() => setDeleteInterface(false)}
                    >
                        Volver
                    </button>
                    <button
                        className='bg-red-600 size-full rounded text-[var(--txt)] dark:text-[var(--txt)]'
                        onClick={deleteNote}
                    >
                        Eliminar
                    </button>
                </span>
            </div>
        </div>
            )}
            {/* Interfaz de carga */}
            {loading && (
                <div className='flex min-h-screen w-full items-center justify-center'>
                    <p className='dark:text-[var(--txt)] text-[var(--txt)] text-2xl animate-pulse duration-300'>
                        Cargando...
                    </p>
                </div>
            )}
            {/* Si no hay notas  */}
            {!loading && data.length === 0 && (
                <div className='flex min-h-screen w-full items-center justify-center'>
                    <p className='dark:text-[var(--txt)] text-[var(--txt)] text-2xl animate-pulse duration-300'>
                        No hay notas disponibles.
                    </p>
                </div>
            )}
            {/* Interfaz regular */}
            {!loading && data.length > 0 && (
                <div className='z-10 flex flex-col w-full md:w-1/2 min-h-[85vh] py-10 px-2'>
                    <h1 className='mb-4 font-bold text-center dark:text-[var(--txt-2)] text-[var(--txt-2)] '>
                        Selecciona una nota para editarla
                    </h1>

                    <button
                        className='relative cursor-pointer grid grid-cols-[80%_20%] gap-2 h-16 items-center pl-2 pr-4.5 bg-[var(--rd)] dark:[var(--rd)] rounded-lg'
                        onClick={newNote}
                    >
                        <h1 className='text-lg font-bold text-start text-[var(--txt)] '>
                            Nueva nota
                        </h1>
                        <label className='flex items-center justify-center size-full text-3xl cursor-pointer'>
                            <FaPlusCircle className='text-lime-500' />
                        </label>
                    </button>

                    <ul className='w-full max-h-[65vh] overflow-auto flex flex-col gap-2 py-2'>
                        {data.map(note => (
                            <li
                                key={note.id}
                                className='relative group cursor-pointer grid grid-cols-[80%_20%] min-h-16 max-h-16 items-center px-2 bg-[var(--nd)] dark:[var(--nd)] hover:bg-transparent rounded-lg overflow-hidden duration-500 transition-all ease-in'
                            >
                                <div className='h-full w-[103%] absolute z-0 bg-gradient-to-br from-[var(--th)]/75 to-[var(--rd)]/75 skew-x-46 translate-x-[-110%] group-hover:translate-x-[-10%] duration-500 transition-all ease-in-out'>

                                </div>
                                <h2 
                                    className='z-10 mb-1 text-lg font-bold truncate text-[var(--txt)] dark:[var(--txt)]'
                                    onClick={()=>editNote(note)}
                                >
                                    {note.name}
                                </h2>

                                <div className='size-full flex'>
                                    <button
                                        className='flex cursor-pointer z-10 justify-center items-center size-full text-3xl text-red-500'
                                        onClick={() => answerDeleteNote(note)}
                                    >
                                        <FaTrashCan />
                                    </button>
                                </div>

                                {/* Fecha y hora de la nota */}
                                <h5 className='absolute text-sm bottom-1 left-6 text-[var(--txt-2)] dark:[var(--txt-2)]'>
                                    {note.date}
                                </h5>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
};