import { Col, Form, Row } from 'react-bootstrap';
import ReactCreateBootstrap from '../common/ReactCreateBootstrap';
import { useRef, useState } from 'react';

const ExperienceForm = ({
  id,
  defaultValues,
  companies,
  isLoading,
  onCompanyCreate,
  submitCallback,
  onSubmitSuccess,
}) => {
  const hasEdited = useRef(false);

  const [formData, setFormData] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState({});

  const validateRoleTitle = (value) => {
    if (!value) {
      return 'Please provide a job title';
    } else if (value.length > 80) {
      return 'Job title too long. Please use 80 or fewer characters.';
    } else {
      return '';
    }
  };

  const validateCompany = (value) => {
    return value ? '' : 'Please select a company';
  };

  const validateStartDate = (value) => {
    if (!value) {
      return 'Please select a start date';
    } else {
      const startDate = new Date(value);
      const endDate = new Date(formData?.endDate);
      return endDate < startDate ? 'Start date must be before end date' : '';
    }
  };

  const validateEndDate = (value) => {
    const startDate = new Date(formData?.startDate);
    const endDate = new Date(value);
    return endDate < startDate ? 'End date must be after start date' : '';
  };

  const validateRoleDescription = (value) => {
    if (!value) {
      return 'Please enter a job description';
    } else if (value.length > 1000) {
      return 'Job title too long. Please use 1000 or fewer characters.';
    } else {
      return '';
    }
  };

  const getValidationError = (name, value) => {
    switch (name) {
      case 'roleTitle':
        return validateRoleTitle(value);

      case 'company':
        return validateCompany(value);

      case 'startDate':
        return validateStartDate(value);

      case 'endDate': {
        return validateEndDate(value);
      }

      case 'roleDescription':
        return validateRoleDescription(value);

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
    if (name === 'startDate' || name === 'endDate') {
      setFormErrors({
        ...formErrors,
        startDate: getValidationError(
          'startDate',
          name === 'startDate' ? value : formData?.startDate,
        ),
        endDate: getValidationError('endDate', name === 'endDate' ? value : formData?.endDate),
      });
    } else {
      setFormErrors({ ...formErrors, [name]: getValidationError(name, value) });
    }
    hasEdited.current = true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    let hasErrors = false;

    ['roleTitle', 'company', 'startDate', 'endDate', 'roleDescription'].forEach((name) => {
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
        const success = await submitCallback(formData);
        if (success) {
          setFormData({});
          onSubmitSuccess();
        }
      } else {
        onSubmitSuccess();
        setFormData({});
      }
    }
  };

  return (
    <Form
      id={id}
      onSubmit={handleSubmit}>
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
        <ReactCreateBootstrap
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
          isDisabled={isLoading}
          isInvalid={formErrors?.company}
          createOptionPosition="first"
          onCreateOption={onCompanyCreate}
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
            <Form.Control.Feedback type="invalid">{formErrors?.startDate}</Form.Control.Feedback>
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
        <Form.Control.Feedback type="invalid">{formErrors?.roleDescription}</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
};

export default ExperienceForm;
