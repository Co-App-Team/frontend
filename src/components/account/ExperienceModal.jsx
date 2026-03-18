import { useRef, useState } from 'react';
import { Form, Row, Col, Modal, Button, Spinner } from 'react-bootstrap';
import useApi from '../../hooks/useApi';
import { getErrorMessage } from '../../utils/errorUtils';
import { ReactSelectBootstrap } from 'react-select-bootstrap';

const errorMappings = {
  REQUEST_HAS_NULL_OR_EMPTY_FIELD: 'Please resolve any errors in the form.',
  COMPANY_NOT_FOUND: "We couldn't find the company you picked. Try refreshing and trying again.",
};

const ExperienceModal = ({ show, onHide, defaultValues, companies, submitCallback }) => {
  const hasEdited = useRef(false);

  const [formData, setFormData] = useState(defaultValues);
  const [requestError, setRequestError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const { loading: isLoading, request: onSubmitCallback } = useApi(submitCallback);

  const getValidationError = (name, value) => {
    switch (name) {
      case 'roleTitle':
        if (!value) {
          return 'Please provide a job title';
        } else if (value.length > 80) {
          return 'Job title too long. Please use 80 or fewer characters.';
        }
        return '';

      case 'company':
        return !value ? 'Please select a company' : '';

      case 'startDate':
        return !value ? 'Please select a start date' : '';

      case 'roleDescription':
        if (!value) {
          return 'Please enter a job description';
        } else if (value.length > 1000) {
          return 'Job title too long. Please use 1000 or fewer characters.';
        }
        return '';

      default:
        return '';
    }
  };

  const onCompanyChange = (e) => {
    setFormData({ ...formData, company: e.value });
    hasEdited.current = true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors({ ...formErrors, [name]: getValidationError(name, value) });
    hasEdited.current = true;
  };

  const onSubmit = async () => {
    const newErrors = {};
    let hasErrors = false;

    ['roleTitle', 'company', 'startDate', 'roleDescription'].forEach((name) => {
      const value = formData[name] || '';
      const error = getValidationError(name, value);

      if (error) {
        newErrors[name] = error;
        hasErrors = true;
      }
    });

    setFormErrors(newErrors);

    if (!hasErrors) {
      if (hasEdited.current) {
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
          const message = getErrorMessage(requestError, errorMappings);
          setRequestError(message);
        }
      } else {
        onHide();
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
            <ReactSelectBootstrap
              isLoading={!companies}
              options={companies?.map((company) => {
                return { value: company, label: company.companyName };
              })}
              className={formErrors?.company ? 'is-invalid' : 'mb-2 '}
              onChange={onCompanyChange}
              value={
                formData?.company
                  ? { value: formData.company, label: formData.company.companyName }
                  : null
              }
              disabled={isLoading}
              isInvalid={formErrors?.company}
            />
            {formErrors?.company && (
              <div className="invalid-feedback d-block">{formErrors.company}</div>
            )}

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
