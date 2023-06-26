import { useRef, useState } from 'react'
import {
    Typography,
    Stack,
    Box,
    Container,
    Checkbox,
    Button,
    ImageList,
    ImageListItem,
    Alert
} from '@mui/material'
import { Input } from '../styles/Global'
import { TextArea, Label } from '../styles/SellForm'
import { Add } from '@mui/icons-material'
import { userRequest } from '../requestMethods'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import Navbar from '../components/Navbar'

const SellForm = () => {
    const navigate = useNavigate()
    const name = useRef()
    const price = useRef()
    const desc = useRef()
    const rentPrice = useRef()
    const category = useRef()
    const [files, setFiles] = useState(null)
    const [fileErr, setFileErr] = useState(false)
    const [rentErr, setRentErr] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    const { currentUser } = useSelector(state => state.user)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (files === null) {
                setFileErr(true)
            } else {
                if (isChecked && rentPrice.current.value === '') {
                    setRentErr(true)
                } else {
                    const uploadPromises = Array.from(files).map(file => {
                        const imageRef = ref(storage, `/productImages/${file.name + v4()}`);
                        return uploadBytes(imageRef, file)
                            .then((snapshot) => {
                                return getDownloadURL(snapshot.ref);
                            })
                    })

                    Promise.all(uploadPromises)
                        .then(async (urls) => {
                            console.log(urls)
                            await userRequest.post('/products', {
                                name: name.current.value,
                                price: price.current.value,
                                desc: desc.current.value,
                                images: urls,
                                seller: currentUser?._id,
                                rentAvailability: isChecked,
                                rentPrice: rentPrice.current.value,
                                category: category.current.value
                            })
                            navigate('/')
                        })
                        .catch((err) => console.log(err))
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleFileChange = async (e) => {
        const selectedFiles = e.target.files
        setFiles(Array.from(selectedFiles))
    }

    return (
        <>
            <Navbar />

            <Container sx={{ width: { xs: '90%', md: '70%', lg: '40%' }, marginBottom: 30, }}>
                <Stack
                    direction='column'
                    spacing={2}
                    margin={-6}
                >
                    <Typography variant='h4' textAlign='center'>Enter Product Details</Typography>

                    <Container>
                        <form onSubmit={handleSubmit}>
                            <Box>
                                <Typography>Product Name</Typography>
                                <Input form required ref={name} />
                            </Box>

                            <Box sx={{ marginTop: 4, display: 'flex', gap: 7 }}>
                                <Box>
                                    <Typography>Price</Typography>
                                    <Input form required ref={price} type='number' />
                                </Box>

                                <Box>
                                    <Typography>Dimension</Typography>
                                    <Input form />
                                </Box>
                            </Box>

                            <Box marginTop={4}>
                                <Checkbox color='success' onChange={(e) => setIsChecked(e.target.checked)} />
                                <Typography display='inline-block'>Available for rent?</Typography>
                            </Box>

                            <Box marginTop={4}>
                                <Typography>Rent Price (on per day basis)</Typography>
                                <Input type='number' form sx={{ width: '40%' }} ref={rentPrice} />
                            </Box>

                            <Box marginTop={4}>
                                <Typography>Category</Typography>
                                <select style={{ width: '100%', height: '50px', outline: 'none', border: '2px solid #d9d9d9', borderRadius: '3px' }} ref={category}>
                                    <option value={null}>Select category...</option>
                                    <option value='electronics'>Electronics</option>
                                    <option value='books'>Books</option>
                                    <option value='other'>Other</option>
                                </select>
                            </Box>

                            <Box marginTop={4}>
                                <Typography>Description</Typography>
                                <TextArea required ref={desc} />
                            </Box>

                            <Box marginTop={4}>
                                <Label htmlFor='image'><Add /> Add images</Label>
                                <Input type='file' id='image' style={{ display: 'none' }} multiple onChange={handleFileChange} />
                                {files?.length > 0 && (
                                    <ImageList sx={{ width: '100%', mt: 4 }} cols={3}>
                                        {files.map(file => (
                                            <ImageListItem key={file}>
                                                <img src={URL.createObjectURL(file)} alt='' />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                )}
                            </Box>

                            {fileErr && (
                                <Alert severity='error' sx={{ mt: 3 }}>
                                    Please select images
                                </Alert>
                            )}

                            {rentErr && (
                                <Alert severity='error' sx={{ mt: 3 }}>
                                    Please provide price for rent
                                </Alert>
                            )}

                            <Button
                                variant='contained'
                                type='submit'
                                sx={{
                                    width: '100%',
                                    boxShadow: 'none',
                                    bgcolor: '#50ab64',
                                    textTransform: 'inherit',
                                    fontWeight: 'bold',
                                    marginTop: 4,
                                    '&:hover': {
                                        bgcolor: '#50ab64',
                                        boxShadow: 'none'
                                    }
                                }}
                            >
                                Start Selling
                            </Button>
                        </form>
                    </Container>
                </Stack>
            </Container>
        </>
    )
}

export default SellForm