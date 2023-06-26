import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/userRedux'
import {
    Stack,
    Alert,
    AlertTitle,
    Container
} from '@mui/material'
import { StyledButton } from '../styles/Global'

const Message = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentUser } = useSelector(state => state.user)

    const handleLogout = async () => {
        await dispatch(logout())
        navigate('/')
    }

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
            <Stack spacing={3}>
                <Alert severity={!currentUser?.isActive ? 'info' : 'error'}>
                    {!currentUser?.isActive && <>
                        <AlertTitle><strong>Account verification in process</strong></AlertTitle>
                        Thank you for signing up, we will verify your account within 24 hours. Don't forget to check email!
                    </>}
                    {currentUser?.isDisabled && <>
                        <AlertTitle><strong>Account disabled!</strong></AlertTitle>
                        We found malicious activities and decided to disable the account. Contact the admin if you think this is a mistake
                    </>}
                </Alert>

                <StyledButton variant='contained' onClick={handleLogout}>
                    Logout
                </StyledButton>
            </Stack>
        </Container>
    )
}

export default Message