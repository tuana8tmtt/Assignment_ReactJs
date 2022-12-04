import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000'}),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query:(data)=>({
                url:'/signup',
                method: "Post",
                body: data
            }),
            invalidatesTags: ["Auth"]
        }),
        signIn: builder.mutation({
            query:(data)=>({
                url:'/signin',
                method: "Post",
                body: data
            }),
            invalidatesTags: ["Auth"]
        }),
        getUsers: builder.query({
            query: () => "/users",
            providesTags: ["Auth"]
        }),
        getUser: builder.query({
            query: (id) => "/users/"+id,
            providesTags: ["Auth"]
        }),
        removeUser: builder.mutation({
            query: (id) => ({
                url: "/users/"+id,
                method: "DELETE"
            }),
            invalidatesTags: ["Auth"]
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: "/users/"+data.id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Auth"]
        })
    })
})
export const {useSignInMutation, useSignUpMutation, useGetUserQuery, useGetUsersQuery, useRemoveUserMutation, useUpdateUserMutation} = authApi