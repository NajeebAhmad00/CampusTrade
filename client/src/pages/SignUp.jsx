import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
    Box,
    Stack,
    Typography,
    Container,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormHelperText,
    Alert
} from '@mui/material'
import { Input } from '../styles/Global'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { signUpUser } from '../redux/apiCalls'
import { useNavigate } from 'react-router-dom'
import { publicRequest } from '../requestMethods'

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [inputType, setInputType] = useState('password')
    const [confirmPassType, setConfirmPassType] = useState('password')
    const [department, setDepartment] = useState(null)
    const [departmentErr, setDepartmentErr] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)
    const username = useRef()
    const email = useRef()
    const fullName = useRef()
    const phoneNumber = useRef()
    const collegeId = useRef()
    const password = useRef()
    const confirmPassword = useRef()

    const handleInput = () => {
        setInputType(prev => prev === 'password' ? 'text' : 'password')
    }

    const handleConfirmPass = () => {
        setConfirmPassType(prev => prev === 'password' ? 'text' : 'password')
    }

    const handleRadioChange = (e) => {
        setDepartment(e.target.value)
    }

    const handleSignUp = async (e) => {
        e.preventDefault()

        if (!department) {
            setDepartmentErr(true)
        } else if (password.current.value !== confirmPassword.current.value) {
            setPasswordErr(true)
        } else {
            try {
                publicRequest.post('/mails/newuser', {
                    email: email.current.value,
                    fullName: fullName.current.value,
                    phoneNumber: phoneNumber.current.value,
                    collegeId: collegeId.current.value,
                    department
                })
                signUpUser(dispatch, {
                    username: username.current.value,
                    email: email.current.value,
                    fullName: fullName.current.value,
                    password: password.current.value,
                    department,
                    phoneNumber: phoneNumber.current.value,
                    collegeId: collegeId.current.value
                })
                navigate('/message')
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <Container sx={{ width: { md: '70%', lg: '40%' }, marginBottom: 30, ml: { xs: '-11px', md: 'auto' } }}>
            <Stack
                direction='column'
                spacing={2}
                marginTop={8}
            >
                <Typography variant='h4' textAlign='center'>Sign Up</Typography>

                <Container>
                    <form onSubmit={handleSignUp}>
                        <Box mt={3}>
                            <Typography>Username</Typography>
                            <Input form ref={username} required />
                        </Box>

                        <Box mt={3}>
                            <Typography>Email</Typography>
                            <Input type='email' ref={email} required form />
                        </Box>

                        <Box mt={3}>
                            <Typography>Full Name</Typography>
                            <Input form ref={fullName} required />
                        </Box>

                        <Box mt={3}>
                            <Typography>Phone Number</Typography>
                            <Input form required minLength={10} maxLength={10} ref={phoneNumber} />
                        </Box>

                        <Box mt={3}>
                            <Typography>College ID</Typography>
                            <Input form required ref={collegeId} />
                        </Box>

                        <Box mt={3}>
                            <Typography>Department</Typography>
                            <RadioGroup
                                row
                                aria-labelledby="demo-form-control-label-placement"
                                name="position"
                                defaultValue="top"
                                onChange={handleRadioChange}
                                error={!department}
                            >
                                <FormControlLabel value='School of Engineering Sciences and Technology' control={<Radio />} label='School of Engineering Sciences and Technology' />
                                <FormControlLabel value='School of Medical Sciences and Research' control={<Radio />} label='School of Medical Sciences and Research' />
                                <FormControlLabel value='School of Law' control={<Radio />} label='School of Law' />
                            </RadioGroup>
                            {!department && <FormHelperText>Please select a department</FormHelperText>}
                        </Box>

                        <Box mt={3} sx={{ position: 'relative' }}>
                            <Typography>Password</Typography>
                            <Input form type={inputType} ref={password} required minLength={6} />
                            {inputType === 'password' ? (
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

                        <Box mt={3} sx={{ position: 'relative' }}>
                            <Typography>Confirm Password</Typography>
                            <Input form type={confirmPassType} ref={confirmPassword} />
                            {confirmPassType === 'password' ? (
                                <Visibility sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: 0,
                                    cursor: 'pointer',
                                }} onClick={handleConfirmPass} />
                            ) : (
                                <VisibilityOff sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: 0,
                                    cursor: 'pointer'
                                }} onClick={handleConfirmPass} />
                            )}
                        </Box>

                        {departmentErr && (
                            <Alert severity='error' sx={{ width: '97%', mt: 4 }}>
                                Please select your department
                            </Alert>
                        )}

                        {passwordErr && (
                            <Alert severity='error' sx={{ width: '97%', mt: 4 }}>
                                Passwords do not match
                            </Alert>
                        )}

                        <Typography sx={{ mt: 2 }}>
                            Already have an account? <Link to='/login' className='link' style={{ color: '#68A96B' }}>Log in</Link>
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
                        }} type='submit'>
                            Sign Up
                        </Button>
                    </form>
                </Container>
            </Stack>
        </Container>
    )
}

export default SignUp