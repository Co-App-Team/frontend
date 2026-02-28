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
  {
    companyId: '3',
    companyName: 'Taiv',
    address: '1234 Company St.',
    city: 'Toronto',
    country: 'Canada',
    website: 'www.facebook.com',
    dateCreated: '2026-02-10T23:59:00',
    dateModified: '2026-02-10T23:59:00',
  },
  {
    companyId: '4',
    companyName: 'Varian',
    address: '1234 Company St.',
    city: 'Toronto',
    country: 'Canada',
    website: 'www.facebook.com',
    dateCreated: '2026-02-10T23:59:00',
    dateModified: '2026-02-10T23:59:00',
  },
  {
    companyId: '5',
    companyName: 'AAFC',
    address: '1234 Company St.',
    city: 'Toronto',
    country: 'Canada',
    website: 'www.facebook.com',
    dateCreated: '2026-02-10T23:59:00',
    dateModified: '2026-02-10T23:59:00',
  },
  {
    companyId: '6',
    companyName:
      'djsakldjlasdjskladjsalkdjlaskjdlksajdlksaksnckdjancjdlkncdkjlscndjsklcndskljnjkfndsjlfsdlfdslfnsdjklnfjkdsfndkjslncjkldsacndkjndkclnsacn',
    address: '1234 Company St.',
    city: 'Toronto',
    country: 'Canada',
    website: 'www.facebook.com',
    dateCreated: '2026-02-10T23:59:00',
    dateModified: '2026-02-10T23:59:00',
  },
  {
    companyId: '7',
    companyName: 'Manitoba Hydro',
    address: '1234 Company St.',
    city: 'Toronto',
    country: 'Canada',
    website: 'www.facebook.com',
    dateCreated: '2026-02-10T23:59:00',
    dateModified: '2026-02-10T23:59:00',
  },
];

const jobApplications = [
  {
    applicationId: '1',
    companyId: '1',
    jobTitle: 'Software Developer',
    status: 'NOT_APPLIED',
    applicationDeadline: '2026-03-01T23:59:00',
    dateCreated: '2026-02-10T23:59:00',
    dateModified: '2026-02-10T23:59:00',
    sourceLink: 'www.google.com',
    jobDescription: 'very sick job',
  },
  {
    applicationId: '2',
    companyId: '1',
    jobTitle: 'Full Stack Developer',
    status: 'APPLIED',
    applicationDeadline: '2026-03-01T23:59:00',
    dateCreated: '2026-02-10T23:59:00',
    dateModified: '2026-02-10T23:59:00',
  },
  {
    applicationId: '3',
    companyId: '2',
    jobTitle: 'Programmer',
    status: 'INTERVIEWING',
    applicationDeadline: '2026-03-01T23:59:00',
    dateCreated: '2026-02-10T23:59:00',
    dateModified: '2026-02-10T23:59:00',
  },
  {
    applicationId: '4',
    companyId: '2',
    jobTitle: 'Software Developer',
    status: 'ACCEPTED',
    applicationDeadline: '2026-03-01T23:59:00',
    dateCreated: '2026-02-10T23:59:00',
    dateModified: '2026-02-10T23:59:00',
  },
  {
    applicationId: '5',
    companyId: '1',
    jobTitle: 'Software Developer',
    status: 'OFFER_RECEIVED',
    applicationDeadline: '2026-03-01T23:59:00',
    dateCreated: '2026-02-10T23:59:00',
    dateModified: '2026-02-10T23:59:00',
  },
];

export const getCompany = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return companies.find((c) => c.companyId === id);
};

export const getCompanies = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return companies;
};

export const getJobApplications = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [...jobApplications];
};

export const addNewJobApplication = async (application) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  application.applicationID = Math.floor(Math.random()); // for now

  application.dateCreated = new Date().toLocaleDateString('en-CA');
  jobApplications.push(application);
};

export const editExistingJobApplication = async (updatedApplication) => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const index = jobApplications.findIndex(
    (application) => application.applicationId === updatedApplication.applicationId,
  );

  if (index == -1) {
    console.log('error');
    return;
  }

  jobApplications[index] = {
    ...jobApplications[index],
    ...updatedApplication,
  };

  console.log('FINAL: ', jobApplications[index]);
};
