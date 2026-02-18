// Component developed in part using Gemini: https://gemini.google.com/share/c31dbfa579e1

import { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import useApi from '../hooks/useApi';
import { useAuthContext } from '../contexts/AuthContext';
import { signOut } from '../api/authApi';
import { changePassword, whoami } from '../api/userApi';
import { getErrorMessage } from '../utils/errorUtils';
import ChangePasswordCard from '../components/account/ChangePasswordCard';
import ProfileCard from '../components/account/ProfileCard';

// TODO: Consider error mappings and how 401s might be handled differently here (not log out)
const changePasswordErrorMappings = {
  REQUEST_HAS_NULL_OR_EMPTY_FIELD: 'Please provide both your current password, and a new one',
  EMAIL_NOT_REGISTERED: 'Your account is not activated, please try logging in again',
  ACCOUNT_NOT_ACTIVATED: 'New password must be at least 6 characters',
  INVALID_EMAIL_OR_PASSWORD: 'Huh',
};

const AccountPage = () => {
  const { request: signOutCallback } = useApi(signOut);
  const { request: changePasswordCallback, isLoading } = useApi(changePassword);
  const { request: whoamiCallback, data: user } = useApi(whoami);

  useEffect(() => {
    whoamiCallback();
  }, [whoamiCallback]);

  const { setIsLoggedIn } = useAuthContext();

  const [changePasswordError, setChangePasswordError] = useState('');
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
    try {
      await changePasswordCallback(oldPassword, newPassword);
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
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AccountPage;
