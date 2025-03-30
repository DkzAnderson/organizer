import { collection, getDocs, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import { Note } from "../types/Note"
import { db } from "../config/firebase";
import { Notify } from "../toastify/Notify";
