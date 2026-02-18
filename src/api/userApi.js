import axiosClient from './api';

export const changePassword = (oldPassword, newPassword) => {
  return axiosClient.get('/user/update-password', { oldPassword, newPassword });
};
