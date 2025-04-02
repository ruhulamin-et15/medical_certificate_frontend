import { baseApi } from "../baseApi";
import Cookies from "js-cookie";

const token = Cookies.get("token"); // Retrieve the token from cookies
const authApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getUserForAdmin: build.query({
      query: ({ searchTerm, page }: { searchTerm?: string; page: number }) => {
        return {
          url: `${
            searchTerm !== undefined && searchTerm.length > 0
              ? `/users?searchTerm=${searchTerm}&page=${page ? page : 1}`
              : `/users?page=${page ? page : 1}`
          }`,
          method: "GET",
          headers: {
            Authorization: `${token}`, // Set the Authorization header with the token
          },
        };
      },
      providesTags: ["Auth", "Users"],
    }),
    getSingleUserForAdmin: build.query({
      query: ({ id }: { id: string }) => {
        return {
          url: `/users/${id}`,
          method: "GET",
          headers: {
            Authorization: `${token}`, // Set the Authorization header with the token
          },
        };
      },
      providesTags: ["Auth", "Users"],
    }),
    getDashboardData: build.query({
      query: () => {
        return {
          url: `/certificate/dashboard`,
          method: "GET",
          headers: {
            Authorization: `${token}`, // Set the Authorization header with the token
          },
        };
      },
      providesTags: ["Auth", "Users"],
    }),

    // forgotten profile
    blockUserByAdmin: build.mutation({
      query: ({ id, status }: { id: string; status: string }) => ({
        url: `/users/update-user-profile/${id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: { status: status.toUpperCase() },
      }),
      invalidatesTags: ["Auth", "Users"],
    }),
    updateUserStatus: build.mutation<void, { id: string; status: string }>({
      query: ({ id, status }: { id: string; status: string }) => ({
        url: `/users/update-user-profile/${id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: { status: status.toUpperCase() },
      }),
      invalidatesTags: ["Auth", "Users"],
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useBlockUserByAdminMutation,
  useGetSingleUserForAdminQuery,
  useUpdateUserStatusMutation,
  useGetUserForAdminQuery,
} = authApi;
