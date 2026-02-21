import { Modal, Button, Form, InputGroup, Spinner } from 'react-bootstrap';

import { addNewCompany } from '../../api/rateMyCoopApi';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faLink, faMapPin } from '@fortawesome/free-solid-svg-icons';

function AddCompanyModal({ showModal, hideModal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    location: '',
    website: '',
  });

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

  const submit = async () => {
    if (!isCompanyNameValid || !isLocationValid || !isWebsiteValid) {
      setShowError(true);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      addNewCompany(formData);
    } catch (error) {
      // const message = getErrorMessage(error, errorMappings);
      const message = 'Oopsie. Something went wrong'; // TODO: Make this a real error message when API is hooked up

      if (error.serverCode !== 'REQUEST_HAS_NULL_OR_EMPTY_FIELD') {
        setError(message);
      }
    } finally {
      setFormData({ companyName: '', location: '', website: '' });
      setIsLoading(false);
      handleModalClose();
    }
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
            <InputGroup>
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
            <InputGroup>
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
            <InputGroup>
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
            setIsLoading(false);
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
