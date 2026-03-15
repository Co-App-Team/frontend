import { Badge } from 'react-bootstrap';
import { FORMAT_STATUS, STATUS_COLOUR_MAP } from '../../constants/jobApplications';

const FilterBadges = ({ filters }) => {
  return (
    <>
      {filters.map((filter) => (
        <Badge
          style={{ display: 'inline' }}
          className="m-1"
          key={filter}
          bg={STATUS_COLOUR_MAP[filter]}>
          {FORMAT_STATUS[filter]}
        </Badge>
      ))}
    </>
  );
};

export default FilterBadges;
