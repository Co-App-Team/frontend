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
      {weeks.map((week, weekIndex) => (
        <div
          key={`week-${currentDate.getFullYear()}-${currentDate.getMonth()}-${weekIndex}`}
          className={styles['calendar-row']}>
          {week.map((day, dayIndex) => (
            <div
              key={`day-${weekIndex}-${dayIndex}`}
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
