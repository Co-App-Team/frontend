import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Dropdown, Form } from 'react-bootstrap';
import JobApplicationCard from '../components/jobApplications/JobApplicationCard';
import styles from '../components/styling/jobApplications/JobApplications.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAdd,
  faArrowDown,
  faArrowUp,
  faCalendar,
  faFilter,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import NewApplicationModal from '../components/jobApplications/JobApplicationModal';
import useApi from '../hooks/useApi';
import { getCompanies } from '../api/rateMyCoopApi';
import { getApplications } from '../api/jobApplicationsApi';
import { getErrorMessage } from '../utils/errorUtils';
import Searchbar from '../components/jobApplications/Searchbar';
import FilterBadges from '../components/jobApplications/FilterBadges';
import FilterSelection from '../components/jobApplications/FilterSelection';

const JobApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const [error, setError] = useState(false);

  const [filters, setFilters] = useState([]);

  const [calendarSortAsc, setCalendarSortAsc] = useState(false);
  const toggleCalendarSortAsc = () => {
    setCalendarSortAsc((prev) => !prev);
  };

  const { request: getCompaniesCallback } = useApi(getCompanies);
  const { request: getApplicationsCallback } = useApi(getApplications);

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await getApplicationsCallback();
        setApplications(data);
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

  async function refreshApplicationsList() {
    try {
      const data = await getApplicationsCallback();
      setApplications(data);
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
    }
  }

  async function hideApplicationModal() {
    setShowApplicationModal(false);
    await refreshApplicationsList();
  }

  const updateSearch = (value) => {
    console.log(value);
    // if (!data?.companies) return;

    // const companies = data.companies;

    // const topFilter = companies.filter((c) =>
    //   c.companyName.toLowerCase().startsWith(value.toLowerCase()),
    // );
    // const otherFilters = companies.filter(
    //   (c) => c.companyName.toLowerCase().includes(value.toLowerCase()) && !topFilter.includes(c),
    // );

    // setOtherFilteredCompanies(otherFilters);
    // if (value === '') {
    //   setOtherFilteredCompanies([]);
    // }
    // setTopFilteredCompanies(topFilter);
  };

  return (
    <>
      <h1 className="m-2 p-2">Job Applications</h1>

      <div className={styles['applications-wrapper']}>
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
            <Col
              md="auto"
              sm="auto"
              lg="auto">
              <div className={styles['top-right-button']}>
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
          <Row className="border rounded">
            <Col className="overflow-x-auto d-flex align-items-center justify-content-start">
              <FontAwesomeIcon
                className="me-1"
                icon={faFilter}
              />
              Filters:
              <FilterBadges filters={filters} />
            </Col>
            <Col
              md="auto"
              sm="auto"
              lg="auto"
              className="pe-0 justify-content-end">
              <div className="d-flex justify-content-end">
                <Dropdown
                  align="end"
                  className="m-1">
                  <Dropdown.Toggle
                    as={Button}
                    id="dropdown-basic"
                    className={styles['no-caret']}>
                    <FontAwesomeIcon
                      className="me-1"
                      icon={faPen}
                    />
                    Status Filters
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ padding: '0.5rem' }}>
                    <FilterSelection
                      filters={filters}
                      setFilters={setFilters}
                    />
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  className="m-1"
                  variant={calendarSortAsc ? 'primary' : 'outline-primary'}
                  onClick={toggleCalendarSortAsc}>
                  <FontAwesomeIcon
                    className="me-1"
                    icon={faCalendar}
                  />
                  <FontAwesomeIcon
                    className="me-1"
                    icon={calendarSortAsc ? faArrowUp : faArrowDown}
                  />
                  Date Sort
                </Button>
              </div>
            </Col>
          </Row>
        </Container>

        {error && <span className="text-danger mt-3">{error}</span>}
        <div className={styles['applications-container']}>
          {applications.length > 0 && (
            <Container className="d-flex flex-column p-0 m-0">
              {applications.map((application, index) => (
                <Row
                  className="py-2 px-0"
                  key={index}>
                  <Col key={index}>
                    <JobApplicationCard
                      jobApplication={application}
                      onUpdated={refreshApplicationsList}
                    />
                  </Col>
                </Row>
              ))}
            </Container>
          )}
        </div>
      </div>

      <NewApplicationModal
        onShow={showApplicationModal}
        onHide={hideApplicationModal}
        companies={companies}
        data={null}
        onSaved={null}></NewApplicationModal>
    </>
  );
};

export default JobApplicationsPage;
