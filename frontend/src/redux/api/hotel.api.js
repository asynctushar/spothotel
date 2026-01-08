import { baseApi } from './baseApi';

export const hotelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        hotels: builder.query({
            query: () => ({
                url: '/hotels',
                method: 'GET',
            }),
            providesTags: ["Hotel"],
        }),
        hotel: builder.query({
            query: (id) => ({
                url: '/hotels/' + id,
                method: 'GET',
            }),
            providesTags: (_, __, id) => [{ type: "Hotel", id }]
        })
    }),
});

export const {
    useHotelQuery,
    useHotelsQuery
} = hotelApi;