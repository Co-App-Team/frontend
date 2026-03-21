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

export const getApplications = async (params) => {
  if (!params?.sortBy) {
    params.sortBy = 'dateApplied';
  }
  if (!params?.sortOrder) {
    params.sortOrder = 'desc';
  }
  if (!params?.size) {
    params.size = 100;
  }

  // Un-paginate the applications, this isn't the "greatest" solution but allows us to keep the endpoint
  // paginated, and users won't likely have thousands of applications so this shouldn't have to run for many iterations.
  let applications = [];
  let hasNext = true;
  params.page = 0;
  while (hasNext) {
    const page = await axiosClient.get(`/application`, { params });
    if (page?.applications) {
      applications = applications.concat(page.applications);
    }
    hasNext = page?.pagination?.hasNext;
    params.page = page?.pagination?.currentPage + 1;
  }

  return { applications: applications };
};

export const getInterviews = async () => {
  return await axiosClient.get(`/application/interviews`);
};
