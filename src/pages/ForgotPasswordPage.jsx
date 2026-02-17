import { useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { forgotPassword, updatePassword } from '../api/authApi';
import { useAuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import LogoImage from '../assets/coapp_logo.png';
import ShowPasswordButton from '../components/common/ShowPasswordButton';
import useApi from '../hooks/useApi.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const sendCodeErrorMappings = {
  REQUEST_HAS_NULL_OR_EMPTY_FIELD: 'Problem', // TODO
  ACCOUNT_DOES_NOT_EXIST: 'Unable to send code', // TODO: This could be a security risk, letting people know whether or not there is an account for a given email
  ACCOUNT_NOT_ACTIVATED: 'Please activate your account', // TODO: Redirect to email confirmation page
};

const updateEmailErrorMappings = {
  INVALID_CONFIRMATION_CODE: 'Incorrect confirmation code. Please check your email and try again.',
  // TODO: Tell Bao to make an error for invalid passwords (whitespace rules)
  // Bao will update docs with the solution, it'll return EMAIL_NOT_REGISTERED
};

// TOOD: Might be nice to have a smoother transition between the 2 forms

const ForgotPasswordPage = () => {
  const { setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // TODO: Prune unused state
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState('Password must be at least 6 characters');

  const { request: sendResetCodeCallback, loading: sendCodeLoading } = useApi(forgotPassword);
  const { request: updatePasswordCallback, loading: updatePasswordLoading } =
    useApi(updatePassword);

  const isLoading = sendCodeLoading || updatePasswordLoading;

  const handleSendResetCode = async () => {
    setError('');

    try {
      await sendResetCodeCallback(formData.email);
      setCodeSent(true);
    } catch (error) {
      const message = getErrorMessage(error, sendCodeErrorMappings);
      setError(message);
      // TODO: Error paths for this endpoint
    }
  };

  const handleUpdatePassword = async () => {
    setError('');

    try {
      await updatePasswordCallback(formData.email, formData.code, formData.password);
      navigate('/');
      setIsLoggedIn(true); // TODO: Do this here?
      // TODO: Do something here
    } catch (error) {
      const message = getErrorMessage(error, updateEmailErrorMappings);
      setError(message);
      setShowError(true);
      // TODO: Error paths for this endpoint
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onCodeChange = (e) => {
    setFormData({ ...formData, code: e.target.value });
  };

  const onEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const onPasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value.trim().trimStart() });
    setIsPasswordValid(validatePassword(e.target.value));
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    } else {
      return true;
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
      <h2>
        {/* TODO: Styling */}
        Password Reset
      </h2>
      <Form>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail">
          <div className="text-start mt-4 mb-1">
            <Form.Label>Email</Form.Label>
          </div>

          <Form.Control
            type="email"
            placeholder="Enter your email"
            onChange={onEmailChange}
            disabled={isLoading}
          />
        </Form.Group>

        {codeSent && (
          <>
            <Form.Group
              className="mb-3"
              controlId="formBasicCode">
              <div className="text-start mt-4 mb-1">
                <Form.Label>Confirmation Code</Form.Label>
              </div>

              <Form.Control
                type="email"
                placeholder="Enter the code sent to your email"
                onChange={onCodeChange}
                disabled={isLoading}
              />
            </Form.Group>
            <Form.Group
              name="Password"
              className={'text-start ' + (showError && !isPasswordValid ? 'mb-3' : 'mb-4')}
              controlId="formBasicPassword">
              <div className="text-start">
                <Form.Label>Password</Form.Label>
              </div>

              <InputGroup hasValidation>
                <Form.Control
                  autoComplete="new-password"
                  type={showPassword ? 'text' : 'password'}
                  isInvalid={showError && !isPasswordValid}
                  placeholder="Enter a new password"
                  onChange={onPasswordChange}
                  disabled={isLoading}
                  value={formData.password}
                />
                <ShowPasswordButton
                  isShowingPassword={showPassword}
                  isLoading={isLoading}
                  onClick={toggleShowPassword}
                  isInvalid={showError && !isPasswordValid}
                />
                <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </>
        )}

        <div className="d-grid">
          <Button
            variant="primary"
            type="button"
            onClick={!codeSent ? handleSendResetCode : handleUpdatePassword}
            size="lg"
            disabled={isLoading}>
            {isLoading ? (
              <Spinner
                animation="border"
                role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              'Reset Password'
            )}
          </Button>
        </div>
      </Form>
      {error && <p className="text-danger mt-3">{error}</p>}
      <p className="mt-3 mb-0">
        <Link to="/login">Back to sign in</Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
