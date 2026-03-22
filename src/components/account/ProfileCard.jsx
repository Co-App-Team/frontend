import { Button, Card, Placeholder } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const ProfileCard = ({ user, onSignOut, error }) => {
  return (
    <Card className="shadow-sm border-0 flex-fill">
      <Card.Body className="d-flex flex-column justify-content-center p-4">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faUserCircle}
            size="4x"
            className="text-secondary"
          />
          {user ? (
            <div className="mt-2">
              <h5 className="mb-0 fw-bold">
                {user.firstName} {user.lastName}
              </h5>
              <div className="text-muted text-break">{user.email}</div>
            </div>
          ) : (
            <div className="mt-2">
              <Placeholder
                as="p"
                animation="glow"
                className="mb-0">
                <Placeholder xs={6} />
                <Placeholder xs={8} />
              </Placeholder>
            </div>
          )}
        </div>

        <div>
          <Button
            variant="outline-danger"
            onClick={onSignOut}
            className="mt-3">
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="me-2"
            />
            Sign out
          </Button>
        </div>

        {error && <p className="text-danger mt-3 mb-0">{error}</p>}
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
