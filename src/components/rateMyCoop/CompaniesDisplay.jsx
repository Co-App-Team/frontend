import { Container, Row, Col, Card } from 'react-bootstrap';

import styles from '../styling/rateMyCoop/CompaniesDisplay.module.css';

const CompaniesDisplay = ({ companies, topFilteredCompanies, otherFilteredCompanies }) => {
  return (
    <>
      <div className={styles['companies-container']}>
        {topFilteredCompanies.length == companies.length ? (
          <>
            <h3>Companies</h3>

            <Container className="d-flex flex-column p-0 m-0">
              {companies.map((company, index) => (
                <Row className="py-2 px-0">
                  <Col key={index}>
                    <Card
                      className={styles['company-card']}
                      onClick={() => {
                        console.log('bruh');
                      }}>
                      <Card.Body>
                        <Card.Title>{company.companyName}</Card.Title>
                        <Card.Text>
                          "Insert more info dfssfsdjkfhjsdjklfdsssssssssssssssssssssssssssssssssss"
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              ))}
            </Container>
          </>
        ) : (
          <h3>Top Results</h3>
        )}

        {topFilteredCompanies.length != 0 ? (
          <Container className="d-flex flex-column p-0 m-0">
            {topFilteredCompanies.map((company, index) => (
              <Row className="py-2 px-0">
                <Col key={index}>
                  <Card
                    className={styles['company-card']}
                    onClick={() => {
                      console.log('bruh');
                    }}>
                    <Card.Body>
                      <Card.Title>{company.companyName}</Card.Title>
                      <Card.Text>
                        "Insert more info dfssfsdjkfhjsdjklfdsssssssssssssssssssssssssssssssssss"
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
          </Container>
        ) : (
          <p>No companies match</p>
        )}

        {otherFilteredCompanies.length != 0 ? (
          <>
            <h3>Other search results</h3>
            <Container className="d-flex flex-column p-0 m-0">
              {otherFilteredCompanies.map((company, index) => (
                <Row className="py-2 px-0">
                  <Col key={index}>
                    <Card
                      className={styles['company-card']}
                      onClick={() => {
                        console.log('bruh');
                      }}>
                      <Card.Body>
                        <Card.Title>{company.companyName}</Card.Title>
                        <Card.Text>
                          "Insert more info dfssfsdjkfhjsdjklfdsssssssssssssssssssssssssssssssssss"
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              ))}
            </Container>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default CompaniesDisplay;
