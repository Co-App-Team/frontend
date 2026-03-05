import { useState } from 'react';
import { Alert, Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { getErrorMessage } from '../../../utils/errorUtils';
import { deleteReview } from '../../../api/rateMyCoopApi';
import useApi from '../../../hooks/useApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faX } from '@fortawesome/free-solid-svg-icons';

function DeleteReviews({ company, hideModal, refreshCompanies, navigateOut }) {
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(false);

  const errorMappings = {
    REVIEW_ALREADY_EXISTS:
      "You've already submitted a review for this company! Please edit your review instead.",
  };

  const { request: deleteReviewCallback, loading: deleteIsLoading } = useApi(deleteReview);

  const handledeletingReview = async () => {
    setError('');
    setShowError(false);
    try {
      await deleteReviewCallback(company.companyId);
    } catch (error) {
      const message = getErrorMessage(error, errorMappings);
      setError(message);
      if (error.status === 404) {
        setError('You do not have a review for this company!');
      }
      setShowError(true);

      return;
    }
    await refreshCompanies();
    hideModal();
  };

  return (
    <>
      <div className={`d-flex flex-column justify-content-center align-items-center`}>
        <Alert
          variant="danger"
          className="w-100">
          <Alert.Heading>Are you sure?</Alert.Heading>
          <p>This action is not reversable.</p>
          <Container
            fluid
            className="m-2">
            <Row>
              <Col className="text-end">
                <Button
                  className="mx-1"
                  variant="outline-primary"
                  onClick={() => {
                    navigateOut();
                    setError('');
                  }}
                  disabled={deleteIsLoading}>
                  <FontAwesomeIcon
                    className="me-1"
                    icon={faX}
                  />
                  Cancel
                </Button>
                <Button
                  onClick={handledeletingReview}
                  className="mx-1"
                  variant="danger"
                  disabled={deleteIsLoading}>
                  {deleteIsLoading ? (
                    <Spinner
                      className="me-1"
                      size="sm"></Spinner>
                  ) : (
                    <FontAwesomeIcon
                      className="me-1"
                      icon={faTrash}
                    />
                  )}
                  Delete
                </Button>
              </Col>
            </Row>
          </Container>
        </Alert>
      </div>
      {error && showError && <span className="text-danger mt-3">{error}</span>}
    </>
  );
}

export default DeleteReviews;
