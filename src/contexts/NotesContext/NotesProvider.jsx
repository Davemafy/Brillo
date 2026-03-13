import { NotesContext } from "./NotesContext";
import { useSemiPersistentState } from "../../hooks/useSemiPersistentState";
import {  useMemo } from "react";

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useSemiPersistentState("notes", []);

  const providerValue = useMemo(() => [notes, setNotes], [notes]);

  return (
    <NotesContext.Provider value={providerValue}>
      {children}
    </NotesContext.Provider>
  );
};
