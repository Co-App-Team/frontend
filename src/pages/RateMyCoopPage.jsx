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

const RateMyCoopPage = () => {
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
    <Container className="mt-3">
      <div>
        <Row className="text-start align-bottom d-flex align-items-end my-1 py-1 mb-3">
          <Col>
            <h2 className="m-0 p-0">Rate My Co-op</h2>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              className="m-1"
              onClick={() => setShowAddCompanyModal(true)}>
              <FontAwesomeIcon
                className="me-1"
                icon={faPlus}
              />
              Add Company
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Searchbar
              handleSearch={updateSearch}
              className="m-2 p-2"
            />
          </Col>
        </Row>
        <Row>{error && showError && <span className="text-danger mt-3">{error}</span>}</Row>
      </div>

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
    </Container>
  );
};

export default RateMyCoopPage;
