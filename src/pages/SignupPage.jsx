import { useContext, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import LogoImage from '../assets/coapp_logo_favicon.png';

// TODO: Show/hide password button
// TODO: Implement signup API call
// TODO: Redirect to email confirmation page after successful signup (once it exists)
// TODO: Make transition from login page look good

const SignupPage = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [isLastNameValid, setIsLastNameValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const submit = async () => {
    if (!isEmailValid || !isPasswordValid || !isFirstNameValid || !isLastNameValid) {
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
    return password.length >= 6 && password.trim() == password;
  };

  const validateFirstName = (firstName) => {
    return firstName.trim() !== '';
  };

  const validateLastName = (lastName) => {
    return lastName.trim() !== '';
  };

  return (
    <div
      className="p-4 border rounded d-flex flex-column align-items-center"
      style={{ maxWidth: '19rem' }}>
      <img
        src={LogoImage}
        width={100}
      />
      <h2>Get Started with coapp</h2>

      <Form>
        <Form.Group
          // className={showError && isFirstNameValid ? "mb-3" : "mb-0"}
          // className="mb-3"
          controlId="formBasicFirstName">
          <div className="text-start mt-4 mb-1">
            <Form.Label>First name</Form.Label>
          </div>

          <Form.Control
            type="text"
            placeholder="Enter your first name"
            onChange={onFirstNameChange}
            isInvalid={showError && !isFirstNameValid}
            isValid={showError && isFirstNameValid}
            disabled={isLoading}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid first name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <div className="text-start mt-4 mb-1">
            <Form.Label>Last name</Form.Label>
          </div>

          <Form.Control
            type="text"
            placeholder="Enter your last name"
            onChange={onLastNameChange}
            isInvalid={showError && !isLastNameValid}
            isValid={showError && isLastNameValid}
            disabled={isLoading}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid last name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
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
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter a password"
            onChange={onPasswordChange}
            disabled={isLoading}
            isInvalid={showError && !isPasswordValid}
            isValid={showError && isPasswordValid}
          />
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
  );
};

export default SignupPage;
