const companies = [
  {
    companyId: '1',
    companyName: 'Niche',
    address: '1234 Company St.',
    city: 'Winnipeg',
    country: 'Canada',
    website: 'www.google.com',
    dateCreated: '2026-02-10T23:59:00',
    dateModified: '2026-02-10T23:59:00',
  },
  {
    companyId: '2',
    companyName: 'Ubisoft',
    address: '1234 Company St.',
    city: 'Toronto',
    country: 'Canada',
    website: 'www.facebook.com',
    dateCreated: '2026-02-10T23:59:00',
    dateModified: '2026-02-10T23:59:00',
  },
];

export const getCompany = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return companies.find((c) => c.companyId === id);
};

export const getJobApplications = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    jobApplications: [
      {
        companyId: '1',
        jobTitle: 'Software Developer',
        status: 'NOT_APPLIED',
        applicationDeadline: '2026-03-01T23:59:00',
        dateCreated: '2026-02-10T23:59:00',
        dateModified: '2026-02-10T23:59:00',
      },
      {
        companyId: '1',
        jobTitle: 'Full Stack Developer',
        status: 'APPLIED',
        applicationDeadline: '2026-03-01T23:59:00',
        dateCreated: '2026-02-10T23:59:00',
        dateModified: '2026-02-10T23:59:00',
      },
      {
        companyId: '2',
        jobTitle: 'Programmer',
        status: 'INTERVIEWING',
        applicationDeadline: '2026-03-01T23:59:00',
        dateCreated: '2026-02-10T23:59:00',
        dateModified: '2026-02-10T23:59:00',
      },
      {
        companyId: '2',
        jobTitle: 'Software Developer',
        status: 'ACCEPTED',
        applicationDeadline: '2026-03-01T23:59:00',
        dateCreated: '2026-02-10T23:59:00',
        dateModified: '2026-02-10T23:59:00',
      },
      {
        companyId: '1',
        jobTitle: 'Software Developer',
        status: 'OFFER_RECEIVED',
        applicationDeadline: '2026-03-01T23:59:00',
        dateCreated: '2026-02-10T23:59:00',
        dateModified: '2026-02-10T23:59:00',
      },
    ],
  };
};
