import axiosClient from './api';

export const login = (email, password) => {
  return axiosClient.post('/auth/login', { email, password });
};

export const signup = (firstName, lastName, email, password) => {
  return axiosClient.post('/auth/register', { firstName, lastName, email, password });
};
