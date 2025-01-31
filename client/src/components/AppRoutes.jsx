import { Typography, Box } from '@mui/material'
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ReactTyped } from "react-typed";

const HomeBlock = () => {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', mt: 10 }}>
            <Typography variant="h4" gutterBottom>
                <ReactTyped
                    strings={["Buy smart, save more"]}
                    typeSpeed={50}
                    cursorChar="!"
                    showCursor={true}
                />
            </Typography>
        </Box>
    )
}

const AppRoutes = () => {

    return (
        <>
            <Router basename='/SaveBucks'>
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