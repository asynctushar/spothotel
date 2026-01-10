import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL + "/api/v2",
        credentials: "include",
    }),
    tagTypes: ['Hotel', "Room", "Booking", "User"],
    endpoints: () => ({}),
});