// Component styling developed in part using gemini: https://gemini.google.com/share/c6df56fd74b9

import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Placeholder, Row } from 'react-bootstrap';

const JobExperience = ({ experience, companies, isLoading, onDeleteClick, onEditClick }) => {
  return (
    <Row className="mb-3 mx-0 w-100 border-bottom pb-3">
      <Col
        xs={12}
        md={7}
        lg={8}
        className="px-0">
        <div className="text-start">
          <h4>
            {companies ? (
              companies?.find((company) => company.companyId === experience.companyId)?.companyName
            ) : (
              <Placeholder xs={6} />
            )}
          </h4>
          <h5 className="text-muted">{experience.roleTitle}</h5>
          <div>{experience.roleDescription}</div>
          <div className="text-muted small">
            {experience.startDate} to {experience.endDate ? experience.endDate : 'Present'}
          </div>
        </div>
      </Col>
      <Col
        xs={12}
        md={5}
        lg={4}
        className="d-flex justify-content-start justify-content-md-end align-items-center mt-3 mt-md-0 px-0">
        <div className="d-flex">
          <Button
            className="me-2 d-flex align-items-center"
            onClick={onEditClick}
            disabled={isLoading}>
            Edit
            <FontAwesomeIcon
              icon={faPencil}
              className="ms-2"
            />
          </Button>
          <Button
            variant="danger"
            className="d-flex align-items-center"
            onClick={onDeleteClick}
            disabled={isLoading}>
            Delete
            <FontAwesomeIcon
              icon={faTrash}
              className="ms-2"
            />
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default JobExperience;
