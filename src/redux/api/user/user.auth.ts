import { User } from "@/lib/interface/user.interface";
import { baseApi } from "../baseApi";
import {
  LoginUserInterface,
  RegisterUserInterface,
} from "./user.auth.interface";
import Cookies from "js-cookie";

const authApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    // login
    login: build.mutation({
      query: (data: LoginUserInterface) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // register
    register: build.mutation({
      query: (data: RegisterUserInterface) => {
        // // (data, "redux");
        return {
          url: `/users/register`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth", "Users"],
    }),
    getLoggedInUser: build.query({
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
      providesTags: ["Auth"],
    }),

    // forgotten profile
    forgottenPassword: build.mutation({
      query: (data: { email: string; baseUrl: string }) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // change password
    changePassword: build.mutation({
      query: (data: {
        email: string;
        priviousPassword: string;
        newPassword: string;
      }) => ({
        url: `/auth/change-password`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    resetPassword: build.mutation({
      query: (data: { password: string; token: string; id: string }) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    updateUserProfile: build.mutation({
      query: (data: User) => ({
        url: `/users/user-profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Auth", "Users"],
    }),
    couponValidation: build.mutation({
      query: ({ codeKey }: { codeKey: string }) => ({
        url: `/coupon/valid`,
        method: "POST",
        body: { codeKey },
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgottenPasswordMutation,
  useChangePasswordMutation,
  useCouponValidationMutation,
  useGetLoggedInUserQuery,
  useResetPasswordMutation,
  useUpdateUserProfileMutation,
} = authApi;
