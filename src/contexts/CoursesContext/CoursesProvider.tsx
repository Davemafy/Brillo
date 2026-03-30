import { useEffect, useMemo, type PropsWithChildren } from "react";
import { CoursesContext } from "./CoursesContext";
import { useSemiPersistentState } from "../../hooks/useSemiPersistentState";
import { supabase } from "../../superbaseClient";
import { useUser } from "../../hooks/useUser";

export const CoursesProvider = ({ children }: PropsWithChildren) => {
  const [courses, setCourses] = useSemiPersistentState<Course[]>("courses", []);
  const { user } = useUser();

  useEffect(() => {
    const getCourses = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

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

  const providerValue = useMemo(() => ({ courses, setCourses }), [courses]);

  return (
    <CoursesContext.Provider value={providerValue}>
      {children}
    </CoursesContext.Provider>
  );
};
