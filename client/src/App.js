import { Box, CircularProgress } from '@mui/material'
import { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Footer from './components/Footer'

const Products = lazy(() => import('./pages/Products'))
const Product = lazy(() => import('./pages/Product'))
const Sell = lazy(() => import('./pages/Sell'))
const SellForm = lazy(() => import('./pages/SellForm'))
const Profile = lazy(() => import('./pages/Profile'))
const Request = lazy(() => import('./pages/Request'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Login = lazy(() => import('./pages/Login'))
const Message = lazy(() => import('./pages/Message'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))

const App = () => {
  const { currentUser } = useSelector(state => state.user)

  return (
    <Router>
      <Suspense fallback={
        <Box>
          <CircularProgress />
        </Box>
      }>
        <Routes>
          <Route path='/' element={
            !currentUser ? <Navigate to='/login' /> : (
              !currentUser?.isApproved || currentUser?.isDisabled
            ) ? <Navigate to='/message' /> : <Products />
          } />

          <Route path='/message' element={
            !currentUser ? <Navigate to='/login' /> : (
              !currentUser?.isApproved || currentUser?.isDisabled
            ) ? <Message /> : <Navigate to='/' />
          } />

          <Route path='/product/:id' element={
            !currentUser ? <Navigate to='/login' /> : (
              !currentUser?.isApproved || currentUser?.isDisabled
            ) ? <Navigate to='/message' /> : <Product />
          } />

          <Route path='/sell' element={
            !currentUser ? <Navigate to='/login' /> : (
              !currentUser?.isApproved || currentUser?.isDisabled
            ) ? <Navigate to='/message' /> : <Sell />
          } />

          <Route path='/sellform' element={
            !currentUser ? <Navigate to='/login' /> : (
              !currentUser?.isApproved || currentUser?.isDisabled
            ) ? <Navigate to='/message' /> : <SellForm />
          } />

          <Route path='/profile/:id' element={
            !currentUser ? <Navigate to='/login' /> : (
              !currentUser?.isApproved || currentUser?.isDisabled
            ) ? <Navigate to='/message' /> : <Profile />
          } />
          <Route path='/request' element={
            !currentUser ? <Navigate to='/login' /> : (
              !currentUser?.isApproved || currentUser?.isDisabled
            ) ? <Navigate to='/message' /> : <Request />
          } />

          <Route path='/admin' element={
            !currentUser ? <Navigate to='/login' /> : (
              !currentUser?.isApproved || currentUser?.isDisabled
            ) ? <Navigate to='/message' /> : <AdminDashboard />
          } />

          <Route path='/signup' element={
            currentUser ? <Navigate to='/' /> : <SignUp />
          } />

          <Route path='/login' element={
            currentUser ? <Navigate to='/' /> : <Login />
          } />
        </Routes>
      </Suspense>
      <Footer />
    </Router>

  )
}

export default App