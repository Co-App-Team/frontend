import { Button, DropdownDivider, Form } from 'react-bootstrap';
import { FORMAT_STATUS } from '../../constants/jobApplications';

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

export default FilterSelection;
