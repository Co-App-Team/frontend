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
import { useState, useEffect } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import styles from '../styling/rateMyCoop/CompanyReviewModal.module.css';
function CompanyReviewModal({ company, showModal, hideModal }) {
  const [currReviews, setCurrReviews] = useState();

  // const [writingReview, setWritingReview] = useState(false);
  // const [editingReview, setEditingReview] = useState(false);
  // const [deleteReview, setDeleteReview] = useState(false);
  useEffect(() => {
    async function loadCompanies() {
      if (company) {
        const data = await getReviews(parseInt(company.companyId));
        setCurrReviews(data);
      } else {
        setCurrReviews(null);
      }
    }
    loadCompanies();
  }, [showModal]);
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
        </div>
      </Modal.Header>
      <Modal.Body>
        <h4>Reviews</h4>
        <div className={styles['reviews-container']}>
          {currReviews ? (
            <>
              {currReviews.reviews.map((review, index) => (
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
                            Term: {review.workTermSeason} {review.workTermYear}
                            <FontAwesomeIcon icon={faCalendar} />
                          </p>
                        </Col>
                        <Col>
                          <p className="m-0">
                            Rating: {review.rating}/5
                            <FontAwesomeIcon icon={faStar} />
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
            <>
              <Spinner />
            </>
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
