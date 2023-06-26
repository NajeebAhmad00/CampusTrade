import { useEffect, useRef } from 'react'
import {
    Box,
    Typography,
    Container,
    Button,
    CircularProgress,
    Stack
} from '@mui/material'
import { CustomInput } from '../styles/Global'
import { Input } from '../styles/Global'
import Navbar from '../components/Navbar'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'
import { createRequest, createResponse, getRequests } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'

const Request = () => {
    const dispatch = useDispatch()
    const request = useRef()
    const response = useRef()

    const { requests, loading } = useSelector(state => state.request)
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        getRequests(dispatch)
    }, [dispatch])

    const handleRequest = async () => {
        try {
            await createRequest(dispatch, {
                author: currentUser._id,
                body: request.current.value
            })
            request.current.value = ''
        } catch (err) {
            console.log(err)
        }
    }

    const handleResponse = (requestId) => {
        try {
            createResponse(dispatch, requestId, {
                author: currentUser._id,
                body: response.current.value
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Navbar />
            <Box sx={{
                marginTop: -6,
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Box sx={{
                    padding: 2,
                    borderRadius: 1,
                    background: '#89C4F4',
                    width: { xs: '80%', md: '70%', lg: '30%' },
                    mb: 4
                }}>
                    <Typography component='p' sx={{ fontSize: 20, textAlign: 'center' }}>
                        Can't find what you're looking for? Request the item down below!
                    </Typography>
                </Box>
            </Box>

            <Box display='flex' justifyContent='center'>
                <CustomInput ref={request} />
                <Button
                    variant='contained'
                    sx={{
                        bgcolor: '#50AB64',
                        boxShadow: 'none',
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        '&:hover': {
                            bgcolor: '#50AB64',
                            boxShadow: 'none'
                        }
                    }}
                    onClick={handleRequest}
                >
                    Request
                </Button>
            </Box>

            <Container>
                <Typography variant='h5' sx={{ fontWeight: 600, fontSize: '2rem', mt: 3 }}>
                    Previous Requests
                </Typography>

                {loading ? <CircularProgress /> : requests.length === 0 ? (
                    <h2>No requests</h2>
                ) : (
                    <Stack spacing={2} mt={5}>
                        {requests.map(request => <>
                            <Box sx={{ width: { xs: '90%', md: '70%', lg: '50%' }, padding: '20px', bgcolor: '#50AB64', color: '#fff', borderTopLeftRadius: 10, borderTopRightRadius: 10, position: 'relative' }}>
                                <Typography component='p' sx={{ mb: 3 }}>
                                    Request by: {request.author?.fullName}<br />
                                    - {request.body}
                                </Typography>
                                <Typography component='p' sx={{ fontSize: '0.8rem', position: 'absolute', top: '20px', right: '20px' }}>
                                    {request.createdAt?.substr(0, 10)}
                                </Typography>
                                {request.reponses?.length > 0 && <>
                                    {request.reponses?.map((response, i) => (
                                        <div style={{ marginBottom: 20 }} key={i}>
                                            <SubdirectoryArrowRightIcon sx={{ mb: -1 }} /> {response.body}
                                        </div>
                                    ))}
                                </>}
                            </Box>
                            <Box margin={0} sx={{ width: { xs: '90%', md: '70%', lg: '86%' } }}>
                                <Input type='text' placeholder='Type your response' style={{
                                    marginTop: -20,
                                    borderTopLeftRadius: 0,
                                    borderTopRightRadius: 0
                                }} ref={response} />
                                <span style={{
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    marginLeft: -50,
                                }} onClick={() => handleResponse(request._id)}>Post</span>
                            </Box>
                        </>)}
                    </Stack>
                )}
            </Container>
        </>
    )
}

export default Request