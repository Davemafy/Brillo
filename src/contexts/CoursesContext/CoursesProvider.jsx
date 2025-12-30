import { useEffect } from "react";
import { CoursesContext } from "./CoursesContext";
import { useSemiPersistentState } from "../../hooks/useSemiPersistentState";

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useSemiPersistentState("courses", []);

  useEffect(() => {
    const defaultCourses = async () => {
      const response = await fetch(`/api/courses`);
      const data = await response.json();
      console.log(data);

      setCourses(data);
    };

    !(courses.length > 0) && defaultCourses();
  }, [courses, setCourses]);

  return (
    <CoursesContext.Provider value={[courses, setCourses]}>
      {children}
    </CoursesContext.Provider>
  );
};
