import SearchBar from "./Home/SearchBar"
import { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, IconButton, Paper } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


const App = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [darkMode, setDarkMode] = useState(prefersDarkMode);
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: darkMode ? '#424242' : '#fff', // Random dark mode color
            },
        },
    });
    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeProvider theme={theme}>
            <Paper elevation={0} square={true} sx={{ height: '100vh' }}>
                <Container className="App"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }}>
                    <AppBar position="fixed"
                        sx={{
                            background: 'transparent',
                            boxShadow: 'none'
                        }}>
                        <Toolbar>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                SaveBucks
                            </Typography>
                            <IconButton onClick={handleDarkModeToggle} color="inherit">
                                {darkMode ? <Brightness7 /> : <Brightness4 />}
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <SearchBar />
                </Container>
            </Paper>
        </ThemeProvider>
    )
}


export default App