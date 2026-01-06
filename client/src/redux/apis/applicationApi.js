import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const applicationApi = createApi({
    reducerPath: "applicationApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/application" }),
    tagTypes: ["application"],
    endpoints: (builder) => ({
        addApplication: builder.mutation({
            query: (userData) => {
                return {
                    url: "/add-application",
                    method: "POST",
                    body: userData
                }
            },
            invalidatesTags: ["application"]
        }),
        getApplications: builder.query({
            query: () => {
                return {
                    url: "/get-application",
                    method: "GET"
                }
            },
            providesTags: ["application"]
        })
    })
})

export const { useAddApplicationMutation, useGetApplicationsQuery } = applicationApi
