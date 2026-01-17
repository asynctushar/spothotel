import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        users: builder.query({
            query: () => ({
                url: "/users",
                method: "GET"
            }),
            providesTags: ["User"]
        }),
        changeUserRole: builder.mutation({
            query: ({ id, role }) => ({
                url: "/users/" + id,
                method: "PUT",
                body: { role }
            }),
            invalidatesTags: ["User"]
        })
    }),
});

export const {
    useUsersQuery,
    useChangeUserRoleMutation
} = userApi;