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
import PageTransition from '../components/common/PageTransition';

const RateMyCoop = () => {
  const [topFilteredCompanies, setTopFilteredCompanies] = useState([]);
  const [otherFilteredCompanies, setOtherFilteredCompanies] = useState([]);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const { request: getCompaniesCallback, data, loading } = useApi(getCompanies);

  useEffect(() => {
    async function fetchCompanies() {
      setShowError(false);
      setError('');
      try {
        const companies = await getCompaniesCallback();
        setTopFilteredCompanies(companies.companies);
        setOtherFilteredCompanies(companies.companies);
      } catch (error) {
        const message = getErrorMessage(error, {});
        setError(message);
        setShowError(true);
      }
    }

    fetchCompanies();
  }, [getCompaniesCallback]);

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
      setShowError(true);
      setError(message);
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
    <PageTransition>
      <h1 className="mb-2 pb-2">Rate My Co-op</h1>
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
        <Row>{error && showError && <span className="text-danger mt-3">{error}</span>}</Row>
      </Container>

      <CompaniesDisplay
        companies={data ? data.companies : []}
        topFilteredCompanies={topFilteredCompanies}
        otherFilteredCompanies={otherFilteredCompanies}
        loading={loading}
        refreshCompanies={refreshCompanyList}
      />

      <AddCompanyModal
        showModal={showAddCompanyModal}
        hideModal={handleCreateCompanyModalClose}
        refreshCompanies={refreshCompanyList}
      />
    </PageTransition>
  );
};

export default RateMyCoop;
