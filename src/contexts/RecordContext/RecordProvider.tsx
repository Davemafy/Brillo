import { RecordContext } from "./RecordContext";
import { useSemiPersistentState } from "../../hooks/useSemiPersistentState";
import type { PropsWithChildren } from "react";

export const RecordProvider = ({ children }: PropsWithChildren) => {
  const recordHook = useSemiPersistentState<object[]>("records", []);

  return (
    <RecordContext.Provider value={recordHook}>
      {children}
    </RecordContext.Provider>
  );
};
