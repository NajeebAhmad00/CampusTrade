import { Link } from 'react-router-dom'
import { Box, Typography, Container, Button, styled } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'

const Sell = () => {
    const { currentUser } = useSelector(state => state.user)

    const StyledButton = styled(Button)({
        background: '#50AB64',
        borderRadius: 4,
        boxShadow: 'none',
        textTransform: 'inherit',
        fontSize: '1.2rem',
        '&:hover': {
            background: '#50AB64',
            boxShadow: 'none'
        }
    })

    return (
        <>
            <Navbar />
            {!currentUser?.isSeller && (
                <Box sx={{
                    marginTop: -6,
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Box sx={{
                        padding: 2,
                        borderRadius: 1,
                        background: '#89C4F4',
                        width: '30%'
                    }}>
                        <Typography component='p' sx={{ fontSize: 20, textAlign: 'center' }}>
                            Verification required! <Link style={{
                                color: '003399'
                            }}>Click here</Link> to get verified and start selling
                        </Typography>
                    </Box>
                </Box>
            )}

            {currentUser?.isSeller && (
                <Container sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Box>
                        <Typography variant='h5' sx={{ fontWeight: 600, fontSize: '2rem' }}>Your items</Typography>
                    </Box>

                    <Link to='/sellform'>
                        <StyledButton variant='contained'>
                            <Add />Add item to sell
                        </StyledButton>
                    </Link>
                </Container>
            )}
        </>
    )
}

export default Sell