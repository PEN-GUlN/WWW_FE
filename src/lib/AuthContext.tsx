import React, { createContext, useState, useEffect } from "react";
import { cookie } from "./Cookie";

type AuthContextType = {
  isLoggedIn: boolean;
  isLogin: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLogin: () => {},
  logout: () => {},
});

type AuthChildrenType = { children: React.ReactNode };

export const AuthProvider = ({ children }: AuthChildrenType) => {
  const [isLoggedIn, setIsLogIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = cookie.get("SESSION_ID");
      if (session) {
        setIsLogIn(true);
      }
    };
    checkSession();
  }, []);

  const isLogin = () => {
    setIsLogIn(true);
  };

  const logout = () => {
    cookie.remove("SESSION_ID");
    setIsLogIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, isLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
