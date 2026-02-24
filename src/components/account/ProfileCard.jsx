// Component developed in part using Gemini: https://gemini.google.com/share/c31dbfa579e1

import { Button, Card, Row, Col, Placeholder } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const ProfileCard = ({ user, onSignOut, error }) => {
  return (
    <Card className="shadow-sm mb-4 border-0">
      <Card.Body className="p-4">
        <div>
          <FontAwesomeIcon
            icon={faUserCircle}
            size="4x"
            className="text-secondary"
          />
          {user ? (
            <>
              <div className="text-center mt-2">
                <h5 className="mb-0 fw-bold">
                  {user.firstName} {user.lastName}
                </h5>
                <div className="text-muted text-break">{user.email}</div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mt-2">
                <Placeholder
                  as="p"
                  animation="glow"
                  className="mb-0">
                  <Placeholder xs={6} />
                  <Placeholder xs={8} />
                </Placeholder>
              </div>
            </>
          )}
        </div>
        <Button
          variant="outline-danger"
          onClick={onSignOut}
          className="mt-4">
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="me-2"
          />
          Sign out
        </Button>
        {error && <p className="text-danger mt-3 mb-0">{error}</p>}
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
