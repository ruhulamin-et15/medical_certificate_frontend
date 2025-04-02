import { baseApi } from "../baseApi";
import Cookies from "js-cookie";

export interface PaymentType {
  items: [
    {
      price_data: {
        currency: "gbp";
        product_data: {
          name: string;
        };
        unit_amount: number;
      };
      quantity: 1;
    }
  ];
  orderId: string;
}
const token = Cookies.get("token"); // Retrieve the token from cookies
const paymentApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    // login
    paymentCertificate: build.mutation({
      query: ({ data, id }: { data: PaymentType; id?: string | number }) => {
        const headers: Record<string, string> = {};

        // Conditionally add the Authorization header if token exists
        if (token) {
          headers.Authorization = token;
        }

        return {
          url: `/payment/create/${data.orderId}/${id ? id : "0"}`,
          method: "POST",
          body: data,
          headers,
        };
      },
      invalidatesTags: ["Payment"],
    }),

    getPaymentStatus: build.query({
      query: ({ paymentId }: { paymentId: string }) => {
        return {
          url: `/payment/retrive-payment/${paymentId}`,
          method: "GET",
          headers: {
            Authorization: `${token}`, // Set the Authorization header with the token
          },
        };
      },
      providesTags: ["Payment"],
    }),
    totalEarningAdmin: build.query({
      query: () => {
        return {
          url: `/payment/total-earnings`,
          method: "GET",
          headers: {
            Authorization: `${token}`, // Set the Authorization header with the token
          },
        };
      },
      providesTags: ["Payment", "TotalEarning"],
    }),
    todayEarningAdmin: build.query({
      query: () => {
        return {
          url: `/payment/today-earnings`,
          method: "GET",
        };
      },
      providesTags: ["Payment", "TotalEarning"],
    }),
    getLoggedInUserInvoice: build.query({
      query: () => {
        return {
          url: `/payment/logged-user-transactions`,
          method: "GET",
          headers: {
            Authorization: `${token ? token : ""}`, // Set the Authorization header with the token
          },
        };
      },
      providesTags: ["Payment"],
    }),
    getLoggedInUserSingleInvoice: build.query({
      query: (id) => {
        return {
          url: `/payment/transaction/${id}`,
          method: "GET",
          headers: {
            Authorization: `${token}`, // Set the Authorization header with the token
          },
        };
      },
      providesTags: ["Payment"],
    }),
  }),
});

export const {
  usePaymentCertificateMutation,
  useGetLoggedInUserInvoiceQuery,
  useGetLoggedInUserSingleInvoiceQuery,
  useGetPaymentStatusQuery,
  useTodayEarningAdminQuery,
  useTotalEarningAdminQuery,
} = paymentApi;
