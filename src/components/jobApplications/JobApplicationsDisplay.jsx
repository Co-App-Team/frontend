import { Row, Col, Container, Spinner } from 'react-bootstrap';
import JobApplicationCard from './JobApplicationCard';
import CardContainer from '../common/CardContainer';

const JobApplicationsDisplay = ({
  applications,
  topFilteredApplications,
  otherFilteredApplications,
  refreshApplicationsList,
  loading,
  setError,
  companies,
  refreshCompanies,
}) => {
  return (
    <CardContainer>
      {applications.length == 0 && loading ? (
        <Spinner />
      ) : (
        <>
          {topFilteredApplications.length == applications.length && (
            <Container className="d-flex flex-column p-0 m-0">
              {applications.map((application) => (
                <Row
                  className="py-2 px-0"
                  key={application.applicationId}>
                  <Col>
                    <JobApplicationCard
                      companies={companies}
                      setError={setError}
                      jobApplication={application}
                      onUpdated={refreshApplicationsList}
                      refreshCompanies={refreshCompanies}
                    />
                  </Col>
                </Row>
              ))}
            </Container>
          )}

          {/* Case 1: No top filters, no other filters */}
          {((topFilteredApplications.length != applications.length &&
            topFilteredApplications.length == 0 &&
            otherFilteredApplications.length != applications.length &&
            otherFilteredApplications.length == 0) ||
            (topFilteredApplications.length == 0 && !loading)) && (
            <h3 className="text-start">No Results</h3>
          )}

          {/* Case 2: Yes top filters, no other filters */}
          {topFilteredApplications.length !== applications.length &&
            topFilteredApplications.length != 0 &&
            otherFilteredApplications.length !== applications.length &&
            otherFilteredApplications.length == 0 && (
              <Container className="m-0 p-0">
                {topFilteredApplications.map((application) => (
                  <Row
                    className="py-2 px-0"
                    key={application}>
                    <Col key={application}>
                      <JobApplicationCard
                        companies={companies}
                        setError={setError}
                        jobApplication={application}
                        onUpdated={refreshApplicationsList}
                        refreshCompanies={refreshCompanies}
                      />
                    </Col>
                  </Row>
                ))}
              </Container>
            )}

          {/* Case 3: Yes other filters, no top filters */}
          {topFilteredApplications.length !== applications.length &&
            topFilteredApplications.length == 0 &&
            otherFilteredApplications.length !== applications.length &&
            otherFilteredApplications.length != 0 && (
              <>
                <h3 className="text-start">
                  <i>Did you mean?</i>
                </h3>
                <Container className="m-0 p-0">
                  {otherFilteredApplications.map((application) => (
                    <Row
                      className="py-2 px-0"
                      key={application}>
                      <Col key={application}>
                        <JobApplicationCard
                          companies={companies}
                          setError={setError}
                          jobApplication={application}
                          onUpdated={refreshApplicationsList}
                          refreshCompanies={refreshCompanies}
                        />
                      </Col>
                    </Row>
                  ))}
                </Container>
              </>
            )}

          {/* Case 4: Yes to both filters */}
          {topFilteredApplications.length !== applications.length &&
            topFilteredApplications.length != 0 &&
            otherFilteredApplications.length !== applications.length &&
            otherFilteredApplications.length != 0 && (
              <>
                <h3 className="text-start">Top Results:</h3>
                <Container className="m-0 p-0">
                  {topFilteredApplications.map((application) => (
                    <Row
                      className="py-2 px-0"
                      key={application.applicationId}>
                      <Col key={application}>
                        <JobApplicationCard
                          companies={companies}
                          setError={setError}
                          jobApplication={application}
                          onUpdated={refreshApplicationsList}
                          refreshCompanies={refreshCompanies}
                        />
                      </Col>
                    </Row>
                  ))}
                </Container>
                <h3 className="text-start">Other Results:</h3>
                <Container className="m-0 p-0">
                  {otherFilteredApplications.map((application) => (
                    <Row
                      className="py-2 px-0"
                      key={application}>
                      <Col key={application}>
                        <JobApplicationCard
                          companies={companies}
                          setError={setError}
                          jobApplication={application}
                          onUpdated={refreshApplicationsList}
                          refreshCompanies={refreshCompanies}
                        />
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

export default JobApplicationsDisplay;
