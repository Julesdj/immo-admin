import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    tagTypes: [
        "User",
        "ProductStats",
        "Customers",
        "Transactions",
        "Geography",
        "Sales",
    ],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `api/users/${id}`,
            providesTags: ["User"],
        }),
        getProductStats: builder.query({
            query: () => "api/products/stats",
            providesTags: ["ProductStats"],
        }),
        getCustomers: builder.query({
            query: () => "api/client",
            providesTags: ["Customers"],
        }),
        getTransactions: builder.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "api/client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Transactions"],
        }),
        getGeography: builder.query({
            query: () => "api/client/geography",
            providesTags: ["Geography"],
        }),
        getSales: builder.query({
            query: () => "api/sales",
            providesTags: ["Sales"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetProductStatsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
} = api;
