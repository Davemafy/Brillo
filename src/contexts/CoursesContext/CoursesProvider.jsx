import { useEffect, useMemo } from "react";
import { CoursesContext } from "./CoursesContext";
import { useSemiPersistentState } from "../../hooks/useSemiPersistentState";

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useSemiPersistentState("courses", []);

  const mockCourses = [
    {
      title: "Learn Figma",
      subtitle: "Mastering UI/UX Design with Figma",
      instructor: "Christopher Morgan",
      duration: "6.30",
      rating: "4.9",
      progress: 99,
      id: "kwejwer",
      img: "https://ontpliitdnnsfwvvzuvg.supabase.co/storage/v1/object/public/app-assets/courses/figma.png",
    },
    {
      title: "Analog photography",
      subtitle: "Focusing on the Art of Film: A Journey Through Lenses and Lights",
      instructor: "Gordon Norman",
      duration: "3.15",
      rating: "4.7",
      progress: 99,
      id: "sjlakwawjkrel",
      img: "https://ontpliitdnnsfwvvzuvg.supabase.co/storage/v1/object/public/app-assets/courses/analog-photography.png",
    },
    {
      title: "Master Instagram",
      subtitle: "Unleashing the Power of Visual Storytelling",
      instructor: "Sophie Gill",
      duration: "7.40",
      rating: "4.6",
      progress: 99,
      id: "skmgwkmsglwrkems",
      img: "https://ontpliitdnnsfwvvzuvg.supabase.co/storage/v1/object/public/app-assets/courses/master-instagram.png",
    },
    {
      title: "Basics of drawing",
      subtitle: "Unleash Your Creativity: A Beginner's Guide to Mastering the Fundamentals",
      instructor: "Jean Tate",
      duration: "11.30",
      rating: "4.8",
      progress: 99,
      id: "sjlakwawjskmgwlwkrel",
      img: "https://ontpliitdnnsfwvvzuvg.supabase.co/storage/v1/object/public/app-assets/courses/basics-of-drawing.png",
    },
    {
      title: "Photoshop - Essence",
      subtitle: "Unleashing Creative Power: Mastering the Basics and Beyond",
      instructor: "David Green",
      duration: "5.35",
      rating: "4.7",
      progress: 99,
      id: "liwjslidjaglwijwielw",
      img: "https://ontpliitdnnsfwvvzuvg.supabase.co/storage/v1/object/public/app-assets/courses/photoshop-essence.png",
    },
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

  
  const providerValue = useMemo(() => [courses, setCourses], [courses]);

  return (
    <CoursesContext.Provider value={providerValue}>
      {children}
    </CoursesContext.Provider>
  );
};
