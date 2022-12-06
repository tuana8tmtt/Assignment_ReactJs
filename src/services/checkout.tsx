import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const checkoutApi = createApi({
    reducerPath: "checkoutApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    tagTypes: ["Checkout"],
    endpoints: (builder) => ({
        getCheckouts: builder.query({
            query: () => "/checkouts",
            providesTags: ["Checkout"]
        }),
        getCheckout: builder.query({
            query: () => "/checkouts",
            providesTags: ["Checkout"]
        }),
        addCheckouts: builder.mutation({
            query: (data) => ({
                url: "/checkouts",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Checkout"]
        }),
        updateCheckouts: builder.mutation({
            query: (data) => ({
                url: "/checkouts/" + data.id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Checkout"]
        }),
        removeCheckouts: builder.mutation({
            query: (id) => ({
                url: "/checkouts/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Checkout"]
        }),
    })
})
export const { useGetCheckoutsQuery, useGetCheckoutQuery, useAddCheckoutsMutation, useUpdateCheckoutsMutation, useRemoveCheckoutsMutation } = checkoutApi