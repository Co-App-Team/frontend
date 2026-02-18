import { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';

const SendForgotPasswordForm = ({ isLoading, handleSendResetCode }) => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [showFormErrors, setShowFormErrors] = useState(false);

  const onEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const isEmailValid = validateEmail(formData.email);

  const onSubmit = () => {
    if (isEmailValid) {
      handleSendResetCode(formData);
    } else {
      setShowFormErrors(true);
    }
  };

  return (
    <Form>
      <Form.Group
        className={showFormErrors && !isEmailValid ? 'mb-3' : 'mb-4'}
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
        />
        <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
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

export default SendForgotPasswordForm;
