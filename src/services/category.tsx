import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        getCategorys: builder.query({
            query: () => "/categorys",
            providesTags: ["Category"]
        }),
        getCategory: builder.query({
            query: (id) => "/categorys/" + id,
            providesTags: ["Category"]
        }),
        addCate: builder.mutation({
            query: (data) => ({
                url: "/categorys",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Category"]
        }),
        updateCate: builder.mutation({
            query: (data) => ({
                url: "/categorys/" + data.id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Category"]
        }),
        removeCate: builder.mutation({
            query: (id) => ({
                url: "/categorys/" + id,
                method: "DELETE"
            })
        })
    })
})
export const { useGetCategorysQuery, useGetCategoryQuery, useAddCateMutation, useUpdateCateMutation, useRemoveCateMutation } = categoryApi