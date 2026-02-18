import { AuthContext } from './AuthContext';
import { setAuthFailedCallback } from '../api/api';

export const AuthProvider = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const setIsLoggedIn = (value) => {
    localStorage.setItem('isLoggedIn', value);
  };

  setAuthFailedCallback(() => {
    setIsLoggedIn(false);
  });

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>
  );
};
