import { Typography } from '@mui/material'
import SearchBar from './SearchBar'
import Box from '@mui/material/Box';

function Home()
{
    return (
        <Box className="Home"
          sx = {{
            mx: 'auto',
            width: '75%',
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
        }}>
            <Typography variant='h2'>Save Bucks</Typography>
            <Typography variant='h4'>Save your Bucks</Typography>
            <SearchBar />
            
        </Box>
    )
}

export default Home