import styles from '../styling/calendar/Calendar.module.css';

function CalendarGrid({ weeks, today, currentDate }) {
  const isToday = (date) => {
    return (
      date &&
      date === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className={styles['calendar-grid']}>
      {weeks.map((week) => (
        <div
          key={week}
          className={styles['calendar-row']}>
          {week.map((day) => (
            <div
              key={day}
              className={styles['calendar-cell']}>
              {day && (
                <div className={isToday(day) ? styles['calendar-today'] : styles['calendar-date']}>
                  {day}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CalendarGrid;
