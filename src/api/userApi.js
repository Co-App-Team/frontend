export const changePassword = (oldPassword, newPassword) => {
  return { message: 'Password updated successfully.' + oldPassword + newPassword };
  // return axiosClient.get('/user/update-password', { oldPassword, newPassword });
};

export const whoami = () => {
  return { email: 'aidan.c.mcleod@gmail.com', firstName: 'Aidan', lastName: 'McLeod' };
  // return axiosClient.get('/user/whoami');
};
