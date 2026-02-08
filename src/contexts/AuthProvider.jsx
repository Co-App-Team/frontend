import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { setAuthFailedCallback } from '../api/api';

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  setAuthFailedCallback(() => {
    setIsLoggedIn(false);
  });

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>
  );
};
