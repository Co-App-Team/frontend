import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPencil, faIdBadge, faSave, faX } from '@fortawesome/free-solid-svg-icons';
import { getTerms, getYearBounds, addReview, editReview } from '../../../api/rateMyCoopApi';
import { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Container,
  Row,
  InputGroup,
  Form,
  Placeholder,
  Button,
  Spinner,
} from 'react-bootstrap';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import styles from '../../styling/rateMyCoop/CompanyReviewModal.module.css';
import useApi from '../../../hooks/useApi';
import { getErrorMessage } from '../../../utils/errorUtils';

function WriteOrEditReviews({
  company,
  showModal,
  hideModal,
  refreshCompanies,
  writingReview,
  editingReview,
  navigateOut,
}) {
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

  const errorMappings = {
    REVIEW_ALREADY_EXISTS:
      "You've already submitted a review for this company! Please edit your review instead.",
    UNAUTHORIZED: "You've been logged out. Log in and try again.",
    INTERNAL_SERVER_ERROR: 'Something went wrong on our end. Please try again later.',
  };
  const { request: getYearBoundsCallback, data: termYearBounds } = useApi(getYearBounds);
  const { request: getTermsCallback, data: validWorkTerms } = useApi(getTerms);
  const { request: addReviewCallback, loading: addReviewIsLoading } = useApi(addReview);
  const { request: editReviewCallback, loading: editReviewIsLoading } = useApi(editReview);

  useEffect(() => {
    async function getCoopTermDetails() {
      if (company) {
        try {
          await getYearBoundsCallback();
          await getTermsCallback();
        } catch (error) {
          const message = getErrorMessage(error);
          console.log(message);
        }
      }
    }
    getCoopTermDetails();
  }, [company, showModal, getYearBoundsCallback, getTermsCallback]);

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

  const submit = async (callback) => {
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
      await callback(normalizedData, company.companyId);
    } catch (error) {
      const message = getErrorMessage(error, errorMappings);
      setError(message);
      if (error.status === 404 && callback == addReviewCallback) {
        setError("We couldn't find this company. It may no longer exist. Please try again later.");
      }

      if (error.status === 404 && callback == editReviewCallback) {
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

  return (
    <>
      <div className={`d-flex flex-column justify-content-center align-items-center`}>
        {writingReview && <h4 className="align-self-start">Write Your Review</h4>}
        {editingReview && <h4 className="align-self-start">Edit Your Review</h4>}
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
                {validWorkTerms != null && termYearBounds != null ? (
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

      {error && <span className="text-danger mt-3">{error}</span>}

      <Container
        fluid
        className="m-2">
        <Row>
          <Col className="text-end">
            <Button
              className="mx-1"
              variant="outline-danger"
              onClick={() => {
                navigateOut();
                setError('');
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
                  submit(addReviewCallback);
                } else if (editingReview) {
                  submit(editReviewCallback);
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
    </>
  );
}

export default WriteOrEditReviews;
