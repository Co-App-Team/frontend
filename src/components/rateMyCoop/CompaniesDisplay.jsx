import { Container, Row, Col, Card } from 'react-bootstrap';

import styles from '../styling/rateMyCoop/CompaniesDisplay.module.css';

const CompaniesDisplay = ({ companies }) => {
  return (
    <>
      <Container className={styles['companies-container']}>
        {companies ? (
          <>
            {companies.map((company, index) => (
              <Row
                className="p-2"
                fluid>
                <Col key={index}>
                  <Card className="p-0">
                    <Card.Header>{company.companyName}</Card.Header>
                    <Card.Body>
                      <Card.Text>"Insert more info"</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
          </>
        ) : (
          <>
            <p>No companies to show</p>
          </>
        )}
      </Container>
    </>
  );
};

export default CompaniesDisplay;
