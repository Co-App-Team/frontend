import axiosClient from './api';

export const login = (email, password) => {
  return axiosClient.post('/auth/login', { email, password });
};

export const signup = (firstName, lastName, email, password) => {
  return axiosClient.post('/auth/register', { firstName, lastName, email, password });
};

export const forgotPassword = (email) => {
  return axiosClient.post('/auth/forgot-password', { email });
};

export const updatePassword = (email, verifyCode, newPassword) => {
  return axiosClient.post('/auth/update-password', { email, verifyCode, newPassword });
};
