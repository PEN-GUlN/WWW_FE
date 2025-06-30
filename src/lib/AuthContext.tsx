import React, { createContext, useState, useEffect } from 'react';
import { cookie } from './Cookie';

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
    const session = cookie.get('connect.sid');
    console.log('Session ID:', session);

    setIsLoggedIn(!!session);
  };

  const isLogin = () => {
    checkSession();
  };

  const logout = async () => {
    try {
      await fetch('/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // ignore
    }
    cookie.remove('connect.sid');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
