import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        getCategorys: builder.query({
            query: () => "/category",
            providesTags: ["Category"]
        }),
        getCategory: builder.query({
            query: (id) => "/category/" + id,
            providesTags: ["Category"]
        }),
        addCate: builder.mutation({
            query: (data) => ({
                url: "/category",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Category"]
        }),
        updateCate: builder.mutation({
            query: (data) => ({
                url: "/category/" + data.id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Category"]
        }),
        removeCate: builder.mutation({
            query: (id) => ({
                url: "/category/" + id,
                method: "DELETE"
            })
        })
    })
})
export const { useGetCategorysQuery, useGetCategoryQuery, useAddCateMutation, useUpdateCateMutation, useRemoveCateMutation } = categoryApi