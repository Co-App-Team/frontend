import { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import NewApplicationModal from '../components/jobApplications/JobApplicationModal';
import useApi from '../hooks/useApi';
import { getCompanies } from '../api/rateMyCoopApi';
import { getApplications } from '../api/jobApplicationsApi';
import { getErrorMessage } from '../utils/errorUtils';
import FilteringBar from '../components/jobApplications/FilteringBar';
import JobApplicationsDisplay from '../components/jobApplications/JobApplicationsDisplay';
import { useDebouncedCallback } from '../hooks/useDebounce';

const JobApplicationsPage = () => {
  const [filters, setFilters] = useState([]);
  const [topFilteredApplications, setTopFilteredApplications] = useState([]);
  const [otherFilteredApplications, setOtherFilteredApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [useAppliedOnSort, setUseAppliedOnSort] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const [error, setError] = useState(false);

  const { request: getCompaniesCallback } = useApi(getCompanies);
  const {
    request: getApplicationsCallback,
    data: applications,
    loading: applicationRequestLoading,
  } = useApi(getApplications);

  useEffect(() => {
    async function loadApplications() {
      try {
        const applications = await getApplicationsCallback({});
        setTopFilteredApplications(applications.applications);
        setOtherFilteredApplications(applications.applications);
      } catch (error) {
        const message = getErrorMessage(error);
        setError(message);
      }
    }
    loadApplications();
  }, [getApplicationsCallback]);

  const loadCompanies = useCallback(async () => {
    try {
      const data = await getCompaniesCallback();
      setCompanies(data.companies);
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
    }
  }, [getCompaniesCallback]);

  useEffect(() => {
    // Makes eslint happy, it doesn't think the useCallback is async
    const request = async () => {
      loadCompanies();
    };
    request();
  }, [loadCompanies]);

  async function refreshApplicationsList(sortOrder, status, resetFilters) {
    try {
      const params = {
        sortOrder: sortOrder,
        status: status,
      };
      const applications = await getApplicationsCallback(params);
      setTopFilteredApplications(applications.applications);
      setOtherFilteredApplications(applications.applications);
      if (resetFilters) {
        setFilters([]);
      }
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
    }
  }

  async function handleFilterChange(sortOrder, status) {
    await refreshApplicationsList(sortOrder, status, false);
  }

  async function applyAppliedOnSort(sortOrder, status) {
    try {
      const params = {
        sortOrder: sortOrder,
        status: status,
      };
      const applications = await getApplicationsCallback(params);

      const filterOutDateApplied = applications.applications.filter(
        (app) => app.dateApplied !== null && app.status !== 'NOT_APPLIED',
      );

      setTopFilteredApplications(filterOutDateApplied);
      setOtherFilteredApplications([]);
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
    }
  }

  function getCompany(jobApplication) {
    return companies.find((c) => c.companyId === jobApplication.companyId);
  }

  const performSearchFilter = (value) => {
    let apps = applications.applications;

    if (useAppliedOnSort) {
      apps = applications.applications.filter(
        (app) => app.dateApplied !== null && app.status !== 'NOT_APPLIED',
      );
    }

    const topFilter = apps.filter((c) =>
      getCompany(c).companyName.toLowerCase().startsWith(value.toLowerCase()),
    );
    const otherFilters = apps.filter(
      (c) =>
        getCompany(c).companyName.toLowerCase().includes(value.toLowerCase()) &&
        !topFilter.includes(c),
    );

    setOtherFilteredApplications(otherFilters);
    if (value === '') {
      setOtherFilteredApplications([]);
    }
    setTopFilteredApplications(topFilter);
  };

  const debouncedSearch = useDebouncedCallback((value) => {
    performSearchFilter(value);
    setSearchLoading(false);
  }, 100);

  const updateSearch = async (value) => {
    if (!applications?.applications || !companies) return;

    setSearchLoading(true);
    debouncedSearch(value);
  };

  async function hideApplicationModal() {
    setShowApplicationModal(false);
    // Re-fetch the data and reset the filters
    await refreshApplicationsList(null, null, true);
  }

  return (
    <Container className="mt-3">
      <div className="d-flex flex-column justify-content-center">
        <Row className="text-start align-bottom d-flex align-items-end my-1 mb-3">
          <Col>
            <h2 className="p-0 m-0">Job Applications</h2>
          </Col>
          <Col>
            <div className="d-flex justify-content-end">
              <Button
                className="btn btn-primary m-1"
                onClick={() => setShowApplicationModal(true)}>
                <FontAwesomeIcon
                  className="me-1"
                  icon={faAdd}
                />
                New Job Application
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <FilteringBar
            handleSearch={updateSearch}
            handleCalendarSortOrder={applyAppliedOnSort}
            setUseAppliedOnSort={setUseAppliedOnSort}
            handleFilters={handleFilterChange}
            filters={filters}
            setFilters={setFilters}
          />
        </Row>
      </div>

      {error && <span className="text-danger mt-3">{error}</span>}
      <JobApplicationsDisplay
        applications={applications?.applications ? applications.applications : []}
        topFilteredApplications={topFilteredApplications}
        otherFilteredApplications={otherFilteredApplications}
        refreshApplicationsList={() => {
          refreshApplicationsList(null, null, true);
        }}
        loading={applicationRequestLoading}
        setError={setError}
        companies={companies}
        refreshCompanies={loadCompanies}
        searchLoading={searchLoading}
      />

      <NewApplicationModal
        show={showApplicationModal}
        onHide={hideApplicationModal}
        companies={companies}
        data={null}
        onSaved={() => {
          refreshApplicationsList(null, null, true);
        }}
        refreshCompanies={loadCompanies}
      />
    </Container>
  );
};

export default JobApplicationsPage;
