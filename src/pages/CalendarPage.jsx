import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styles from '../components/styling/calendar/Calendar.module.css';
import CalendarGrid from '../components/calendar/CalendarGrid';
import NewInterviewModal from '../components/calendar/CalendarInterviewModal';
import useApi from '../hooks/useApi';
import { getErrorMessage } from '../utils/errorUtils';
import { getApplications, getInterviews } from '../api/jobApplicationsApi';

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showInterviewModal, setShowInterviewModal] = useState(false);

  const [interviews, setInterviews] = useState([]);

  const [error, setError] = useState(false);

  const daysOfTheWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];

  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weeks = [];
    let week = [];

    for (let i = 0; i < firstDay; i++) {
      week.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);

      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      weeks.push(week);
    }

    return weeks;
  };

  const weeks = generateCalendar(currentDate);

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const currMonth = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const { data: applicationsResponse, request: getApplicationsCallback } = useApi(getApplications);
  const { request: getInterviewsCallback } = useApi(getInterviews);

  const applications = applicationsResponse?.applications;

  useEffect(() => {
    const request = async () => {
      try {
        // only allow users to make interviews with applications
        // that are not at the "interviewing" stage yet
        await getApplicationsCallback({
          status: 'NOT_APPLIED,APPLIED,INTERVIEW_SCHEDULED,OFFER_RECEIVED',
        });
      } catch (error) {
        const message = getErrorMessage(error, {});
        setError(message);
      }
    };
    request();
  }, [getApplicationsCallback]);

  async function hideInterviewModal() {
    setShowInterviewModal(false);
  }

  async function refreshInterviewsList() {
    try {
      const data = await getInterviewsCallback();
      setInterviews(data);
    } catch (error) {
      const message = getErrorMessage(error);
      setError(message);
    }
  }

  // done for now to satisfy linting issues
  // will be used to display interviews later on
  useEffect(() => {
    console.log('interviews: ', interviews);
  });

  return (
    <Container className="mt-3">
      <div className="d-flex flex-column justify-content-center">
        {error && <span className="text-danger mt-3">{error}</span>}
        <Row className="text-start align-bottom d-flex align-items-end my-1">
          <Col>
            <Button
              size="sm"
              className="btn btn-primary m-1"
              onClick={prevMonth}>
              <FontAwesomeIcon
                className="d-flex justify-content-center m-1"
                icon={faAngleLeft}
              />
            </Button>

            <Button
              size="sm"
              className="btn btn-primary m-1"
              onClick={currMonth}>
              Today
            </Button>

            <Button
              size="sm"
              className="btn btn-primary m-1"
              onClick={nextMonth}>
              <FontAwesomeIcon
                className="d-flex justify-content-center m-1"
                icon={faAngleRight}
              />
            </Button>
          </Col>

          <Col className="text-center">
            <h2 className="m-0">
              {currentDate.toLocaleString('en-GB', { month: 'long' }) +
                ' ' +
                currentDate.getFullYear()}
            </h2>
          </Col>

          <Col>
            <div className="d-flex justify-content-end">
              <Button
                size="sm"
                className="btn btn-primary m-1"
                onClick={() => setShowInterviewModal(true)}>
                <FontAwesomeIcon
                  className="me-1"
                  icon={faAdd}
                />
                New Job Interview
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <div className={styles['calendar-weekdays']}>
            {daysOfTheWeek.map((day) => (
              <div
                key={day}
                className={'text-center'}>
                {day}
              </div>
            ))}
          </div>
        </Row>

        <Row>
          <CalendarGrid
            weeks={weeks}
            today={today}
            currentDate={currentDate}></CalendarGrid>
        </Row>
      </div>

      <NewInterviewModal
        onShow={showInterviewModal}
        onHide={hideInterviewModal}
        applications={applications}
        onSaved={refreshInterviewsList}
      />
    </Container>
  );
};

export default Calendar;
