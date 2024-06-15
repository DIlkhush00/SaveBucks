import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Products from "./Products";
import { CircularProgress } from "@mui/material";

const SearchResults = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    console.log("this is your query", query);

    // Function to extract numeric value from a price string
    function extractNumericValue(priceString) {
        // Removing non-numeric characters and converting to number
        return Number(priceString.replace(/[^0-9.-]+/g,""));
    }
    
    useEffect(() => {
        // Load cached data on component mount
       const cachedData = localStorage.getItem(query);
       if (cachedData) {
           setData(JSON.parse(cachedData));
       }

        const getData = async () => {
            try {
                setLoading(true);
                const cachedData = localStorage.getItem(query);
                // const cachedData = false;
                if (cachedData) {
                    // Use cached data if available
                    setData(JSON.parse(cachedData));
                    setLoading(false);
                } else {
                    // http://api.savebucks.co/api/amazon
                    // http://localhost:3000/api/amazon
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
                    console.log("Result: ", result);

                    result = result.filter(product => product.valid)
                        .sort((a, b) => {
                        
                        let priceA = extractNumericValue(a.price);
                        let priceB = extractNumericValue(b.price);
                    
                        return priceA - priceB;
                    });
                  
                    // Save data to localStorage for caching
                    if(result.length > 0) {
                        localStorage.setItem(query, JSON.stringify(result));
                    }

                    setData(result);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error in fetching the data:', error);
                setData(null);
                setLoading(false);
            }
        };

        if (query) {
            getData();
        } else {
            setData(null);
        }

    }, [query]);


    return (
        <Container>
            <Typography variant='h5' sx={{ mb: 4 }}>You are searching for '<b>{query}</b>'</Typography>
            {data && !loading ?
                (<Products productsData={data} />)
                : loading
                    ? (
                        <Box sx={{height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <CircularProgress
                                sx={{color: 'gray'}}
                                variant="indeterminate"
                            />
                        </Box>
                    )
                    : ((data == null || data == undefined) && !loading) ? (<Typography variant='h5'>No book found. Try something else</Typography>) : (<>Looks like something's wrong. Please try again after a coffee break</>)
            }
        </Container>
    )
}


export default SearchResults