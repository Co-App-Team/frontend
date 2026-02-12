import { useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { login } from '../api/authApi';
import { useAuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import LogoImage from '../assets/coapp_logo.png';
import ShowPasswordButton from '../components/common/ShowPasswordButton';
import useApi from '../hooks/useApi.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const errorMappings = {
  REQUEST_HAS_NULL_OR_EMPTY_FIELD: 'Incorrect email or password',
  INVALID_EMAIL_OR_PASSWORD: 'Incorrect email or password',
  ACCOUNT_NOT_ACTIVATED: 'Please activate your account',
};

const LoginPage = () => {
  const { setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { request: loginCallback } = useApi(login);

  const submit = async () => {
    setIsLoading(true);
    setError('');

    try {
      await loginCallback(formData.email, formData.password);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      const message = getErrorMessage(error, errorMappings);

      if (error.status === 400) {
        // TODO: Redirect to email confirmation page once it exists
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const onEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const onPasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  return (
    <div
      className="p-4 border rounded d-flex flex-column align-items-center"
      style={{ maxWidth: '19rem' }}>
      <img
        src={LogoImage}
        width={220}
      />
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

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword">
          <div className="text-start mt-4 mb-1">
            <Form.Label>Password</Form.Label>
          </div>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              onChange={onPasswordChange}
              disabled={isLoading}
            />
            <ShowPasswordButton
              isShowingPassword={showPassword}
              isLoading={isLoading}
              onClick={togglePasswordVisibility}
            />
          </InputGroup>
        </Form.Group>
        <div className="d-grid">
          <Button
            variant="primary"
            type="button"
            onClick={submit}
            size="lg"
            disabled={isLoading}>
            {isLoading ? (
              <Spinner
                animation="border"
                role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              'Log in'
            )}
          </Button>
        </div>
      </Form>
      {error && <p className="text-danger mt-3">{error}</p>}
      <p className={error ? '' : 'mt-3'}>
        Or sign up <Link to="/signup">here</Link>
      </p>
      <p>
        <Link to="/forgot-password">Forgot your password?</Link>
      </p>
    </div>
  );
};

export default LoginPage;
