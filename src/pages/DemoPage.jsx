import Searchbar from '../components/rateMyCoop/Searchbar';
import { getCompanies } from '../api/rateMyCoopApi';
import { useEffect, useState } from 'react';

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
      <h1 className="m-2 p-2">Demo page</h1>
      <Searchbar
        handleSearch={updateSearch}
        className="m-2 p-2"
      />

      <Row>
        <CompaniesDisplay companies={companies} />
      </Row>

      {topFilteredCompanies.length == companies.length ? (
        <p>Companies</p>
      ) : (
        <p>Showing top search results</p>
      )}
      {topFilteredCompanies.length != 0 ? (
        <ul>
          {topFilteredCompanies.map((company, index) => (
            <li key={company.companyId}>
              {index}: {company.companyName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No companies match</p>
      )}
      {otherFilteredCompanies.length != 0 ? (
        <>
          <p>Other search results</p>
          <ul>
            {otherFilteredCompanies.map((company, index) => (
              <li key={company.companyId}>
                {index}: {company.companyName}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default DemoPage;
