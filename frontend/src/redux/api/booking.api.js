import { baseApi } from './baseApi';

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        ownBookings: builder.query({
            query: () => ({
                url: '/bookings/me',
                method: 'GET',
            }),
            providesTags: [{ type: "Booking", id: "self" }]
        }),
        ownBooking: builder.query({
            query: (id) => ({
                url: '/bookings/' + id + "/me",
                method: 'GET',
            }),
            providesTags: (_, __, id) => [{ type: "Booking", id: "self-" + id }]
        }),
        createBooking: builder.mutation({
            query: ({ data, hotelId, roomId }) => ({
                url: `/bookings/hotels/${hotelId}/rooms/${roomId}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: [{ type: 'Booking', id: "self" }],
        })
    }),
});

export const {
    useOwnBookingsQuery,
    useOwnBookingQuery,
    useCreateBookingMutation
} = bookingApi;