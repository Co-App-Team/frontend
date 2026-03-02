import { useState, useEffect } from 'react';
import { Card, Spinner, Button } from 'react-bootstrap';
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
import { getCompanies, getCompany, editExistingJobApplication } from '../../api/jobApplications';
import EditApplicationModal from './JobApplicationModal';
import DeleteApplicationModal from './JobApplicationWarning';

const JobApplicationCard = ({ jobApplication, onUpdated }) => {
  const status = jobApplication.status;
  const [company, setCompany] = useState(null);

  const companyName = company?.companyName;
  const location = company ? `${company.city}, ${company.country}` : '';

  const sourceLink = jobApplication.sourceLink ? `https://${jobApplication.sourceLink}` : '';

  const [editApplication, setEditApplication] = useState(false);
  const [deleteApplication, setDeleteApplication] = useState(false);

  const [companies, setCompanies] = useState([]);

  function formatDate(date) {
    const [year, month, day] = date.split('T')[0].split('-');

    return new Date(year, month - 1, day).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  useEffect(() => {
    console.log('this is application', jobApplication);
  });

  const dateCreated = formatDate(jobApplication.dateCreated);
  const deadlineDate = formatDate(jobApplication.applicationDeadline);

  const isLoading = !company || !status || !dateCreated || !deadlineDate;

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
    setEditApplication(false);
  };

  const hideDeleteApplicationModal = () => {
    setDeleteApplication(false);
  };

  const updateStatus = async (newStatus) => {
    try {
      await editExistingJobApplication({
        ...jobApplication,
        status: newStatus,
      });

      await onUpdated();
    } catch (error) {
      console.log('something wrong happened', error);
    }
  };

  useEffect(() => {
    async function loadCompany() {
      const data = await getCompany(jobApplication.companyId);
      setCompany(data);
    }
    loadCompany();
  }, [jobApplication.companyId]);

  useEffect(() => {
    async function loadCompanies() {
      const data = await getCompanies();
      setCompanies(data);
    }
    loadCompanies();
  }, []);

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
        <Card.Header
          className="d-flex justify-content-between align-items-center text-start border-bottom-0"
          as={'h5'}>
          <div className="d-flex align-items-center gap-3">
            <span>{jobApplication.jobTitle}</span>
            <Dropdown>
              <Dropdown.Toggle
                className={styles['black-text']}
                variant={statusColor}
                id="dropdown-basic">
                {formatStatus[status]}
              </Dropdown.Toggle>

              <Dropdown.Menu className={styles['dropdown']}>
                <Dropdown.Item
                  onClick={() => {
                    updateStatus('NOT_APPLIED');
                  }}>
                  {formatStatus['NOT_APPLIED']}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    updateStatus('APPLIED');
                  }}>
                  {formatStatus['APPLIED']}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    updateStatus('INTERVIEW_SCHEDULED');
                  }}>
                  {formatStatus['INTERVIEW_SCHEDULED']}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    updateStatus('INTERVIEWING');
                  }}>
                  {formatStatus['INTERVIEWING']}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    updateStatus('REJECTED');
                  }}>
                  {formatStatus['REJECTED']}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    updateStatus('WITHDRAWN');
                  }}>
                  {formatStatus['WITHDRAWN']}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    updateStatus('OFFER_RECEIVED');
                  }}>
                  {formatStatus['OFFER_RECEIVED']}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    updateStatus('ACCEPTED');
                  }}>
                  {formatStatus['ACCEPTED']}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button
              variant="primary"
              size="md"
              onClick={() => setEditApplication(true)}>
              <FontAwesomeIcon
                className="me-1"
                icon={faPen}
                size="sm"
              />
              Edit
            </Button>

            <Button
              variant="danger"
              size="md"
              onClick={() => setDeleteApplication(true)}>
              <FontAwesomeIcon
                className="me-1"
                icon={faTrash}
                size="sm"
              />
              Delete
            </Button>
          </div>

          <div className="d-flex flex-column text-end">
            <span className="text-muted fs-6">
              Added
              <span className="text-dark">{' ' + dateCreated}</span>
            </span>
            <span className="text-muted fs-6">
              Due
              <span className="text-dark">{' ' + deadlineDate}</span>
            </span>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-around">
            <div className="mx-4">
              <FontAwesomeIcon
                className="me-1"
                icon={faBuilding}
              />
              {companyName}
            </div>
            <div className="vr"></div>
            <div className="mx-4">
              <FontAwesomeIcon
                className="me-1"
                icon={faMapPin}
              />
              Location: {location}
            </div>
            <div className="vr"></div>
            <div
              className="mx-4 "
              onClick={() => {
                console.log('helloooo');
              }}>
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
          </div>
        </Card.Body>
      </Card>

      {editApplication && (
        <EditApplicationModal
          onShow={editApplication}
          onHide={hideEditApplicationModal}
          companies={companies}
          data={jobApplication}
          onSaved={onUpdated}></EditApplicationModal>
      )}

      <DeleteApplicationModal
        onShow={deleteApplication}
        onHide={hideDeleteApplicationModal}
        data={jobApplication}
        onSaved={onUpdated}></DeleteApplicationModal>
    </>
  );
};

export default JobApplicationCard;
