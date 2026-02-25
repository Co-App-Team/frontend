import Searchbar from '../components/rateMyCoop/Searchbar';
import CompaniesDisplay from '../components/rateMyCoop/CompaniesDisplay';
import { getCompanies } from '../api/rateMyCoopApi';
import useApi from '../hooks/useApi';
import { getErrorMessage } from '../utils/errorUtils';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddCompanyModal from '../components/rateMyCoop/AddCompanyModal';

const RateMyCoop = () => {
  const [topFilteredCompanies, setTopFilteredCompanies] = useState([]);
  const [otherFilteredCompanies, setOtherFilteredCompanies] = useState([]);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);

  const { request: getCompaniesCallback, data, loading } = useApi(getCompanies);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const companies = await getCompaniesCallback();
        setTopFilteredCompanies(companies.companies);
        setOtherFilteredCompanies(companies.companies);
      } catch (error) {
        const message = getErrorMessage(error, {});
        console.log(message);
      }
    }

    fetchCompanies();
  }, []);

  async function handleCreateCompanyModalClose() {
    setShowAddCompanyModal(false);
  }

  async function refreshCompanyList() {
    try {
      const companies = await getCompaniesCallback();
      setTopFilteredCompanies(companies.companies);
      setOtherFilteredCompanies(companies.companies);
    } catch (error) {
      const message = getErrorMessage(error, {});
      console.log(message);
    }
  }

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
        companies={data ? data.companies : []}
        topFilteredCompanies={topFilteredCompanies}
        otherFilteredCompanies={otherFilteredCompanies}
        loading={loading}
      />

      <AddCompanyModal
        showModal={showAddCompanyModal}
        hideModal={handleCreateCompanyModalClose}
        refreshCompanies={refreshCompanyList}
      />
    </>
  );
};

export default RateMyCoop;
