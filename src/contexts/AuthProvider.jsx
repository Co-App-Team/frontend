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
    async function fetchUser() {
      try {
        await whoamiCallback();
      } catch (error) {
        console.log('Failed to fetch user data on app load:', error);
      }
    }
    fetchUser();
  }, [whoamiCallback]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};
