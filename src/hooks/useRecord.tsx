import { useContext } from "react"
import { RecordContext } from "../contexts/RecordContext"

export const useRecord = () => {
  const context = useContext(RecordContext)
  if (context === null)
  {
    throw new Error("useRecord must be used within a RecordProvider")
  }
  return context
}