import { baseApi } from "../baseApi";
import Cookies from "js-cookie";

const token = Cookies.get("token"); // Retrieve the token from cookies
const transictionsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getAllTransitions: build.query({
      query: ({
        search,
        page,
        limit,
      }: {
        search?: string;
        page: number;
        limit: number;
      }) => {
        return {
          url: `${
            search !== undefined && search.length > 0
              ? `/payment?search=${search}&page=${page ? page : 1}&limit=${
                  limit ? limit : 20
                }`
              : `/payment?page=${page ? page : 1}&limit=${limit ? limit : 20}`
          }`,
          method: "GET",
          headers: {
            Authorization: `${token}`, // Set the Authorization header with the token
          },
        };
      },
      providesTags: ["Payment", "TotalEarning"],
    }),
    getSingleTransition: build.query({
      query: ({ id }: { id: string }) => {
        return {
          url: `/payment/single-transaction/${id}`,
          method: "GET",
          headers: {
            Authorization: `${token}`, // Set the Authorization header with the token
          },
        };
      },
      providesTags: ["Payment", "TotalEarning"],
    }),
  }),
});

export const { useGetAllTransitionsQuery, useGetSingleTransitionQuery } =
  transictionsApi;
