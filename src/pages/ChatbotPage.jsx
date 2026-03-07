import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'react-bootstrap';

const ChatbotPage = () => {
  return (
    <div className="h-auto">
      Help
      <div
        className="p-3"
        style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
        <div className="d-flex">
          <Form.Control
            type="text"
            placeholder="Enter a prompt"
            className="ms-3"
          />
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="align-self-center m-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
