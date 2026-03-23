import { useState } from 'react';
import {
  Form,
  Row,
  Col,
  InputGroup,
  Modal,
  Button,
  Spinner,
  Dropdown,
  FormGroup,
} from 'react-bootstrap';
import styles from '../styling/jobApplications/JobApplications.module.css';
import dropdownStyles from '../styling/common/Dropdown.module.css';
import useApi from '../../hooks/useApi';
import { addApplication, editApplication } from '../../api/jobApplicationsApi';
import { getErrorMessage } from '../../utils/errorUtils';
import PropTypes from 'prop-types';

function JobApplicationModal({ onShow, onHide, companies, data, onSaved }) {
  const oldCompany = data ? companies.find((c) => c.companyId === data.companyId) : null;

  const [company, setCompany] = useState(oldCompany?.companyName || '');
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);

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

  const [formData, setFormData] = useState({
    companyId: data?.companyId || '',
    jobTitle: data?.jobTitle || '',
    numPositions: data?.numPositions || '',
    status: data?.status || 'NOT_APPLIED',
    applicationDeadline: data?.applicationDeadline ? data.applicationDeadline.split('T')[0] : '',
    interviewDateTime: data?.interviewDateTime
      ? new Date(data.interviewDateTime).toISOString().slice(0, 16)
      : '',
    jobDescription: data?.jobDescription || '',
    sourceLink: data?.sourceLink || '',
  });

  const filterCompanies = (value) => {
    if (value == '') return [];

    return companies.filter(
      (company) =>
        company.companyName.toLowerCase().startsWith(value.toLowerCase()) ||
        company.companyName.toLowerCase().includes(value.toLowerCase()),
    );
  };

  const handleSearchCompany = (e) => {
    const value = e.target.value;
    setCompany(value);

    if (value == '') {
      setFilteredCompanies([]);
    } else {
      setFilteredCompanies(filterCompanies(value));
    }

    if (validateCompany(value)) {
      setShowError(false);
    }
  };

  const findCompany = (companyName) => {
    return companies.find((c) => c.companyName.toLowerCase() === companyName.toLowerCase());
  };

  const handleSelectedCompany = (selected) => {
    setCompany(selected);
    const company = findCompany(selected);
    setFormData({ ...formData, companyId: company.companyId });
    setFilteredCompanies([]);

    setShowError(false);
  };

  const validateJobTitle = (jobTitle) => {
    return jobTitle.trim() != '';
  };

  const validateDeadlineDate = (date) => {
    return date && date.trim() != '';
  };

  const validateInterviewDatetime = (date) => {
    return formData.status !== 'INTERVIEWING' || (date && date.trim() !== '');
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

  const validateCompany = (companyName) => {
    let isValid = false;

    if (
      companyName != '' &&
      companies.find((c) => c.companyName?.toLowerCase() === companyName?.toLowerCase())
    ) {
      isValid = true;
    }

    return isValid;
  };

  const isJobTitleValid = validateJobTitle(formData.jobTitle);
  const isApplicationDeadlineValid = validateDeadlineDate(formData.applicationDeadline);
  const isInterviewDateTimeValid = validateInterviewDatetime(formData.interviewDateTime);
  const isCompanyValid = validateCompany(company);
  const isNumPositionsValid =
    formData.numPositions == '' ? true : validateNumPositions(formData.numPositions);
  const isStatusValid = validateStatus(formData.status);
  const isLinkValid = validateLink(formData.sourceLink);

  const onJobTitleChange = (e) => {
    setFormData({ ...formData, jobTitle: e.target.value });
  };

  const onNumPositionsChange = (e) => {
    setFormData({ ...formData, numPositions: e.target.value });
  };

  const onStatusChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.value,
    });
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

  const onSourceLinkChange = (e) => {
    setFormData({ ...formData, sourceLink: e.target.value });
  };

  const onJobDescriptionChange = (e) => {
    setFormData({ ...formData, jobDescription: e.target.value });
  };

  const { request: addJobApplicationCallback, loading: isAddLoading } = useApi(addApplication);
  const { request: editJobApplicationCallback, loading: isEditLoading } = useApi(editApplication);

  const submit = async () => {
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
      setFilteredCompanies([]);
      return;
    }

    try {
      let finalFormData = {
        ...formData,
      };
      if (formData.status !== 'INTERVIEWING' && formData.interviewDateTime != '') {
        finalFormData.interviewDateTime = '';
      }
      if (data) {
        finalFormData.applicationId = data.applicationId;
        finalFormData.dateCreated = today;

        if (finalFormData.sourceLink == '') {
          finalFormData.sourceLink = null;
        }

        await editJobApplicationCallback(finalFormData, finalFormData.applicationId);
        await onSaved();
        onHide();
      } else {
        // Allow users to not have to select from the dropdown
        // if their input already matches one of the company names
        if (finalFormData.companyId == '') {
          const foundCompany = findCompany(company);
          finalFormData.companyId = foundCompany.companyId;
          await addJobApplicationCallback(finalFormData);
        } else {
          await addJobApplicationCallback(finalFormData);
        }
        onHide();
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

  return (
    <>
      <Modal
        show={onShow}
        onHide={onHide}
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
                    type="text"
                    onChange={onJobTitleChange}
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
                    type="number"
                    min="0"
                    onChange={onNumPositionsChange}
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
              <Form.Control
                type="text"
                value={company}
                onChange={handleSearchCompany}
                isInvalid={showError && !isCompanyValid}
                disabled={isAddLoading || isEditLoading}></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please enter a valid company name.
              </Form.Control.Feedback>

              <div className={dropdownStyles['dropdown-container']}>
                {filteredCompanies.map((company) => {
                  return (
                    <div
                      key={company.companyId}
                      className={dropdownStyles['dropdown']}>
                      <Dropdown.Item
                        className={dropdownStyles['dropdown-item']}
                        key={company.companyId}
                        onClick={() => handleSelectedCompany(company.companyName)}
                        disabled={isAddLoading || isEditLoading}>
                        {company.companyName}
                      </Dropdown.Item>
                    </div>
                  );
                })}
              </div>

              {data == null && (
                <>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={formData.status}
                    onChange={onStatusChange}
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

              <FormGroup>
                {formData.status === 'INTERVIEWING' && (
                  <>
                    <Form.Label>Interview Date and Time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      onClick={(e) => e.target.showPicker?.()}
                      onChange={onInterviewDateTimeChange}
                      isInvalid={showError && !isInterviewDateTimeValid}
                      disabled={isAddLoading || isEditLoading}
                      value={formData.interviewDateTime}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide the interview's date and time.
                    </Form.Control.Feedback>
                  </>
                )}
              </FormGroup>

              <FormGroup>
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
              </FormGroup>

              <Form.Label>Job Posting Link</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="url"
                  onChange={onSourceLinkChange}
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
                as="textarea"
                rows={3}
                className={styles['text-field']}
                onChange={onJobDescriptionChange}
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
            onClick={onHide}
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
