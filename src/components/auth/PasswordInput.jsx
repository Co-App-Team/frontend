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

  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (password) => {
    if (password.trim().trimStart() !== password) {
      setPasswordError('Password cannot start or end with whitespace');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
    // return password.length >= 6;
  };

  const handlePasswordChange = (e) => {
    validatePassword(e.target.value);
    onPasswordChange({ ...e, target: { value: e.target.value.trim().trimStart() } });
  };

  const isPasswordValid = passwordError === '';

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
        {passwordError}
        {/* Password must be at least 6 characters */}
      </Form.Control.Feedback>
    </InputGroup>
  );
};

export default PasswordInput;
