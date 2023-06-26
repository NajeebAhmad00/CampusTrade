import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        isLoading: false,
        users: []
    },
    reducers: {
        loginStart: (state) => {
            state.currentUser = null
            state.isFetching = true
            state.error = false
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload
            state.isFetching = false
        },
        loginFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        logout: (state) => {
            state.currentUser = null
            state.isFetching = false
            state.error = false
        },
        signUpStart: (state) => {
            state.currentUser = null
            state.isFetching = true
            state.error = false
        },
        signUpSuccess: (state, action) => {
            state.currentUser = action.payload
            state.isFetching = false
        },
        signUpFailure: (state, action) => {
            state.isFetching = false
            state.error = action.payload
        },
        fetchUsersStart: (state) => {
            state.isLoading = true
            state.users = []
            state.error = false
        },
        fetchUsersSuccess: (state, action) => {
            state.isLoading = false
            state.users = action.payload
        },
        fetchUsersFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        approveUserStart: (state) => {
            state.isLoading = true
            state.error = false
        },
        approveUserSuccess: (state, action) => {
            state.isLoading = false
            state.users.find(user => user._id === action.payload._id).isApproved = action.payload.isApproved
        },
        approveUserFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        approveSellerStart: (state) => {
            state.isLoading = true
            state.error = false
        },
        approveSellerSuccess: (state, action) => {
            state.isLoading = false
            state.users.find(user => user._id === action.payload._id).isSeller = action.payload.isSeller
        },
        approveSellerFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        disableUserStart: (state) => {
            state.isLoading = true
            state.error = false
        },
        disableUserSuccess: (state, action) => {
            state.isLoading = false
            state.users.find(user => user._id === action.payload._id).isDisabled = action.payload.isDisabled
        },
        disableUserFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        updateProfileImg: (state, action) => {
            state.currentUser.profileImg = action.payload
        }
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    signUpStart,
    signUpSuccess,
    signUpFailure,
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
    disableUserFailure,
    updateProfileImg
} = userSlice.actions
export default userSlice.reducer