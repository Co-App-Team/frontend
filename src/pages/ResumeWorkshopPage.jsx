import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';

const ResumeWorkshopPage = () => {
  const [message, setMessage] = useState('');

  return (
    <Container className="mt-3">
      <Row className="text-start align-bottom d-flex align-items-end my-1 py-1">
        <Col>
          <h2 className="m-0 p-0">Resume Workshop</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <Dropdown
            align="end"
            className="me-1 mt-1">
            <Dropdown.Toggle
              as={Button}
              id="dropdown-basic">
              <FontAwesomeIcon
                className="me-1"
                icon={faPen}
              />
              Select an application....
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ padding: '0.5rem', width: 'max-content' }}>
              Options
            </Dropdown.Menu>
          </Dropdown>
          ?
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Form>
            <Form.Group controlId="messageInput">
              {/* <Form.Label>Enter your message</Form.Label> */}
              <Form.Control
                as="textarea"
                rows={12}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us how you want to improve your resume..."
              />
            </Form.Group>
          </Form>
        </Col>
        <Col className="border rounded">Render .md here</Col>
      </Row>
    </Container>
  );
};

export default ResumeWorkshopPage;
