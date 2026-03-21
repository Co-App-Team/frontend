import axiosClient from './api';

export const getCompanies = async () => {
  return axiosClient.get('/companies');
};

export const getCompany = async (companyId) => {
  return await axiosClient.get(`/companies/${companyId}`);
};

export const getReviews = async (companyId, page, size) => {
  if (page != null && size != null) {
    return await axiosClient.get(`/companies/${companyId}`, {
      params: {
        page: page,
        size: size,
      },
    });
  }

  return await axiosClient.get(`/companies/${companyId}`, {
    params: {
      size: 5, // Default value of 5 by front-end
    },
  });
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
