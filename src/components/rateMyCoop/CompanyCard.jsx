import { Card } from 'react-bootstrap';
import { useState } from 'react';
import CompanyReviewModal from './CompanyReviewModal';
import styles from '../styling/rateMyCoop/CompaniesDisplay.module.css';
import CompanyInformationHeader from './CompanyInformationHeader';

const CompanyCard = ({ company, refreshCompanies }) => {
  const [modalShow, setModalShow] = useState(false);
  function hideModal() {
    setModalShow(false);
  }

  return (
    <>
      <Card
        className={styles['company-card']}
        onClick={() => {
          setModalShow(true);
        }}>
        <Card.Header
          as={'h5'}
          style={{ overflowX: 'auto' }}>
          {company.companyName}
        </Card.Header>
        <Card.Body>
          <CompanyInformationHeader company={company} />
        </Card.Body>
      </Card>
      <CompanyReviewModal
        showModal={modalShow}
        hideModal={hideModal}
        company={company}
        refreshCompanies={refreshCompanies}
      />
    </>
  );
};

export default CompanyCard;
