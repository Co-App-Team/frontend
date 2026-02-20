import Searchbar from '../components/rateMyCoop/Searchbar';
import CompaniesDisplay from '../components/rateMyCoop/CompaniesDisplay';
import GlobalNavbar from '../components/common/GlobalNavbar';
import { getCompanies } from '../api/rateMyCoopApi';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddCompanyModal from '../components/rateMyCoop/AddCompanyModal';

const DemoPage = () => {
  const [companies, setCompanies] = useState([]);
  const [topFilteredCompanies, setTopFilteredCompanies] = useState([]);
  const [otherFilteredCompanies, setOtherFilteredCompanies] = useState([]);

  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);

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
      <GlobalNavbar></GlobalNavbar>

      <h1 className="m-2 p-2">Demo page</h1>
      <Container
        fluid
        className="m-0">
        <Row>
          <Col>
            <Searchbar
              handleSearch={updateSearch}
              className="m-2 p-2"
            />
          </Col>
          <Col md="auto">
            <Button onClick={() => setShowAddCompanyModal(true)}>
              <FontAwesomeIcon
                className="me-1"
                icon={faPlus}
              />
              Add Company
            </Button>
          </Col>
        </Row>
      </Container>

      <CompaniesDisplay
        companies={companies}
        topFilteredCompanies={topFilteredCompanies}
        otherFilteredCompanies={otherFilteredCompanies}
      />

      <AddCompanyModal
        showModal={showAddCompanyModal}
        hideModal={() => setShowAddCompanyModal(false)}></AddCompanyModal>
    </>
  );
};

export default DemoPage;
