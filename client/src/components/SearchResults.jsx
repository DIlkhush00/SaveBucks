import { Box, Container, Typography, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Products from "./Products";
import { CircularProgress } from "@mui/material";

const SearchResults = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('relevance');

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');

    function extractNumericValue(priceString) {
        return Number(priceString.replace(/[^0-9.-]+/g,""));
    }

    function titleCase(str) {
        return str.split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(' ');
    }

    // Sorting function for relevance
    const sortByRelevance = (bookA, bookB) => {
        let includesQueryA = bookA.title.toLowerCase().includes(query.toLowerCase());
        let includesQueryB = bookB.title.toLowerCase().includes(query.toLowerCase());
        
        // Compare based on inclusion of queryString in title
        if (includesQueryA && !includesQueryB) {
            return -1; // bookA comes before bookB
        } else if (!includesQueryA && includesQueryB) {
            return 1; // bookB comes before bookA
        } else {
            return 0; // maintain current order or no significant difference
        }
    }

    // Sorting function for price low to high
    const sortByPriceLowToHigh = (a, b) => {
        let priceA = extractNumericValue(a.price);
        let priceB = extractNumericValue(b.price);
        return priceA - priceB;
    };

    // Sorting function for price high to low
    const sortByPriceHighToLow = (a, b) => {
        let priceA = extractNumericValue(a.price);
        let priceB = extractNumericValue(b.price);
        return priceB - priceA;
    };

    useEffect(() => {
        const cachedData = localStorage.getItem(query);
        if (cachedData) {
            setData(JSON.parse(cachedData));
        }

        const getData = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/api/amazon', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        item: query
                    }),
                });
                let result = await response.json();
                result = result.filter(product => product.valid);

                // Sorting based on selected sortBy option
                switch (sortBy) {
                    case 'relevance':
                        result.sort(sortByRelevance);
                        break;
                    case 'priceLowToHigh':
                        result.sort(sortByPriceLowToHigh);
                        break;
                    case 'priceHighToLow':
                        result.sort(sortByPriceHighToLow);
                        break;
                    default:
                        break;
                }

                // Save data to localStorage for caching
                localStorage.setItem(query, JSON.stringify(result));
                setData(result);
            } catch (error) {
                console.error('Error in fetching the data:', error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            getData();
        } else {
            setData([]);
        }

    }, [query, sortBy]);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Typography variant='h5'>You searched for "<b>{titleCase(query)}</b>"</Typography>
                <Select
                    value={sortBy}
                    onChange={handleSortChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Sort by' }}
                >
                    <MenuItem value="relevance">Relevance</MenuItem>
                    <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                    <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
                </Select>
            </Box>
            
            {data.length > 0 && !loading ?
                <Products productsData={data} />
                : loading ?
                <Box sx={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress sx={{ color: 'gray' }} variant="indeterminate" />
                </Box>
                : <Typography variant='h5'>No books found. Try something else.</Typography>
            }
        </Container>
    )
}

export default SearchResults;
