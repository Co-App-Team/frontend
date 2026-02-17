import { useState } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import ShowPasswordButton from '../common/ShowPasswordButton';

const ResetPasswordForm = ({ handleUpdatePassword, isLoading, defaultEmail = '' }) => {
  const [formData, setFormData] = useState({
    email: defaultEmail,
    code: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showFormErrors, setShowFormErrors] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateCode = (code) => {
    return code.trim().length === 6;
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const isEmailValid = validateEmail(formData.email);
  const isCodeValid = validateCode(formData.code);
  const isPasswordValid = validatePassword(formData.password);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onCodeChange = (e) => {
    // Enforces numeric inputs ('+' converts to int, because... JavaScript....)
    if (Number.isInteger(+e.target.value)) {
      setFormData({ ...formData, code: e.target.value.trim().trimStart() });
    }
  };

  const onEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const onPasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value.trim().trimStart() });
  };

  const onSubmit = () => {
    if (isPasswordValid) {
      handleUpdatePassword(formData);
    } else {
      setShowFormErrors(true);
    }
  };

  return (
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
          isInvalid={showFormErrors && !isEmailValid}
          value={formData.email}
        />
        <Form.Control.Feedback type="invalid">Please enter a valid email</Form.Control.Feedback>
      </Form.Group>

      <Form.Group
        className="mb-3"
        controlId="formBasicCode">
        <div className="text-start mt-4 mb-1">
          <Form.Label>Confirmation Code</Form.Label>
        </div>

        <Form.Control
          type="text"
          placeholder="Enter confirmation code"
          onChange={onCodeChange}
          disabled={isLoading}
          isInvalid={showFormErrors && !isCodeValid}
          value={formData.code}
        />
        <Form.Control.Feedback type="invalid">Please enter the 6 digit code</Form.Control.Feedback>
      </Form.Group>
      <Form.Group
        name="Password"
        className={'text-start ' + (showFormErrors && !isPasswordValid ? 'mb-3' : 'mb-4')}
        controlId="formBasicPassword">
        <div className="text-start">
          <Form.Label>New Password</Form.Label>
        </div>

        <InputGroup hasValidation>
          <Form.Control
            autoComplete="new-password"
            type={showPassword ? 'text' : 'password'}
            isInvalid={showFormErrors && !isPasswordValid}
            placeholder="Enter a new password"
            onChange={onPasswordChange}
            disabled={isLoading}
            value={formData.password}
          />
          <ShowPasswordButton
            isShowingPassword={showPassword}
            isLoading={isLoading}
            onClick={toggleShowPassword}
            isInvalid={showFormErrors && !isPasswordValid}
          />
          <Form.Control.Feedback type="invalid">
            Password must be at least 6 characters
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <div className="d-grid">
        <Button
          variant="primary"
          type="button"
          onClick={onSubmit}
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
  );
};

export default ResetPasswordForm;
