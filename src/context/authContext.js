import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = () => {
    // To do
    setCurrentUser({
      id: 1,
      name: "Lucius Morningstar",
      profilePicture:
        "https://images.pexels.com/photos/16364581/pexels-photo-16364581/free-photo-of-moda-ludzie-mezczyzni-kobiety.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      backgroudPic: "https://images.pexels.com/photos/542705/pexels-photo-542705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
