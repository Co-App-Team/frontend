import Searchbar from '../components/rateMyCoop/SearchBar';
import { getCompanies } from '../api/rateMyCoopApi';
import { useEffect, useState } from 'react';

const DemoPage = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  useEffect(() => {
    async function loadCompanies() {
      const data = await getCompanies();
      setCompanies(data.companies);
      setFilteredCompanies(data.companies);
    }
    loadCompanies();
  }, []);

  const updateSearch = (value) => {
    const result = companies.filter((c) =>
      c.companyName.toLowerCase().startsWith(value.toLowerCase()),
    );
    setFilteredCompanies(result);
  };

  return (
    <>
      <h1>Demo page</h1>
      <Searchbar handleSearch={updateSearch} />
      {companies ? (
        <ul>
          {filteredCompanies.map((company, index) => (
            <li key={company.companyId}>
              {index}: {company.companyName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No companies to show</p>
      )}
    </>
  );
};

export default DemoPage;
