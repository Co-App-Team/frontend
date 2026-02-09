import Searchbar from '../components/rateMyCoop/Searchbar';
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

  return (
    <>
      <h1>Demo page</h1>
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
