import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { getJobApplications } from '../api/jobApplications';
import GlobalNavbar from '../components/common/GlobalNavbar';
import JobApplicationCard from '../components/jobApplications/JobApplicationCard';
import styles from '../components/styling/jobApplications/JobApplications.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

const JobApplicationsPage = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function loadApplications() {
      const data = await getJobApplications();
      setApplications(data.jobApplications);
    }
    loadApplications();
  }, []);

  return (
    <>
      <GlobalNavbar></GlobalNavbar>

      <h1 className="m-2 p-2">Job Applications Page</h1>

      <div className={styles['applications-wrapper']}>
        <div className={styles['top-right-button']}>
          <Button
            className="btn btn-primary"
            onClick={console.log('okay')}>
            <FontAwesomeIcon
              className="me-1"
              icon={faAdd}
            />
            New Job Application
          </Button>
        </div>

        <div className={styles['applications-container']}>
          {applications.length > 0 ? (
            <>
              <Container className="d-flex flex-column p-0 m-0">
                {applications.map((application, index) => (
                  <Row
                    className="py-2 px-0"
                    key={index}>
                    <Col key={index}>
                      <JobApplicationCard jobApplication={application} />
                    </Col>
                  </Row>
                ))}
              </Container>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default JobApplicationsPage;
