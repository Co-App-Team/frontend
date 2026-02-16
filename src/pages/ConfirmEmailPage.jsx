import { useEffect, useState } from 'react';
import { Form, Row, Spinner } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { confirmEmail, login, resendEmailCode } from '../api/authApi';
import { getErrorMessage } from '../utils/errorUtils';
import PageTransition from '../components/auth/PageTransition';
import { useAuthContext } from '../contexts/AuthContext';

const sendCodeMessageMappings = {
  REQUEST_HAS_NULL_OR_EMPTY_FIELD: 'Please enter the whole 6 digit code',
  INVALID_CONFIRMATION_CODE: 'Incorrect code. Please try again.',
  EMAIL_NOT_REGISTERED: 'Your email is not registered in our servers, please try signing up again.',
  ACCOUNT_ALREADY_VERIFIED: 'Your account is already verified, please sign in.',
};

const resendCodeMessageMappings = {
  EMAIL_NOT_REGISTERED: 'Your email is not registered in our servers, please try signing up again.',
  REQUEST_HAS_NULL_OR_EMPTY_FIELD: 'An unexpected error occured, try logging in again',
  ACCOUNT_ALREADY_VERIFIED: 'Your account is already verified, please sign in.',
};

const ConfirmEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, password } = location.state || '';

  const { setIsLoggedIn } = useAuthContext();

  const { request: confirmCallback } = useApi(confirmEmail);
  const { request: resendCodeCallback } = useApi(resendEmailCode);
  const { request: loginCallback } = useApi(login);

  const [error, setError] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResentMessage, setShowResentMessage] = useState(false);
  const [resendCodeCooldown, setResendCodeCooldown] = useState(0);

  useEffect(() => {
    // If this page was navigated to without state, redirect the user to homepage
    if (!email) {
      navigate('/');
    }
  }, [email, navigate]);

  useEffect(() => {
    let timerId;

    if (resendCodeCooldown > 0) {
      timerId = setInterval(() => {
        setResendCodeCooldown((prevCount) => prevCount - 1);
      }, 1000);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [resendCodeCooldown]);

  const onSubmit = async (code) => {
    setError('');
    setIsLoading(true);
    setShowResentMessage(false);

    let success = false;
    try {
      await confirmCallback(email, code);
      success = true;
    } catch (error) {
      const message = getErrorMessage(error, sendCodeMessageMappings);
      setError(message);

      // 405: Account already verified
      if (error.status === 405) {
        navigate('/');
      }

      setConfirmationCode('');
    }

    if (password && success) {
      /* eslint-disable no-unused-vars */
      try {
        await loginCallback(email, password);
        setIsLoggedIn(true);
      } catch (error) {
        // Silently fail, and redirect to login as before
      }
      /* eslint-enable no-unused-vars */
    }
    setIsLoading(false);

    navigate('/');
  };

  const resendCode = async (e) => {
    e.preventDefault();

    if (resendCodeCooldown == 0) {
      setError('');
      setIsLoading(true);
      setShowResentMessage(false);

      try {
        await resendCodeCallback(email);
        setShowResentMessage(true);
      } catch (error) {
        const message = getErrorMessage(error, resendCodeMessageMappings);
        setError(message);
      } finally {
        setIsLoading(false);
        setResendCodeCooldown(30);
      }
    }
  };

  const updateConfirmationCode = (e) => {
    // Enforces numeric inputs ('+' converts to int, because... JavaScript....)
    if (Number.isInteger(+e.target.value)) {
      setConfirmationCode(e.target.value.trim());

      if (e.target.value.trim().length == 6) {
        onSubmit(e.target.value.trim());
      }
    }
  };

  return (
    <PageTransition>
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
        {showResentMessage && <p className="mb-1 text-success">Confirmation code resent ✓</p>}
        {isLoading && <Spinner />}
        <p className="mt-2">
          Don't see an email? Check your spam folder or{' '}
          <Link
            onClick={resendCode}
            className={resendCodeCooldown > 0 || isLoading ? 'text-muted text-decoration-none' : ''}
            style={{
              pointerEvents: resendCodeCooldown > 0 || isLoading ? 'none' : 'auto',
              cursor: resendCodeCooldown > 0 || isLoading ? 'not-allowed' : 'pointer',
            }}>
            {resendCodeCooldown > 0 && <>wait {resendCodeCooldown}s to </>}
            resend the code
          </Link>
          .
        </p>
        <p className="mt-0">
          Not your email? Try <Link to="/signup">signing up</Link> or{' '}
          <Link to="/login">logging in</Link> with your email.
        </p>
      </div>
    </PageTransition>
  );
};

export default ConfirmEmailPage;
