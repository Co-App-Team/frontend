import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapPin, faLink } from '@fortawesome/free-solid-svg-icons';
import { getReviews } from '../../api/rateMyCoopApi';
import { useState, useEffect } from 'react';
function CompanyReviewModal({ company, showModal, hideModal }) {
  const [currReviews, setCurrReviews] = useState();
  useEffect(() => {
    async function loadCompanies() {
      console.log('hi');
      if (company) {
        const data = await getReviews(company.companyId);
        console.log(data);
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
      <Modal.Header className="d-flex flex-column justify-content-start align-items-start">
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
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        {currReviews}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hideModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CompanyReviewModal;
