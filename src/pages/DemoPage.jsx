import Searchbar from '../components/rateMyCoop/Searchbar';
import CompaniesDisplay from '../components/rateMyCoop/CompaniesDisplay';
import GlobalNavbar from '../components/common/GlobalNavbar';
import { getCompanies } from '../api/rateMyCoopApi';
import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';

const DemoPage = () => {
  const [companies, setCompanies] = useState([]);
  const [topFilteredCompanies, setTopFilteredCompanies] = useState([]);
  const [otherFilteredCompanies, setOtherFilteredCompanies] = useState([]);
  useEffect(() => {
    async function loadCompanies() {
      const data = await getCompanies();
      setCompanies(data.companies);
      setTopFilteredCompanies(data.companies);
    }
    loadCompanies();
  }, []);

  const updateSearch = (value) => {
    const topFilter = companies.filter((c) =>
      c.companyName.toLowerCase().startsWith(value.toLowerCase()),
    );
    const otherFilters = companies.filter((c) =>
      c.companyName.toLowerCase().includes(value.toLowerCase()),
    );

    setOtherFilteredCompanies(otherFilters);
    if (value === '') {
      setOtherFilteredCompanies([]);
    }
    setTopFilteredCompanies(topFilter);
  };

  return (
    <>
      <GlobalNavbar></GlobalNavbar>

      <h1 className="m-2 p-2">Demo page</h1>
      <Searchbar
        handleSearch={updateSearch}
        className="m-2 p-2"
      />

      <CompaniesDisplay
        companies={companies}
        topFilteredCompanies={topFilteredCompanies}
        otherFilteredCompanies={otherFilteredCompanies}
      />
    </>
  );
};

export default DemoPage;
