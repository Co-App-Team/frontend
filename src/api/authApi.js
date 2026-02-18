import axiosClient from './api';

export const login = (email, password) => {
  return axiosClient.post('/auth/login', { email, password });
};

export const confirmEmail = (email, verifyCode) => {
  return axiosClient.patch('/auth/verify-email', { email, verifyCode });
};

export const resendEmailCode = (email) => {
  return axiosClient.patch('/auth/reset-confirmation-code', { email });
};

export const signup = (firstName, lastName, email, password) => {
  return axiosClient.post('/auth/register', { firstName, lastName, email, password });
};

export const signOut = () => {
  return axiosClient.get('/auth/logout');
};
