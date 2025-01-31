import { Container, Box, InputBase } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ query }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigateTo = useNavigate()

  const handleSearch = () => {
    if(searchQuery.length > 0)
      navigateTo(`/search?q=${searchQuery.replace(/ /g, '+').toLowerCase()}`)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if(query !== '') {
    setSearchQuery(query);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Search Bar */}
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '400px',
          boxSizing: 'border-box',
          border: 1,
          borderColor: 'gray',
          borderRadius: 4
        }}
      >
        <Search sx={{ ml: 2, mr: 2 }} onClick={handleSearch} />
        <InputBase
          placeholder="Search any item..."
          inputProps={{ 'aria-label': 'search' }}
          sx={{ flex: 1, mr: 2 }}
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
        />  
      </Box>
    </Container>
  );
};
SearchBar.propTypes = {
  query: PropTypes.string
};

export default SearchBar;
