import { baseApi } from './baseApi';

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        ownBookings: builder.query({
            query: () => ({
                url: '/bookings/me',
                method: 'GET',
            }),
            providesTags: [{ type: "Booking", id: "SELF_LIST" }]
        }),
        ownBooking: builder.query({
            query: (id) => ({
                url: '/bookings/' + id + "/me",
                method: 'GET',
            }),
            providesTags: (_, __, id) => [{ type: "Booking", id: "SELF_" + id }]
        }),
        createBooking: builder.mutation({
            query: ({ data, hotelId, roomId }) => ({
                url: `/bookings/hotels/${hotelId}/rooms/${roomId}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: [
                { type: 'Booking', id: "SELF_LIST" },
                { type: 'Booking', id: "ADMIN_LIST" },
            ],
        }),
        bookings: builder.query({
            query: () => ({
                url: "/bookings",
                method: "GET"
            }),
            providesTags: [{ type: "Booking", id: "ADMIN_LIST" }]
        }),
        booking: builder.query({
            query: (id) => ({
                url: '/bookings/' + id,
                method: 'GET',
            }),
            providesTags: (_, __, id) => [{ type: "Booking", id: id }]
        }),
        updateBookingStatus: builder.mutation({
            query: ({ status, id }) => ({
                url: `/bookings/${id}`,
                method: "PUT",
                body: { status }
            }),
            invalidatesTags: (_, __, { id }) => [
                { type: 'Booking', id: "SELF_LIST" },
                { type: 'Booking', id: "ADMIN_LIST" },
                { type: 'Booking', id },
            ]
        }),
    }),
});

export const {
    useOwnBookingsQuery,
    useOwnBookingQuery,
    useCreateBookingMutation,
    useBookingsQuery,
    useUpdateBookingStatusMutation,
    useBookingQuery
} = bookingApi;