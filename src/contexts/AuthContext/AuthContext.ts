import { createContext, type Dispatch, type SetStateAction } from "react";

interface AuthContextType {
  message: string;
  loading: boolean;
  isSuccess: boolean;
  isVisible: boolean;
  setMessage: Dispatch<SetStateAction<string>>;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

