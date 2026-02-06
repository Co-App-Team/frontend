import { useContext, useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import LogoImage from '../assets/coapp_logo.png';

// TODO: Show/hide password button
// TODO: Implement signup API call
// TODO: Redirect to email confirmation page after successful signup (once it exists)
// TODO: Make transition from login page look good
// TODO: Current contents taken from login page, need to be changed

const SignupPage = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const submit = async () => {
    if (!isEmailValid || !isPasswordValid) {
      setShowError(true);
      return;
    }

    setIsLoading(true);
    setError('');
    // const response = await login(formData.email, formData.password);
    const response = '';
    if (response.error) {
      console.error('Login failed:', JSON.stringify(response.error));
      if (response?.error?.response?.status === 401) {
        setError('Incorrect email or password');
      } else if (response?.error?.response?.status === 400) {
        // TODO: Redirect to email confirmation page once it exists
        setError('Please confirm your email before logging in');
      } else if (response?.error?.code === 'ERR_NETWORK') {
        setError('Unable to connect to server. Please check your internet connection.');
      } else {
        setError('Unexpected error occurred during login');
      }
    } else {
      console.log('Login successful:', response.data);
      setIsLoggedIn(true);
      navigate('/');
      setShowPassword(false); // TODO: Remove me, done to make linter happy for now
    }
    setIsLoading(false);
  };

  const onEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
    setIsEmailValid(validateEmail(e.target.value));
    console.log(formData.email);
  };

  const onPasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
    setIsPasswordValid(validatePassword(e.target.value));
    console.log(formData.password);
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  return (
    <div
      className="p-4 border rounded d-flex flex-column align-items-center"
      style={{ maxWidth: '19rem' }}>
      <img
        src={LogoImage}
        width={200}
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
            isInvalid={showError && !isEmailValid}
            isValid={showError && isEmailValid}
            disabled={isLoading}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
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
              style={{ borderRight: 'none' }}
              isInvalid={showError && !isPasswordValid}
              isValid={showError && isPasswordValid}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            Password must be at least 6 characters long.
          </Form.Control.Feedback>
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
      {error && <span className="text-danger mt-3">{error}</span>}
      <p className="mt-3">
        Or sign up <Link to="/signup">here</Link>
      </p>
      <p className="mt-3">
        <Link to="/forgot-password">Forgot your password?</Link>
      </p>
    </div>
  );
};

export default SignupPage;
