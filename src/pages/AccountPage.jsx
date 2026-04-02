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
import ExperienceCard from '../components/account/ExperienceCard';
import PageTransition from '../components/common/PageTransition';

const changePasswordErrorMappings = {
  REQUEST_HAS_NULL_OR_EMPTY_FIELD: 'Please provide both your current password, and a new one',
  EMAIL_NOT_REGISTERED: 'Invalid session. Please sign out and sign back in',
  ACCOUNT_NOT_ACTIVATED: 'Invalid session. Please sign out and sign back in',
  INVALID_EMAIL_OR_PASSWORD: 'Incorrect password entered',
  NEW_PASSWORD_SAME_WITH_OLD_PASSWORD: 'New password cannot be the same as the old password',
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
    <PageTransition>
      <Container className="py-4">
        <Row className="justify-content-center ">
          <Col
            xs={11}
            xxl={10}>
            <div className="mb-4">
              <h2>Account Settings</h2>
              <p className="text-muted">Manage your profile and security preferences.</p>
            </div>
            <Row className="g-3 mb-3">
              <Col
                md={6}
                className="d-flex">
                <ProfileCard
                  user={user}
                  onSignOut={handleSignOut}
                  error={signOutError}
                />
              </Col>

              <Col
                md={6}
                className="d-flex">
                <ChangePasswordCard
                  isLoading={isLoading}
                  onSubmit={handlePasswordChange}
                  error={changePasswordError}
                  success={changePasswordSuccess}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <ExperienceCard
                  isLoading={isLoading}
                  onSubmit={handlePasswordChange}
                  error={changePasswordError}
                  success={changePasswordSuccess}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </PageTransition>
  );
};

export default AccountPage;
