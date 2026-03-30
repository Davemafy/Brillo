import { createContext, type Dispatch, type SetStateAction } from "react";

interface CoursesContextType {
  courses: Course[],
  setCourses: Dispatch<SetStateAction<Course[]>>
}

export const CoursesContext = createContext<CoursesContextType | null>(null);

