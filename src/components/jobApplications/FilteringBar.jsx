import { useState } from 'react';
import { Col, Button, Dropdown } from 'react-bootstrap';
import styles from '../styling/jobApplications/JobApplications.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faCalendar,
  faFilter,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import Searchbar from './Searchbar';
import FilterBadges from './FilterBadges';
import FilterSelection from './FilterSelection';
import PropTypes from 'prop-types';

const FilteringBar = ({ handleSearch, handleCalendarSortOrder, handleFilters }) => {
  const [filters, setFilters] = useState([]);

  const [calendarSortAsc, setCalendarSortAsc] = useState(false);

  const normalizeFilters = (filtersToNormalize) => {
    // Result: String that is -> 'filter1','filter2',...
    return filtersToNormalize.join(',');
  };

  const toggleCalendarSortAsc = () => {
    setCalendarSortAsc((prev) => !prev);

    // useState's setter is asynchronous updates,
    // so use the value that it would be
    const nextSortVal = !calendarSortAsc;
    if (nextSortVal) {
      handleCalendarSortOrder('asc', normalizeFilters(filters));
    } else {
      handleCalendarSortOrder('desc', normalizeFilters(filters));
    }
  };

  const handleFilterChange = (value) => {
    const newFilters = filters.includes(value)
      ? filters.filter((v) => v !== value)
      : [...filters, value];

    setFilters(newFilters);

    // Result: String that is -> 'filter1','filter2',...
    let normalizedFilters = normalizeFilters(newFilters);
    if (normalizedFilters == '') {
      normalizedFilters = null;
    }

    if (calendarSortAsc) {
      handleFilters('asc', normalizedFilters);
    } else {
      handleFilters('desc', normalizedFilters);
    }
  };

  const resetFilters = () => {
    setFilters([]);
    handleFilters();
  };

  return (
    <>
      <Col className="d-flex align-items-center justify-content-start">
        <Searchbar
          handleSearch={handleSearch}
          className="m-2"
        />
      </Col>
      <Col className="overflow-x-auto d-flex align-items-center justify-content-start">
        <FontAwesomeIcon
          className="me-1"
          icon={faFilter}
        />
        Filters:
        <div className="mx-1">
          {filters.length != 0 ? <FilterBadges filters={filters} /> : <i>No Active Filters</i>}
        </div>
      </Col>
      <Col
        md="auto"
        sm="auto"
        lg="auto"
        className="justify-content-end">
        <div className="d-flex justify-content-end">
          <Dropdown
            align="end"
            className="me-1 mt-1">
            <Dropdown.Toggle
              as={Button}
              id="dropdown-basic"
              className={styles['no-caret']}>
              <FontAwesomeIcon
                className="me-1"
                icon={faPen}
              />
              Status Filters
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ padding: '0.5rem', width: 'max-content' }}>
              <FilterSelection
                filters={filters}
                setFilters={handleFilterChange}
                resetFilters={resetFilters}
              />
            </Dropdown.Menu>
          </Dropdown>

          <Button
            className="ms-1 mt-1"
            onClick={toggleCalendarSortAsc}>
            <FontAwesomeIcon
              className="me-1"
              icon={faCalendar}
            />
            <FontAwesomeIcon
              className="me-1"
              icon={calendarSortAsc ? faArrowUp : faArrowDown}
            />
            Date Sort
          </Button>
        </div>
      </Col>
    </>
  );
};

FilteringBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleCalendarSortOrder: PropTypes.func.isRequired,
  handleFilters: PropTypes.func.isRequired,
};

export default FilteringBar;
