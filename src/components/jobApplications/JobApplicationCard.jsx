import { useState, useEffect } from 'react';
import { Card, Spinner, Button, Container, Row, Col } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapPin,
  faBuilding,
  faExternalLink,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../styling/jobApplications/JobApplications.module.css';
import { getErrorMessage } from '../../utils/errorUtils';

import useApi from '../../hooks/useApi';
import { getCompanies } from '../../api/rateMyCoopApi';
import { editApplication } from '../../api/jobApplicationsApi';

import EditApplicationModal from './JobApplicationModal';
import DeleteApplicationModal from './JobApplicationWarning';
import { FORMAT_STATUS } from '../../constants/jobApplications';
import PropTypes from 'prop-types';

const JobApplicationCard = ({ jobApplication, onUpdated, setError }) => {
  const status = jobApplication.status;

  const sourceLink = jobApplication.sourceLink ? `${jobApplication.sourceLink}` : '';

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [companies, setCompanies] = useState([]);

  const { request: getCompaniesCallback } = useApi(getCompanies);
  const { request: editJobApplicationCallback } = useApi(editApplication);

  function formatDate(date) {
    const [year, month, day] = date.split('-');

    return new Date(year, month - 1, day).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }
  const deadlineDate = formatDate(jobApplication.applicationDeadline);

  function getCompany() {
    return companies.find((c) => c.companyId === jobApplication.companyId);
  }

  const company = getCompany();
  const companyName = company?.companyName;
  const location = company ? `${company.location}` : '';

  const isLoading = !status || !deadlineDate || !company;

  const statusColorMap = {
    NOT_APPLIED: ['info', 'var(--bs-info)'],
    APPLIED: ['secondary', 'var(--bs-secondary)'],
    INTERVIEW_SCHEDULED: ['warning', 'var(--bs-warning)'],
    INTERVIEWING: ['warning', 'var(--bs-warning)'],
    OFFER_RECEIVED: ['success', 'var(--bs-success)'],
    REJECTED: ['danger', 'var(--bs-danger)'],
    WITHDRAWN: ['danger', 'var(--bs-danger)'],
    ACCEPTED: ['success', 'var(--bs-success)'],
  };

  const [statusColor, borderColor] = status != null ? (statusColorMap[status] ?? []) : [];

  const hideEditApplicationModal = () => {
    setIsEditing(false);
  };

  const hideDeleteApplicationModal = () => {
    setIsDeleting(false);
  };

  const updateStatus = async (newStatus) => {
    setError('');
    const errorMappings = {
      REQUEST_HAS_NULL_OR_EMPTY_FIELD: 'You cannot apply to this. The due date has already passed!',
    };
    try {
      let finalFormData = {
        ...jobApplication,
        status: newStatus,
      };

      await editJobApplicationCallback(finalFormData, jobApplication.applicationId);

      await onUpdated();
    } catch (error) {
      const message = getErrorMessage(error, errorMappings);
      setError(message);
    }
  };

  useEffect(() => {
    async function loadCompanies() {
      try {
        const data = await getCompaniesCallback();
        setCompanies(data.companies);
      } catch (error) {
        const message = getErrorMessage(error);
        console.log(message);
      }
    }
    loadCompanies();
  }, [getCompaniesCallback]);

  if (isLoading) {
    return (
      <>
        <Card
          className={styles['application-card']}
          style={{ borderLeftColor: 'var(--bs-info)' }}>
          <Card.Body className="text-center">
            <Spinner animation="border" />
          </Card.Body>
        </Card>
      </>
    );
  }

  return (
    <>
      <Card
        className={styles['application-card']}
        style={{ borderLeftColor: borderColor }}>
        <Card.Header className="d-flex justify-content-between align-items-center text-start border-bottom-0">
          <Container>
            <Row>
              <Col
                className="d-flex align-items-center border-end"
                style={{ width: '30vw', overflowX: 'auto', overflowY: 'auto' }}>
                <h5 className="text-nowrap">{jobApplication.jobTitle}</h5>
              </Col>
              <Col
                className="d-flex align-items-center fst-italic text-nowrap"
                style={{ width: '10vw', overflowX: 'auto', overflowY: 'auto' }}>
                {!jobApplication.dateApplied ? (
                  <span className="text-muted fs-6">
                    Due
                    <span className="text-dark">{' ' + deadlineDate}</span>
                  </span>
                ) : (
                  <span className="text-muted fs-6">
                    Applied on
                    <span className="text-dark">
                      {' ' + formatDate(jobApplication.dateApplied)}
                    </span>
                  </span>
                )}
              </Col>
              <Col className="d-flex align-items-center justify-content-end pe-0">
                <Dropdown className="m-1">
                  <Dropdown.Toggle
                    className={styles['black-text']}
                    variant={statusColor}
                    id="dropdown-basic">
                    {FORMAT_STATUS[status]}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className={styles['dropdown']}>
                    <Dropdown.Item
                      onClick={() => {
                        updateStatus('NOT_APPLIED');
                      }}>
                      {FORMAT_STATUS['NOT_APPLIED']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        updateStatus('APPLIED');
                      }}>
                      {FORMAT_STATUS['APPLIED']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        updateStatus('INTERVIEW_SCHEDULED');
                      }}>
                      {FORMAT_STATUS['INTERVIEW_SCHEDULED']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        updateStatus('INTERVIEWING');
                      }}>
                      {FORMAT_STATUS['INTERVIEWING']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        updateStatus('REJECTED');
                      }}>
                      {FORMAT_STATUS['REJECTED']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        updateStatus('WITHDRAWN');
                      }}>
                      {FORMAT_STATUS['WITHDRAWN']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        updateStatus('OFFER_RECEIVED');
                      }}>
                      {FORMAT_STATUS['OFFER_RECEIVED']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        updateStatus('ACCEPTED');
                      }}>
                      {FORMAT_STATUS['ACCEPTED']}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Button
                  variant="primary"
                  className="m-1"
                  size="md"
                  onClick={() => setIsEditing(true)}>
                  <FontAwesomeIcon
                    className="me-1"
                    icon={faPen}
                    size="sm"
                  />
                  Edit
                </Button>

                <Button
                  variant="danger"
                  className="m-1"
                  size="md"
                  onClick={() => setIsDeleting(true)}>
                  <FontAwesomeIcon
                    className="me-1"
                    icon={faTrash}
                    size="sm"
                  />
                  Delete
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body>
          <Container className="text-center">
            <Row>
              <Col
                className="border-end"
                style={{ overflowX: 'auto' }}>
                <div className="m-1">
                  <FontAwesomeIcon
                    className="me-1"
                    icon={faBuilding}
                  />
                  {companyName}
                </div>
              </Col>
              <Col
                className="border-start border-end"
                style={{ overflowX: 'auto' }}>
                <div className="m-1">
                  <FontAwesomeIcon
                    className="me-1"
                    icon={faMapPin}
                  />
                  Location: {location}
                </div>
              </Col>
              <Col
                className="border-start"
                style={{ overflowX: 'auto' }}>
                <div className="m-1">
                  <i>
                    <a
                      href={sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-muted">
                      See job posting:
                    </a>
                    <FontAwesomeIcon
                      className="me-1"
                      icon={faExternalLink}
                    />
                  </i>
                </div>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>

      {isEditing && (
        <EditApplicationModal
          onShow={isEditing}
          onHide={hideEditApplicationModal}
          companies={companies}
          data={jobApplication}
          onSaved={onUpdated}
        />
      )}

      <DeleteApplicationModal
        onShow={isDeleting}
        onHide={hideDeleteApplicationModal}
        data={jobApplication}
        onSaved={onUpdated}
      />
    </>
  );
};

JobApplicationCard.propTypes = {
  jobApplication: PropTypes.object.isRequired,
  onUpdated: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

export default JobApplicationCard;
