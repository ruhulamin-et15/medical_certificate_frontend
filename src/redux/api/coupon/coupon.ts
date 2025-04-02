import { baseApi } from "../baseApi";

const couponApi = baseApi?.injectEndpoints({
  endpoints: (build) => ({
    // Get all active coupons
    getActiveCoupon: build.query({
      query: () => ({
        url: `/coupon`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Coupon"],
    }),

    // Create a new coupon
    createCoupon: build.mutation({
      query: ({ data }) => ({
        url: `/coupon/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coupon"],
    }),

    // Get all coupons
    getAllCoupon: build.query({
      query: () => ({
        url: `/coupon/all`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Coupon"],
    }),

    // Update a specific coupon (PUT)
    updateCoupon: build.mutation({
      query: ({ id, data }) => ({
        url: `/coupon/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Coupon"],
    }),

    // Activate or deactivate a coupon
    toggleActiveCoupon: build.mutation({
      query: (id) => ({
        url: `/coupon/active/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Coupon"],
    }),
    deleteCoupon: build.mutation({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const {
  useGetAllCouponQuery,
  useGetActiveCouponQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useToggleActiveCouponMutation,
  useDeleteCouponMutation,
} = couponApi;
