import { baseApi } from "../baseApi";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const postCertificateApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    // login
    certificateRequestPost: build.mutation({
      query: ({ data, route }) => ({
        url: `/certificate/${route}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Certificates"],
    }),
    certificateStatus: build.mutation({
      query: ({ data, route }) => ({
        url: `/certificate/${route}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Certificates"],
    }),
    createConsult: build.mutation({
      query: ({ data }) => ({
        url: `/certificate/specialist-referral`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Certificates"],
    }),
    getSingleCertificate: build.query({
      query: ({ id, route }: { id: string; route: string }) => {
        return {
          url: `/certificate/${route}/${id}`,
          method: "GET",
          headers: {
            Authorization: `${token}`, // Set the Authorization header with the token
          },
        };
      },
      providesTags: ["Certificate", "Certificates"],
    }),
    getAllCertificate: build.query({
      query: ({
        route,
        page = 1,
        limit,
        search,
      }: {
        route: string;
        page?: number;
        limit?: number;
        search?: string;
      }) => {
        return {
          url:
            page && limit
              ? `/certificate${
                  route && "/" + route
                }?page=${page}&limit=${limit}&search=${search}`
              : `/certificate${route && "/" + route}`,
          method: "GET",
          headers: {
            Authorization: `${token}`, // Set the Authorization header with the token
          },
        };
      },
      providesTags: ["Certificate", "Certificates"],
    }),
    updateCertificateStatus: build.mutation({
      query: ({
        route,
        id,
        requestStatus,
      }: {
        route: string;
        id: string;
        requestStatus: "APPROVED" | "PENDING" | "REJECTED" | "REFUNDED";
      }) => ({
        url: `/certificate/${route}/${id}`,
        method: "PATCH",
        body: { requestStatus: requestStatus },
      }),
      invalidatesTags: ["Certificates"],
    }),
    checkCertificateStatus: build.query({
      query: ({ route, id }: { route: string; id: string }) => ({
        url: `/certificate/${route}/${id}`,
        method: "GET",
      }),
      providesTags: ["Certificates", "Certificate"],
    }),
    certificatePaymentStatus: build.query({
      query: ({ id }: { id: string }) => {
        return {
          url: `/payment/check-payment-status/${id}`,
          method: "GET",
          headers: {
            Authorization: `${token}`, // Set the Authorization header with the token
          },
        };
      },
      providesTags: ["Payment", "Certificates"],
    }),
    certificateRefNumber: build.query({
      query: ({ id }: { id: string }) => {
        return {
          url: `/certificate/certificate/information/${id}`,
          method: "GET",
          headers: {
            Authorization: `${token}`, // Set the Authorization header with the token
          },
        };
      },
      providesTags: ["Payment", "Certificates"],
    }),
    verificationCertificate: build.mutation({
      query: ({
        referenceNumber,
        lastName,
        email,
      }: {
        referenceNumber: string;
        lastName: string;
        email: string;
      }) => ({
        url: `/certificate/verify-certificate`,
        method: "POST",
        body: { referenceNumber, lastName, email },
      }),
      invalidatesTags: ["Certificates"],
    }),
  }),
});

export const {
  useVerificationCertificateMutation,
  useCertificateRequestPostMutation,
  useCertificateRefNumberQuery,
  useCertificateStatusMutation,
  useGetAllCertificateQuery,
  useGetSingleCertificateQuery,
  useCertificatePaymentStatusQuery,
  useCreateConsultMutation,
  useUpdateCertificateStatusMutation,
} = postCertificateApi;
