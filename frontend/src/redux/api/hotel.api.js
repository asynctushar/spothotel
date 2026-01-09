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
        }),
        uploadHotelImages: builder.mutation({
            query: ({ id, formData }) => ({
                url: "/hotels/" + id + "/images",
                method: "PUT",
                body: formData
            }),
            invalidatesTags: ["Hotel"]
        }),
        deleteHotel: builder.mutation({
            query: (id) => ({
                url: "/hotels/" + id,
                method: "DELETE"
            }),
            invalidatesTags: ["Hotel"]
        }),
        createHotel: builder.mutation({
            query: (data) => ({
                url: "/hotels/",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Hotel"]
        }),
        updateHotel: builder.mutation({
            query: ({ id, formData }) => ({
                url: "/hotels/" + id,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: ["Hotel"]
        }),
    }),
});

export const {
    useHotelQuery,
    useHotelsQuery,
    useUploadHotelImagesMutation,
    useDeleteHotelMutation,
    useCreateHotelMutation,
    useUpdateHotelMutation
} = hotelApi;