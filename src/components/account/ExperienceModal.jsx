import { useEffect, useState } from 'react';
import { Form, Row, Col, Modal, Button, Spinner } from 'react-bootstrap';
import styles from '../styling/jobApplications/JobApplications.module.css';
import useApi from '../../hooks/useApi';
import { getErrorMessage } from '../../utils/errorUtils';
import { getCompanies } from '../../api/rateMyCoopApi';
import { ReactSelectBootstrap } from 'react-select-bootstrap';

const ExperienceModal = ({ show, onHide, defaultValues, submitCallback }) => {
  const [formData, setFormData] = useState(defaultValues);
  const [error, setError] = useState('');

  const { data, loading: isCompaniesLoading, request: getCompaniesCallback } = useApi(getCompanies);
  const { loading: isLoading, request: onSubmitCallback } = useApi(submitCallback);

  const companies = data?.companies;

  useEffect(() => {
    const callback = async () => {
      try {
        await getCompaniesCallback();
      } catch (error) {
        const message = getErrorMessage(error);
        // TODO: Display error
        console.log('Bonk:', message);
      }
    };
    callback();
  }, [getCompaniesCallback]);

  const onJobDescriptionChange = (e) => {
    setFormData({ ...formData, roleDescription: e.target.value });
  };

  const onJobTitleChange = (e) => {
    setFormData({ ...formData, roleTitle: e.target.value });
  };

  const onCompanyChange = (e) => {
    setFormData({ ...formData, company: e.value });
  };

  const onStartDateChange = (e) => {
    setFormData({ ...formData, startDate: e.target.value });
  };

  const onEndDateChange = (e) => {
    setFormData({ ...formData, endDate: e.target.value });
  };

  const onSubmit = async () => {
    try {
      await onSubmitCallback({
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
              onChange={onJobTitleChange}
              // isInvalid={showError && !isJobTitleValid}
              value={formData?.jobTitle}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a job title.
            </Form.Control.Feedback>

            <Form.Label>Company</Form.Label>
            {/* TODO: Apply this change to the JobApllicationModal? */}
            <ReactSelectBootstrap
              isLoading={isCompaniesLoading}
              options={companies?.map((company) => {
                return { value: company, label: company.companyName };
              })}
              className="mb-2"
              onChange={onCompanyChange}
            />

            <Row>
              <Col>
                {/* TODO: Make this a date picker */}
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  onChange={onStartDateChange}
                  // isInvalid={showError && !isNumPositionsValid}
                  value={formData?.startDate}
                  disabled={isLoading}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a positive number.
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Label>End Date (Optional)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  onChange={onEndDateChange}
                  // isInvalid={showError && !isNumPositionsValid}
                  value={formData?.endDate}
                  disabled={isLoading}
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
              onChange={onJobDescriptionChange}
              value={formData?.jobDescription}
              disabled={isLoading}
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
