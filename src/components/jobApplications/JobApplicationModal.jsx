import { useState } from 'react';
import { Form, Row, Col, InputGroup, Modal, Button, Spinner } from 'react-bootstrap';
import styles from '../styling/jobApplications/JobApplications.module.css';
import useApi from '../../hooks/useApi';
import { addApplication, editApplication } from '../../api/jobApplicationsApi';
import { getErrorMessage } from '../../utils/errorUtils';
import PropTypes from 'prop-types';
import { ReactSelectBootstrap } from 'react-select-bootstrap';

function JobApplicationModal({ onShow, onHide, companies, data, onSaved }) {
  const oldCompany = data ? companies.find((c) => c.companyId === data.companyId) : null;

  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    company: oldCompany,
    companyId: data?.companyId || '',
    jobTitle: data?.jobTitle || '',
    numPositions: data?.numPositions || '',
    status: data?.status || 'NOT_APPLIED',
    applicationDeadline: data?.applicationDeadline ? data.applicationDeadline.split('T')[0] : '',
    jobDescription: data?.jobDescription || '',
    sourceLink: data?.sourceLink || '',
  });

  const today = new Date().toISOString().split('T')[0];

  const statusMappings = {
    NOT_APPLIED: 'Not Applied',
    APPLIED: 'Applied',
    INTERVIEW_SCHEDULED: 'Interview Scheduled',
    INTERVIEWING: 'Interviewing',
    OFFER_RECEIVED: 'Offer Received',
    REJECTED: 'Rejected',
    WITHDRAWN: 'Withdrawn',
    ACCEPTED: 'Accepted',
  };

  const errorMappings = {
    DUPLICATE_APPLICATION:
      'A job application with the same job title for the same company already exists. Please try again!',
    BAD_REQUEST:
      'Please ensure all of the mandatory fields (job title, company name, and deadline date) are filled in.',
    COMPANY_NOT_FOUND: 'The provided company name does not exist. Please try again!',
  };

  const validateJobTitle = (jobTitle) => {
    return jobTitle.trim() != '';
  };

  const validateDeadlineDate = (date) => {
    return date && date.trim() != '';
  };

  const validateNumPositions = (num) => {
    return num > 0;
  };

  const validateStatus = (status) => {
    return status.trim() != '';
  };

  const validateLink = (link) => {
    let isValid = true;
    if (link.trim() === '') return isValid;

    try {
      new URL(link);
    } catch {
      isValid = false;
    }
    return isValid;
  };

  const validateCompany = (company) => {
    return company;
  };

  const isJobTitleValid = validateJobTitle(formData.jobTitle);
  const isApplicationDeadlineValid = validateDeadlineDate(formData.applicationDeadline);
  const isCompanyValid = validateCompany(formData.company);
  const isNumPositionsValid =
    formData.numPositions == '' ? true : validateNumPositions(formData.numPositions);
  const isStatusValid = validateStatus(formData.status);
  const isLinkValid = validateLink(formData.sourceLink);

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onCompanyChange = (e) => {
    setFormData({ ...formData, company: e.value });
  };

  const onDeadlineDateChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, applicationDeadline: value });

    if (value) {
      setShowError(false);
    }
  };

  const { request: addJobApplicationCallback, loading: isAddLoading } = useApi(addApplication);
  const { request: editJobApplicationCallback, loading: isEditLoading } = useApi(editApplication);

  const submit = async () => {
    if (
      !isJobTitleValid ||
      !isApplicationDeadlineValid ||
      !isCompanyValid ||
      !isNumPositionsValid ||
      !isStatusValid ||
      !isLinkValid
    ) {
      setShowError(true);
      return;
    }

    try {
      if (data) {
        let finalFormData = {
          ...formData,
          companyId: formData.company?.companyId,
          applicationId: data.applicationId,
          dateCreated: today,
        };
        if (!formData.sourceLink) {
          finalFormData.sourceLink = null;
        }

        await editJobApplicationCallback(finalFormData, finalFormData.applicationId);
        await onSaved();
        handleHide();
      } else {
        await addJobApplicationCallback({ ...formData, companyId: formData.company?.companyId });
        handleHide();
      }
    } catch (error) {
      const message = getErrorMessage(error, errorMappings);
      setError(message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const handleHide = () => {
    setFormData({
      company: oldCompany,
      companyId: data?.companyId || '',
      jobTitle: data?.jobTitle || '',
      numPositions: data?.numPositions || '',
      status: data?.status || 'NOT_APPLIED',
      applicationDeadline: data?.applicationDeadline ? data.applicationDeadline.split('T')[0] : '',
      jobDescription: data?.jobDescription || '',
      sourceLink: data?.sourceLink || '',
    });
    setError(false);
    setShowError(false);
    onHide();
  };

  return (
    <>
      <Modal
        show={onShow}
        onHide={handleHide}
        centered>
        <Modal.Header closeButton>
          {data != null ? (
            <Modal.Title className={styles['black-text']}>Edit Job Application</Modal.Title>
          ) : (
            <Modal.Title className={styles['black-text']}>New Job Application</Modal.Title>
          )}
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Row>
                <Col>
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    name="jobTitle"
                    type="text"
                    onChange={onValueChange}
                    isInvalid={showError && !isJobTitleValid}
                    value={formData.jobTitle}
                    disabled={isAddLoading || isEditLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a job title.
                  </Form.Control.Feedback>
                </Col>
                <Col>
                  <Form.Label>Number of Positions</Form.Label>
                  <Form.Control
                    name="numPositions"
                    type="number"
                    min="0"
                    onChange={onValueChange}
                    isInvalid={showError && !isNumPositionsValid}
                    value={formData.numPositions}
                    disabled={isAddLoading || isEditLoading}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a positive number.
                  </Form.Control.Feedback>
                </Col>
              </Row>

              <Form.Label>Company</Form.Label>
              <ReactSelectBootstrap
                isLoading={!companies}
                options={companies?.map((company) => {
                  return { value: company, label: company.companyName };
                })}
                className={showError && !isCompanyValid ? 'is-invalid' : 'mb-2 '}
                onChange={onCompanyChange}
                value={
                  formData.company
                    ? { value: formData.company, label: formData.company?.companyName }
                    : null
                }
                isInvalid={showError && !isCompanyValid}
                disabled={isAddLoading || isEditLoading}
              />
              {showError && !isCompanyValid && (
                <div className="invalid-feedback d-block">Please select a company.</div>
              )}

              {data == null && (
                <>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={onValueChange}
                    disabled={isAddLoading || isEditLoading}>
                    {Object.entries(statusMappings).map(([key, label]) => (
                      <option
                        key={key}
                        value={key}>
                        {' '}
                        {label}
                      </option>
                    ))}
                  </Form.Select>
                </>
              )}

              <Form.Label>Deadline Date</Form.Label>
              <Form.Control
                type="date"
                onClick={(e) => e.target.showPicker?.()}
                onChange={onDeadlineDateChange}
                isInvalid={showError && !isApplicationDeadlineValid}
                value={formData.applicationDeadline}
                disabled={isAddLoading || isEditLoading}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the application deadline.
              </Form.Control.Feedback>

              <Form.Label>Job Posting Link</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  name="sourceLink"
                  type="url"
                  onChange={onValueChange}
                  value={formData.sourceLink}
                  isInvalid={showError && !isLinkValid}
                  disabled={isAddLoading || isEditLoading}
                />

                <Form.Control.Feedback type="invalid">
                  Please provide a valid website URL. It must start with https://
                </Form.Control.Feedback>
              </InputGroup>

              <Form.Label>Job Description</Form.Label>
              <Form.Control
                name="jobDescription"
                as="textarea"
                rows={3}
                className={styles['text-field']}
                onChange={onValueChange}
                value={formData.jobDescription}
                disabled={isAddLoading || isEditLoading}
              />
            </Form.Group>
          </Form>
          {error && <span className="text-danger mt-3">{error}</span>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="info"
            onClick={handleHide}
            disabled={isAddLoading || isEditLoading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isAddLoading || isEditLoading}>
            {(isAddLoading || isEditLoading) && <Spinner size="sm" />} Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

JobApplicationModal.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      companyName: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default JobApplicationModal;
