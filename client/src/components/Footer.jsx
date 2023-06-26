import {
    Box,
    Typography
} from '@mui/material'

const Footer = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                color: '#fff',
                backgroundColor: '#5aab64', // Adjust the background color as needed
                padding: '10px',
            }}
        >
            <Typography textAlign="center">&copy; 2023 All rights reserved</Typography>
        </Box>
    )
}

export default Footer