import { Button, DropdownDivider, Form } from 'react-bootstrap';
import { FORMAT_STATUS } from '../../constants/jobApplicationColourMappings';
import PropTypes from 'prop-types';

const FilterSelection = ({ filters, setFilters, resetFilters }) => {
  const statusOptions = Object.entries(FORMAT_STATUS).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const toggleItem = (value) => {
    setFilters(value);
  };

  return (
    <>
      <Button
        className="w-100"
        variant="outline-danger"
        onClick={resetFilters}>
        Reset
      </Button>
      <DropdownDivider />
      {statusOptions.map((filter) => (
        <Form.Check
          key={filter.value}
          type="checkbox"
          label={filter.label}
          checked={filters.includes(filter.value)}
          onChange={() => toggleItem(filter.value)}
        />
      ))}
    </>
  );
};

FilterSelection.propTypes = {
  filters: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
};

export default FilterSelection;
