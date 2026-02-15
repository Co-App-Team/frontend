// Component developed in part using Gemini: https://gemini.google.com/share/6cf46cb9feaa

import { useState } from 'react';
import { Button, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LogoImage from '../assets/coapp_logo.png';
import Col from 'react-bootstrap/Col';
import ShowPasswordButton from '../components/common/ShowPasswordButton';
import { signup } from '../api/authApi';
import useApi from '../hooks/useApi';
import { getErrorMessage } from '../utils/errorUtils';
import PageTransition from '../components/auth/PageTransition';

const errorMappings = {
  EXIST_ACCOUNT_WITH_EMAIL: 'An account with that email already exists. Try signing in.',
  REQUEST_HAS_NULL_OR_EMPTY_FIELD: 'Missing name/password',
  INVALID_EMAIL: 'Invalid email entered, please use a different one',
};

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState('Password must be at least 6 characters');
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [isLastNameValid, setIsLastNameValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { request: signupCallback } = useApi(signup);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const submit = async () => {
    if (!isEmailValid || !isPasswordValid || !isFirstNameValid || !isLastNameValid) {
      setShowError(true);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await signupCallback(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
      );

      navigate('/confirm-email', { state: { email: formData.email } });
    } catch (error) {
      const message = getErrorMessage(error, errorMappings);

      if (error.serverCode !== 'REQUEST_HAS_NULL_OR_EMPTY_FIELD') {
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onFirstNameChange = (e) => {
    setFormData({ ...formData, firstName: e.target.value });
    setIsFirstNameValid(validateFirstName(e.target.value));
  };

  const onLastNameChange = (e) => {
    setFormData({ ...formData, lastName: e.target.value });
    setIsLastNameValid(validateLastName(e.target.value));
  };

  const onEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
    setIsEmailValid(validateEmail(e.target.value));
  };

  const onPasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value.trim().trimStart() });
    setIsPasswordValid(validatePassword(e.target.value));
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    } else {
      return true;
    }
  };

  const validateFirstName = (firstName) => {
    return firstName.trim() !== '';
  };

  const validateLastName = (lastName) => {
    return lastName.trim() !== '';
  };

  return (
    <PageTransition>
      <div
        className="p-4 border rounded d-flex flex-column align-items-center"
        style={{ maxWidth: '30rem' }}>
        <img
          src={LogoImage}
          width={220}
        />
        <h2 className="mt-0 mb-0 text-primary fw-bold">Get Started with CoApp</h2>

        <Form>
          <Row>
            <Form.Group
              as={Col}
              controlId="formBasicFirstName"
              className={'text-start mt-4 ' + (showError && isFirstNameValid ? 'mb-4' : 'mb-3')}>
              <div className="text-start">
                <Form.Label>First name</Form.Label>
              </div>

              <Form.Control
                type="text"
                placeholder="Enter your first name"
                onChange={onFirstNameChange}
                isInvalid={showError && !isFirstNameValid}
                disabled={isLoading}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a first name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              controlId="formBasicLastName"
              as={Col}
              className={'text-start mt-4 ' + (showError && isLastNameValid ? 'mb-4' : 'mb-3')}>
              <div className="text-start">
                <Form.Label>Last name</Form.Label>
              </div>

              <Form.Control
                type="text"
                placeholder="Enter your last name"
                onChange={onLastNameChange}
                isInvalid={showError && !isLastNameValid}
                disabled={isLoading}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a last name.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group
            controlId="formBasicEmail"
            className={'text-start ' + (showError && !isEmailValid ? 'mb-1' : 'mb-3')}>
            <div>
              <Form.Label>Email</Form.Label>
            </div>

            <Form.Control
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              onChange={onEmailChange}
              isInvalid={showError && !isEmailValid}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
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
                placeholder="Enter your password"
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
          <div className="d-grid">
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmit}
              size="lg"
              disabled={isLoading}>
              {isLoading ? (
                <Spinner
                  animation="border"
                  role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                'Create Account'
              )}
            </Button>
          </div>
        </Form>
        {error && <span className="text-danger mt-3">{error}</span>}
        <p className="mt-3 mb-0">
          <Link to="/login">Back to sign in</Link>
        </p>
      </div>
    </PageTransition>
  );
};

export default SignupPage;
