import { AuthContext } from './AuthContext';
import { setAuthFailedCallback } from '../api/api';
import { useEffect, useState } from 'react';

export const AuthProvider = ({ children }) => {
  const storedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
  const [isLoggedIn, setIsLoggedIn] = useState(storedLoginStatus);

  useEffect(() => {
    setAuthFailedCallback(() => {
      setIsLoggedIn(false);
    });
  }, []);

  const setIsLoggedInWrapper = (value) => {
    setIsLoggedIn(value);
    localStorage.setItem('isLoggedIn', value);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn: setIsLoggedInWrapper }}>
      {children}
    </AuthContext.Provider>
  );
};
