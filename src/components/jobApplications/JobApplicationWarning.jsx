import { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { deleteExistingJobApplication } from '../../api/jobApplications';

function JobApplicationWarning({ onShow, onHide, data, onSaved }) {
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (data) {
        await deleteExistingJobApplication(data);
        await onSaved();
        onHide();
      } else {
        console.log('data does not exist');
      }
    } catch (error) {
      console.log('Something wrong happened.', error);
      onHide();
    }

    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  return (
    <>
      <Modal
        show={onShow}
        onHide={onHide}
        centered>
        <Modal.Header
          closeButton
          className="border-0"></Modal.Header>

        <Modal.Body className="text-center">
          <FontAwesomeIcon
            className="me-1 text-danger"
            icon={faCircleXmark}
            size="5x"
          />
          <Modal.Title className="p-2 fs-2">Are you sure?</Modal.Title>
          <p className="text-muted">
            Do you really want to delete this job application?
            <br />
            This process cannot be undone.
          </p>
        </Modal.Body>

        <Modal.Footer className="border-0">
          <Button
            variant="info"
            onClick={onHide}
            disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleSubmit}
            disabled={isLoading}>
            {isLoading && <Spinner size="sm" />} Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default JobApplicationWarning;
