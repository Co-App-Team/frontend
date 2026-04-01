import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
const Searchbar = ({ handleSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const onSearchInput = (newInput) => {
    let newValue = newInput;
    if (!newInput) {
      newValue = '';
      handleSearch(newValue);
    }
    setSearchValue(newValue);
  };

  const onSearchSubmit = () => {
    handleSearch(searchValue);
  };

  return (
    <>
      <InputGroup>
        <Form.Control
          placeholder="Search"
          value={searchValue}
          onChange={(e) => onSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearchSubmit();
            }
          }}
        />
        <Button
          variant="outline-primary"
          onClick={onSearchSubmit}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </InputGroup>
    </>
  );
};

export default Searchbar;
