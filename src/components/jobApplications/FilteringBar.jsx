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

const FilteringBar = ({ handleSearch, handleCalendarSortOrder }) => {
  const [filters, setFilters] = useState([]);

  const [calendarSortAsc, setCalendarSortAsc] = useState(false);
  const toggleCalendarSortAsc = () => {
    setCalendarSortAsc((prev) => !prev);

    // useState's setter is asynchronous updates,
    // so use the value that it would
    const nextSortVal = !calendarSortAsc;
    if (nextSortVal) {
      handleCalendarSortOrder('asc', filters);
    } else {
      handleCalendarSortOrder('desc', filters);
    }
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
                setFilters={setFilters}
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

export default FilteringBar;
