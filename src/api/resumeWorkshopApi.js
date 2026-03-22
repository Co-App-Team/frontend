import axiosClient from './api';

export const sendPrompt = ({ userPrompt, applicationId }) => {
  return axiosClient.post('/resume-ai-advisor', {
    userPrompt,
    ...(applicationId && { applicationId }),
  });
};

export const getQuota = () => {
  return axiosClient.get('/resume-ai-advisor/remaining-quota');
};
