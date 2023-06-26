import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    Stack,
    Typography,
    Box,
    Button,
    Alert,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Input } from '../styles/Global'
import { login } from '../redux/apiCalls'

const Login = () => {
    const [passwordType, setPasswordType] = useState('password')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const email = useRef()
    const password = useRef()

    const { error } = useSelector(state => state.user)

    const handleInput = () => {
        setPasswordType(prev => prev === 'password' ? 'text' : 'password')
    }

    const handleSubmit = async () => {
        await login(dispatch, {
            email: email.current.value,
            password: password.current.value
        })
        navigate('/')
    }

    return (
        <Container sx={{ width: { sm: '90%', md: '70%', lg: '40%' }, marginBottom: 30, ml: { xs: '-11px', md: 'auto' } }}>
            <Stack
                direction='column'
                spacing={2}
                marginTop={8}
            >
                <Typography variant='h4' textAlign='center'>Log In</Typography>

                <Container>
                    <Box mt={3}>
                        <Typography>Email</Typography>
                        <Input form ref={email} />
                    </Box>

                    <Box mt={3} sx={{ position: 'relative' }}>
                        <Typography>Password</Typography>
                        <Input form type={passwordType} ref={password} />
                        {passwordType === 'password' ? (
                            <Visibility sx={{
                                position: 'absolute',
                                top: '50%',
                                right: 0,
                                cursor: 'pointer',
                            }} onClick={handleInput} />
                        ) : (
                            <VisibilityOff sx={{
                                position: 'absolute',
                                top: '50%',
                                right: 0,
                                cursor: 'pointer'
                            }} onClick={handleInput} />
                        )}
                    </Box>

                    {error && (
                        <Alert sx={{ width: '100%', mt: 4 }} severity='error'>Username or password is incorrect</Alert>
                    )}


                    <Typography sx={{ mt: 2 }}>
                        Don't have an account? <Link to='/signup' className='link' style={{ color: '#68A96B' }}>Create account</Link>
                    </Typography>

                    <Button variant='contained' sx={{
                        width: '107%',
                        boxShadow: 'none',
                        bgcolor: '#50ab64',
                        textTransform: 'inherit',
                        fontWeight: 'bold',
                        marginTop: 4,
                        '&:hover': {
                            bgcolor: '#50ab64',
                            boxShadow: 'none'
                        }
                    }} onClick={handleSubmit}>
                        Login
                    </Button>
                </Container>
            </Stack>
        </Container>
    )
}

export default Login