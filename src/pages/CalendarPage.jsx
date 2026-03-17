import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import styles from '../components/styling/calendar/Calendar.module.css';
import CalendarGrid from '../components/calendar/CalendarGrid';

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

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

  return (
    <Container className="mt-3">
      <div className="d-flex flex-column justify-content-center">
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
          <Col></Col>
        </Row>

        <Row>
          <div className={styles['calendar-weekdays']}>
            {daysOfTheWeek.map((day) => (
              <div
                key={day}
                className={styles['weekday-cell']}>
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
    </Container>
  );
};

export default Calendar;
