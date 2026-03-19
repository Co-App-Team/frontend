import { Container, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styling/common/GlobalNavbar.module.css';

import coappLogo from '../../assets/coapp_logo.png';
import { NavLink, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../../contexts/AuthContext';
import { useRef, useState, useEffect } from 'react';

const GlobalNavbar = () => {
  const { user } = useAuthContext();

  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        ref={navRef}
        fixed="top">
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
                to="/">
                Job Applications
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/rate-my-co-op">
                Rate My Co-op
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/interviews">
                Interview Calendar
              </Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link
                className="ms-2 me-2 align-items-center justify-content-center d-flex"
                as={NavLink}
                to="/account">
                {user && `${user.firstName} ${user.lastName}`}
                <FontAwesomeIcon
                  icon={faUserCircle}
                  size="2x"
                  className="text-secondary ms-1"
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ paddingTop: navHeight }}>
        <Outlet />
      </div>
    </>
  );
};

export default GlobalNavbar;
