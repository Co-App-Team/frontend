import { useCallback, useEffect, useState } from 'react';
import { Form, Row, Col, Modal, Button, Spinner } from 'react-bootstrap';
import useApi from '../../hooks/useApi';
import { getErrorMessage } from '../../utils/errorUtils';
import { ReactSelectBootstrap } from 'react-select-bootstrap';

// TODO: Don't submit changes when no changes done

const ExperienceModal = ({ show, onHide, defaultValues, companies, submitCallback }) => {
  const [formData, setFormData] = useState(defaultValues);
  const [requestError, setRequestError] = useState('');

  const [formErrors, setFormErrors] = useState({});

  const { loading: isLoading, request: onSubmitCallback } = useApi(submitCallback);

  const validators = {
    roleTitle: useCallback(
      (title) => {
        if (!title) {
          setFormErrors({ ...formErrors, roleTitle: 'Please provide a job title' });
          return false;
        } else {
          setFormErrors({ ...formErrors, roleTitle: '' });
          return true;
        }
      },
      [formErrors, setFormErrors],
    ),
    company: useCallback(
      (company) => {
        if (!company) {
          setFormErrors({ ...formErrors, company: 'Please select a company' });
          return false;
        } else {
          setFormErrors({ ...formErrors, company: '' });
          return true;
        }
      },
      [formErrors, setFormErrors],
    ),
    startDate: useCallback(
      (startDate) => {
        if (!startDate) {
          setFormErrors({ ...formErrors, startDate: 'Please select a start date' });
          return false;
        } else {
          setFormErrors({ ...formErrors, startDate: '' });
          return true;
        }
      },
      [formErrors, setFormErrors],
    ),
    endDate: () => {
      return true;
    },
    roleDescription: useCallback(
      (description) => {
        if (!description) {
          setFormErrors({ ...formErrors, roleDescription: 'Please enter a job description' });
          return false;
        } else {
          setFormErrors({ ...formErrors, roleDescription: '' });
          return true;
        }
      },
      [formErrors, setFormErrors],
    ),
  };

  // console.log("Errors:", JSON.stringify(formErrors))

  useEffect(() => {
    console.log('Temp');

    // TODO: eslint doesn't like this but I need to reset the state when the modal reopens
    // setFormData(defaultValues);
    // setFormErrors({});
  }, [defaultValues]);

  const onCompanyChange = (e) => {
    setFormData({ ...formData, company: e.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validators[name](value);
  };

  const onSubmit = async () => {
    // TODO: This isn't working for some reason when validating a form that doesn't have the fields defined in formData yet
    let passedValidation = true;
    for (const [name, validator] of Object.entries(validators)) {
      console.log('Validating: ', name, formData[name]);
      if (!validator(formData[name])) {
        passedValidation = false;
      }
    }

    if (passedValidation) {
      try {
        await onSubmitCallback({
          experienceId: formData?.experienceId,
          companyId: formData?.company?.companyId,
          roleTitle: formData?.roleTitle,
          roleDescription: formData?.roleDescription,
          startDate: formData?.startDate,
          endDate: formData?.endDate,
        });
      } catch (requestError) {
        const message = getErrorMessage(requestError);
        setRequestError(message);
      }
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
              isInvalid={formErrors?.roleTitle}
              value={formData?.roleTitle || ''}
              disabled={isLoading}
              name="roleTitle"
            />
            <Form.Control.Feedback type="invalid">{formErrors?.roleTitle}</Form.Control.Feedback>

            <Form.Label>Company</Form.Label>
            {/* TODO: Apply this change to the JobApllicationModal? */}
            {/* TODO: Validation */}
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
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  onClick={(e) => e.target.showPicker?.()}
                  onChange={handleChange}
                  isInvalid={formErrors?.startDate}
                  value={formData?.startDate || ''}
                  disabled={isLoading}
                  name="startDate"
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors?.startDate}
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Label>End Date (Optional)</Form.Label>
                <Form.Control
                  type="date"
                  onClick={(e) => e.target.showPicker?.()}
                  onChange={handleChange}
                  isInvalid={formErrors?.endDate}
                  value={formData?.endDate || ''}
                  disabled={isLoading}
                  name="endDate"
                />
                <Form.Control.Feedback type="invalid">{formErrors?.endDate}</Form.Control.Feedback>
              </Col>
            </Row>

            <Form.Label>Job Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleChange}
              value={formData?.roleDescription || ''}
              disabled={isLoading}
              name="roleDescription"
              style={{ resize: 'none' }}
              isInvalid={formErrors?.roleDescription}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors?.roleDescription}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
        {requestError && <span className="text-danger mt-3">{requestError}</span>}
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
