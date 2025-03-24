
import { getNotes } from '../../services/notesServices'
import { Note } from '../../types/Note'

export const Nota = () => {

    const createNewNote = async ()=>{
        /*
        const newNote = new Note({name: 'Titulo', date: 'anmoche', text: 'domito v: '})
    
        newNote.save();
        */
/*

        // Para agregar nuevas notas.

        const nuevaNota = new Note({
            name: 'Prueba 3',
            text: 'Probando v: ',
        })

        nuevaNota.save();
*/
        const results = await getNotes();
        console.log(results);
    }

  return (
    <div>
        <button 
            className='text-white '
            onClick={createNewNote}
        >
            Agregar nota
        </button>
    </div>
  )
}
