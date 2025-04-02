import { baseApi } from "./baseApi";

import Cookies from "js-cookie";

const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // login
    contactUs: build.mutation({
      query: (data: { name: string; email: string; message: string }) => ({
        url: `/contact/send-email`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),

    getContact: build.query({
      query: () => {
        const token = Cookies.get("token"); // Retrieve the token from cookies

        // Return the API request configuration
        return {
          url: `/auth/user`,
          method: "GET",
          headers: {
            Authorization: `${token}`, // Set the Authorization header with the token
          },
        };
      },
      providesTags: ["Contact"],
    }),
  }),
});

export const { useContactUsMutation } = contactApi;
