import { useEffect, useMemo } from "react";
import { CoursesContext } from "./CoursesContext";
import { useSemiPersistentState } from "../../hooks/useSemiPersistentState";
import { supabase } from "../../superbaseClient";

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useSemiPersistentState("courses", []);

  useEffect(() => {
    const getCourses = async () => {
      const { data, error } = await supabase.from("courses").select("*");

      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        setCourses(data);
      }
    };

    getCourses();
  }, []);

  const providerValue = useMemo(() => [courses, setCourses], [courses]);

  return (
    <CoursesContext.Provider value={providerValue}>
      {children}
    </CoursesContext.Provider>
  );
};
