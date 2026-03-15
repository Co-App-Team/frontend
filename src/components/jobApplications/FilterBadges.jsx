import { Badge } from 'react-bootstrap';
import { FORMAT_STATUS, STATUS_COLOUR_MAP } from '../../constants/jobApplications';
import PropTypes from 'prop-types';
const FilterBadges = ({ filters, onRemove }) => {
  return (
    <>
      {filters.map((filter) => (
        <Badge
          style={{ display: 'inline', cursor: 'pointer' }}
          className="m-1"
          key={filter}
          bg={STATUS_COLOUR_MAP[filter]}
          onClick={() => onRemove(filter)}
          onMouseEnter={(e) => (e.target.style.filter = 'brightness(0.85)')}
          onMouseLeave={(e) => (e.target.style.filter = 'brightness(1)')}>
          {FORMAT_STATUS[filter]}
        </Badge>
      ))}
    </>
  );
};

FilterBadges.propTypes = {
  filters: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default FilterBadges;
