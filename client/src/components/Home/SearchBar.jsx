import { Typography, Container, Box, InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = () => {
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
              maxWidth: '300px', // Set the maximum width of the search bar
              boxSizing: 'border-box',
              border: 1,
              borderColor: 'gray',
              borderRadius: 4
            }}
          >
            <Search sx={{ ml: 2, mr: 2 }} /> 
            <InputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              sx={{ flex: 1, mr: 2 }}
            />
          </Box>
        </Container>
  );
};

export default SearchBar;
