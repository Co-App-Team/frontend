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
  faX,
  faSave,
  faPencil,
  faIdBadge,
} from '@fortawesome/free-solid-svg-icons';
import {
  getReviews,
  getTerms,
  getYearBounds,
  deleteReview,
  addReview,
  editReview,
} from '../../api/rateMyCoopApi';
import { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Alert,
  InputGroup,
  Form,
  Placeholder,
} from 'react-bootstrap';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import styles from '../styling/rateMyCoop/CompanyReviewModal.module.css';
import useApi from '../../hooks/useApi';
import { getErrorMessage } from '../../utils/errorUtils';

function CompanyReviewModal({ company, showModal, hideModal, refreshCompanies }) {
  const [writingReview, setWritingReview] = useState(false);
  const [editingReview, setEditingReview] = useState(false);
  const [deletingReview, setdeletingReview] = useState(false);

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    jobTitle: '',
    workTermSeason: '',
    workTermYear: '',
    rating: '',
    comment: '',
  });

  function capitalizeFirstLetter(string) {
    if (string.length === 0) {
      return ''; // Empty string
    }
    const toLowerCaseString = string.toLowerCase();
    return toLowerCaseString.charAt(0).toUpperCase() + toLowerCaseString.slice(1);
  }

  const onJobTitleChange = (e) => {
    setFormData({ ...formData, jobTitle: e.target.value });
  };

  const onTermSeasonChange = (e) => {
    setFormData({ ...formData, workTermSeason: e.target.value });
  };

  const onTermYearChange = (e) => {
    setFormData({ ...formData, workTermYear: e.target.value });
  };

  const onRatingChange = (e) => {
    setFormData({ ...formData, rating: e.target.value });
  };

  const onReviewChange = (e) => {
    setFormData({ ...formData, comment: e.target.value });
  };

  const requestType = {
    post: 'POST',
    put: 'PUT',
    new: 'POST',
    newReview: 'POST',
    edit: 'PUT',
    editReview: 'PUT',
  };

  const errorMappings = {
    REVIEW_ALREADY_EXISTS:
      "You've already submitted a review for this company! Please edit your review instead.",
    UNAUTHORIZED: "You've been logged out. Log in and try again.",
    INTERNAL_SERVER_ERROR: 'Something went wrong on our end. Please try again later.',
  };

  const { request: getReviewsCallback, data: reviews } = useApi(getReviews);
  const {
    request: getYearBoundsCallback,
    data: termYearBounds,
    loading: termYearBoundsIsLoading,
  } = useApi(getYearBounds);
  const {
    request: getTermsCallback,
    data: validWorkTerms,
    loading: workTermsIsLoading,
  } = useApi(getTerms);
  const { request: deleteReviewCallback, loading: deleteIsLoading } = useApi(deleteReview);
  const { request: addReviewCallback, loading: addReviewIsLoading } = useApi(addReview);
  const { request: editReviewCallback, loading: editReviewIsLoading } = useApi(editReview);

  const validateJobTitle = (title) => {
    return title.trim() != '';
  };

  const validateTermSeason = (term) => {
    return term.trim() != '';
  };

  const validateTermYear = (term) => {
    return (
      term.trim() != '' &&
      parseInt(term) &&
      parseInt(term) >= termYearBounds.lowerBound &&
      parseInt(term) <= termYearBounds.upperBound
    );
  };

  const validateRating = (rating) => {
    return rating.trim() != '';
  };

  const validateComment = (comment) => {
    return comment.trim() != '';
  };

  const isJobTitleValid = validateJobTitle(formData.jobTitle);
  const isTermSeasonValid = validateTermSeason(formData.workTermSeason);
  const isTermYearValid = validateTermYear(formData.workTermYear);
  const isRatingValid = validateRating(formData.rating);
  const isCommentValid = validateComment(formData.comment);

  const submit = async (type) => {
    if (
      !isTermSeasonValid ||
      !isTermYearValid ||
      !isRatingValid ||
      !isCommentValid ||
      !isJobTitleValid
    ) {
      setShowError(true);
      return;
    }

    setError('');
    setShowError(false);

    const normalizedData = {
      ...formData,
      workTermSeason: capitalizeFirstLetter(formData.workTermSeason),
    };

    try {
      if (type == requestType.post) {
        await addReviewCallback(normalizedData, company.companyId);
      }
      if (type == requestType.put) {
        await editReviewCallback(normalizedData, company.companyId);
      }
    } catch (error) {
      const message = getErrorMessage(error, errorMappings);
      setError(message);
      if (error.status === 404 && type == requestType.post) {
        setError("We couldn't find this company. It may no longer exist. Please try again later.");
      }

      if (error.status === 404 && type == requestType.put) {
        setError(
          "We couldn't find your review for this company. Try writing a new review instead.",
        );
      }

      setShowError(true);
      return;
    }
    await refreshCompanies();
    hideModal();
  };

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

  useEffect(() => {
    async function loadCompanies() {
      if (company) {
        try {
          await getYearBoundsCallback();
          await getTermsCallback();
          await getReviewsCallback(company.companyId);
        } catch (error) {
          const message = getErrorMessage(error, errorMappings);
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
      onShow={() => {
        setWritingReview(false);
        setdeletingReview(false);
        setEditingReview(false);
        setError('');
      }}
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
        {!writingReview && !deletingReview && !editingReview && (
          <>
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
          </>
        )}

        {writingReview && (
          <div className={`d-flex flex-column justify-content-center align-items-center`}>
            <h4 className="align-self-start">Write Your Review</h4>
            <Card className={styles['reviews-container']}>
              <Card.Body>
                <Container>
                  <Row className="my-1">
                    <Col>
                      <div className="d-flex gap-2 align-items-center">
                        <FontAwesomeIcon
                          className="me-1"
                          icon={faIdBadge}
                        />
                        Job Title:
                      </div>
                    </Col>
                  </Row>
                  <Row className="my-1">
                    <Form.Group className="mb-3">
                      <Form.Control
                        as="input"
                        placeholder="Enter your job title"
                        onChange={onJobTitleChange}
                        isInvalid={showError && !isJobTitleValid}
                        disabled={addReviewIsLoading}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your job title.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="my-1">
                    <Col>
                      <div className="d-flex align-items-center gap-2">
                        <FontAwesomeIcon
                          className="me-1"
                          icon={faCalendar}
                        />
                        <p className="m-0">Term:</p>
                      </div>
                    </Col>
                  </Row>
                  <Row className="my-1">
                    {!workTermsIsLoading && !termYearBoundsIsLoading ? (
                      <div className="d-flex gap-2 align-items-start">
                        {/* Season Select */}
                        <InputGroup
                          hasValidation
                          className="flex-grow-2">
                          <Form.Select
                            onChange={onTermSeasonChange}
                            isInvalid={showError && !isTermSeasonValid}
                            disabled={addReviewIsLoading}>
                            <option value="">Select a season</option>
                            {validWorkTerms.map((workTerm) => (
                              <option
                                key={workTerm}
                                value={workTerm}>
                                {capitalizeFirstLetter(workTerm)}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please select a term season.
                          </Form.Control.Feedback>
                        </InputGroup>

                        {/* Year Input */}
                        <InputGroup
                          hasValidation
                          className="flex-grow-0"
                          style={{ width: 'auto' }}>
                          <Form.Control
                            type="number"
                            placeholder="Year"
                            step={1}
                            min={1950}
                            max={2026}
                            onChange={onTermYearChange}
                            isInvalid={showError && !isTermYearValid}
                            disabled={addReviewIsLoading}
                          />
                          <Form.Control.Feedback type="invalid">
                            Select a year between {termYearBounds.lowerBound} and{' '}
                            {termYearBounds.upperBound}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </div>
                    ) : (
                      <>
                        <Placeholder xs={5} /> <Placeholder xs={2} />
                      </>
                    )}
                  </Row>
                  <Row className="my-1">
                    <Col>
                      <div className="d-flex gap-2 align-items-center">
                        <FontAwesomeIcon
                          className="me-1"
                          icon={faStar}
                        />
                        Rating:
                      </div>
                    </Col>
                  </Row>
                  <Row className="my-1">
                    {/* Rating Select */}
                    <InputGroup
                      hasValidation
                      style={{ width: 'auto' }}>
                      <Form.Select
                        onChange={onRatingChange}
                        isInvalid={showError && !isRatingValid}
                        disabled={addReviewIsLoading}>
                        <option value="">Select rating</option>
                        {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                          <option
                            key={num}
                            value={num}>
                            {num}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please select a rating.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Row>
                  <hr></hr>
                  <Row className="my-1">
                    <Col>
                      <div className="d-flex gap-2 align-items-center">
                        <FontAwesomeIcon
                          className="me-1"
                          icon={faPencil}
                        />
                        Comments:
                      </div>
                    </Col>
                  </Row>
                  <Row className="my-1">
                    <Form.Group className="mb-3">
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Write your review here..."
                        onChange={onReviewChange}
                        isInvalid={showError && !isCommentValid}
                        disabled={addReviewIsLoading}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your review.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </div>
        )}

        {editingReview && (
          <div className={`d-flex flex-column justify-content-center align-items-center`}>
            <h4 className="align-self-start">Edit Your Review</h4>
            <Card className={styles['reviews-container']}>
              <Card.Body>
                <Container>
                  <Row className="my-1">
                    <Col>
                      <div className="d-flex gap-2 align-items-center">
                        <FontAwesomeIcon
                          className="me-1"
                          icon={faIdBadge}
                        />
                        Job Title:
                      </div>
                    </Col>
                  </Row>
                  <Row className="my-1">
                    <Form.Group className="mb-3">
                      <Form.Control
                        as="input"
                        placeholder="Enter your job title"
                        onChange={onJobTitleChange}
                        isInvalid={showError && !isJobTitleValid}
                        disabled={editReviewIsLoading}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your job title.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="my-1">
                    <Col>
                      <div className="d-flex align-items-center gap-2">
                        <FontAwesomeIcon
                          className="me-1"
                          icon={faCalendar}
                        />
                        <p className="m-0">Term:</p>
                      </div>
                    </Col>
                  </Row>
                  <Row className="my-1">
                    {!workTermsIsLoading && !termYearBoundsIsLoading ? (
                      <div className="d-flex gap-2 align-items-start">
                        {/* Season Select */}
                        <InputGroup
                          hasValidation
                          className="flex-grow-2">
                          <Form.Select
                            onChange={onTermSeasonChange}
                            isInvalid={showError && !isTermSeasonValid}
                            disabled={editReviewIsLoading}>
                            <option value="">Select a season</option>
                            {validWorkTerms.map((workTerm) => (
                              <option
                                key={workTerm}
                                value={workTerm}>
                                {workTerm}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please select a term season.
                          </Form.Control.Feedback>
                        </InputGroup>

                        {/* Year Input */}
                        <InputGroup
                          hasValidation
                          className="flex-grow-0"
                          style={{ width: 'auto' }}>
                          <Form.Control
                            type="number"
                            placeholder="Year"
                            step={1}
                            min={1950}
                            max={2026}
                            onChange={onTermYearChange}
                            isInvalid={showError && !isTermYearValid}
                            disabled={editReviewIsLoading}
                          />
                          <Form.Control.Feedback type="invalid">
                            Select a year between {termYearBounds.lowerBound} and{' '}
                            {termYearBounds.upperBound}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </div>
                    ) : (
                      <>
                        <Placeholder xs={5} /> <Placeholder xs={2} />
                      </>
                    )}
                  </Row>
                  <Row className="my-1">
                    <Col>
                      <div className="d-flex gap-2 align-items-center">
                        <FontAwesomeIcon
                          className="me-1"
                          icon={faStar}
                        />
                        Rating:
                      </div>
                    </Col>
                  </Row>
                  <Row className="my-1">
                    {/* Rating Select */}
                    <InputGroup
                      hasValidation
                      style={{ width: 'auto' }}>
                      <Form.Select
                        onChange={onRatingChange}
                        isInvalid={showError && !isRatingValid}
                        disabled={editReviewIsLoading}>
                        <option value="">Select rating</option>
                        {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                          <option
                            key={num}
                            value={num}>
                            {num}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please select a rating.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Row>
                  <hr></hr>
                  <Row className="my-1">
                    <Col>
                      <div className="d-flex gap-2 align-items-center">
                        <FontAwesomeIcon
                          className="me-1"
                          icon={faPencil}
                        />
                        Comments:
                      </div>
                    </Col>
                  </Row>
                  <Row className="my-1">
                    <Form.Group className="mb-3">
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Write your review here..."
                        onChange={onReviewChange}
                        isInvalid={showError && !isCommentValid}
                        disabled={editReviewIsLoading}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter your review.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </div>
        )}

        {deletingReview && (
          <div className={`d-flex flex-column justify-content-center align-items-center`}>
            <Alert
              variant="danger"
              className="w-100">
              <Alert.Heading>Are you sure?</Alert.Heading>
              <p>This action is not reversable.</p>
            </Alert>
          </div>
        )}

        {!writingReview && !editingReview && !deletingReview && (
          <Container
            fluid
            className="m-2">
            <Row>
              <Col className="text-center">
                <Button
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
              </Col>
              <Col className="text-center">
                <Button
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
              </Col>
              <Col className="text-center">
                <Button
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
        )}

        {(writingReview || editingReview) && (
          <Container
            fluid
            className="m-2">
            <Row>
              <Col className="text-end">
                <Button
                  className="mx-1"
                  variant="outline-danger"
                  onClick={() => {
                    setWritingReview(false);
                    setdeletingReview(false);
                    setEditingReview(false);
                    setError('');
                    setShowError(false);
                  }}
                  disabled={addReviewIsLoading || editReviewIsLoading}>
                  <FontAwesomeIcon
                    className="me-1"
                    icon={faX}
                  />
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (writingReview) {
                      submit(requestType.newReview);
                    } else if (editingReview) {
                      submit(requestType.editReview);
                    }
                  }}
                  className="mx-1"
                  disabled={addReviewIsLoading || editReviewIsLoading}>
                  {addReviewIsLoading || editReviewIsLoading ? (
                    <Spinner
                      className="me-1"
                      size="sm"></Spinner>
                  ) : (
                    <FontAwesomeIcon
                      className="me-1"
                      icon={faSave}
                    />
                  )}
                  Submit
                </Button>
              </Col>
            </Row>
          </Container>
        )}

        {deletingReview && (
          <Container
            fluid
            className="m-2">
            <Row>
              <Col className="text-end">
                <Button
                  className="mx-1"
                  variant="outline-primary"
                  onClick={() => {
                    setWritingReview(false);
                    setdeletingReview(false);
                    setEditingReview(false);
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
        )}
        {error && <span className="text-danger mt-3">{error}</span>}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hideModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CompanyReviewModal;
