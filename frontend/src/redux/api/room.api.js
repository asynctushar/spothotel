import { baseApi } from './baseApi';

export const hotelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        room: builder.query({
            query: (id) => ({
                url: '/rooms/' + id,
                method: 'GET',
            }),
            providesTags: (_, __, id) => [{ type: "Room", id }]
        }),
        uploadRoomImages: builder.mutation({
            query: ({ id, formData }) => ({
                url: "/rooms/" + id + "/images",
                method: "PUT",
                body: formData
            }),
            invalidatesTags: (_, __, { id }) => ["Hotel", { type: "Room", id }]
        }),
        deleteRoom: builder.mutation({
            query: (id) => ({
                url: "/rooms/" + id,
                method: "DELETE"
            }),
            invalidatesTags: (_, __, id) => ["Hotel", { type: "Room", id }]
        }),
        createRoom: builder.mutation({
            query: ({ formData, id }) => ({
                url: "/hotels/" + id + "/rooms",
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["Hotel", "Room"]
        }),
        updateRoom: builder.mutation({
            query: ({ id, formData }) => ({
                url: "/rooms/" + id,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: (_, __, { id }) => ["Hotel", { type: "Room", id }]
        }),
    }),
});

export const {
    useRoomQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation,
    useDeleteRoomMutation,
    useUploadRoomImagesMutation
} = hotelApi;