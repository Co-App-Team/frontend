import { useState } from 'react';
import { forgotPassword, login, updatePassword } from '../api/authApi';
import { useAuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import LogoImage from '../assets/coapp_logo.png';
import useApi from '../hooks/useApi.js';
import { getErrorMessage } from '../utils/errorUtils.js';
import SendForgotPasswordForm from '../components/forgotPassword/SendForgotPasswordForm.jsx';
import ResetPasswordForm from '../components/forgotPassword/ResetPasswordForm.jsx';

const sendCodeErrorMappings = {
  REQUEST_HAS_NULL_OR_EMPTY_FIELD: 'Request failed, please refresh the page',
  ACCOUNT_DOES_NOT_EXIST: 'Unable to send code', // TODO: This could be a security risk, letting people know whether or not there is an account for a given email
  ACCOUNT_NOT_ACTIVATED: 'Please activate your account', // TODO: Redirect to email confirmation page
};

const updateEmailErrorMappings = {
  INVALID_CONFIRMATION_CODE: 'Incorrect confirmation code. Please check your email and try again.',
  ACCOUNT_NOT_ACTIVATED: 'Please activate your account first',
  // TODO: Tell Bao to make an error for invalid passwords (whitespace rules)
  // Bao will update docs with the solution, it'll return EMAIL_NOT_REGISTERED
};

// TODO: Set default email value for 2nd form

const ForgotPasswordPage = () => {
  const { setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  // TODO: Prune unused state
  const [requestError, setRequestError] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const { request: sendResetCodeCallback, loading: sendCodeLoading } = useApi(forgotPassword);
  const { request: updatePasswordCallback, loading: updatePasswordLoading } =
    useApi(updatePassword);
  const { request: loginCallback } = useApi(login);

  const isLoading = sendCodeLoading || updatePasswordLoading;

  const handleSendResetCode = async (formData) => {
    setRequestError('');

    try {
      await sendResetCodeCallback(formData.email);
      setCodeSent(true);
    } catch (error) {
      const message = getErrorMessage(error, sendCodeErrorMappings);
      setRequestError(message);

      if (error.status === 401 && error.serverCode === 'ACCOUNT_NOT_ACTIVATED') {
        // TODO: User might not understand why they're redirected
        navigate('/confirm-email', { state: { email: formData.email } });
      }
    }
    // TODO: Remove me
    setCodeSent(true);
  };

  const handleUpdatePassword = async (formData) => {
    setRequestError('');

    let success = false;

    try {
      await updatePasswordCallback(formData.email, formData.code, formData.password);
      success = true;
    } catch (error) {
      const message = getErrorMessage(error, updateEmailErrorMappings);
      setRequestError(message);
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

  return (
    <div
      className="p-4 border rounded d-flex flex-column align-items-center"
      style={{ maxWidth: '19rem' }}>
      <img
        src={LogoImage}
        width={220}
      />
      <h2 className="mt-0 mb-0 text-primary fw-bold">Password Reset</h2>
      {!codeSent ? (
        <SendForgotPasswordForm
          isLoading={isLoading}
          handleSendResetCode={handleSendResetCode}
        />
      ) : (
        <ResetPasswordForm
          isLoading={isLoading}
          handleUpdatePassword={handleUpdatePassword}
        />
      )}
      {requestError && <p className="text-danger mt-3">{requestError}</p>}
      <p className="mt-3 mb-0">
        <Link to="/login">Back to sign in</Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
