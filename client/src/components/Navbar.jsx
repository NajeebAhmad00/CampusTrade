import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Avatar,
    Popover,
    styled
} from '@mui/material'
import { logout } from '../redux/userRedux'

const Navbar = () => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined
    const dispatch = useDispatch()

    const { currentUser } = useSelector(state => state.user)

    const handleDropdown = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = async () => {
        await dispatch(logout())
        navigate('/login')
    }

    const StyledAppBar = styled(AppBar)({
        background: '#50AB64',
        boxShadow: 'none',
        marginBottom: 100
    })

    const StyledToolbar = styled(Toolbar)({
        display: 'flex',
        justifyContent: 'space-between'
    })

    const List = styled(Box)(({ theme }) => ({
        display: 'none',
        gap: 40,
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            display: 'flex'
        }
    }))

    const ListItem = styled(Typography)({
        fontSize: 20
    })

    return (
        <StyledAppBar position='static'>
            <StyledToolbar>
                <Link to='/' className='link'>
                    <Typography variant='h4' fontFamily='Philosopher'>CampusTrade</Typography>
                </Link>

                <List>
                    <Link to='/' className='link'>
                        <ListItem>Buy</ListItem>
                    </Link>

                    <Link to='/sell' className='link'>
                        <ListItem>Sell</ListItem>
                    </Link>

                    <Link to='/request' className='link'>
                        <ListItem>Request</ListItem>
                    </Link>
                    <Avatar src={currentUser?.profileImg ? currentUser?.profileImg : './images/avatar.PNG'} sx={{ width: 40, height: 40, cursor: 'pointer' }} onClick={handleDropdown} />

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorReference="anchorPosition"
                        anchorPosition={{ top: 60, left: 10000 }}
                    >
                        <Box sx={{ p: 2 }}>
                            <Link to={`/profile/${currentUser?._id}`} className='link'>
                                <Typography onClick={handleClose}>
                                    My Profile
                                </Typography>
                            </Link>
                            {currentUser?.isAdmin && (
                                <Link to='/admin' className='link'>
                                    <Typography onClick={handleClose}>
                                        Admin Dashboard
                                    </Typography>
                                </Link>
                            )}
                            <Typography sx={{ cursor: 'pointer' }} onClick={() => {
                                handleLogout()
                                handleClose()
                            }}>
                                Logout
                            </Typography>
                        </Box>
                    </Popover>
                </List>
            </StyledToolbar>
        </StyledAppBar>
    )
}

export default Navbar