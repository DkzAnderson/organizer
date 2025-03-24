import React, { useState, useEffect } from 'react'
import { FaTrashCan } from "react-icons/fa6";
import { EditNote } from './EditNote';
import { HiDocumentPlus } from "react-icons/hi2";
import CustomSelect from './CustomSelect';
import { useNavigate } from 'react-router';
import { Note } from '../../types/Note';
import { getNotes, fetchOrderProps } from '../../services/notesServices';
import { DeleteNote } from '../../services/notesServices';


interface orderOptionsProps {
  value: fetchOrderProps;
  label: string;
}

export const NoteList = () => {

  const [data,setData] = useState< Note[] >([]);
  const [loading,setLoading] = useState(true);
  const [noteSelected, selectNote] = useState<Note>();
  const [deleteInterface, setDeleteInterface] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentOrder,setCurrentOrder] = useState<fetchOrderProps>({ order: 'asc', type: 'name'})
  const navigate = useNavigate();

  const FetchData = async ()=>{
    setLoading(true);
    const results = await getNotes({order: currentOrder.order, type: currentOrder.type});
    setData(results);
    setLoading(false);
  }

  const answerDeleteNote = (values: Note) => {
    selectNote(values);
    setDeleteInterface(true);
  }

  const deleteNote = () =>{
    if(noteSelected && noteSelected.id){
      DeleteNote(noteSelected.id);
    }
    FetchData();
    setDeleteInterface(false);
  }

  const editNote = (value:Note) =>{
    selectNote(value);
    setEditMode(true);
  }

  const orderOptions: orderOptionsProps[] = [
    {
      value:{
        order: 'asc',
        type: 'name'
      },
      label: 'Nombre, ascendente'
    },
    {
      value:{
        order: 'desc',
        type: 'name'
      },
      label: 'Nombre, descendente'
    },
    {
      value:{
        order: 'asc',
        type: 'date'
      },
      label: 'Fecha, ascendente'
    },
    {
      value:{
        order: 'desc',
        type: 'date'
      },
      label: 'Fecha, descendente'
    }

  ]

  const changeOrder = (value: fetchOrderProps)=>{
    setCurrentOrder(value);
  }



  const newNote = ()=>{
    navigate('/notes/new')
  }




  useEffect(()=>{
    FetchData();
  },[currentOrder])

  if(loading){
    return(
      <section className='w-full min-h-screen flex items-center justify-center'>
        <h1 className='animate-pulse duration-300 dark:text-[var(--text)] text-2xl'>
          Cargando ...
        </h1>

      </section>
    )
  }


  if(data.length > 0){
    return (
      <section className='w-full min-h-screen flex flex-col relative'>
       
        <button
          onClick={newNote}
          className='fixed z-20 flex items-center justify-center text-5xl bottom-10 right-8 dark:bg-[var(--rd)] bg-[var(--rd)] dark:text-[var(--txt)] text-[var(--txt)] size-20 rounded-full'
        >
          <HiDocumentPlus />
        </button>
              {/* Interfaz para eliminar una nota */}
      <div className={`fixed top-0 left-0 ${deleteInterface ? 'flex' : 'hidden'} items-center justify-center z-50 w-full min-h-screen bg-black/75`}>
        <div className='flex flex-col items-center justify-center bg-[(var--nd-light)] dark:bg-[(var--nd-dark)] p-10'>
          <h1 className='text-white text-2xl font-bold'>
            ¿ Estas seguro de que quieres eliminar la nota: <b className='text-red-500'>{noteSelected?.name}</b>?
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


      {editMode ?
        noteSelected &&

        <div className={`absolute ${editMode ? 'translate-x-[0%]' : '-translate-x-[100%]'} duration-500 w-full min-h-screen flex z-10 `}>
          { /* Editar Nota */}
          <EditNote initialData={noteSelected} changeInterface={setEditMode} fetch={FetchData}/>
        </div>
        :
        <div className={`absolute ${editMode ? '-translate-x-[100%]' : 'translate-x-[0%]'} duration-500 w-full min-h-screen flex flex-col transition-all ease-in-out`}>
         <CustomSelect options={orderOptions} onChange={changeOrder}/>
        <ul className=' flex flex-col z-10 overflow-auto p-1 gap-2'>
          {/* Lista de notas  */}
          {data.map((values, i) => (
            <li
              key={i}
              className='dark:bg-[var(--nd)] bg-[var(--nd)] p-2 grid grid-cols-[55%_35%_10%] items-center'
            >
              <h2 
                className='text-lg font-bold text-[var(--txt)] dark:text-[var(--txt)] truncate'
                onClick={()=>editNote(values)}
              >
                {values.name}
              </h2>

              <h2 
                className='text-sm text-[var(--txt-2)] text-end'
                onClick={()=>editNote(values)}
              >
                {values.date}
              </h2>
              <button
                className='flex justify-end size-full text-xl text-red-500'
                onClick={() => answerDeleteNote(values)}
              >
                <FaTrashCan />
              </button>
            </li>
          ))}
        </ul>
        </div>


      }
      </section>
    )
  }

  if(data.length <= 0){
    return(
      <section className='w-full min-h-screen flex items-center justify-center'>
        <div className='flex flex-col gap-8 items-center'>
          <h1 className='text-3xl text-center dark:text-[var(--txt)] text-[var(--txt)]'>
            Aun no tienes notas guardadas.
          </h1>

          <button
            onClick={newNote}
            className='font-bold text-2xl h-16 w-[70%] text-center rounded dark:bg-[var(--nd)] bg-[var(--nd)] dark:text-[var(--txt)] text-[var(--txt)]'
          >
            Crea una! 
          </button>
        </div>
      </section>
    )
  }

}
