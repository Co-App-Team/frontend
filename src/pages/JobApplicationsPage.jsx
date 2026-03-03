import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getJobApplications } from '../api/jobApplications';
import JobApplicationCard from '../components/jobApplications/JobApplicationCard';
import styles from '../components/styling/jobApplications/JobApplications.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import NewApplicationModal from '../components/jobApplications/JobApplicationModal';
import { getCompanies } from '../api/rateMyCoopApi';
import useApi from '../hooks/useApi';
import { getErrorMessage } from '../utils/errorUtils';

const JobApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const { request: getCompaniesCallback } = useApi(getCompanies);

  useEffect(() => {
    async function loadApplications() {
      const data = await getJobApplications();
      setApplications(data);
    }
    loadApplications();
  }, []);

  useEffect(() => {
    async function loadCompanies() {
      try {
        const data = await getCompaniesCallback();
        setCompanies(data.companies);
      } catch (error) {
        const message = getErrorMessage(error, {});
        console.log(message);
      }
    }
    loadCompanies();
  }, [getCompaniesCallback]);

  async function refreshApplicationsList() {
    const data = await getJobApplications();
    console.log('this is data in refresh', data);
    setApplications(data);
  }

  async function hideApplicationModal() {
    setShowApplicationModal(false);
    await refreshApplicationsList();
  }

  return (
    <>
      <h1 className="m-2 p-2">Job Applications Page</h1>

      <div className={styles['applications-wrapper']}>
        <div className={styles['top-right-button']}>
          <Button
            className="btn btn-primary"
            onClick={() => setShowApplicationModal(true)}>
            <FontAwesomeIcon
              className="me-1"
              icon={faAdd}
            />
            New Job Application
          </Button>
        </div>

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
