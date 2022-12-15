import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.RECT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: ["User"],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/users/${id}`,
            providesTags: ["User"],
        }),
    }),
});

export const { useGetUserQuery } = api;
