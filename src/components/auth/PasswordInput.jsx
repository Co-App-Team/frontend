import { Form, InputGroup } from 'react-bootstrap';
import ShowPasswordButton from '../common/ShowPasswordButton';
import { useState } from 'react';

const PasswordInput = ({
  showError,
  onPasswordChange,
  isLoading,
  value,
  autoComplete,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handlePasswordChange = (e) => {
    onPasswordChange(e);
  };

  const isPasswordValid = validatePassword(value);

  return (
    <InputGroup hasValidation>
      <Form.Control
        autoComplete={autoComplete}
        type={showPassword ? 'text' : 'password'}
        isInvalid={showError && !isPasswordValid}
        placeholder={placeholder}
        onChange={handlePasswordChange}
        disabled={isLoading}
        value={value}
      />
      <ShowPasswordButton
        isShowingPassword={showPassword}
        isLoading={isLoading}
        onClick={() => setShowPassword((prev) => !prev)}
        isInvalid={showError && !isPasswordValid}
      />
      <Form.Control.Feedback type="invalid">
        Password must be at least 6 characters
      </Form.Control.Feedback>
    </InputGroup>
  );
};

export default PasswordInput;
