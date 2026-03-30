import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ViewReviews from './CompanyReviewModalComponents/ViewReviews';
import DeleteReviews from './CompanyReviewModalComponents/DeleteReview';
import WriteOrEditReviews from './CompanyReviewModalComponents/WriteOrEditReview';
import CompanyInformationHeader from './CompanyInformationHeader';

function CompanyReviewModal({ company, showModal, hideModal, refreshCompanies }) {
  const [writingReview, setWritingReview] = useState(false);
  const [editingReview, setEditingReview] = useState(false);
  const [deletingReview, setdeletingReview] = useState(false);
  const [error, setError] = useState(false);

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
        <Container className="mx-0">
          <Row>
            <h2
              style={{
                overflowX: 'auto',
                overflowY: 'hidden',
                height: '3.5rem',
                maxWidth: '80vw',
              }}>
              {company.companyName}
            </h2>
          </Row>
          <Row>
            <CompanyInformationHeader company={company} />
          </Row>
        </Container>
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
