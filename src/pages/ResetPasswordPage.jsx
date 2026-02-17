import { useState } from 'react';
import { login, updatePassword } from '../api/authApi.js';
import { useAuthContext } from '../contexts/AuthContext.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoImage from '../assets/coapp_logo.png';
import useApi from '../hooks/useApi.js';
import { getErrorMessage } from '../utils/errorUtils.js';
import ResetPasswordForm from '../components/forgotPassword/ResetPasswordForm.jsx';
import PageTransition from '../components/auth/PageTransition.jsx';

const updateEmailErrorMappings = {
  INVALID_CONFIRMATION_CODE: 'Incorrect confirmation code. Please check your email and try again.',
  ACCOUNT_NOT_ACTIVATED: 'Please activate your account first',
  EMAIL_NOT_REGISTERED: 'Your email is not registered in our servers, please try signing up again.',
};

const ResetPasswordPage = () => {
  const location = useLocation();
  const { setIsLoggedIn } = useAuthContext();
  const { email } = location.state || '';

  const navigate = useNavigate();

  const [requestError, setRequestError] = useState(false);

  const { request: updatePasswordCallback, loading: isLoading } = useApi(updatePassword);
  const { request: loginCallback } = useApi(login);

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
        <p className="mt-3 mb-0">
          <Link to="/login">Back to sign in</Link>
        </p>
      </div>
    </PageTransition>
  );
};

export default ResetPasswordPage;
