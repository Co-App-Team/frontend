import axiosClient from './api';

export const addApplication = async (newApplication) => {
  return await axiosClient.post(`/application`, newApplication);
};

export const editApplication = async (application, applicationId) => {
  return await axiosClient.put(`/application/${applicationId}`, application);
};

export const deleteApplication = async (applicationId) => {
  return await axiosClient.delete(`/application/${applicationId}`);
};

export const getApplications = async (sortOrder, status) => {
  let params = {
    sortBy: 'dateApplied',
    sortOrder: 'desc',
  };

  if (sortOrder != null) {
    params.sortOrder = sortOrder;
  }

  if (status != null) {
    params.status = status;
  }

  return await axiosClient.get(`/application`, { params });
};

export const getInterviews = async () => {
  return await axiosClient.get(`/application/interviews`);
};
