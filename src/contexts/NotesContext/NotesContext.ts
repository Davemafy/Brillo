import { createContext, type Dispatch, type SetStateAction } from "react";

interface NotesContextType {
    notes: Note[],
    setNotes:  Dispatch<SetStateAction<Note[]>>
}

export const NotesContext = createContext<NotesContextType | null>(null);

