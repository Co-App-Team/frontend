import { useEffect, useState, useRef } from 'react';
import { Button, Spinner, Overlay, Popover } from 'react-bootstrap';
import styles from '../styling/calendar/Calendar.module.css';
import useApi from '../../hooks/useApi';
import { getCompany } from '../../api/rateMyCoopApi';
import InterviewDetailsModal from './InterviewDetailsModal';

function CalendarEvents({ day, interviews }) {
  const [selectedInterview, setSelectedInterview] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [companyNames, setCompanyNames] = useState({});

  const visible = interviews.slice(0, 3);
  const hiddenCount = interviews.length - 3;

  const moreButtonRef = useRef(null);

  const { request: getCompanyCallback } = useApi(getCompany);

  useEffect(() => {
    const fetchCompanies = async () => {
      const uniqueCompanyIds = [...new Set(interviews.map((i) => i.companyId))];

      try {
        const results = await Promise.all(uniqueCompanyIds.map((id) => getCompanyCallback(id)));
        const map = {};
        results.forEach((result, index) => {
          const id = uniqueCompanyIds[index];
          map[id] = result?.company?.companyName;
        });

        setCompanyNames(map);
      } catch (error) {
        console.log(error);
      }
    };

    if (interviews.length > 0) {
      fetchCompanies();
    }
  }, [interviews, getCompanyCallback]);

  const handleClickedEvent = (event) => {
    setSelectedInterview(event);
    setCompanyName(companyNames[event.companyId]);
    setShowDetailsModal(true);
  };

  const hideDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <div className={styles['calendar-event']}>
        {visible.map((event) => {
          const companyName = companyNames[event.companyId];
          const time = formatTime(event.interviewDateTime);
          return (
            <Button
              key={event.applicationId}
              className={styles['event']}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleClickedEvent(event)}>
              {companyName ? (
                `${time} - ${event.jobTitle} @ ${companyName}`
              ) : (
                <div className="d-flex justify-content-center ">
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                  />
                </div>
              )}
            </Button>
          );
        })}
        {hiddenCount > 0 && (
          <Button
            ref={moreButtonRef}
            className={styles['more']}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setShowAll(true)}>
            +{hiddenCount} more
          </Button>
        )}
      </div>

      <Overlay
        target={() => moreButtonRef.current}
        show={showAll}
        placement="bottom"
        flip
        containerPadding={10}
        rootClose
        onHide={() => setShowAll(false)}>
        <Popover id="popover-events">
          <Popover.Header
            as="h6"
            className="text-center">
            {day}
          </Popover.Header>
          <Popover.Body className={styles['popover-body']}>
            {interviews.map((event) => {
              const companyName = companyNames[event.companyId];
              const time = formatTime(event.interviewDateTime);
              return (
                <Button
                  key={event.applicationId}
                  className={styles['event']}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    handleClickedEvent(event);
                    setTimeout(() => setShowAll(false), 150);
                  }}
                  style={{ marginBottom: '0.5vh' }}>
                  {time + ' - ' + event.jobTitle + ' @ ' + companyName}{' '}
                </Button>
              );
            })}
          </Popover.Body>
        </Popover>
      </Overlay>

      <InterviewDetailsModal
        onShow={showDetailsModal}
        onHide={hideDetailsModal}
        data={selectedInterview}
        companyName={companyName}
      />
    </>
  );
}

export default CalendarEvents;
