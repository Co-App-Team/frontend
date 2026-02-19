import axiosClient from './api';

export const changePassword = (oldPassword, newPassword) => {
  return axiosClient.post(
    '/user/update-password',
    { oldPassword, newPassword },
    { skipAuthRefresh: true },
  );
};

export const whoami = () => {
  return { email: 'aidan.c.mcleod@gmail.com', firstName: 'Aidan', lastName: 'McLeod' };
  // return axiosClient.get('/user/whoami');
};
