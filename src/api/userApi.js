import axiosClient from './api';

export const changePassword = (oldPassword, newPassword) => {
  return axiosClient.patch(
    '/user/update-password',
    { oldPassword, newPassword },
    { skipAuthRefresh: true },
  );
};

export const whoami = () => {
  return axiosClient.get('/user/about-me');
};

export const getExperience = () => {
  return axiosClient.get('/user/experience');
};

export const addExperience = ({ companyId, roleTitle, roleDescription, startDate, endDate }) => {
  return axiosClient.post('/user/experience', {
    companyId,
    roleTitle,
    roleDescription,
    startDate,
    ...(endDate && { endDate }),
  });
};

export const updateExperience = ({
  experienceId,
  companyId,
  roleTitle,
  roleDescription,
  startDate,
  endDate,
}) => {
  return axiosClient.patch(`/user/experience/${experienceId}`, {
    companyId,
    roleTitle,
    roleDescription,
    startDate,
    ...(endDate && { endDate }),
  });
};

export const deleteExperience = ({ experienceId }) => {
  return axiosClient.delete(`/user/experience/${experienceId}`);
};
