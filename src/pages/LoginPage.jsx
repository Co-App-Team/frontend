import { useContext, useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import { login } from '../api/authApi';
import { AuthContext } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import LogoImage from '../assets/coapp_logo.png';

// TODO: Make the show/hide password option look cleaner
// TODO: Improve general page design, it's all white rn

const LoginPage = () => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = async () => {
    setIsLoading(true);
    setShowError(false);
    const response = await login(formData.email, formData.password);
    if (response.error) {
      console.error('Login failed:', JSON.stringify(response.error));
      setShowError(true);
    } else {
      console.log('Login successful:', response.data);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  };

  const onEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const onPasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  return (
    <div className="p-4 border rounded">
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
            />
            <Button
              variant="outline-secondary"
              onClick={togglePasswordVisibility}>
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </Button>
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
        {showError && (
          <p className="text-danger mt-3">
            Incorrect email or password. <br />
            Please try again.
          </p>
        )}
      </Form>
      <p className="mt-3">
        Or sign up <Link to="/signup">here</Link>
      </p>
      <p className="mt-3">
        <Link to="/forgot-password">Forgot your password?</Link>
      </p>
    </div>
  );
};

export default LoginPage;
