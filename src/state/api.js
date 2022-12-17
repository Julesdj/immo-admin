import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    tagTypes: ["User", "ProductStats", "Customers"],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `api/users/${id}`,
            providesTags: ["User"],
        }),
        getProductStats: builder.query({
            query: () => `api/products/stats`,
            providesTags: ["ProductStats"],
        }),
        getCustomers: builder.query({
            query: () => `api/clients`,
            providesTags: ["Customers"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetProductStatsQuery,
    useGetCustomersQuery,
} = api;
