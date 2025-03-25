import { Temporal } from '@js-temporal/polyfill';
import { db } from '../config/firebase';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { Notify } from '../toastify/Notify';

interface NoteProps {
    id? : string;
    name: string;
    date?: string;
    text: string;
}

export class Note {
    id? : string;
    date?: string;
    name: string;
    text: string

    constructor({name, text, id = 'nada', date}: NoteProps){
        this.id = id
        this.name = name;
        this.text = text;
        this.date = date ? date : `${Temporal.Now.plainTimeISO().toString().slice(0,5)} / ${Temporal.Now.plainDateISO().toString()}`;
    }

    async save(){
        const time = Temporal.Now.plainTimeISO().toString().slice(0,5)
        const fecha = Temporal.Now.plainDateISO().toString()
        this.date = `${fecha} / ${time}`;

        try {
            // Referencia al documento con 'name' como ID
            const docRef = await addDoc(collection(db, 'notes'), {
                name: this.name,
                date: this.date,
                text: this.text
            });

            await updateDoc(docRef, {id: docRef.id})

            Notify('Nota guardada exitosamente','success');
        } catch (error) {
            Notify(`Error al guardar la nota: ${error}`, 'error');
        }
        
    }

    async edit(name: string, text: string, id: string) {
        const time = Temporal.Now.plainTimeISO().toString().slice(0, 5);
        const fecha = Temporal.Now.plainDateISO().toString();
        const dateStr = `${fecha} / ${time}`

        try {
            // Obtén la referencia al documento que deseas editar
            const noteRef = doc(db, "notes", id);
        
            // Actualiza los campos especificados en "updatedData"
            await updateDoc(noteRef, {
                id: id,
                name: name,
                text: text,
                date: dateStr
            });
        
            Notify("Nota actualizada exitosamente", 'success');
          } catch (error) {
            Notify(`Error al editar la nota: ${error}`, 'error');
          }
    }

    show(){
        console.log(this)
    }
}