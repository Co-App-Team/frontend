import { Form, InputGroup } from 'react-bootstrap';
import ShowPasswordButton from '../common/ShowPasswordButton';
import { useState } from 'react';

// TODO: Put into change password screen once it's merged
const PasswordInput = ({
  showError,
  onPasswordChange,
  isLoading,
  value,
  autoComplete,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const [showWhitespaceError, setShowWhitespaceError] = useState(false);

  const [showLengthError, setShowLengthError] = useState(true);

  const validatePassword = (password) => {
    if (password.trim().trimStart() !== password) {
      setShowWhitespaceError(true);
      setShowLengthError(false);
      return false;
    } else if (password.length < 6) {
      setShowWhitespaceError(false);
      setShowLengthError(true);
      return false;
    } else {
      setShowWhitespaceError(false);
      setShowLengthError(false);
      return true;
    }
  };

  const handlePasswordChange = (e) => {
    validatePassword(e.target.value);
    onPasswordChange({ ...e, target: { value: e.target.value.trim().trimStart() } });
  };

  const isPasswordValid = !showLengthError && !showWhitespaceError;

  return (
    <InputGroup hasValidation>
      <Form.Control
        autoComplete={autoComplete}
        type={showPassword ? 'text' : 'password'}
        isInvalid={showWhitespaceError || (showError && !isPasswordValid)}
        placeholder={placeholder}
        onChange={handlePasswordChange}
        disabled={isLoading}
        value={value}
      />
      <ShowPasswordButton
        isShowingPassword={showPassword}
        isLoading={isLoading}
        onClick={() => setShowPassword((prev) => !prev)}
        isInvalid={showWhitespaceError || (showError && !isPasswordValid)}
      />
      <Form.Control.Feedback type="invalid">
        {showWhitespaceError && 'Password cannot start or end with spaces'}
        {showLengthError && 'Password must be at least 6 characters'}
      </Form.Control.Feedback>
    </InputGroup>
  );
};

export default PasswordInput;
