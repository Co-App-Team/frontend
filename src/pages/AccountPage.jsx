// Component developed in part using Gemini: https://gemini.google.com/share/c31dbfa579e1

import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useApi from '../hooks/useApi';
import { useAuthContext } from '../contexts/AuthContext';
import { signOut } from '../api/authApi';
import { changePassword } from '../api/userApi';
import { getErrorMessage } from '../utils/errorUtils';
import ChangePasswordCard from '../components/account/ChangePasswordCard';
import ProfileCard from '../components/account/ProfileCard';

// TODO: Consider error mappings and how 401s might be handled differently here (not log out)
const changePasswordErrorMappings = {
  REQUEST_HAS_NULL_OR_EMPTY_FIELD: 'Please provide both your current password, and a new one',
  EMAIL_NOT_REGISTERED: 'Invalid session. Please sign out and sign back in',
  ACCOUNT_NOT_ACTIVATED: 'Invalid session. Please sign out and sign back in',
  INVALID_EMAIL_OR_PASSWORD: 'Incorrect password entered',
};

const AccountPage = () => {
  const { request: signOutCallback } = useApi(signOut);
  const { request: changePasswordCallback, loading: isLoading } = useApi(changePassword);

  const { user } = useAuthContext();

  const { setIsLoggedIn } = useAuthContext();

  const [changePasswordError, setChangePasswordError] = useState('');
  const [changePasswordSuccess, setChangePasswordSuccess] = useState('');
  const [signOutError, setSignOutError] = useState('');

  const handleSignOut = async () => {
    setSignOutError('');
    try {
      await signOutCallback();
      setIsLoggedIn(false);
    } catch (error) {
      const message = getErrorMessage(error);
      setSignOutError(message);
    }
  };

  const handlePasswordChange = async (oldPassword, newPassword) => {
    setChangePasswordError('');
    setChangePasswordSuccess('');
    try {
      await changePasswordCallback(oldPassword, newPassword);
      setChangePasswordSuccess('Password changed successfully ✓');
      return true;
    } catch (error) {
      const message = getErrorMessage(error, changePasswordErrorMappings);
      setChangePasswordError(message);
      return false;
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col
          xs={12}
          md={12}
          lg={12}
          xl={12}>
          <div className="mb-4">
            <h2>Account Settings</h2>
            <p className="text-muted">Manage your profile and security preferences.</p>
          </div>

          <ProfileCard
            user={user}
            onSignOut={handleSignOut}
            error={signOutError}
          />

          <ChangePasswordCard
            isLoading={isLoading}
            onSubmit={handlePasswordChange}
            error={changePasswordError}
            success={changePasswordSuccess}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AccountPage;
