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
import { Col, Container, Row, Spinner } from 'react-bootstrap';
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
          <Modal.Title id="contained-modal-title-vcenter">{company.companyName}</Modal.Title>
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
        <p></p>
        {currReviews ? (
          <>
            {currReviews.reviews.map((review, index) => (
              <p key={index}>{review.comment}</p>
            ))}
          </>
        ) : (
          <>
            <Spinner />
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Container fluid>
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
      </Modal.Footer>
    </Modal>
  );
}

export default CompanyReviewModal;
