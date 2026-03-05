// Component developed in part using Gemini: https://gemini.google.com/share/c31dbfa579e1

import { useState } from 'react';
import { Button, Form, InputGroup, Card, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import ShowPasswordButton from '../common/ShowPasswordButton';
import PasswordInput from '../auth/PasswordInput';

const ChangePasswordCard = ({ isLoading, onSubmit, error, success }) => {
  const [formData, setFormData] = useState({ oldPassword: '', newPassword: '' });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  const isNewPasswordValid = formData.newPassword.length >= 6;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    if (!isNewPasswordValid || !formData.oldPassword) {
      return;
    }

    // Call parent function. Expecting a boolean return to determine if we clear the form.
    const success = await onSubmit(formData.oldPassword, formData.newPassword);

    if (success) {
      setFormData({ oldPassword: '', newPassword: '' });
      setValidated(false);
    }
  };

  return (
    <Card
      className="shadow-sm border-0"
      style={{ maxWidth: '25rem' }}>
      <Card.Header className="bg-white border-bottom-0 pt-4 pb-0 px-4">
        <h5 className="mb-0">
          <FontAwesomeIcon
            icon={faShieldAlt}
            className="me-2 text-primary"
          />
          Change Password
        </h5>
      </Card.Header>
      <Card.Body className="p-4">
        <Form
          noValidate
          onSubmit={handleSubmit}>
          <Form.Group
            className="text-start mb-3"
            controlId="oldPassword">
            <Form.Label>Current Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                name="oldPassword"
                type={showOldPassword ? 'text' : 'password'}
                value={formData.oldPassword}
                onChange={onChange}
                placeholder="Enter current password"
                isInvalid={validated && !formData.oldPassword}
                disabled={isLoading}
              />
              <ShowPasswordButton
                isShowingPassword={showOldPassword}
                isLoading={isLoading}
                onClick={() => setShowOldPassword(!showOldPassword)}
                isInvalid={validated && !formData.oldPassword}
              />
              <Form.Control.Feedback type="invalid">
                Current password is required.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group
            className={'text-start ' + (validated && !isNewPasswordValid ? 'mb-3' : 'mb-4')}
            controlId="newPassword">
            <div className="text-start">
              <Form.Label>New Password</Form.Label>
            </div>
            <PasswordInput
              showError={validated}
              onPasswordChange={onChange}
              isLoading={isLoading}
              value={formData.newPassword}
              autoComplete="new-password"
              placeholder="Enter a new password"
              name="newPassword"
            />
          </Form.Group>

          <div className="d-grid d-flex justify-content-center">
            <Button
              variant="primary"
              type="submit"
              disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </Button>
          </div>
        </Form>
        {error && <p className="text-danger mt-3 mb-0">{error}</p>}
        {success && <p className="text-success mt-3 mb-0">{success}</p>}
      </Card.Body>
    </Card>
  );
};

export default ChangePasswordCard;
