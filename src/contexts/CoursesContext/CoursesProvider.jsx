import { useEffect, useMemo } from "react";
import { CoursesContext } from "./CoursesContext";
import { useSemiPersistentState } from "../../hooks/useSemiPersistentState";
import { supabase } from "../../superbaseClient";
import { useUser } from "../../hooks/useUser";

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useSemiPersistentState("courses", []);
  const { user } = useUser();

  useEffect(() => {
    const getCourses = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

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
