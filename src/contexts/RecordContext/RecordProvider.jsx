import { RecordContext } from "./RecordContext";
import { useSemiPersistentState } from "../../hooks/useSemiPersistentState";

export const RecordProvider = ({ children }) => {
  const recordHook = useSemiPersistentState("records", []);

  return (
    <RecordContext.Provider value={recordHook}>
      {children}
    </RecordContext.Provider>
  );
};
