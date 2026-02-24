import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faMapPin,
  faLink,
  faTrash,
  faPen,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { getReviews } from '../../api/rateMyCoopApi';
import { useEffect } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import styles from '../styling/rateMyCoop/CompanyReviewModal.module.css';
import useApi from '../../hooks/useApi';
import { getErrorMessage } from '../utils/errorUtils';

function CompanyReviewModal({ company, showModal, hideModal }) {
  // const [writingReview, setWritingReview] = useState(false);
  // const [editingReview, setEditingReview] = useState(false);
  // const [deleteReview, setDeleteReview] = useState(false);

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
  }, [company, showModal]);
  return (
    <Modal
      show={showModal}
      onHide={hideModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <div className="d-flex flex-column justify-content-start align-items-start">
          <Modal.Title
            as="h2"
            id="contained-modal-title-vcenter">
            {company.companyName}
          </Modal.Title>
          <div className="d-flex">
            <div className="mx-4 ms-0">
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
        </div>
      </Modal.Header>
      <Modal.Body>
        <h4>Reviews</h4>
        <div className={styles['reviews-container']}>
          {reviews ? (
            <>
              <div className="text-center">
                {reviews.reviews.length == 0 && (
                  <h4>
                    <i>No Reviews.</i>
                  </h4>
                )}
              </div>
              {reviews.reviews.map((review, index) => (
                <Card
                  className={styles['review-card']}
                  key={index}>
                  <Card.Body>
                    <Container>
                      <Row>
                        <Col>
                          <h5>{review.authorName}</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p className="m-0">
                            <FontAwesomeIcon
                              className="me-1"
                              icon={faCalendar}
                            />
                            Term: {review.workTermSeason} {review.workTermYear}
                          </p>
                        </Col>
                        <Col>
                          <p className="m-0">
                            <FontAwesomeIcon
                              className="me-1"
                              icon={faStar}
                            />
                            Rating: {review.rating}/5
                          </p>
                        </Col>
                      </Row>
                      <hr></hr>
                      <Row>
                        <p>{review.comment}</p>
                      </Row>
                    </Container>
                  </Card.Body>
                </Card>
              ))}
            </>
          ) : (
            <div className="text-center">
              <Spinner />
            </div>
          )}
        </div>
        <Container
          fluid
          className="m-2">
          <Row>
            <Col className="text-center">
              <Button onClick={hideModal}>
                <FontAwesomeIcon
                  className="me-1"
                  icon={faPlus}
                />
                Write a Review
              </Button>
            </Col>
            <Col className="text-center">
              <Button onClick={hideModal}>
                <FontAwesomeIcon
                  className="me-1"
                  icon={faPen}
                />
                Edit your Review
              </Button>
            </Col>
            <Col className="text-center">
              <Button
                onClick={hideModal}
                variant="danger">
                <FontAwesomeIcon
                  className="me-1"
                  icon={faTrash}
                />
                Delete your Review
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hideModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CompanyReviewModal;
