import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import JobApplicationCard from '../components/jobApplications/JobApplicationCard';
import styles from '../components/styling/jobApplications/JobApplications.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import NewApplicationModal from '../components/jobApplications/JobApplicationModal';
import useApi from '../hooks/useApi';
import { getCompanies } from '../api/rateMyCoopApi';
import { getApplications } from '../api/jobApplicationsApi';
import { getErrorMessage } from '../utils/errorUtils';
import FilteringBar from '../components/jobApplications/FilteringBar';

const JobApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const [error, setError] = useState(false);

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

  const formatStatus = {
    NOT_APPLIED: 'Not Applied',
    APPLIED: 'Applied',
    INTERVIEW_SCHEDULED: 'Interview Scheduled',
    INTERVIEWING: 'Interviewing',
    OFFER_RECEIVED: 'Offer Received',
    REJECTED: 'Rejected',
    WITHDRAWN: 'Withdrawn',
    ACCEPTED: 'Accepted',
  };

  return (
    <>
      <div className={styles['applications-wrapper']}>
        <Container
          fluid
          className="m-0">
          <Row className="text-start align-bottom d-flex align-items-end my-1 py-1">
            <Col className="p-0">
              <h2 className="p-0 m-0">Job Applications</h2>
            </Col>
            <Col className="p-0">
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
          <Row>
            <FilteringBar formatStatus={formatStatus} />
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
                      formatStatus={formatStatus}
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
