import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import styles from '../styling/common/ShowPasswordButton.module.css';

const ShowPasswordButton = ({ isShowingPassword, isLoading, onClick }) => {
  return (
    <Button
      variant="outline-secondary"
      onClick={onClick}
      disabled={isLoading}
      className={styles.passwordToggleButton}>
      {isShowingPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
    </Button>
  );
};

export default ShowPasswordButton;
