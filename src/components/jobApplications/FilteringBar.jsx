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

const FilteringBar = ({ formatStatus }) => {
  const [filters, setFilters] = useState([]);

  const [calendarSortAsc, setCalendarSortAsc] = useState(false);
  const toggleCalendarSortAsc = () => {
    setCalendarSortAsc((prev) => !prev);
  };
  const updateSearch = (value) => {
    console.log(value);
    // if (!data?.companies) return;

    // const companies = data.companies;

    // const topFilter = companies.filter((c) =>
    //   c.companyName.toLowerCase().startsWith(value.toLowerCase()),
    // );
    // const otherFilters = companies.filter(
    //   (c) => c.companyName.toLowerCase().includes(value.toLowerCase()) && !topFilter.includes(c),
    // );

    // setOtherFilteredCompanies(otherFilters);
    // if (value === '') {
    //   setOtherFilteredCompanies([]);
    // }
    // setTopFilteredCompanies(topFilter);
  };

  return (
    <>
      <Col className="d-flex align-items-center justify-content-start ps-0">
        <Searchbar
          handleSearch={updateSearch}
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
          {filters.length != 0 ? (
            <FilterBadges
              formatStatus={formatStatus}
              filters={filters}
            />
          ) : (
            <i>No Active Filters</i>
          )}
        </div>
      </Col>
      <Col
        md="auto"
        sm="auto"
        lg="auto"
        className="pe-0 justify-content-end">
        <div className="d-flex justify-content-end">
          <Dropdown
            align="end"
            className="m-1">
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
                formatStatus={formatStatus}
              />
            </Dropdown.Menu>
          </Dropdown>
          <Button
            className="m-1"
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
