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

export const getTerms = async () => {
  return await axiosClient.get('/common/term-seasons');
};

export const getYearBounds = async () => {
  return await axiosClient.get('/common/term-year-range');
};

export const addReview = async (newReview, companyId) => {
  return await axiosClient.post(`/companies/${companyId}/reviews`, newReview);
};

export const editReview = async (newReview, companyId) => {
  return await axiosClient.put(`/companies/${companyId}/reviews`, newReview);
};

export const deleteReview = async (companyId) => {
  return await axiosClient.delete(`/companies/${companyId}/reviews`);
};
