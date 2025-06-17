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

type AuthChildrenType = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthChildrenType) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = () => {
    const session = cookie.get("SESSION_ID");
    setIsLoggedIn(!!session);
  };

  const isLogin = () => {
    checkSession();
  };

  const logout = () => {
    cookie.remove("SESSION_ID");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
