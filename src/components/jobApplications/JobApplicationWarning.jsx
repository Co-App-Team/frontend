import { useState } from 'react';
import {
  Alert,
  Form,
  Row,
  Col,
  InputGroup,
  Modal,
  Button,
  Spinner,
  Dropdown,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { deleteExistingJobApplication } from '../../api/jobApplications';

function JobApplicationWarning({ onShow, onHide, data, onSaved }) {
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    // if (
    //   !isJobTitleValid ||
    //   !isApplicationDeadlineValid ||
    //   !isCompanyValid ||
    //   !isNumPositionsValid ||
    //   !isStatusValid
    // ) {
    //   setShowError(true);
    //   return;
    // }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (data) {
        // let finalFormData = {
        //   ...formData,
        //   applicationId: data.applicationId,
        // };
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

    // reset();
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
          className="border-0">
          {/* <Modal.Title className={styles['black-text']}>Are you sure?</Modal.Title> */}
        </Modal.Header>

        <Modal.Body className="text-center">
          {/* <div className="d-flex justify-content-center">
              <Col>
              <Row> */}
          <FontAwesomeIcon
            className="me-1 text-danger"
            icon={faCircleXmark}
            size="5x"
          />
          {/* </Row> */}

          {/* <Row> */}
          {/* <div className="text-center p-3"> */}
          <Modal.Title className="p-2 fs-2">Are you sure?</Modal.Title>
          {/* </div>
              </Row>
              </Col> */}
          {/* </div> */}
          <p className="text-muted">
            Do you really want to delete this job application?
            <br />
            This process cannot be undone.
          </p>
        </Modal.Body>

        <Modal.Footer className="border-0">
          <Button
            variant="info"
            onClick={onHide}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleSubmit}>
            {isLoading && <Spinner size="sm" />} Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default JobApplicationWarning;
