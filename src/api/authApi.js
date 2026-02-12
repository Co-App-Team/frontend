import axiosClient from './api';

export const login = (email, password) => {
  return axiosClient.post('/auth/login', { email, password });
};
