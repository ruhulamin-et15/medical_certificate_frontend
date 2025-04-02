import baseApiHandler from "@/utils/baseApiHandler";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseApiUrl = baseApiHandler();
// Define a service using a base URL and expected endpoints
// Example of an API endpoint
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
    prepareHeaders: (headers: Headers) => {
      const localToken = localStorage.getItem("token");
      const cookieToken = Cookies.get("token");
      if (localToken || cookieToken) {
        headers.set(
          "authorization",
          `${cookieToken ? cookieToken : localToken}`
        );
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: () => ({}),
  tagTypes: [
    "Users",
    "Auth",
    "Contact",
    "Certificates",
    "Certificate",
    "Payment",
    "TotalEarning",
    "TodaysEarning",
    "Coupon"
  ],
});
