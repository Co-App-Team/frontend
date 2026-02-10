import { getCompanies } from '../api/rateMyCoopApi';
import { useEffect, useState } from 'react';
import CompaniesDisplay from '../components/rateMyCoop/CompaniesDisplay';
import { Container, Row } from 'react-bootstrap';
import CompanyCard from '../components/rateMyCoop/CompanyCard';

const DemoPage = () => {
  // const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  useEffect(() => {
    async function loadCompanies() {
      const data = await getCompanies();
      // setCompanies(data.companies);
      setFilteredCompanies(data.companies);
    }
    loadCompanies();
  }, []);

  return (
    <Container fluid>
      <Row>
        <h1>Demo page</h1>
      </Row>

      <Row>
        <CompaniesDisplay companies={filteredCompanies} />
      </Row>

      <Row>
        <CompanyCard></CompanyCard>
      </Row>
    </Container>
  );
};

export default DemoPage;
