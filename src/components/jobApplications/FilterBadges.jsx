import { Badge } from 'react-bootstrap';

const FilterBadges = ({ filters, formatStatus }) => {
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
