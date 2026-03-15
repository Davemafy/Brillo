import { NotesContext } from "./NotesContext";
import { useSemiPersistentState } from "../../hooks/useSemiPersistentState";
import { useEffect, useMemo } from "react";
import { supabase } from "../../superbaseClient";

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useSemiPersistentState("notes", []);

  useEffect(() => {
    const getNotes = async () => {
      const { data, error } = await supabase.from("notes").select("*");

      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        setNotes(data);
      }
    };

    getNotes();
  }, []);

  const providerValue = useMemo(() => [notes, setNotes], [notes]);

  return (
    <NotesContext.Provider value={providerValue}>
      {children}
    </NotesContext.Provider>
  );
};
