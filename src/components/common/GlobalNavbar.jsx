import { Container, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styling/common/GlobalNavbar.module.css';

import coappLogo from '../../assets/coapp_logo.png';
import { NavLink, Outlet } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { whoami } from '../../api/userApi';
import { useEffect } from 'react';

const GlobalNavbar = () => {
  const { request: whoamiCallback, data: user } = useApi(whoami);

  useEffect(() => {
    whoamiCallback();
  }, [whoamiCallback]);

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary fixed-top">
        <Container fluid>
          <Row className="d-flex align-items-center me-2 border-end">
            <Col className="pe-0">
              <Navbar.Brand
                as={NavLink}
                to="/"
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
              <Nav.Link
                as={NavLink}
                to="/login">
                Login
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/example1">
                Example 1
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/example2">
                Example 2
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link
              className="ms-2 me-2"
              as={NavLink}
              to="/account">
              {user && `${user.firstName} ${user.lastName}`}
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default GlobalNavbar;
