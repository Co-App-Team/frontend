import { useState } from 'react';
import { forgotPassword } from '../api/authApi';
import { Link, useNavigate } from 'react-router-dom';
import LogoImage from '../assets/coapp_logo.png';
import useApi from '../hooks/useApi.js';
import { getErrorMessage } from '../utils/errorUtils.js';
import SendForgotPasswordForm from '../components/forgotPassword/SendForgotPasswordForm.jsx';
import PageTransition from '../components/common/PageTransition.jsx';

const sendCodeErrorMappings = {
  REQUEST_HAS_NULL_OR_EMPTY_FIELD: 'Request failed, please refresh the page',
  ACCOUNT_DOES_NOT_EXIST: 'Unable to send code',
  ACCOUNT_NOT_ACTIVATED: 'Please activate your account first',
};

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [requestError, setRequestError] = useState(false);

  const { request: sendResetCodeCallback, loading: isLoading } = useApi(forgotPassword);

  const handleSendResetCode = async (formData) => {
    setRequestError('');

    try {
      await sendResetCodeCallback(formData.email);
      navigate('/reset-password', { state: { email: formData.email } });
    } catch (error) {
      const message = getErrorMessage(error, sendCodeErrorMappings);
      setRequestError(message);

      if (error.status === 401 && error.serverCode === 'ACCOUNT_NOT_ACTIVATED') {
        setRequestError(
          <>
            Account not activated. Please activate your account first{' '}
            <Link
              to="/confirm-email"
              state={{ email: formData.email }}>
              here
            </Link>{' '}
          </>,
        );
      }
    }
  };

  return (
    <PageTransition>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="p-4 border rounded d-flex flex-column align-items-center"
          style={{ maxWidth: '19rem' }}>
          <img
            src={LogoImage}
            width={220}
          />
          <h2 className="mt-0 mb-0 text-primary fw-bold">Password Reset</h2>
          <SendForgotPasswordForm
            isLoading={isLoading}
            handleSendResetCode={handleSendResetCode}
          />

          {requestError && <p className="text-danger mt-3">{requestError}</p>}
          <p className={'mb-0 ' + (requestError ? 'mt-0' : 'mt-4')}>
            <Link to="/login">Back to sign in</Link>
          </p>
        </div>
      </div>
    </PageTransition>
  );
};

export default ForgotPasswordPage;
