import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Typography, Box, Button, Stack, styled, CircularProgress, Rating, Alert } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { publicRequest } from '../requestMethods'
import { useSelector } from 'react-redux'

const Product = () => {
    const location = useLocation()
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const productId = location.pathname.split('/')[2]
    const [images, setImages] = useState([])
    const [success, setSuccess] = useState(false)

    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await publicRequest.get(`/products/${productId}`)
                setProduct(data)
                setImages(data.images)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        getProduct()
    }, [productId])

    const StyledButton = styled(Button)({
        background: '#50AB64',
        borderRadius: 2,
        boxShadow: 'none',
        textTransform: 'inherit',
        width: '250px',
        fontWeight: '600',
        fontSize: '1.3rem',
        '&:hover': {
            background: '#50AB64',
            boxShadow: 'none'
        }
    })

    const sellerReview = () => {
        if (product.seller?.reviews?.length === 0) {
            return 0
        } else {
            const sum = product.seller?.reviews?.reduce((total, review) => total + review.rating, 0)
            const avg = sum / product.seller?.reviews?.length
            const roundedAvg = Math.round(avg)
            return roundedAvg
        }
    }

    const handlePurchase = async () => {
        try {
            // await publicRequest.post('/mails/buy', {
            //     email: currentUser.email,
            //     fullName: product.seller?.fullName,
            //     sellerEmail: product.seller?.email
            // })
            // setSuccess(true)
            console.log(product.seller?.phoneNumber)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Navbar />
            {loading ? <CircularProgress /> : <>
                <Container sx={{ display: 'flex', gap: 6, flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', ml: { xs: '30px', md: 'auto' } }}>
                    <img src={images} style={{ width: '40%' }} alt='' />

                    <Box>
                        <Typography variant='h4'>{product.name}</Typography>
                        <Typography component='p' sx={{
                            marginTop: 2,
                            marginRight: 10
                        }}>
                            {product.desc}
                        </Typography>
                        <Typography variant='h6' marginTop={2}>Price: Rs {product.price}</Typography>
                        <Typography variant='h6' marginTop={2}>Seller Name: <Link to={`/profile/${product.seller?._id}`} style={{ color: '#5DADE2', textDecoration: 'none', fontWeight: 600 }}>{product.seller?.fullName}</Link></Typography>
                        <Typography variant='h6' marginTop={2}>
                            Seller Rating: <Rating value={sellerReview()} readOnly />
                        </Typography>
                    </Box>
                </Container>


                {success && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                        <Alert severity='info'>
                            Buyer's contact details has been sent to your email
                        </Alert>
                    </Box>
                )}

                <Container sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                    <Stack spacing={2}>
                        <StyledButton variant='contained' onClick={() => handlePurchase('buy')}>Purchase</StyledButton>
                        <StyledButton variant='contained' onClick={() => handlePurchase('rent')} disabled={!product.rentAvailability}>Rent</StyledButton>
                    </Stack>
                </Container>
            </>
            }
        </>
    )
}

export default Product