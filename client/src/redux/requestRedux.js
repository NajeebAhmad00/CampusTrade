import { createSlice } from '@reduxjs/toolkit'

const requestSlice = createSlice({
    name: 'request',
    initialState: {
        requests: [],
        loading: false,
        loadingRes: false,
        error: false
    },
    reducers: {
        getRequestsStart: (state) => {
            state.loading = true
            state.requests = []
            state.error = false
        },
        getRequestsSuccess: (state, action) => {
            state.loading = false
            state.requests = action.payload
        },
        getRequestsFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        addResponseStart: (state) => {
            state.loadingRes = true
            state.error = false
        },
        addResponseSuccess: (state, action) => {
            state.loadingRes = false
            state.requests.find(request => request._id === action.payload._id).reponses = action.payload.reponses
        },
        addResponseFailure: (state, action) => {
            state.loadingRes = false
            state.error = true
        },
        createRequestStart: (state) => {
            state.loading = true
            state.error = false
        },
        createRequestSuccess: (state, action) => {
            state.loading = false
            state.requests.push(action.payload)
        },
        createRequestFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {
    getRequestsStart,
    getRequestsSuccess,
    getRequestsFailure,
    addResponseStart,
    addResponseSuccess,
    addResponseFailure,
    createRequestStart,
    createRequestSuccess,
    createRequestFailure
} = requestSlice.actions
export default requestSlice.reducer