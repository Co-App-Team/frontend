import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

import styles from '../styling/rateMyCoop/CompaniesDisplay.module.css';
import CompanyCard from './CompanyCard';

const CompaniesDisplay = ({ companies, topFilteredCompanies, otherFilteredCompanies }) => {
  return (
    <>
      <div className={styles['companies-container']}>
        {topFilteredCompanies.length == companies.length ? (
          <>
            <h3>Companies</h3>

            {companies.length == 0 && <Spinner />}

            <Container className="d-flex flex-column p-0 m-0">
              {companies.map((company, index) => (
                <Row
                  className="py-2 px-0"
                  key={index}>
                  <Col key={index}>
                    <CompanyCard company={company} />
                  </Col>
                </Row>
              ))}
            </Container>
          </>
        ) : (
          <></>
        )}

        {topFilteredCompanies.length != 0 && topFilteredCompanies.length != companies.length ? (
          <>
            <h3>Top Results</h3>
            <Container className="d-flex flex-column p-0 m-0">
              {topFilteredCompanies.map((company, index) => (
                <Row
                  className="py-2 px-0"
                  key={index}>
                  <Col key={index}>
                    <CompanyCard company={company} />
                  </Col>
                </Row>
              ))}
            </Container>
          </>
        ) : (
          <></>
        )}

        {otherFilteredCompanies.length != 0 ? (
          <>
            <h3>Other Results</h3>
            <Container className="d-flex flex-column p-0 m-0">
              {otherFilteredCompanies.map((company, index) => (
                <Row
                  className="py-2 px-0"
                  key={index}>
                  <Col key={index}>
                    <CompanyCard company={company} />
                  </Col>
                </Row>
              ))}
            </Container>
          </>
        ) : (
          <></>
        )}

        {topFilteredCompanies.length == 0 &&
        otherFilteredCompanies.length == 0 &&
        topFilteredCompanies.length != companies.length ? (
          <>
            <h3 className="m-3">No Results</h3>
          </>
        ) : (
          <></>
        )}

        {topFilteredCompanies.length == 0 &&
        otherFilteredCompanies.length != 0 &&
        topFilteredCompanies.length != companies.length ? (
          <>
            <h3>Top Results</h3>
            <p className="fst-italic">No Results</p>
          </>
        ) : (
          <></>
        )}

        {otherFilteredCompanies.length == 0 &&
        topFilteredCompanies.length != 0 &&
        topFilteredCompanies.length != companies.length ? (
          <>
            <h3>Other Results</h3>
            <p className="fst-italic">No Results</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default CompaniesDisplay;
