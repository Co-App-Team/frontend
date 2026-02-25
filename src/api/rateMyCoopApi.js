import axiosClient from './api';

export const getCompanies = async () => {
  return axiosClient.get('/companies');
};

export const getReviews = async (companyId) => {
  return await axiosClient.get(`/companies/${companyId}`);
};

export const addNewCompany = async (newCompany) => {
  return await axiosClient.post('/companies', newCompany);
};
