import { Modal, Button, Form, InputGroup, Spinner } from 'react-bootstrap';

import { addNewCompany } from '../../api/rateMyCoopApi';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faLink, faMapPin } from '@fortawesome/free-solid-svg-icons';
import useApi from '../../hooks/useApi';
import { getErrorMessage } from '../../utils/errorUtils';

function AddCompanyModal({ showModal, hideModal, refreshCompanies }) {
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    location: '',
    website: '',
  });

  const errorMappings = {
    INVALID_WEBSITE: "The website must start with 'http://' or 'https://' ",
    COMPANY_ALREADY_EXISTS: 'A company with that name already exists. Please choose another',
    UNAUTHORIZED: 'You are not logged in. Please log in and try again.',
    INTERNAL_SERVER_ERROR: 'Something unexpected went wrong. Please try again later.',
  };

  const validateCompanyName = (companyName) => {
    return companyName.trim() != '';
  };

  const validateLocation = (location) => {
    return location.trim() != '';
  };

  const validateWebsite = (website) => {
    return website.trim() != '';
  };
  const isCompanyNameValid = validateCompanyName(formData.companyName);
  const isLocationValid = validateLocation(formData.location);
  const isWebsiteValid = validateWebsite(formData.website);

  const onCompanyNameChange = (e) => {
    setFormData({ ...formData, companyName: e.target.value });
  };

  const onLocationChange = (e) => {
    setFormData({ ...formData, location: e.target.value });
  };

  const onWebsiteChange = (e) => {
    setFormData({ ...formData, website: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const { request: addNewCompanyCallback, loading: isLoading } = useApi(addNewCompany);

  const submit = async () => {
    if (!isCompanyNameValid || !isLocationValid || !isWebsiteValid) {
      setShowError(true);
      return;
    }

    setError('');

    // Pre-pends http or https if it does not already exist
    // Note that this is necessary for the use of annotations in the backend
    const normalizedData = {
      ...formData,
      website:
        formData.website.startsWith('http') || formData.website.startsWith('https')
          ? formData.website
          : `https://${formData.website}`,
    };

    try {
      await addNewCompanyCallback(normalizedData);
      await refreshCompanies();
    } catch (error) {
      const message = getErrorMessage(error, errorMappings);

      if (error.serverCode !== 'REQUEST_HAS_NULL_OR_EMPTY_FIELD') {
        setError(message);
      }

      return;
    }
    handleModalClose();
    setFormData({ companyName: '', location: '', website: '' });
  };

  const handleModalClose = () => {
    setFormData({ companyName: '', location: '', website: '' });
    setError('');
    setShowError(false);
    hideModal();
  };

  return (
    <Modal
      show={showModal}
      onHide={handleModalClose}
      onShow={() => setError('')}
      size="lg"
      centered>
      <Modal.Header closeButton>
        <Modal.Title as="h3">Add new company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            className="my-2"
            controlId="formBasicEmail">
            <Form.Label>Company Name</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter the company name"
                onChange={onCompanyNameChange}
                isInvalid={showError && !isCompanyNameValid}
                disabled={isLoading}></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide a company name.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group
            className="my-2"
            controlId="formBasicPassword">
            <div>
              <Form.Label>Location</Form.Label>
            </div>
            <InputGroup hasValidation>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faMapPin}></FontAwesomeIcon>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter the company's location"
                onChange={onLocationChange}
                isInvalid={showError && !isLocationValid}
                disabled={isLoading}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a location.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group
            className="my-2"
            controlId="formBasicPassword">
            <div>
              <Form.Label>Company Website</Form.Label>
            </div>
            <InputGroup hasValidation>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faLink}></FontAwesomeIcon>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter the link to the company's website"
                onChange={onWebsiteChange}
                isInvalid={showError && !isWebsiteValid}
                disabled={isLoading}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a website.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form>
        {error && <span className="text-danger mt-3">{error}</span>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          onClick={() => {
            hideModal();
          }}
          disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}>
          {isLoading && <Spinner size="sm" />} Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCompanyModal;
