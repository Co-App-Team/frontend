import { Button, Form, InputGroup, Row } from 'react-bootstrap';
import useApi from '../hooks/useApi';
import { useAuthContext } from '../contexts/AuthContext';
import { signOut } from '../api/authApi';
import { useState } from 'react';
import ShowPasswordButton from '../components/common/ShowPasswordButton';
import { changePassword } from '../api/userApi';
import { getErrorMessage } from '../utils/errorUtils';

const AccountPage = () => {
  const { request: signOutCallback } = useApi(signOut);
  const { request: changePasswordCallback, isLoading } = useApi(changePassword);

  const { setIsLoggedIn } = useAuthContext();

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // TODO: 2 of these?
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const isPasswordValid = validatePassword(formData.oldPassword);

  const handleSignOut = async () => {
    try {
      await signOutCallback();
      setIsLoggedIn(false);
    } catch (error) {
      // Bruh
      // TODO: Error paths

      const message = getErrorMessage(error);
      setError(message);
      console.log(error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      setShowError(true);
      return;
    }
    try {
      await changePasswordCallback(formData.oldPassword, formData.newPassword);
    } catch (error) {
      // TODO: Error paths
      console.log(error);
      const message = getErrorMessage(error);
      setError(message);
    }
  };

  const onPasswordChange = (e) => {
    setFormData({ ...formData, oldPassword: e.target.value.trim().trimStart() });
  };

  return (
    <>
      <Button onClick={handleSignOut}>Sign out</Button>

      <Form>
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
            <Form.Control.Feedback type="invalid">
              Password must be at least 6 characters
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <div className="d-grid">
          <Button
            variant="primary"
            type="submit"
            onClick={handlePasswordChange}
            size="lg"
            disabled={isLoading}>
            {isLoading ? (
              <Spinner
                animation="border"
                role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              'Update password'
            )}
          </Button>
        </div>
      </Form>
      {error && <span className="text-danger mt-3">{error}</span>}
    </>
  );
};

export default AccountPage;
