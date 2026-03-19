import { useState, useEffect } from 'react';
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

const JobApplicationsPage = () => {
  const [filters, setFilters] = useState([]);
  const [topFilteredApplications, setTopFilteredApplications] = useState([]);
  const [otherFilteredApplications, setOtherFilteredApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

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
        const applications = await getApplicationsCallback();
        setTopFilteredApplications(applications.applications);
        setOtherFilteredApplications(applications.applications);
      } catch (error) {
        const message = getErrorMessage(error);
        setError(message);
      }
    }
    loadApplications();
  }, [getApplicationsCallback]);

  useEffect(() => {
    async function loadCompanies() {
      try {
        const data = await getCompaniesCallback();
        setCompanies(data.companies);
      } catch (error) {
        const message = getErrorMessage(error);
        setError(message);
      }
    }
    loadCompanies();
  }, [getCompaniesCallback]);

  async function refreshApplicationsList(sortOrder, status, resetFilters) {
    try {
      const applications = await getApplicationsCallback(sortOrder, status);
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

  async function useAppliedOnSort(sortOrder, status) {
    try {
      const applications = await getApplicationsCallback(sortOrder, status);

      const filterOutDateApplied = applications.applications.filter(
        (app) => app.dateApplied !== null && app.status !== 'NOT_APPLIED',
      );

      setTopFilteredApplications(filterOutDateApplied);
      setOtherFilteredApplications(filterOutDateApplied);
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
    }
  }

  const updateSearch = (value) => {
    if (!applications?.applications) return;

    const apps = applications.applications;

    const topFilter = apps.filter((c) =>
      c.companyName.toLowerCase().startsWith(value.toLowerCase()),
    );
    const otherFilters = apps.filter(
      (c) => c.companyName.toLowerCase().includes(value.toLowerCase()) && !topFilter.includes(c),
    );

    setOtherFilteredApplications(otherFilters);
    if (value === '') {
      setOtherFilteredApplications([]);
    }
    setTopFilteredApplications(topFilter);
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
            handleCalendarSortOrder={useAppliedOnSort}
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
        refreshApplicationsList={refreshApplicationsList}
        loading={applicationRequestLoading}
        setError={setError}
      />

      <NewApplicationModal
        onShow={showApplicationModal}
        onHide={hideApplicationModal}
        companies={companies}
        data={null}
        onSaved={() => {
          refreshApplicationsList(null, null, true);
        }}
      />
    </Container>
  );
};

export default JobApplicationsPage;
