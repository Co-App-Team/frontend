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

export const getApplications = async ({ sortOrder, status, search }) => {
  let params = {
    sortBy: 'dateApplied',
    sortOrder: 'desc',
  };

  if (sortOrder) {
    params.sortOrder = sortOrder;
  }

  if (status) {
    params.status = status;
  }

  if (search) {
    params.search = search;
  }

  return await axiosClient.get(`/application`, { params });
};
