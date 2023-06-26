import { useEffect } from 'react'
import {
    Box,
    Container,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    styled
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { approveSeller, approveUser, fetchUsers, disableUser } from '../redux/apiCalls'
import { publicRequest } from '../requestMethods'
import Navbar from '../components/Navbar'

const AdminDashboard = () => {
    const dispatch = useDispatch()
    const { users, isLoading } = useSelector(state => state.user)
    const StyledTableCell = styled(TableCell)({
        fontSize: '1.3rem'
    })

    useEffect(() => {
        fetchUsers(dispatch)
    }, [dispatch])

    const handleApprove = (user) => {
        try {
            approveUser(dispatch, user._id, {
                id: user._id
            })

            if (!user.isApproved) {
                publicRequest.post('/mails/userapproved', {
                    email: user.email,
                    fullName: user.fullName
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleSeller = async (userId) => {
        try {
            await approveSeller(dispatch, userId, {
                id: userId
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleDisable = (userId) => {
        try {
            disableUser(dispatch, userId, {
                id: userId
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Navbar />

            <Box>
                <Typography variant='h4' sx={{ textAlign: 'center', mb: 6 }}>Admin Dashboard</Typography>

                <Container>
                    <Typography variant='h5'>Users</Typography>
                    <TableContainer>
                        <Table sx={{ minWidth: 700 }}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>S.No.</StyledTableCell>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>Email</StyledTableCell>
                                    <StyledTableCell>College ID</StyledTableCell>
                                    <StyledTableCell>Approve</StyledTableCell>
                                    <StyledTableCell>Seller</StyledTableCell>
                                    <StyledTableCell>Disable Account</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {isLoading ? <h4>Loading...</h4> : <>
                                    {users?.map((user, i) => (
                                        <TableRow key={user._id}>
                                            <TableCell>{i + 1}</TableCell>
                                            <TableCell>{user.fullName}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.collegeId ? user.collegeId : 'No Id'}</TableCell>
                                            <TableCell>
                                                <Switch
                                                    color='success'
                                                    defaultChecked={user.isApproved}
                                                    onClick={() => handleApprove(user)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Switch
                                                    color='success'
                                                    defaultChecked={user.isSeller}
                                                    onClick={() => handleSeller(user._id)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Switch
                                                    color='success'
                                                    defaultChecked={user.isDisabled}
                                                    onClick={() => handleDisable(user._id)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
        </>
    )
}

export default AdminDashboard