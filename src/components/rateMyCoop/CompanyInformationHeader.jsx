import { faExternalLink, faMapPin, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row } from 'react-bootstrap';

const CompanyInformationHeader = ({ company }) => {
  return (
    <Container className="text-center text-nowrap">
      <Row>
        <Col>
          <div className="m-1">
            <FontAwesomeIcon
              className="me-1"
              icon={faStar}
            />
            {company.avgRating == 0 ? (
              /* A rating of 0 is not valid, 
              so if avgRating = 0, then no reviews for this company*/
              <>No Reviews Yet!</>
            ) : (
              <>Average Rating: {company.avgRating}/5</>
            )}
          </div>
        </Col>
        <Col
          className="border-start border-end m-1"
          style={{ overflowX: 'auto' }}>
          <div className="m-1">
            <FontAwesomeIcon
              className="me-1"
              icon={faMapPin}
            />
            Location: {company.location}
          </div>
        </Col>
        <Col>
          <div className="m-1">
            <i>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-muted mx-1">
                Visit their website:
              </a>
              <FontAwesomeIcon
                className="me-2"
                icon={faExternalLink}
              />
            </i>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyInformationHeader;
