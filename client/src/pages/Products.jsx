import { Link } from 'react-router-dom'
import {
    Container as CustomContainer,
    Input
} from '../styles/Global'
import {
    Container,
    Typography,
    Grid,
    CircularProgress,
} from '@mui/material'
import Navbar from '../components/Navbar'
import { useEffect, useMemo, useState } from 'react'
import { publicRequest } from '../requestMethods'

const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const getProducts = async () => {
            try {
                const { data } = await publicRequest.get('/products')
                setProducts(data)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    }, [])

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            return product.name.toLowerCase().includes(searchQuery.toLowerCase())
        })
    }, [products, searchQuery])

    return (
        <>
            <Navbar />

            <CustomContainer>
                <Input placeholder='Search...' onChange={e => setSearchQuery(e.target.value)} />

                <Container sx={{ marginTop: 5 }}>

                    <Grid container maxWidth={1200} minheight={200} margin='20px 0'>
                        {loading ? <CircularProgress sx={{ margin: 150 }} /> : products?.length === 0 ? (
                            <h2 style={{ textAlign: 'center', margin: 150 }}>No products</h2>
                        ) : <>
                            {filteredProducts?.map(product => (
                                <Link key={product._id} to={`/product/${product._id}`} className='link'>
                                    <Grid item sx={{ mr: 2 }}>
                                        <img src={product.images[0]} style={{
                                            width: 270,
                                            height: 200,
                                            position: 'relative',
                                            zIndex: -1,
                                        }} alt='' />
                                        <div style={{
                                            marginTop: -43,
                                            width: '100%',
                                            backgroundColor: 'rgba(0, 0, 0, 0.54)',
                                            zIndex: 2,
                                            color: '#fff',
                                            textAlign: 'center',
                                            padding: '4px 0'
                                        }}>
                                            <Typography variant='h6'>{product.name}</Typography>
                                        </div>
                                    </Grid>
                                </Link>
                            ))}
                        </>}
                    </Grid>
                </Container>
            </CustomContainer>
        </>
    )
}

export default Products