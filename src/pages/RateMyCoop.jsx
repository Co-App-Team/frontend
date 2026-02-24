import Searchbar from '../components/rateMyCoop/Searchbar';
import CompaniesDisplay from '../components/rateMyCoop/CompaniesDisplay';
import { getCompanies } from '../api/rateMyCoopApi';
import useApi from '../hooks/useApi';
import { getErrorMessage } from '../utils/errorUtils';
import { useEffect, useState } from 'react';

const RateMyCoop = () => {
  const [topFilteredCompanies, setTopFilteredCompanies] = useState([]);
  const [otherFilteredCompanies, setOtherFilteredCompanies] = useState([]);

  const { request: getCompaniesCallback, data, loading } = useApi(getCompanies);
  useEffect(() => {
    async function loadCompanies() {
      try {
        const companies = await getCompaniesCallback();
        console.log(companies.companies);
        setTopFilteredCompanies(companies.companies);
        setOtherFilteredCompanies(companies.companies);
      } catch (error) {
        const message = getErrorMessage(error, {}); // No error mappings yet
        console.log(message); // TODO: Display this message properly on error, when error display is decided
      }
    }
    loadCompanies();
  }, []);

  const updateSearch = (value) => {
    if (!data?.companies) return;

    const companies = data.companies;

    const topFilter = companies.filter((c) =>
      c.companyName.toLowerCase().startsWith(value.toLowerCase()),
    );
    const otherFilters = companies.filter(
      (c) => c.companyName.toLowerCase().includes(value.toLowerCase()) && !topFilter.includes(c),
    );

    setOtherFilteredCompanies(otherFilters);
    if (value === '') {
      setOtherFilteredCompanies([]);
    }
    setTopFilteredCompanies(topFilter);
  };

  return (
    <>
      <h1 className="m-2 p-2">Rate My Co-op</h1>
      <Searchbar
        handleSearch={updateSearch}
        className="m-2 p-2"
      />

      <CompaniesDisplay
        companies={data ? data.companies : []}
        topFilteredCompanies={topFilteredCompanies}
        otherFilteredCompanies={otherFilteredCompanies}
        loading={loading}
      />
    </>
  );
};

export default RateMyCoop;
