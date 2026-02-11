import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapPin, faLink } from '@fortawesome/free-solid-svg-icons';
import styles from '../styling/rateMyCoop/CompaniesDisplay.module.css';

const CompanyCard = ({ company }) => {
  return (
    <>
      <Card
        className={styles['company-card']}
        onClick={() => {
          console.log('bruh');
        }}>
        <Card.Header as={'h5'}>{company.companyName}</Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-around">
            <div className="mx-4">
              <FontAwesomeIcon
                className="me-1"
                icon={faStar}
              />
              Average Rating: {company.avgRating}/5
            </div>
            <div className="vr"></div>
            <div className="mx-4">
              <FontAwesomeIcon
                className="me-1"
                icon={faMapPin}
              />
              Location: {company.location}
            </div>
            <div className="vr"></div>
            <div className="mx-4">
              <FontAwesomeIcon
                className="me-1"
                icon={faLink}
              />
              <i>
                <a href={company.website}>{company.website}</a>
              </i>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default CompanyCard;
