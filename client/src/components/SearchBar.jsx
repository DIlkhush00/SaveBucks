import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Products from './Products';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(null);
  const category = 'stripbooks';

  useEffect(() => {
    // Load cached data on component mount
    const cachedData = localStorage.getItem(searchTerm);
    if (cachedData) {
      setData(JSON.parse(cachedData));
    }
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      const cachedData = localStorage.getItem(searchTerm);
      if (cachedData) {
        // Use cached data if available
        setData(JSON.parse(cachedData));
      } else {
        const response = await fetch('http://localhost:3000/api/amazon', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            item: searchTerm,
            category: category,
          }),
        });
        const result = await response.json();
        console.log(result);

        // Save data to localStorage for caching
        localStorage.setItem(searchTerm, JSON.stringify(result));

        setData(result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <TextField
        InputProps={{
          style: { color: 'white' },
        }}
        InputLabelProps={{
          style: { color: 'white' },
        }}
        label="Search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
      <br />
      <br />
      <Products productsData={data} />
    </>
  );
}

export default SearchBar;
