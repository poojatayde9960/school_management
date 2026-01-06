import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/auth`,
        credentials: "include"
        // baseUrl: "http://localhost:5000" 
    }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            adminRegister: builder.mutation({
                query: userData => {
                    return {
                        url: "/admin/register",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => data.result,
                invalidatesTags: ["auth"]
            }),
            adminLogin: builder.mutation({
                query: userData => {
                    return {
                        url: "/admin/login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("admin", JSON.stringify(data.result))
                    return data.result
                },
                invalidatesTags: ["auth"]
            }),
            adminLogout: builder.mutation({
                query: userData => {
                    return {
                        url: "/admin/logout",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("admin", JSON.stringify(data.result))
                    return data.result
                },
                invalidatesTags: ["auth"]
            }),
            // ----------clark--------------
            clarkRegister: builder.mutation({
                query: userData => {
                    return {
                        url: "/clark/register",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => data,
                invalidatesTags: ["auth"]
            }),
            clarkLogin: builder.mutation({
                query: userData => {
                    return {
                        url: "/clark/login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("clark", JSON.stringify(data.result))
                    return data.result
                },
                invalidatesTags: ["auth"]
            }),
            clarkLogout: builder.mutation({
                query: userData => {
                    return {
                        url: "/clark/logout",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("clark", JSON.stringify(data.result))
                    return data.result
                },
                invalidatesTags: ["auth"]
            }),

        }
    }
})

export const {
    useAdminLoginMutation,
    useAdminRegisterMutation,
    useAdminLogoutMutation,
    useClarkRegisterMutation,
    useClarkLogoutMutation,
    useClarkLoginMutation } = authApi
