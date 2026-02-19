import { AuthContext } from './AuthContext';
import { setAuthFailedCallback } from '../api/api';
import { whoami } from '../api/userApi';
import useApi from '../hooks/useApi';
import { useEffect } from 'react';

export const AuthProvider = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const setIsLoggedIn = (value) => {
    localStorage.setItem('isLoggedIn', value);
  };

  setAuthFailedCallback(() => {
    setIsLoggedIn(false);
  });

  const { request: whoamiCallback, data: user } = useApi(whoami);

  useEffect(() => {
    whoamiCallback();
  }, [whoamiCallback]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};
