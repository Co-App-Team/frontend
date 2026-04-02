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
    handleSearch(newValue);
    setSearchValue(newValue);
  };

  return (
    <InputGroup>
      <InputGroup.Text>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </InputGroup.Text>
      <Form.Control
        placeholder="Search"
        value={searchValue}
        onChange={(e) => onSearchInput(e.target.value)}
      />
    </InputGroup>
  );
};

export default Searchbar;
