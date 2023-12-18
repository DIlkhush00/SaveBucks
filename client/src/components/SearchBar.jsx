import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <>
        <TextField
        InputProps={{
            style: { color: 'white' }
        }}
        InputLabelProps={{
            style: { color: 'white' },
        }}
        label="Search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={(event) => {
            if (event.key === 'Enter') {
            handleSearch();
            }
        }}
        />
        <p>{searchTerm}</p>
    </>
  );
};

export default SearchBar;
