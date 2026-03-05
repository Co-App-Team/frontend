// Component developed in part using Gemini: https://gemini.google.com/share/6cf46cb9feaa

import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import styles from '../styling/common/ShowPasswordButton.module.css';

const ShowPasswordButton = ({ isShowingPassword, isLoading, onClick, isInvalid }) => {
  return (
    <Button
      variant={isInvalid ? 'outline-danger' : 'outline-secondary'}
      onClick={onClick}
      disabled={isLoading}
      className={styles.passwordToggleButton}
      style={{
        borderColor: isInvalid ? '' : '#dee2e6',
      }}>
      <FontAwesomeIcon icon={isShowingPassword ? faEyeSlash : faEye} />
    </Button>
  );
};

export default ShowPasswordButton;
