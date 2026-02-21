import { Modal, Button, Form, InputGroup, Spinner } from 'react-bootstrap';

// import { addNewCompany } from '../../api/rateMyCoopApi';
import { useState } from 'react';

function AddCompanyModal({ showModal, hideModal }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      show={showModal}
      onHide={hideModal}
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
            <div>
              <Form.Label>Company Name</Form.Label>
            </div>

            <Form.Control
              type="text"
              placeholder="Enter the company name"
              onChange={() => console.log('changed')}
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group
            className="my-2"
            controlId="formBasicPassword">
            <div>
              <Form.Label>Location</Form.Label>
            </div>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter the company's location"
                onChange={() => console.log('changed')}
                disabled={isLoading}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group
            className="my-2"
            controlId="formBasicPassword">
            <div>
              <Form.Label>Company Website</Form.Label>
            </div>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter the link to the company's website"
                onChange={() => console.log('changed')}
                disabled={isLoading}
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          onClick={() => {
            hideModal();
            setIsLoading(false);
          }}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            setIsLoading(true);
          }}
          disabled={isLoading}>
          {isLoading && <Spinner size="sm" />} Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCompanyModal;
