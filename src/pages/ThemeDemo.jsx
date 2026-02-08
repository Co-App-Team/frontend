import { Button, Container, Row, Col } from 'react-bootstrap';
import LogoImage from '../assets/coapp_logo.png';

const ThemeDemo = () => {
  return (
    <Container>
      <h1>Demonstrate Theme Colours</h1>
      <img src={LogoImage} />
      <Row>
        <Col>
          <Button
            className="m-2 p-2"
            variant="primary">
            Primary
          </Button>
        </Col>
        <Col>
          <Button
            className="m-2 p-2"
            variant="secondary">
            Secondary
          </Button>
        </Col>
        <Col>
          <Button
            className="m-2 p-2"
            variant="success">
            Success
          </Button>
        </Col>
        <Col>
          <Button
            className="m-2 p-2"
            variant="warning">
            Warning
          </Button>
        </Col>
        <Col>
          <Button
            className="m-2 p-2"
            variant="danger">
            Danger
          </Button>
        </Col>
        <Col>
          <Button
            className="m-2 p-2"
            variant="info">
            Info
          </Button>
        </Col>
        <Col>
          <Button
            className="m-2 p-2"
            variant="light">
            Light
          </Button>
        </Col>
        <Col>
          <Button
            className="m-2 p-2"
            variant="dark">
            Dark
          </Button>
        </Col>
        <Col>
          <Button
            className="m-2 p-2"
            variant="link">
            Link
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ThemeDemo;
