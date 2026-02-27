import { useState } from 'react';
import { Form, Row, Col, InputGroup, Modal, Button, Spinner, Dropdown } from 'react-bootstrap';
import styles from '../styling/jobApplications/JobApplications.module.css';
import { addNewJobApplication, editExistingJobApplication } from '../../api/jobApplications';

function JobApplicationModal({ onShow, onHide, companies, data, onSaved }) {
  const oldCompany = data ? companies.find((c) => c.companyId === data.companyId) : null;

  const [company, setCompany] = useState(oldCompany?.companyName || '');
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [status, setStatus] = useState('NOT_APPLIED');

  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const [formData, setFormData] = useState({
    // companyId: '',
    // jobTitle: '',
    // numPositions: '',
    // status: status,
    // applicationDeadline: '',
    // jobDescription: '',
    // sourceLink: '',

    companyId: data?.companyId || '',
    jobTitle: data?.jobTitle || '',
    numPositions: data?.numPositions || '',
    status: data?.status || '',
    applicationDeadline: data?.applicationDeadline ? data.applicationDeadline.split('T')[0] : '',
    jobDescription: data?.jobDescription || '',
    sourceLink: data?.sourceLink?.replace('https://', '') || '',
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
  };

  const handleSelectedCompany = (selected) => {
    setCompany(selected);
    const company = companies.find((c) => c.companyName.toLowerCase() === selected.toLowerCase());
    setFormData({ ...formData, companyId: company.companyId });
    setFilteredCompanies([]);
  };

  const validateJobTitle = (jobTitle) => {
    return jobTitle.trim() != '';
  };

  const validateDeadlineDate = (date) => {
    return date.trim() != '';
  };

  const validateNumPositions = (num) => {
    return num > 0;
  };

  const isJobTitleValid = validateJobTitle(formData.jobTitle);
  const isApplicationDeadlineValid = validateDeadlineDate(formData.applicationDeadline);
  const isCompanyValid = company != '';
  const isNumPositionsValid =
    formData.numPositions == '' ? true : validateNumPositions(formData.numPositions);

  const onJobTitleChange = (e) => {
    setFormData({ ...formData, jobTitle: e.target.value });
  };

  const onNumPositionsChange = (e) => {
    setFormData({ ...formData, numPositions: e.target.value });
  };

  const onStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const onDeadlineDateChange = (e) => {
    setFormData({ ...formData, applicationDeadline: e.target.value });
  };

  const onSourceLinkChange = (e) => {
    setFormData({ ...formData, sourceLink: e.target.value });
  };

  const onJobDescriptionChange = (e) => {
    setFormData({ ...formData, jobDescription: e.target.value });
  };

  const reset = () => {
    setFormData({
      companyId: '',
      jobTitle: '',
      numPositions: '',
      status: 'NOT_APPLIED',
      applicationDeadline: '',
      jobDescription: '',
      sourceLink: '',
    });

    setShowError(false);
    setIsLoading(false);
    setStatus('NOT_APPLIED');
    setCompany('');
  };

  const submit = async () => {
    if (
      !isJobTitleValid ||
      !isApplicationDeadlineValid ||
      !isCompanyValid ||
      !isNumPositionsValid
    ) {
      setShowError(true);
      return;
    }

    let finalFormData = {
      ...formData,
      status: status,
      sourceLink: formData.sourceLink,
    };

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('final form data', finalFormData);
      if (data) {
        finalFormData = {
          ...finalFormData,
          applicationId: data.applicationId,
        };
        await editExistingJobApplication(finalFormData);
        await onSaved();
        onHide();
      } else {
        await addNewJobApplication(finalFormData);
      }
    } catch (error) {
      console.log('Something wrong happened.', error);
    }

    reset();
    onHide();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  // useEffect(() => {
  //   if (!onShow) return;

  //   if (data) {
  //     console.log('this is data', data);
  //     console.log('this is companies', companies);

  //     setFormData({
  //       companyId: data.companyId || '',
  //       jobTitle: data.jobTitle || '',
  //       numPositions: data.numPositions || '',
  //       status: data.status || '',
  //       applicationDeadline: data.applicationDeadline ? data.applicationDeadline.split('T')[0] : '',
  //       jobDescription: data.jobDescription || '',
  //       sourceLink: data.sourceLink || '',
  //     });
  //   }
  // }, [onShow]);

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
                isInvalid={showError && !isCompanyValid}></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide the company.
              </Form.Control.Feedback>

              <div className={styles['dropdown-container']}>
                {filteredCompanies.map((company, index) => {
                  return (
                    <div
                      key={index}
                      className={styles['dropdown']}>
                      <Dropdown.Item
                        className={styles['dropdown-item']}
                        key={index}
                        onClick={() => handleSelectedCompany(company.companyName)}>
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
                    value={status}
                    onChange={onStatusChange}>
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
              />
              <Form.Control.Feedback type="invalid">
                Please provide the application deadline.
              </Form.Control.Feedback>

              <Form.Label>Job Posting Link</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="basic-addon3">https://</InputGroup.Text>
                <Form.Control
                  type="url"
                  onChange={onSourceLinkChange}
                  value={formData.sourceLink}
                />
              </InputGroup>

              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                className={styles['text-field']}
                onChange={onJobDescriptionChange}
                value={formData.jobDescription}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="info"
            onClick={onHide}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}>
            {isLoading && <Spinner size="sm" />} Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default JobApplicationModal;
