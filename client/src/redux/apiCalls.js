import { publicRequest } from '../requestMethods'
import {
    createRequestFailure,
    createRequestStart,
    createRequestSuccess,
    getRequestsFailure,
    getRequestsStart,
    getRequestsSuccess,
    addResponseStart,
    addResponseSuccess,
    addResponseFailure
} from './requestRedux'
import {
    loginStart,
    loginSuccess,
    loginFailure,
    signUpStart,
    signUpFailure,
    signUpSuccess,
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    approveUserStart,
    approveUserSuccess,
    approveUserFailure,
    approveSellerStart,
    approveSellerSuccess,
    approveSellerFailure,
    disableUserStart,
    disableUserSuccess,
    disableUserFailure
} from './userRedux'

export const login = async (dispatch, user) => {
    dispatch(loginStart())

    try {
        const { data } = await publicRequest.post('/users/login', user)
        dispatch(loginSuccess(data))
    } catch (err) {
        dispatch(loginFailure())
    }
}

export const signUpUser = async (dispatch, user) => {
    dispatch(signUpStart())

    try {
        const { data } = await publicRequest.post('/users/register', user)
        dispatch(signUpSuccess(data))
    } catch (err) {
        dispatch(signUpFailure(err))
    }
}

export const fetchUsers = async (dispatch) => {
    dispatch(fetchUsersStart())

    try {
        const { data } = await publicRequest.get('/users/find')
        dispatch(fetchUsersSuccess(data))
    } catch (err) {
        dispatch(fetchUsersFailure(err))
    }
}

export const approveUser = async (dispatch, id, user) => {
    dispatch(approveUserStart())

    try {
        const { data } = await publicRequest.put(`/users/approve/${id}`, user)
        dispatch(approveUserSuccess(data))
    } catch (err) {
        dispatch(approveUserFailure(err))
    }
}

export const approveSeller = async (dispatch, id, user) => {
    dispatch(approveSellerStart())

    try {
        const { data } = await publicRequest.put(`/users/sell/${id}`, user)
        dispatch(approveSellerSuccess(data))
    } catch (err) {
        dispatch(approveSellerFailure(err))
    }
}

export const disableUser = async (dispatch, id, user) => {
    dispatch(disableUserStart())

    try {
        const { data } = await publicRequest.put(`/users/disable/${id}`, user)
        dispatch(disableUserSuccess(data))
    } catch (err) {
        dispatch(disableUserFailure(err))
    }
}

export const getRequests = async (dispatch) => {
    dispatch(getRequestsStart())

    try {
        const { data } = await publicRequest.get('/requests')
        dispatch(getRequestsSuccess(data))
    } catch (err) {
        dispatch(getRequestsFailure(err))
    }
}

export const createRequest = async (dispatch, request) => {
    dispatch(createRequestStart())

    try {
        const { data } = await publicRequest.post('/requests', request)
        dispatch(createRequestSuccess(data))
    } catch (err) {
        dispatch(createRequestFailure(err))
    }
}

export const createResponse = async (dispatch, requestId, response) => {
    dispatch(addResponseStart())

    try {
        const { data } = await publicRequest.post(`/requests/${requestId}/responses`, response)
        dispatch(addResponseSuccess(data))
    } catch (err) {
        dispatch(addResponseFailure())
    }
}