import { Button, DropdownDivider, Form } from 'react-bootstrap';

const FilterSelection = ({ filters, setFilters }) => {
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

  const statusOptions = Object.entries(formatStatus).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const resetFilters = () => {
    setFilters([]);
  };

  const toggleItem = (value) => {
    setFilters((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <>
      <Button
        className="w-100"
        variant="outline-danger"
        onClick={resetFilters}>
        Reset
      </Button>
      <DropdownDivider/>
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
