import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapPin, faLink } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import CompanyReviewModal from './CompanyReviewModal';
import styles from '../styling/rateMyCoop/CompaniesDisplay.module.css';
import useApi from '../../hooks/useApi';
import { getReviews } from '../../api/rateMyCoopApi';
import { getErrorMessage } from '../../utils/errorUtils';

const CompanyCard = ({ company }) => {
  const [modalShow, setModalShow] = useState(false);
  function hideModal() {
    setModalShow(false);
  }

  const { request: getReviewsCallback, data: reviews } = useApi(getReviews);
  useEffect(() => {
    async function loadCompanies() {
      if (company) {
        try {
          await getReviewsCallback(company.companyId);
        } catch (error) {
          const message = getErrorMessage(error, {});
          console.log(message);
        }
      }
    }
    loadCompanies();
  }, [getReviewsCallback, company]);

  return (
    <>
      <Card
        className={styles['company-card']}
        onClick={() => {
          setModalShow(true);
        }}>
        <Card.Header as={'h5'}>{company.companyName}</Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-around">
            <div className="mx-4">
              <FontAwesomeIcon
                className="me-1"
                icon={faStar}
              />
              {reviews && reviews.reviewsPagination.totalItems > 0 ? (
                <>Average Rating: {company.avgRating}/5</>
              ) : (
                <>No Reviews Yet!</>
              )}
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
      <CompanyReviewModal
        showModal={modalShow}
        hideModal={hideModal}
        company={company}
      />
    </>
  );
};

export default CompanyCard;
