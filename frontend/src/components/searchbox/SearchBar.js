import React from 'react';
import { FormControl, Button } from 'react-bootstrap';
import 'C:\Users\HP\Desktop\Microservices Frontend\frontend\src\components\searchbox\searchbar.css'

const SearchBar = ({ searchText, setSearchText }) => {
  return (
    <div className="search-bar">
      <FormControl
        type="text"
        placeholder="Search for products..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
      />
      <Button variant="primary">Search</Button>
    </div>
  );
};

export default SearchBar;
