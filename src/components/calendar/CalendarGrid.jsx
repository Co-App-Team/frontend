import styles from '../styling/calendar/Calendar.module.css';
import CalendarEvents from './CalendarEvents';

function CalendarGrid({ weeks, today, currentDate, interviews }) {
  const getInterviewsForDay = (day) => {
    if (!day) return [];

    const filteredInterviews =
      interviews?.filter((interview) => {
        const interviewDate = new Date(interview.interviewDateTime);
        return (
          interviewDate.getDate() === day &&
          interviewDate.getMonth() === currentDate.getMonth() &&
          interviewDate.getFullYear() === currentDate.getFullYear()
        );
      }) || [];

    // sort interviews by time
    return [...filteredInterviews].sort((a, b) => {
      return new Date(a.interviewDateTime) - new Date(b.interviewDateTime);
    });
  };

  const isToday = (date) => {
    return (
      date &&
      date === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <>
      <div className={styles['calendar-grid']}>
        {weeks.map((week, weekIndex) => (
          <div
            key={`week-${currentDate.getFullYear()}-${currentDate.getMonth()}-${weekIndex}`}
            className={styles['calendar-row']}>
            {week.map((day, dayIndex) => (
              <div
                key={`day-${weekIndex}-${dayIndex}`}
                className={styles['calendar-cell']}>
                {day && (
                  <>
                    <div
                      className={isToday(day) ? styles['calendar-today'] : styles['calendar-date']}>
                      {day}
                    </div>
                    <CalendarEvents
                      day={day}
                      interviews={getInterviewsForDay(day)}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default CalendarGrid;
