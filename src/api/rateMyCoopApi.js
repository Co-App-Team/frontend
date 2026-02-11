// import { get } from "./api";

export const getCompanies = async () => {
  // TODO: When implemented, connect to real API
  new Promise((resolve) => setTimeout(resolve, 100));
  return {
    companies: [
      {
        companyId: '1',
        companyName: 'Niche',
        location: 'wpg',
        website: 'www.linkHere.com',
        avgRating: '4.5',
      },
      {
        companyId: '2',
        companyName: 'Varian',
        location: 'wpg',
        website: 'www.linkHere.com',
        avgRating: '4.5',
      },
      {
        companyId: '3',
        companyName: 'Amazon',
        location: 'wpg',
        website: 'www.linkHere.com',
        avgRating: '4.5',
      },
      {
        companyId: '4',
        companyName: 'NML',
        location: 'wpg',
        website: 'www.linkHere.com',
        avgRating: '4.5',
      },
    ],
  };
};
