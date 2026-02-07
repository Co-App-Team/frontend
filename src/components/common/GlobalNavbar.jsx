import { Container, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styling/common/GlobalNavbar.module.css';

import coappLogo from '../../assets/coapp_logo.png';
import { Link } from 'react-router-dom';

// TODO: Revert to using Nav.Link once we have real routes, using Link for now to test passing state through react router

function GlobalNavbar() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary fixed-top">
      <Container fluid>
        <Row className="d-flex align-items-center me-2 border-end">
          <Col className="pe-0">
            <Navbar.Brand
              href="/"
              className={styles.logo}>
              <img
                src={coappLogo}
                width="100"
                height="50"
                className="d-inline-block align-top"
                alt="Co-App"
              />
            </Navbar.Brand>
          </Col>
        </Row>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Link
              state={{ email: 'me@t.t' }}
              to="/confirm-email">
              Confirm Email
            </Link>
            <Nav.Link href="/example2">Example 2</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GlobalNavbar;
