import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Box, CircularProgress, Container, Rating, Typography, Stack, Button } from '@mui/material'
import { Input, ProfileImg } from '../styles/Global'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { publicRequest, userRequest } from '../requestMethods'
import { updateProfileImg } from '../redux/userRedux'
import Navbar from '../components/Navbar'
import { useState, useEffect, useRef } from 'react'
import { TextArea } from '../styles/SellForm'

const Profile = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState(0)
    const review = useRef()

    const { currentUser } = useSelector(state => state.user)
    const userId = location.pathname.split('/')[2]

    useEffect(() => {
        const getUser = async () => {
            const { data } = await userRequest.get(`/users/find/${userId}`, {
                token: currentUser?.token
            })
            setUser(data)
            setLoading(false)
        }
        getUser()
    }, [currentUser, userId])

    const handleChange = (e) => {
        try {
            const imageRef = ref(storage, `/profileImages/${e.target.files[0].name + v4()}`)
            uploadBytes(imageRef, e.target.files[0])
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then(async url => {
                            await publicRequest.put(`/users/${user._id}`, {
                                profileImg: url
                            })
                            await dispatch(updateProfileImg(url))
                            window.location.reload()
                        })
                }).catch(err => console.log(err))
        } catch (err) {
            console.log(err)
        }
    }

    const handleReview = async (e) => {
        e.preventDefault()

        try {
            await publicRequest.post(`/users/${user._id}/review`, {
                author: currentUser._id,
                review: review.current.value,
                rating,
            })
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const sellerReview = () => {
        if (user.reviews?.length === 0) {
            return 0
        } else {
            const sum = user.reviews?.reduce((total, review) => total + review.rating, 0)
            const avg = sum / user.reviews?.length
            const roundedAvg = Math.round(avg)
            return roundedAvg
        }
    }

    return (
        <>
            <Navbar />

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    <Container sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        flexDirection: { xs: 'column', md: 'row' }
                    }}>
                        <Box flex='40%' sx={{ mt: -4 }}>
                            <label htmlFor='profileImg'>
                                <ProfileImg src={user.profileImg ? user.profileImg : '../images/avatar.PNG'} />
                            </label>
                            <Input type='file' id='profileImg' style={{ display: 'none' }} onChange={handleChange} />
                        </Box>
                        <Box flex='50%'>
                            <Typography variant='h4'>{user.fullName}</Typography>
                            <Typography variant='h5' sx={{ width: '70%' }}>
                                Student in {user.department}
                            </Typography>
                        </Box>
                    </Container>

                    {user.isSeller && <>
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, mt: 7, ml: 2 }}>
                            <Typography variant='h5'>
                                Avg Seller Rating <Rating size='large' value={sellerReview()} readOnly />
                            </Typography>
                        </Box>

                        <Container sx={{ mt: 8, width: { xs: '90%', md: '70%', lg: '50%' } }}>
                            <Stack spacing={5}>
                                <Typography variant='h5'>Reviews</Typography>
                                <Typography>Write a review:</Typography>
                                <form onSubmit={handleReview}>
                                    <Rating
                                        name='simple-controlled'
                                        onChange={(e, newVal) => setRating(newVal)}
                                        aria-required
                                    />
                                    <TextArea required style={{
                                        height: 100,
                                        minHeight: 100,
                                        maxHeight: 100,
                                        width: '80%',
                                        maxWidth: '80%',
                                        minWidth: '80%'
                                    }} ref={review} />
                                    <p>
                                        <Button variant='contained' color='success' type='submit'>
                                            Submit
                                        </Button>
                                    </p>
                                </form>

                                <Typography variant='h5'>Past reviews</Typography>
                                {user.reviews?.length > 0 ? <>
                                    {user.reviews?.map(review => (
                                        <Stack>
                                            <Box>
                                                <Rating value={review.rating} readOnly />
                                                <Typography component='p'>
                                                    {review.review}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    ))}
                                </> : <h3>No reviews yet</h3>}
                            </Stack>
                        </Container>
                    </>}
                </Box >
            )}
        </>
    )
}

export default Profile