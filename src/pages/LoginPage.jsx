import { useContext, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { login } from '../api/authApi';
import { AuthContext } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

// TODO: Email feedback not showing
// TODO: Setup backend env url
// TODO: Remove password/email confirmation, that's for the create account page
// TODO: Make the show/hide password option look cleaner
// TODO: Improve general page design, it's all white rn

const LoginPage = () => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = async () => {
    if (isEmailValid && isPasswordValid) {
      const response = await login(formData.email, formData.password);
      if (response.error) {
        console.error('Login failed:', response.error);
      } else {
        console.log('Login successful:', response.data);
        setIsLoggedIn(true);
      }
    } else {
      setShowError(true);
    }
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
    <div className="flex-column p-3 border rounded">
      <h2>Co-App Login</h2>
      <Form>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Type your email"
            onChange={onEmailChange}
            isInvalid={showError && !isEmailValid}
            isValid={showError && isEmailValid}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Type your password"
              onChange={onPasswordChange}
              isInvalid={showError && !isPasswordValid}
              isValid={showError && isPasswordValid}
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
          <Form.Control.Feedback type="invalid">
            Password must be at least 6 characters long.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            type="button"
            onClick={submit}
            size="lg">
            Log in
          </Button>
        </div>
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
