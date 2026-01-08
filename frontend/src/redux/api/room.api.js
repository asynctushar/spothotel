import { baseApi } from './baseApi';

export const hotelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        room: builder.query({
            query: (id) => ({
                url: '/rooms/' + id,
                method: 'GET',
            }),
            providesTags: (_, __, id) => [{ type: "Room", id }]
        })
    }),
});

export const {
    useRoomQuery
} = hotelApi;