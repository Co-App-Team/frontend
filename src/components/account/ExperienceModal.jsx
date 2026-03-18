import { useEffect, useState } from 'react';
import { Form, Row, Col, Modal, Button, Spinner } from 'react-bootstrap';
import styles from '../styling/jobApplications/JobApplications.module.css';
import useApi from '../../hooks/useApi';
import { getErrorMessage } from '../../utils/errorUtils';
import { ReactSelectBootstrap } from 'react-select-bootstrap';

// TODO: Form validation
// TODO: Don't submit changes when no changes done

const ExperienceModal = ({ show, onHide, defaultValues, companies, submitCallback }) => {
  const [formData, setFormData] = useState(defaultValues);
  const [error, setError] = useState('');

  const { loading: isLoading, request: onSubmitCallback } = useApi(submitCallback);

  useEffect(() => {
    setFormData(defaultValues);
  }, [defaultValues]);

  const onCompanyChange = (e) => {
    setFormData({ ...formData, company: e.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    try {
      await onSubmitCallback({
        experienceId: formData?.experienceId,
        companyId: formData?.company?.companyId,
        roleTitle: formData?.roleTitle,
        roleDescription: formData?.roleDescription,
        startDate: formData?.startDate,
        endDate: formData?.endDate,
      });
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered>
      <Modal.Header closeButton>
        {defaultValues != null ? (
          <Modal.Title className="text-black">Edit Job Application</Modal.Title>
        ) : (
          <Modal.Title className="text-black">New Job Application</Modal.Title>
        )}
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              // isInvalid={showError && !isJobTitleValid}
              value={formData?.roleTitle || ''}
              disabled={isLoading}
              name="roleTitle"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a job title.
            </Form.Control.Feedback>

            <Form.Label>Company</Form.Label>
            {/* TODO: Apply this change to the JobApllicationModal? */}
            <ReactSelectBootstrap
              isLoading={!companies}
              options={companies?.map((company) => {
                return { value: company, label: company.companyName };
              })}
              className="mb-2"
              onChange={onCompanyChange}
              value={
                formData?.company
                  ? { value: formData.company, label: formData.company.companyName }
                  : null
              }
              disabled={isLoading}
            />

            <Row>
              <Col>
                {/* TODO: Make this a date picker */}
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  // isInvalid={showError && !isNumPositionsValid}
                  value={formData?.startDate || ''}
                  disabled={isLoading}
                  name="startDate"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a positive number.
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Label>End Date (Optional)</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  // isInvalid={showError && !isNumPositionsValid}
                  value={formData?.endDate || ''}
                  disabled={isLoading}
                  name="endDate"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a positive number.
                </Form.Control.Feedback>
              </Col>
            </Row>

            <Form.Label>Job Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className={styles['text-field']}
              onChange={handleChange}
              value={formData?.roleDescription || ''}
              disabled={isLoading}
              name="roleDescription"
            />
          </Form.Group>
        </Form>
        {error && <span className="text-danger mt-3">{error}</span>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="info"
          onClick={onHide}
          disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={isLoading}>
          {isLoading && <Spinner size="sm" />} Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExperienceModal;
