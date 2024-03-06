import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AppRoutes = () => {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/search" element={<SearchResults />} />
                    <Route exact path="/" element={<SearchBar />} />
                </Routes>
            </Router>
        </>
    )
}

export default AppRoutes