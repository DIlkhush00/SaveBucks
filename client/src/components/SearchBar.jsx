import { Typography, Container, Box, InputBase } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigateTo = useNavigate()

  const handleSearch = () => {
    navigateTo(`/search?q=${searchQuery.replace(/ /g, '+').toLowerCase()}`)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
      <Typography variant="h4" gutterBottom>
        Find any book you want!
      </Typography>

      {/* Search Bar */}
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '300px',
          boxSizing: 'border-box',
          border: 1,
          borderColor: 'gray',
          borderRadius: 4
        }}
      >
        <Search sx={{ ml: 2, mr: 2 }} onClick={handleSearch} />
        <InputBase
          placeholder="Search..."
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

export default SearchBar;
