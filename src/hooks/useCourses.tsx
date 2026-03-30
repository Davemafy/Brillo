import { useContext } from "react"
import { CoursesContext } from "../contexts/CoursesContext"

export const useCourses = () => {
  const context = useContext(CoursesContext)
  if (context === null)
  {
    throw new Error("useCourses must be used within a CoursesProvider")
  }
  return context
}