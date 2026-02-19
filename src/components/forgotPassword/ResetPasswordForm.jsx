import { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import PasswordInput from '../auth/PasswordInput';

const ResetPasswordForm = ({ handleUpdatePassword, isLoading, defaultEmail = '' }) => {
  const [formData, setFormData] = useState({
    email: defaultEmail,
    code: '',
    password: '',
  });

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
    setFormData({ ...formData, password: e.target.value });
  };

  const onSubmit = () => {
    if (isPasswordValid && isEmailValid && isCodeValid) {
      handleUpdatePassword(formData);
    } else {
      setShowFormErrors(true);
    }
  };

  return (
    <Form>
      <Form.Group
        className={'text-start ' + (showFormErrors && !isEmailValid ? 'mb-2' : 'mb-3')}
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
        className={'text-start ' + (showFormErrors && !isCodeValid ? 'mb-2' : 'mb-3')}
        controlId="formBasicCode">
        <div className="text-start mt-0 mb-1">
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
        className={'text-start ' + (showFormErrors && !isPasswordValid ? 'mb-3' : 'mb-4')}
        controlId="formBasicPassword">
        <div className="text-start">
          <Form.Label>New Password</Form.Label>
        </div>
        <PasswordInput
          showError={showFormErrors}
          onPasswordChange={onPasswordChange}
          isLoading={isLoading}
          value={formData.password}
          autoComplete="new-password"
          placeholder="Enter a new password"
        />
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
