import { collection, getDocs, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import { Note } from "../types/Note"
import { db } from "../config/firebase";
import { Notify } from "../toastify/Notify";

export interface fetchOrderProps{
    type: 'name' | 'date' ;
    order: 'asc' | 'desc';
}

export function fromFirebase(value:any){

  
    const nota = {
        id : value.id ,
        name: value.name ? value.name : '',
        date: value.date ? value.date : '',
        text: value.text ? value.text : ''
    }
    return new Note({
        id: nota.id,
        name: nota.name,
        date: nota.date,
        text: nota.text
    });
}


export const getNotes = async ({ type, order }: fetchOrderProps) => {
    try {
      // Crear una consulta que ordene dinámicamente por el tipo y orden proporcionados
      const notesCollection = collection(db, "notes");
      const notesQuery = query(notesCollection, orderBy(type, order));
      const notesSnapshot = await getDocs(notesQuery);
  
      // Mapear los documentos obtenidos de Firestore
      const notes = notesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      let notesArr: Note[] = [];

      notes.forEach(element => {
        let x: Note = fromFirebase(element);
        notesArr.push(x);
      });
  
      return notesArr;
    } catch (error) {
        Notify(`Error obteniendo notas: ${error}`,'error');
      return [];
    }
};

export const DeleteNote = async (id:string) => {
  try {
    // Obtén la referencia al documento
    if(id){
        const noteRef = doc(db, "notes", id);
        // Eliminar el documento
        await deleteDoc(noteRef);
    } else {
        Notify('No se encuentra el ID del documento', 'error')
    }
    
    Notify("Nota eliminada exitosamente",'success');
  } catch (error) {
    Notify(`Error al eliminar la nota: ${error}`, 'error');
  }
}
