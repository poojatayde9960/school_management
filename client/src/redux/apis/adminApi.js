import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/auth`,
        credentials: "include"
        // baseUrl: "http://localhost:5000" 
    }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {

            addTeacher: builder.mutation({
                query: userData => {
                    return {
                        url: "/addTeacher",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            deleteTeacher: builder.mutation({
                query: (id) => {
                    return {
                        url: `/delete-teacher/${id}`,
                        method: "DELETE",
                        // body: userData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            addDepartment: builder.mutation({
                query: userData => {
                    return {
                        url: "/addDepartment",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            addEvent: builder.mutation({
                query: userData => {
                    return {
                        url: "/addEvent",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            fetchTeacher: builder.query({
                query: () => {
                    return {
                        url: "/fetchTeacher",
                        method: "GET"
                    }
                },
                providesTags: ["admin"],
                transformResponse: data => data.result
            }),
            fetchDepartment: builder.query({
                query: () => {
                    return {
                        url: "/fetchDepartment",
                        method: "GET"
                    }
                },
                providesTags: ["admin"],
                transformResponse: data => data.result
            }),
            fetchEvent: builder.query({
                query: () => {
                    return {
                        url: "/fetchEvent",
                        method: "GET"
                    }
                },
                providesTags: ["admin"],
                transformResponse: data => data.result
            }),
            updateDepartment: builder.mutation({
                query: ({ _id, fd }) => ({
                    url: `/updateDepartment/${_id}`,
                    method: "PUT",
                    body: fd
                }),
                invalidatesTags: ["admin"],
                transformResponse: data => data.result
            }),


            updateStudent: builder.mutation({
                query: userData => {
                    return {
                        url: `/updateStudent/${userData._id}`,
                        method: "PUT",
                        body: userData.fd
                    }
                },
                invalidatesTags: ["admin"],
                transformResponse: data => data.result
            }),
            updateEvent: builder.mutation({
                query: userData => {
                    return {
                        url: `/updateEvent/${userData._id}`,
                        method: "PUT",
                        body: userData.fd
                    }
                },
                invalidatesTags: ["admin"],
                transformResponse: data => data.result
            }),
            deleteDepartment: builder.mutation({
                query: id => {
                    return {
                        url: `/deleteDepartment/${id}`,
                        method: "DELETE",
                        // body: userData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            deleteEvent: builder.mutation({
                query: id => {
                    return {
                        url: `/deleteEvent/${id}`,
                        method: "DELETE",
                        // body: userData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            addStudent: builder.mutation({
                query: userData => {
                    return {
                        url: "/addStudent",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["admin"]
            }),

            fetchStudent: builder.query({
                query: () => {
                    return {
                        url: "/getStudent",
                        method: "GET"
                    }
                },
                providesTags: ["admin"],
                transformResponse: data => data.result
            }),
            addFacilities: builder.mutation({
                query: userData => {
                    return {
                        url: "/addFacilities",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["admin"]
            }),
            fetchFacilities: builder.query({
                query: () => {
                    return {
                        url: "/fetchFacilities",
                        method: "GET"
                    }
                },
                providesTags: ["admin"],
                transformResponse: data => data.result
            }),
            updateFacilities: builder.mutation({
                query: userData => {
                    return {
                        url: `/updateFacilities/${userData._id}`,
                        method: "PUT",
                        body: userData.fd
                    }
                },
                invalidatesTags: ["admin"]
            }),
            deleteFacilities: builder.mutation({
                query: id => {
                    return {
                        url: `/deleteFacilities/${id}`,
                        method: "DELETE"
                    }
                },
                invalidatesTags: ["admin"]
            }),
            deleteStudent: builder.mutation({
                query: id => {
                    return {
                        url: `/deleteStudent/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["admin"]
            }),

        }
    }
})

export const { useAddTeacherMutation,
    useDeleteTeacherMutation, useFetchTeacherQuery, useAddDepartmentMutation,
    useFetchDepartmentQuery,
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation,
    useAddEventMutation,
    useDeleteEventMutation,
    useUpdateEventMutation,
    useFetchEventQuery,
    useAddStudentMutation,
    useFetchStudentQuery, useUpdateStudentMutation,
    useAddFacilitiesMutation,
    useFetchFacilitiesQuery,
    useUpdateFacilitiesMutation,
    useDeleteFacilitiesMutation,
    useDeleteStudentMutation
} = adminApi



