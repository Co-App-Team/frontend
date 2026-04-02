import { useState } from 'react';
import { Col, Button, Dropdown, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from '../styling/jobApplications/JobApplications.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faCalendar,
  faFilter,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import Searchbar from '../common/Searchbar';
import FilterBadges from './FilterBadges';
import FilterSelection from './FilterSelection';

const FilteringBar = ({
  handleSearch,
  handleCalendarSortOrder,
  handleFilters,
  filters,
  setFilters,
  setUseAppliedOnSort,
}) => {
  const [calendarSortAsc, setCalendarSortAsc] = useState(false);
  const [sortByDateAppliedActive, setSortByDateAppliedActive] = useState(false);

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

  const toggleSortByDateApplied = () => {
    const newUseSortByDateApplied = !sortByDateAppliedActive;
    setSortByDateAppliedActive(newUseSortByDateApplied);
    setUseAppliedOnSort(newUseSortByDateApplied);

    // useState's setter is asynchronous updates,
    // so use the value that it would be
    const nextVal = !sortByDateAppliedActive;
    if (!nextVal) {
      handleFilters(calendarSortAsc ? 'asc' : 'desc', normalizeFilters(filters));
    } else {
      handleCalendarSortOrder(calendarSortAsc ? 'asc' : 'desc', normalizeFilters(filters));
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
          {filters.length != 0 ? (
            <FilterBadges
              filters={filters}
              onRemove={handleFilterChange}
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

          <ButtonGroup>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Sort by date applied</Tooltip>}>
              <Button
                className="ms-1 mt-1 p-1"
                onClick={toggleSortByDateApplied}
                variant={sortByDateAppliedActive ? 'primary' : 'outline-primary'}>
                <FontAwesomeIcon icon={faCalendar} />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip>{calendarSortAsc ? 'Ascending order' : 'Descending order'}</Tooltip>
              }>
              <Button
                className="mt-1 p-1"
                onClick={toggleCalendarSortAsc}
                variant={sortByDateAppliedActive ? 'primary' : 'outline-primary'}
                disabled={!sortByDateAppliedActive}>
                <FontAwesomeIcon icon={calendarSortAsc ? faArrowUp : faArrowDown} />
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
        </div>
      </Col>
    </>
  );
};

export default FilteringBar;
