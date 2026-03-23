import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

function InterviewDetailsModal({ onShow, onHide, data, companyName }) {
  const interviewDate = new Date(data.interviewDateTime).toLocaleDateString([], {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const interviewTime = new Date(data.interviewDateTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Modal
      show={onShow}
      onHide={onHide}
      centered>
      <Modal.Header
        closeButton
        className="border-0">
        <Modal.Title>Here are your interview details:</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="text-left mb-3">
          <h5 className="mb-2">
            <FontAwesomeIcon
              icon={faBriefcase}
              className="me-2 text-primary"
            />

            {data.jobTitle}
          </h5>
          <h5 className="mb-1">
            <FontAwesomeIcon
              icon={faBuilding}
              className="me-2 text-primary"
            />

            {companyName}
          </h5>
          <p className="mb-1">
            <FontAwesomeIcon
              icon={faCalendar}
              className="me-2 text-primary"
            />
            {interviewDate}
          </p>
          <p className="mb-1">
            <FontAwesomeIcon
              icon={faClock}
              className="me-2 text-primary"
            />

            {interviewTime}
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button variant="secondary">Edit Interview</Button>
        <Button
          variant="info"
          onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InterviewDetailsModal;
