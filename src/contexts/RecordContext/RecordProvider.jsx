import { useState, useEffect } from "react";
import { RecordContext } from "./RecordContext";

function useSemiPersistentState(key, initialValue) {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || initialValue,
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export const RecordProvider = ({ children }) => {
  const recordHook = useSemiPersistentState("records", []);

  return (
    <RecordContext.Provider value={recordHook}>
      {children}
    </RecordContext.Provider>
  );
};
