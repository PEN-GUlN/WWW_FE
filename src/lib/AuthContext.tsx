/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch('/auth/status', { credentials: 'include' });

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setIsLoggedIn(!!data.isLoggedIn);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      setIsLoggedIn(false);
    }
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
    cookie.remove('.sid');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!isLoggedIn, isLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
