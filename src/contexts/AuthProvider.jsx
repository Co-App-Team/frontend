import { AuthContext } from './AuthContext';
import { setAuthFailedCallback } from '../api/api';
import { whoami } from '../api/userApi';
import useApi from '../hooks/useApi';
import { useEffect, useState } from 'react';

export const AuthProvider = ({ children }) => {
  const storedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
  const [isLoggedIn, setIsLoggedIn] = useState(storedLoginStatus);

  useEffect(() => {
    setAuthFailedCallback(() => {
      setIsLoggedIn(false);
    });
  }, []);

  const setIsLoggedInWrapper = async (value) => {
    setIsLoggedIn(value);
    localStorage.setItem('isLoggedIn', value);
    try {
      await whoamiCallback();
    } catch (error) {
      console.log('Failed to fetch user data on app load:', error);
    }
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
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn: setIsLoggedInWrapper, user }}>
      {children}
    </AuthContext.Provider>
  );
};
