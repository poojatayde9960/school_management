import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";
import authSlice from "./slices/authSlice";
import { adminApi } from "./apis/adminApi";
import { applicationApi } from "./apis/applicationApi";


const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [applicationApi.reducerPath]: applicationApi.reducer,
        Adminauth: authSlice
    },
    middleware: def => [...def(), authApi.middleware, adminApi.middleware, applicationApi.middleware]
})

export default reduxStore