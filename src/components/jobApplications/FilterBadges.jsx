import { Badge } from 'react-bootstrap';

const FilterBadges = ({ filters }) => {
  const formatStatus = {
    NOT_APPLIED: 'Not Applied',
    APPLIED: 'Applied',
    INTERVIEW_SCHEDULED: 'Interview Scheduled',
    INTERVIEWING: 'Interviewing',
    OFFER_RECEIVED: 'Offer Received',
    REJECTED: 'Rejected',
    WITHDRAWN: 'Withdrawn',
    ACCEPTED: 'Accepted',
  };

  const statusColorMap = {
    NOT_APPLIED: 'info',
    APPLIED: 'secondary',
    INTERVIEW_SCHEDULED: 'warning',
    INTERVIEWING: 'warning',
    OFFER_RECEIVED: 'success',
    REJECTED: 'danger',
    WITHDRAWN: 'danger',
    ACCEPTED: 'success',
  };

  return (
    <>
      {filters.map((filter) => (
        <Badge
          className="m-1"
          key={filter}
          bg={statusColorMap[filter]}>
          {formatStatus[filter]}
        </Badge>
      ))}
    </>
  );
};

export default FilterBadges;
