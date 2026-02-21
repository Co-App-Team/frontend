// import { get } from './api';

let reviews = new Map();

const nicheReviews = {
  company: {
    companyId: '1',
    companyName: 'Niche',
    location: 'wpg',
    website: 'linkHere',
    avgRating: 4.5,
  },
  reviews: [
    {
      reviewId: '1',
      authorName: 'aidan',
      rating: 5,
      comment: 'Great work life balance and mentorship opportunities.',
      workTermSeason: 'Summer',
      workTermYear: 2025,
      jobTitle: 'Software developer',
    },
    {
      reviewId: '2',
      authorName: 'bao',
      rating: 3,
      comment: 'mid work life balance and mentorship opportunities.',
      workTermSeason: 'Summer',
      workTermYear: 2025,
      jobTitle: 'Software developer',
    },
    {
      reviewId: '3',
      authorName: 'bao',
      rating: 3,
      comment: 'mid work life balance and mentorship opportunities.',
      workTermSeason: 'Summer',
      workTermYear: 2025,
      jobTitle: 'Software developer',
    },
    {
      reviewId: '4',
      authorName: 'bao',
      rating: 3,
      comment: 'mid work life balance and mentorship opportunities.',
      workTermSeason: 'Summer',
      workTermYear: 2025,
      jobTitle: 'Software developer',
    },
  ],
  reviewsPagination: {
    currentPage: 0,
    totalPages: 1,
    totalItems: 2,
    itemsPerPage: 10,
    hasNext: false,
    hasPrevious: false,
  },
};

const amazonReviews = {
  company: {
    companyId: '3',
    companyName: 'Amazon',
    location: 'wpg',
    website: 'linkHere',
    avgRating: 4.5,
  },
  reviews: [],
  reviewsPagination: {
    currentPage: 0,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNext: false,
    hasPrevious: false,
  },
};
reviews.set(1, nicheReviews);
reviews.set(3, amazonReviews);

let mockedCompanies = {
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

let companyId = 99;

export const getCompanies = async () => {
  // TODO: When implemented, connect to real API
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockedCompanies;
};

export const getReviews = async (companyId) => {
  // TODO: Use real API once implemented
  // const response = await axios.get(`/api/companies/${companyId}`);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return reviews.get(companyId);
};

export const addNewCompany = async (newCompany) => {
  // TODO: Use real API once implemented
  // const response = await axios.get(`/api/companies/${companyId}`);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  newCompany.companyId = companyId++;
  newCompany.avgRating = 0.0;
  mockedCompanies.companies.push(newCompany);
};
