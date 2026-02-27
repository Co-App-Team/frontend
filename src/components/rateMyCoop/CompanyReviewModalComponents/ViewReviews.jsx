import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { getReviews } from '../../../api/rateMyCoopApi';
import { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Spinner, InputGroup, Form, Placeholder } from 'react-bootstrap';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import styles from '../../styling/rateMyCoop/CompanyReviewModal.module.css';
import useApi from '../../../hooks/useApi';
import { getErrorMessage } from '../../../utils/errorUtils';

function ViewReviews({ company, showModal }) {
  const [reviewsPerPage, setReviewsPerPage] = useState(5);

  const {
    request: getReviewsCallback,
    data: reviews,
    loading: getReviewsLoading,
  } = useApi(getReviews);
  useEffect(() => {
    async function loadCompanies() {
      if (company) {
        try {
          await getReviewsCallback(company.companyId);
        } catch (error) {
          const message = getErrorMessage(error);
          console.log(message);
        }
      }
    }
    loadCompanies();
  }, [company, showModal, getReviewsCallback]);
  return (
    <>
      <h4>Reviews</h4>
      {reviews ? (
        <>
          <div className="d-flex justify-content-end">
            <InputGroup className="w-auto d-inline-flex mx-1">
              <InputGroup.Text>Reviews per page:</InputGroup.Text>

              <Form.Select
                value={reviewsPerPage}
                onChange={(e) => {
                  setReviewsPerPage(Number(e.target.value));
                  getReviewsCallback(company.companyId, 0, e.target.value);
                }}
                disabled={getReviewsLoading}
                className="w-auto">
                {[1, 5, 10, 50].map((num) => (
                  <option
                    key={num}
                    value={num}>
                    {num}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
            <Button
              className="mx-1"
              onClick={() => {
                const currPage = reviews.reviewsPagination.currentPage;
                getReviewsCallback(company.companyId, currPage - 1, reviewsPerPage);
              }}
              disabled={!reviews.reviewsPagination.hasPrevious}>
              <FontAwesomeIcon icon={faCaretLeft} />
            </Button>
            <Button
              className="mx-1"
              onClick={() => {
                const currPage = reviews.reviewsPagination.currentPage;
                getReviewsCallback(company.companyId, currPage + 1, reviewsPerPage);
              }}
              disabled={!reviews.reviewsPagination.hasNext}>
              <FontAwesomeIcon icon={faCaretRight} />
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-end">
            <Placeholder
              className="mx-1"
              xs={3}></Placeholder>
          </div>
        </>
      )}
      <div className={styles['reviews-container']}>
        {reviews && !getReviewsLoading ? (
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
  );
}

export default ViewReviews;
