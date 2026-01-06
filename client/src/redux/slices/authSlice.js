import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apis/authApi";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        admin: JSON.parse(localStorage.getItem("admin"))
    },
    reducers: {
        adminLogout: (state, { payload }) => {
            localStorage.removeItem("admin")
            state.admin = null
        },
        clarkLogout: (state, { payload }) => {
            localStorage.removeItem("clark")
            state.admin = null
        }
    },
    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.adminLogin.matchFulfilled, (state, { payload }) => {
            state.admin = payload
        })
        .addMatcher(authApi.endpoints.adminLogout.matchFulfilled, (state, { payload }) => {
            state.admin = null
        })
        .addMatcher(authApi.endpoints.clarkLogin.matchFulfilled, (state, { payload }) => {
            state.clark = payload
        })
        .addMatcher(authApi.endpoints.clarkLogout.matchFulfilled, (state, { payload }) => {
            state.clark = null
        })


})

export const { adminLogout } = authSlice.actions
export default authSlice.reducer