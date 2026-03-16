import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools } from '@fortawesome/free-solid-svg-icons';

const ExperienceCard = () => {
  return (
    <Card className="shadow-sm border-0">
      <Card.Header className="bg-white border-bottom-0 pt-4 pb-0 px-4">
        <h5 className="mb-0">
          <FontAwesomeIcon
            icon={faTools}
            className="me-2 text-primary"
          />
          Manage my experiences
        </h5>
      </Card.Header>
      <Card.Body className="p-4">{/* TODO: List out experiences here.... */}</Card.Body>
    </Card>
  );
};

export default ExperienceCard;
