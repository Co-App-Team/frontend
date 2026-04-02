import { Container, Row, Col, Spinner } from 'react-bootstrap';

import CompanyCard from './CompanyCard';
import CardContainer from '../common/CardContainer';

const CompaniesDisplay = ({
  companies,
  topFilteredCompanies,
  otherFilteredCompanies,
  loading,
  refreshCompanies,
  searchLoading,
}) => {
  return (
    <CardContainer>
      {(companies.length == 0 && loading) || searchLoading ? (
        <Spinner />
      ) : (
        <>
          {topFilteredCompanies.length == companies.length && (
            <>
              <Container className="d-flex flex-column p-0 m-0">
                {companies.map((company) => (
                  <Row
                    className="py-2 px-0"
                    key={company?.companyId}>
                    <Col key={company?.companyId}>
                      <CompanyCard
                        company={company}
                        refreshCompanies={refreshCompanies}
                      />
                    </Col>
                  </Row>
                ))}
              </Container>
            </>
          )}

          {/* Case 1: No top filters, no other filters */}
          {topFilteredCompanies.length != companies.length &&
            topFilteredCompanies.length == 0 &&
            otherFilteredCompanies.length != companies.length &&
            otherFilteredCompanies.length == 0 && <h3>No Results</h3>}

          {/* Case 2: Yes top filters, no other filters */}
          {topFilteredCompanies.length !== companies.length &&
            topFilteredCompanies.length != 0 &&
            otherFilteredCompanies.length !== companies.length &&
            otherFilteredCompanies.length == 0 && (
              <>
                <Container className="m-0 p-0">
                  {topFilteredCompanies.map((company) => (
                    <Row
                      className="py-2 px-0"
                      key={company}>
                      <Col key={company}>
                        <CompanyCard company={company} />
                      </Col>
                    </Row>
                  ))}
                </Container>
              </>
            )}

          {/* Case 3: Yes other filters, no top filters */}
          {topFilteredCompanies.length !== companies.length &&
            topFilteredCompanies.length == 0 &&
            otherFilteredCompanies.length !== companies.length &&
            otherFilteredCompanies.length != 0 && (
              <>
                <h3>
                  <i>Did you mean?</i>
                </h3>
                <Container className="m-0 p-0">
                  {otherFilteredCompanies.map((company) => (
                    <Row
                      className="py-2 px-0"
                      key={company}>
                      <Col key={company}>
                        <CompanyCard company={company} />
                      </Col>
                    </Row>
                  ))}
                </Container>
              </>
            )}

          {/* Case 4: Yes to both filters */}
          {topFilteredCompanies.length !== companies.length &&
            topFilteredCompanies.length != 0 &&
            otherFilteredCompanies.length !== companies.length &&
            otherFilteredCompanies.length != 0 && (
              <>
                <h3>Top Results:</h3>
                <Container className="m-0 p-0">
                  {topFilteredCompanies.map((company) => (
                    <Row
                      className="py-2 px-0"
                      key={company}>
                      <Col key={company}>
                        <CompanyCard company={company} />
                      </Col>
                    </Row>
                  ))}
                </Container>
                <h3>Other Results:</h3>
                <Container className="m-0 p-0">
                  {otherFilteredCompanies.map((company) => (
                    <Row
                      className="py-2 px-0"
                      key={company}>
                      <Col key={company}>
                        <CompanyCard company={company} />
                      </Col>
                    </Row>
                  ))}
                </Container>
              </>
            )}
        </>
      )}
    </CardContainer>
  );
};

export default CompaniesDisplay;
