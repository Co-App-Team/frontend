import { useState } from 'react';
import { Form, Modal, Button, Spinner } from 'react-bootstrap';
import useApi from '../../hooks/useApi';
import { editApplication } from '../../api/jobApplicationsApi';
import { getCompany } from '../../api/rateMyCoopApi';
import { getErrorMessage } from '../../utils/errorUtils';
import { ReactSelectBootstrap } from 'react-select-bootstrap';

function CalendarInterviewModal({ onShow, onHide, applications, onSaved }) {
  const [application, setApplication] = useState('');
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState([]);

  const [dateTime, setDateTime] = useState(null);

  const { request: getCompanyCallback } = useApi(getCompany);
  const { request: editJobApplicationCallback, loading: isEditLoading } = useApi(editApplication);

  const handleSelectedApplication = async (e) => {
    const selected = e.value;
    console.log('this is selected', selected);
    try {
      const result = await getCompanyCallback(selected?.companyId);
      const companyName = result?.company?.companyName;
      setFormData({ ...selected, status: 'INTERVIEWING' });
      setApplication(selected.jobTitle + ' @ ' + companyName);
    } catch (error) {
      const message = getErrorMessage(error, {});
      setError(message);
    }
  };

  const onInterviewDateChange = (e) => {
    setDateTime(e.target.value);
  };

  const validateApplication = (application) => {
    return application && application.trim().includes('@');
  };

  const validateInterviewDatetime = (date) => {
    return date;
  };

  const isApplicationValid = validateApplication(application);
  const isInterviewDatetimeValid = validateInterviewDatetime(dateTime);

  const reset = () => {
    setFormData([]);
    setApplication('');
    setShowError(false);
    setError([]);
    onHide();
  };

  const submit = async () => {
    if (!isApplicationValid || !isInterviewDatetimeValid) {
      setShowError(true);
      return;
    }

    try {
      const finalFormData = { ...formData, interviewDateTime: dateTime };
      await editJobApplicationCallback(finalFormData, finalFormData.applicationId);
      await onSaved();
      reset();
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
    <Modal
      show={onShow}
      onHide={onHide}
      centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-dark">New Job Interview</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Job Application</Form.Label>
            <Form.Group>
              <ReactSelectBootstrap
                isLoading={!applications}
                options={applications?.map((application) => {
                  return { value: application, label: application.jobTitle };
                })}
                onChange={handleSelectedApplication}
                value={application ? { value: application, label: application } : null}
                isInvalid={showError && !isApplicationValid}
              />

              {showError && !isApplicationValid && (
                <div className="invalid-feedback d-block">
                  Please provide the job application this interview is for.
                </div>
              )}
            </Form.Group>

            <Form.Group>
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
          </Form.Group>
        </Form>
        {error && <span className="text-danger mt-3">{error}</span>}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="info"
          onClick={reset}
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
  );
}

export default CalendarInterviewModal;
