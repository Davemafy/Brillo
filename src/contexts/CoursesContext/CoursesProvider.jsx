import { useEffect } from "react";
import { CoursesContext } from "./CoursesContext";
import { useSemiPersistentState } from "../../hooks/useSemiPersistentState";
import { set } from "zod";

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useSemiPersistentState("courses", []);

  const mockCourses = [
    {
      title: "Learn Figma",
      instructor: "Christopher Morgan",
      duration: "6h 30min",
      rating: "4,9",
      progress: 99,
      img: "https://picsum.photos/200",
    },
    {
      title: "Analog photography",
      instructor: "Gordon Norman",
      duration: "3h 15min",
      rating: "4,7",
      progress: 99,
      img: "https://picsum.photos/200",
    },
    {
      title: "Master Instagram",
      instructor: "Sophie Gill",
      duration: "7h 40min",
      rating: "4,6",
      progress: 99,
      img: "https://picsum.photos/200",
    },
    {
      title: "Basics of drawing",
      instructor: "Jean Tate",
      duration: "11h 30min",
      rating: "4,8",
      progress: 99,
      img: "https://picsum.photos/200",
    },
    {
      title: "Photoshop - Essence",
      instructor: "David Green",
      duration: "5h 35min",
      rating: "4,7",
      progress: 99,
      img: "https://picsum.photos/200",
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
