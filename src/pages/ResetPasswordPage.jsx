import { useState } from 'react';
import { login, resendEmailCode, updatePassword } from '../api/authApi.js';
import { useAuthContext } from '../contexts/AuthContext.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoImage from '../assets/coapp_logo.png';
import useApi from '../hooks/useApi.js';
import { getErrorMessage } from '../utils/errorUtils.js';
import ResetPasswordForm from '../components/forgotPassword/ResetPasswordForm.jsx';
import PageTransition from '../components/auth/PageTransition.jsx';
import ResendCodeButton from '../components/auth/ResendCodeButton.jsx';

const updateEmailErrorMappings = {
  INVALID_CONFIRMATION_CODE: 'Incorrect confirmation code. Please check your email and try again.',
  ACCOUNT_NOT_ACTIVATED: 'Please activate your account first',
  EMAIL_NOT_REGISTERED: 'Your email is not registered in our servers, please try signing up again.',
};

const resendCodeMessageMappings = {
  EMAIL_NOT_REGISTERED: 'Your email is not registered in our servers, please try signing up again.',
  REQUEST_HAS_NULL_OR_EMPTY_FIELD: 'An unexpected error occured, try logging in again',
  ACCOUNT_ALREADY_VERIFIED: 'Your account is already verified, please sign in.',
};

const ResetPasswordPage = () => {
  const location = useLocation();
  const { setIsLoggedIn } = useAuthContext();
  const { email } = location.state || '';

  const navigate = useNavigate();

  const [requestError, setRequestError] = useState(false);
  const [showResentMessage, setShowResentMessage] = useState(false);

  const { request: updatePasswordCallback, loading: updatePasswordLoading } =
    useApi(updatePassword);
  const { request: resendCodeCallback, loading: resendCodeLoading } = useApi(resendEmailCode);
  const { request: loginCallback } = useApi(login);

  const isLoading = updatePasswordLoading || resendCodeLoading;

  const handleUpdatePassword = async (formData) => {
    setRequestError('');
    setShowResentMessage(false);

    let success = false;

    try {
      await updatePasswordCallback(formData.email, formData.code, formData.password);
      success = true;
    } catch (error) {
      const message = getErrorMessage(error, updateEmailErrorMappings);
      setRequestError(message);

      if (error.status === 401 && error.serverCode === 'ACCOUNT_NOT_ACTIVATED') {
        setRequestError(
          <>
            Please{' '}
            <Link
              to="/confirm-email"
              state={{ email: formData.email }}>
              activate your account
            </Link>{' '}
            first
          </>,
        );
      }
    }

    if (success) {
      /* eslint-disable no-unused-vars */
      try {
        await loginCallback(formData.email, formData.password);
        setIsLoggedIn(true);
      } catch (error) {
        // Silently fail, let the user log in manually
      }
      /* eslint-enable no-unused-vars */
      navigate('/');
    }
  };

  const resendCode = async () => {
    setRequestError('');
    setShowResentMessage(false);

    try {
      await resendCodeCallback(email);
      setShowResentMessage(true);
    } catch (error) {
      const message = getErrorMessage(error, resendCodeMessageMappings);
      setRequestError(message);
    }
  };

  return (
    <PageTransition>
      <div
        className="p-4 border rounded d-flex flex-column align-items-center"
        style={{ maxWidth: '19rem' }}>
        <img
          src={LogoImage}
          width={220}
        />
        <h2 className="mt-0 mb-0 text-primary fw-bold">Password Reset</h2>
        <ResetPasswordForm
          isLoading={isLoading}
          handleUpdatePassword={handleUpdatePassword}
          defaultEmail={email}
        />
        {requestError && <p className="text-danger mt-3">{requestError}</p>}
        {showResentMessage && <p className="mt-3 text-success">Confirmation code resent ✓</p>}
        <p className={'mb-0 ' + (requestError || showResentMessage ? 'mt-0' : 'mt-4')}>
          Don't see an email? Check your spam folder or{' '}
          <ResendCodeButton
            resendCodeCallback={resendCode}
            isLoading={isLoading}
          />
          .
        </p>
        <p className="mt-3 mb-0">
          <Link to="/login">Back to sign in</Link>
        </p>
      </div>
    </PageTransition>
  );
};

export default ResetPasswordPage;
