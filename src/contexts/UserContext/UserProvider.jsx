import { UserContext } from "./UserContext";
import { googleLogout } from "@react-oauth/google";
import { useSemiPersistentState } from "../../hooks/useSemiPersistentState";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useSemiPersistentState("user", {
    // name: "Guest User",
    // given_name: "Guest",
    isAuthenticated: false,
  });

  localStorage.removeItem("user")

  const logOut = () => {
    googleLogout();
    setUser({ isAuthenticated: false });
  };

  const providerValue = { user, setUser, logOut };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};
