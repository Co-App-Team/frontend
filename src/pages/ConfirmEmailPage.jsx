import { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const ConfirmEmailPage = () => {
  const location = useLocation();
  const { email } = location.state || {};

  const [showError, setShowError] = useState(false);

  const onSubmit = () => {
    setShowError(true);
  };

  const resendCode = () => {};

  // TODO: Are codes always the same length? If so, automatically send the request once the user has entered the correct number of characters
  // TODO: Resend code flow

  return (
    <div
      className="p-4 border rounded d-flex flex-column align-items-center"
      style={{ maxWidth: '22rem' }}>
      <h2 className="mt-4 mb-0">Confirm your email</h2>
      <p className="text-center mt-4">
        Please check <strong>{email}</strong> enter the code we sent you below.
      </p>

      <Form>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Enter confirmation code"
            isInvalid={showError}
            // onChange={onEmailChange}
            // disabled={isLoading}
          />
          <Form.Control.Feedback type="invalid">
            Invalid confirmation code. Please try again.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-grid">
          <Button
            variant="primary"
            type="button"
            onClick={onSubmit}
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
      <p className="mt-4">
        Don't see an email? Check your spam folder or{' '}
        <Button
          className="p-0 align-baseline"
          variant="link"
          onClick={resendCode}>
          resend the code
        </Button>
        .
      </p>
      {/* {error && <p className="text-danger mt-3">{error}</p>} */}
      <p className="mt-0">
        Not your email? Try <Link to="/signup">signing up</Link> or{' '}
        <Link to="/login">logging in</Link> with your email.
      </p>
    </div>
  );
};

export default ConfirmEmailPage;
