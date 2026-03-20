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
  let page = 0;
  let hasNext = true;

  // Janky workaround for getting all applications
  let applications = [];
  do {
    let params = {
      sortBy: 'dateApplied',
      sortOrder: 'desc',
      page: page++, // Increment page after setting
      size: 100,
    };

    if (sortOrder != null) {
      params.sortOrder = sortOrder;
    }

    if (status != null) {
      params.status = status;
    }

    const newApplications = await axiosClient.get(`/application`, { params });
    applications = applications.concat(newApplications.applications);

    hasNext = newApplications.pagination.hasNext;
  } while (hasNext);

  let latestCall = await axiosClient.get(`/application`);
  latestCall.applications = applications;

  return latestCall;
};
