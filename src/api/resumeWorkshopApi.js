import axiosClient from './api';

export const sendPrompt = ({ userPrompt, applicationId }) => {
  // return {
  //   response:
  //     '## Resume/Cover Letter Review: "This is a test Bao, I swear I\'m not wasting AI credits 🙏"\n\nThis submission appears to be a placeholder or an unintended input rather than a section of a resume or cover letter. It does not contain any professional content that can be reviewed for clarity, impact, or professionalism.\n\n---\n\n**Please provide the actual content of your resume or cover letter that you would like me to review.** I am ready to assist you in making it as strong and effective as possible for your co-op applications.',
  // };

  return axiosClient.post('/resume-ai-advisor', {
    userPrompt,
    ...(applicationId && { applicationId }),
  });
};

export const getQuota = () => {
  return axiosClient.get('/resume-ai-advisor/remaining-quota');
};
