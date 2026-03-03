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
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import useApi from '../../hooks/useApi';
import { getErrorMessage } from '../../utils/errorUtils';
import ViewReviews from './CompanyReviewModalComponents/ViewReviews';
import DeleteReviews from './CompanyReviewModalComponents/DeleteReview';
import WriteOrEditReviews from './CompanyReviewModalComponents/WriteOrEditReview';

function CompanyReviewModal({ company, showModal, hideModal, refreshCompanies }) {
  const [writingReview, setWritingReview] = useState(false);
  const [editingReview, setEditingReview] = useState(false);
  const [deletingReview, setdeletingReview] = useState(false);
  const [error, setError] = useState(false);

  const errorMappings = {
    COMPANY_NOT_FOUND: 'This company no longer exists.',
  };

  const { request: getReviewsCallback, data: reviews } = useApi(getReviews);

  useEffect(() => {
    async function checkIfCompanyHasReviews() {
      if (company) {
        try {
          await getReviewsCallback(company.companyId);
        } catch (error) {
          const message = getErrorMessage(error, errorMappings);
          setError(message);
        }
      }
    }
    checkIfCompanyHasReviews();
  }, [company, showModal, errorMappings, getReviewsCallback]);

  function navigateOut() {
    setWritingReview(false);
    setdeletingReview(false);
    setEditingReview(false);
    setError('');
  }

  return (
    <Modal
      show={showModal}
      onHide={hideModal}
      onShow={() => {
        setWritingReview(false);
        setdeletingReview(false);
        setEditingReview(false);
        setError('');
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      fullscreen
      centered>
      <Modal.Header closeButton>
        <div className="d-flex flex-column justify-content-start align-items-start">
          <Modal.Title
            as="h2"
            id="contained-modal-title-vcenter"
            className="m-2">
            <div style={{ overflowX: 'auto', maxWidth: '80vw' }}>{company.companyName}</div>
          </Modal.Title>
          <Container className="text-center">
            <Row>
              <Col
                className="border-end"
                style={{ overflowX: 'auto' }}>
                <div className="m-1">
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
              </Col>
              <Col
                className="border-start border-end"
                style={{ overflowX: 'auto' }}>
                <div className="m-1">
                  <FontAwesomeIcon
                    className="me-1"
                    icon={faMapPin}
                  />
                  Location: {company.location}
                </div>
              </Col>
              <Col
                className="border-start"
                style={{ overflowX: 'auto' }}>
                <div className="m-1">
                  <FontAwesomeIcon
                    className="me-1"
                    icon={faLink}
                  />
                  <i>
                    <a href={company.website}>{company.website}</a>
                  </i>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Modal.Header>
      <Modal.Body className="overflow-x-hidden">
        {!writingReview && !deletingReview && !editingReview && (
          <ViewReviews
            company={company}
            showModal={showModal}
          />
        )}

        {writingReview && (
          <WriteOrEditReviews
            company={company}
            writingReview={writingReview}
            editingReview={editingReview}
            hideModal={hideModal}
            refreshCompanies={refreshCompanies}
            navigateOut={navigateOut}
          />
        )}

        {editingReview && (
          <WriteOrEditReviews
            company={company}
            writingReview={writingReview}
            editingReview={editingReview}
            hideModal={hideModal}
            refreshCompanies={refreshCompanies}
            navigateOut={navigateOut}
          />
        )}

        {deletingReview && (
          <DeleteReviews
            company={company}
            refreshCompanies={refreshCompanies}
            hideModal={hideModal}
            navigateOut={navigateOut}
          />
        )}
        {error && <span className="text-danger mt-3">{error}</span>}
      </Modal.Body>
      {!writingReview && !editingReview && !deletingReview && (
        <Modal.Footer>
          <Container
            fluid
            className="m-2">
            <Row>
              <Col className="text-end">
                <Button
                  className="mx-1"
                  onClick={() => {
                    setWritingReview(true);
                    setdeletingReview(false);
                    setEditingReview(false);
                    setError('');
                  }}>
                  <FontAwesomeIcon
                    className="me-1"
                    icon={faPlus}
                  />
                  Write a Review
                </Button>
                <Button
                  className="mx-1"
                  onClick={() => {
                    setWritingReview(false);
                    setdeletingReview(false);
                    setEditingReview(true);
                  }}>
                  <FontAwesomeIcon
                    className="me-1"
                    icon={faPen}
                  />
                  Edit your Review
                </Button>
                <Button
                  className="mx-1"
                  onClick={() => {
                    setWritingReview(false);
                    setdeletingReview(true);
                    setEditingReview(false);
                    setError('');
                  }}
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
      )}
    </Modal>
  );
}

export default CompanyReviewModal;
