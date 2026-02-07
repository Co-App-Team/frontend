import { Button, Form, Spinner } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const ConfirmEmailPage = () => {
  const location = useLocation();
  const { email } = location.state || {};

  // TODO: Are codes always the same length? If so, automatically send the request once the user has entered the correct number of characters

  return (
    <div
      className="p-4 border rounded d-flex flex-column align-items-center"
      style={{ maxWidth: '19rem' }}>
      <h2 className="mt-4 mb-0">Confirm your email</h2>
      <p className="text-center mt-4">
        We sent a confirmation email to <strong>{email}</strong>. Please check your inbox and enter
        the code from the email below.
      </p>

      <Form>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter confirmation code"
            // onChange={onEmailChange}
            // disabled={isLoading}
          />
        </Form.Group>
        <div className="d-grid">
          <Button
            variant="primary"
            type="button"
            // onClick={submit}
            // size="lg"
            // disabled={isLoading}
          >
            {/* <Spinner
              animation="border"
              role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner> */}
            Confirm Email
          </Button>
        </div>
      </Form>
      {/* {error && <p className="text-danger mt-3">{error}</p>} */}
      <p className="mt-3">
        Not your email? Try <Link to="/signup">signing up</Link> or{' '}
        <Link to="/login">logging in</Link> with your email.
      </p>
    </div>
  );
};

export default ConfirmEmailPage;
