import { useState } from 'react';
import { Form, Row, Spinner } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { confirmEmail, resendEmailCode } from '../api/authApi';
import { getErrorMessage } from '../utils/errorUtils';

const sendCodeMessageMappings = {
  REQUEST_HAS_NULL_OR_EMPTY_FIELD: 'Please enter the whole 6 digit code',
  INVALID_CONFIRMATION_CODE: 'Incorrect code. Please try again.',
  EMAIL_NOT_REGISTERED: 'Your email is not registered in our servers, please try signing up again.',
  ACCOUNT_ALREADY_VERIFIED: 'Your account is already verified, please sign in.',
};

const resendCodeMessageMappings = {
  EMAIL_NOT_REGISTERED: 'Your email is not registered in our servers, please try signing up again.',
  REQUEST_HAS_NULL_OR_EMPTY_FIELD: 'Uhhhhhhhhhhhhhhhhhhhhhhhhhhhh', // TODO
  ACCOUNT_ALREADY_VERIFIED: 'Your account is already verified, please sign in.',
};

// TODO: Resend code cooldown
// TODO: User should be logged in after confirming email
// TODO: Handle case where redirection to this page has no email state
// TODO: Are codes always the same length? If so, automatically send the request once the user has entered the correct number of characters

const ConfirmEmailPage = () => {
  const location = useLocation();
  const { email } = location.state || 'INVALID_EMAIL';
  const navigate = useNavigate();
  const { request: confirmCallback } = useApi(confirmEmail);
  const { request: resendCodeCallback } = useApi(resendEmailCode);

  const [error, setError] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setError('');
    setIsLoading(true);
    try {
      await confirmCallback(email, confirmationCode);
    } catch (error) {
      const message = getErrorMessage(error, sendCodeMessageMappings);
      setError(message);

      // 405: Account already verified
      if (error.status === 405) {
        // TODO: Is this the right thing to do? The user might not understand what's going
        // on... but also, they should never even get here in the first place
        navigate('/');
      }

      setConfirmationCode('');
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async () => {
    setError('');
    setIsLoading(true);
    try {
      await resendCodeCallback(email);
      setError('Code resent, please check your email'); // TODO: Make this display not as an error
    } catch (error) {
      const message = getErrorMessage(error, resendCodeMessageMappings);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateConfirmationCode = (e) => {
    // Enforces numeric inputs ('+' converts to int, because... JavaScript....)
    if (Number.isInteger(+e.target.value)) {
      setConfirmationCode(e.target.value.trim());

      if (e.target.value.trim().length == 6) {
        onSubmit();
      }
    }
  };

  return (
    <div
      className="p-4 border rounded d-flex flex-column align-items-center"
      style={{ maxWidth: '21rem' }}>
      <h2 className="mt-4 mb-0">Confirm your email</h2>
      <p className="text-center mt-4">
        Please check <strong>{email}</strong> and enter the code we sent you below.
      </p>

      <Form>
        <Row>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter confirmation code"
              isInvalid={error}
              onChange={updateConfirmationCode}
              value={confirmationCode}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          </Form.Group>
        </Row>
      </Form>
      {isLoading && <Spinner />}
      <p className="mt-2">
        Don't see an email? Check your spam folder or{' '}
        <Link onClick={resendCode}>resend the code</Link>.
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
