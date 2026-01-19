import { useEffect } from "react";
import { CoursesContext } from "./CoursesContext";
import { useSemiPersistentState } from "../../hooks/useSemiPersistentState";

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useSemiPersistentState("courses", []);

    const mockCourses = [
      {
        title: "Learn Figma",
        instructor: "Christopher Morgan",
        duration: "6.30",
        rating: "4.9",
        progress: 99,
      },
      {
        title: "Analog photography",
        instructor: "Gordon Norman",
        duration: "3.15",
        rating: "4.7",
        progress: 99,
      },
      {
        title: "Master Instagram",
        instructor: "Sophie Gill",
        duration: "7.40",
        rating: "4.6",
        progress: 99,
      },
      {
        title: "Basics of drawing",
        instructor: "Jean Tate",
        duration: "11.30",
        rating: "4.8",
        progress: 99,
      },
      {
        title: "Photoshop - Essence",
        instructor: "David Green",
        duration: "5.35",
        rating: "4.7",
        progress: 99,
      },

      // { title: "React Basics", duration: 100, progress: 0 },
      // { title: "Javascript Deep Dive", duration: 100, progress: 0 },
      // { title: "CSS Mastery", duration: 100, progress: 0 },
      // { title: "Frontend Project Workshop", duration: 100, progress: 0 },
      // { title: "TypeScript Fundamentals", duration: 100, progress: 0 },
      // { title: "Node.js Basics", duration: 100, progress: 0 },
      // { title: "Data Structures & Algorithms", duration: 100, progress: 0 },
    ];


  useEffect(() => {
    const defaultCourses = async () => {
      try {
        const response = await fetch(`/api/courses`);
        const data = await response.json();

        setCourses(data);
      } catch {
        setCourses(mockCourses);
      }
    };

    !(courses.length > 0) && defaultCourses();
  }, [courses, setCourses]);

  return (
    <CoursesContext.Provider value={[courses, setCourses]}>
      {children}
    </CoursesContext.Provider>
  );
};
