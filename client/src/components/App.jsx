import { useState } from 'react';
import { Container, AppBar, Toolbar, Button, IconButton, Paper, Box } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppRoutes from './AppRoutes';

const App = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [darkMode, setDarkMode] = useState(prefersDarkMode);
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: darkMode ? '#121212' : '#fffff',
            },
        },
    });
    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeProvider theme={theme}>
            <Paper elevation={0} square={true} sx={{ pb: 10, pt: 10, minHeight: '100vh' }}>
                <Container className="App">
                    <AppBar position="fixed"
                        sx={{
                            background: 'transparent',
                            boxShadow: 'none',
                        }}>
                        <Toolbar sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Button href='/Savebucks' variant="h5" >
                                SaveBucks
                            </Button>
                            <IconButton onClick={handleDarkModeToggle} color="inherit">
                                {darkMode ? <Brightness7 /> : <Brightness4 />}
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Box sx={{
                        paddingTop: 4
                    }}>
                        <AppRoutes />
                    </Box>
                </Container>
            </Paper>
        </ThemeProvider>
    )
}


export default App