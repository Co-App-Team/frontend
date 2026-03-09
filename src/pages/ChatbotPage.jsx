import { Button, Card, Col, Dropdown, Form, Row } from 'react-bootstrap';

const ChatbotPage = () => {
  return (
    <div style={{ minWidth: '80vw' }}>
      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}>
          <Card>
            <Card.Text>
              <div className="d-flex align-items-center justify-content-center">
                <div className="m-auto">
                  {/* TODO: Center me */}
                  Resume improver
                </div>
                <Dropdown className="ms-auto">
                  <Dropdown.Toggle
                    variant="secondary"
                    id="dropdown-basic">
                    Dropdown Button
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <Form.Control
                placeholder="Tell us what you want to improve on"
                className="m-2"
                style={{ minHeight: '5rem' }}
              />
              <Button>Give me my improvements</Button>
            </Card.Text>
          </Card>
        </Col>
      </Row>
    </div>

    // <div className="h-auto">
    //   Help
    //   <div
    //     className="p-3"
    //     style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
    //     <div className="d-flex">
    //       <Form.Control
    //         type="text"
    //         placeholder="Enter a prompt"
    //         className="ms-3"
    //       />
    //       <FontAwesomeIcon
    //         icon={faPaperPlane}
    //         className="align-self-center m-2"
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default ChatbotPage;
