import { useState } from 'react';
import { Col, Form, FormGroup, InputGroup, Row } from 'react-bootstrap';
import ReactCreateBootstrap from '../common/ReactCreateBootstrap';

const JobApplicationForm = ({
  id,
  isLoading,
  oldCompany,
  data,
  companies,
  onSubmitCallback,
  onCompanyCreate,
}) => {
  const [showError, setShowError] = useState(false);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    // ensure each part is at least two characters long
    // if not, pads it with 0 (e.g. 5 to 05)
    const pad = (n) => n.toString().padStart(2, '0');

    const year = dateTime.getFullYear();
    const month = pad(dateTime.getMonth() + 1);
    const day = pad(dateTime.getDate());
    const hour = pad(dateTime.getHours());
    const minutes = pad(dateTime.getMinutes());

    return `${year}-${month}-${day}T${hour}:${minutes}`;
  };

  const [formData, setFormData] = useState({
    company: oldCompany,
    companyId: data?.companyId || '',
    jobTitle: data?.jobTitle || '',
    numPositions: data?.numPositions || '',
    status: data?.status || 'NOT_APPLIED',
    applicationDeadline: data?.applicationDeadline ? data.applicationDeadline.split('T')[0] : '',
    interviewDateTime: data?.interviewDateTime ? formatDateTime(data.interviewDateTime) : '',
    jobDescription: data?.jobDescription || '',
    sourceLink: data?.sourceLink || '',
  });

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

  const validateInterviewDateTime = (date) => {
    return (
      (formData.status !== 'INTERVIEW_SCHEDULED' && formData.status !== 'INTERVIEWING') ||
      (date && date.trim() !== '')
    );
  };

  const isJobTitleValid = validateJobTitle(formData.jobTitle);
  const isApplicationDeadlineValid = validateDeadlineDate(formData.applicationDeadline);
  const isCompanyValid = validateCompany(formData.company);
  const isNumPositionsValid =
    formData.numPositions == '' ? true : validateNumPositions(formData.numPositions);
  const isStatusValid = validateStatus(formData.status);
  const isLinkValid = validateLink(formData.sourceLink);
  const isInterviewDateTimeValid = validateInterviewDateTime(formData.interviewDateTime);

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

  const onInterviewDateTimeChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, interviewDateTime: value });

    if (value) {
      setShowError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !isJobTitleValid ||
      !isApplicationDeadlineValid ||
      !isInterviewDateTimeValid ||
      !isCompanyValid ||
      !isNumPositionsValid ||
      !isStatusValid ||
      !isLinkValid
    ) {
      setShowError(true);
      return;
    }

    await onSubmitCallback(formData);
  };

  return (
    <Form
      id={id}
      onSubmit={handleSubmit}>
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a positive number.
            </Form.Control.Feedback>
          </Col>
        </Row>

        <Form.Label>Company</Form.Label>
        <ReactCreateBootstrap
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
          disabled={isLoading}
          createOptionPosition="first"
          onCreateOption={onCompanyCreate}
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
              disabled={isLoading}>
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

        <FormGroup>
          {(formData.status === 'INTERVIEW_SCHEDULED' || formData.status === 'INTERVIEWING') && (
            <>
              <Form.Label>Interview Date and Time</Form.Label>
              <Form.Control
                type="datetime-local"
                onClick={(e) => e.target.showPicker?.()}
                onChange={onInterviewDateTimeChange}
                isInvalid={showError && !isInterviewDateTimeValid}
                disabled={isLoading}
                value={formData.interviewDateTime}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the interview's date and time.
              </Form.Control.Feedback>
            </>
          )}
        </FormGroup>

        <Form.Label>Deadline Date</Form.Label>
        <Form.Control
          type="date"
          onClick={(e) => e.target.showPicker?.()}
          onChange={onDeadlineDateChange}
          isInvalid={showError && !isApplicationDeadlineValid}
          value={formData.applicationDeadline}
          disabled={isLoading}
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
            disabled={isLoading}
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
          onChange={onValueChange}
          value={formData.jobDescription}
          disabled={isLoading}
        />
      </Form.Group>
    </Form>
  );
};

export default JobApplicationForm;
