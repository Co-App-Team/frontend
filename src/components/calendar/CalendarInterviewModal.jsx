import { useState } from 'react';
import { Form, Modal, Button, Spinner, Dropdown } from 'react-bootstrap';
import styles from '../styling/jobApplications/JobApplications.module.css';
import dropdownStyles from '../styling/common/Dropdown.module.css';
import useApi from '../../hooks/useApi';
import { editApplication } from '../../api/jobApplicationsApi';
import { getCompany } from '../../api/rateMyCoopApi';
import { getErrorMessage } from '../../utils/errorUtils';

function CalendarInterviewModal({ onShow, onHide, applications, onSaved }) {
  const [application, setApplication] = useState('');
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);

  const [filteredApplications, setFilteredApplications] = useState([]);

  const [formData, setFormData] = useState([]);

  const { request: getCompanyCallback } = useApi(getCompany);
  const { request: editJobApplicationCallback, loading: isEditLoading } = useApi(editApplication);

  const filterApplications = (value) => {
    if (value == '') return [];

    return applications.filter(
      (application) =>
        application.jobTitle.toLowerCase().startsWith(value.toLowerCase()) ||
        application.jobTitle.toLowerCase().includes(value.toLowerCase()),
    );
  };

  const handleSearchApplication = (e) => {
    const value = e.target.value;
    setApplication(value);

    if (value == '') {
      setFilteredApplications([]);
    } else {
      setFilteredApplications(filterApplications(value));
    }
  };

  const handleSelectedApplication = async (selected) => {
    try {
      const result = await getCompanyCallback(selected?.companyId);
      const companyName = result?.company?.companyName;
      setFormData({ ...selected, status: 'INTERVIEWING' });
      setApplication(selected.jobTitle + ' @ ' + companyName);
    } catch (error) {
      const message = getErrorMessage(error, {});
      setError(message);
    }
    setFilteredApplications([]);
  };

  const onInterviewDateChange = (e) => {
    setFormData({ ...formData, interviewDateTime: e.target.value });
  };

  const validateApplication = (application) => {
    return application.trim() != '' && application.includes('@');
  };

  const validateInterviewDatetime = (date) => {
    let isValid = true;
    if (!date) {
      isValid = false;
    }
    return isValid;
  };

  const isApplicationValid = validateApplication(application);
  const isInterviewDatetimeValid = validateInterviewDatetime(formData.interviewDateTime);

  const reset = () => {
    setFormData([]);
    setApplication('');
    setShowError(false);
    setError([]);
  };

  const submit = async () => {
    if (!isApplicationValid || !isInterviewDatetimeValid) {
      setShowError(true);
      return;
    }

    try {
      console.log('submitting this', formData);
      await editJobApplicationCallback(formData, formData.applicationId);
      await onSaved();
      reset();
      onHide();
    } catch (error) {
      const message = getErrorMessage(error);
      if (error.status !== 400 && message !== 'No fields were changed') {
        setError(message);
      }
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
          <Modal.Title className={styles['black-text']}>New Job Interview</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Job Application</Form.Label>
              <Form.Control
                type="text"
                value={application}
                onChange={handleSearchApplication}
                isInvalid={showError && !isApplicationValid}
                disabled={isEditLoading}></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide the job application this interview is for.
              </Form.Control.Feedback>

              <div className={dropdownStyles['dropdown-container']}>
                {filteredApplications.map((app, index) => {
                  return (
                    <div
                      key={index}
                      className={dropdownStyles['dropdown']}>
                      <Dropdown.Item
                        className={dropdownStyles['dropdown-item']}
                        key={index}
                        onClick={() => handleSelectedApplication(app)}
                        disabled={isEditLoading}>
                        {app.jobTitle}
                      </Dropdown.Item>
                    </div>
                  );
                })}
              </div>

              <Form.Label>Interview Date and Time</Form.Label>
              <Form.Control
                type="datetime-local"
                onClick={(e) => e.target.showPicker?.()}
                onChange={onInterviewDateChange}
                isInvalid={showError && !isInterviewDatetimeValid}
                disabled={isEditLoading}
              />
              <Form.Control.Feedback type="invalid">
                Please provide the interview's date and time.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          {error && <span className="text-danger mt-3">{error}</span>}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="info"
            onClick={onHide}
            disabled={isEditLoading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isEditLoading}>
            {isEditLoading && <Spinner size="sm" />} Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CalendarInterviewModal;
