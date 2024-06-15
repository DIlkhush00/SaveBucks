import { Typography, Box } from '@mui/material'
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const HomeBlock = () => {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Find any book you want!
            </Typography>
        </Box>
    )
}

const AppRoutes = () => {

    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomeBlock />} />
                </Routes>
                <Box sx={{mb: 6}}>
                    <SearchBar query={''} />
                </Box>

                <Routes>   
                    <Route path="/search" element={<SearchResults />} />
                </Routes>
            </Router>
        </>
    )
}

export default AppRoutes