import axiosClient from './api';

export const changePassword = (oldPassword, newPassword) => {
  return axiosClient.post(
    '/user/update-password',
    { oldPassword, newPassword },
    { skipAuthRefresh: true },
  );
};

export const whoami = () => {
  return axiosClient.get('/user/about-me');
};
