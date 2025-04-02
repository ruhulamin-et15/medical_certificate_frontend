"use client";
import DForm from "@/components/page/request-certificate/Dform";
import Button from "@/components/ui/Button";
import DDatePicker from "@/components/ui/DFields/DDatePicker";
import DHeader from "@/components/ui/DFields/DHeader";
import DInput from "@/components/ui/DFields/DInput";
import Loading from "@/components/ui/Loading";
import {
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useGetAllCouponQuery,
  useToggleActiveCouponMutation,
  useUpdateCouponMutation,
} from "@/redux/api/coupon/coupon";
import React, { FormEvent, useState } from "react";

type Coupon = {
  name?: string;
  codeKey: string;
  discount: number;
  valid: Date;
};

type MetaData = {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const CouponPage = () => {
  const [code, setCode] = useState("");
  const [id, setId] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [expiryDate, setExpiryDate] = useState(new Date());

  const [postCoupon, { isLoading }] = useCreateCouponMutation();
  const [updateCoupon, { isLoading: updateDoing }] = useUpdateCouponMutation();
  const [activeCoupon, { isLoading: makingActive }] =
    useToggleActiveCouponMutation();
  const { data: allCoupons, isLoading: isCouponsLoading } =
    useGetAllCouponQuery(undefined);
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = (id: string) => {
    const couponToEdit = allCoupons?.data?.find(
      (coupon: Coupon & MetaData) => coupon.id === id
    );
    if (couponToEdit) {
      setCode(couponToEdit.codeKey);
      setDiscount(couponToEdit.discount);
      setExpiryDate(new Date(couponToEdit.valid));
      setId(couponToEdit.id);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setExpiryDate(date);
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      // const couponToEdit = allCoupons.data.find(
      //   (coupon: Coupon & MetaData) => coupon.id === id
      // );
      // console.log(couponToEdit);
      const data: Coupon = {
        codeKey: code,
        discount: discount,
        valid: expiryDate,
      };
      updateCoupon({ id, data })
        .unwrap()
        .then(() => {});
    } else {
      const data: Coupon = {
        codeKey: code,
        discount: discount,
        valid: expiryDate,
      };
      postCoupon({ data })
        .unwrap()
        .then(() => {});
    }
    setDiscount(0);
    setCode("");
    setExpiryDate(new Date());
  };

  const handleActive = (id: string) => {
    activeCoupon(id)
      .unwrap()
      
  };

  const [deleteCoupon] = useDeleteCouponMutation();

  const handleOpenModal = async () => {
    try {
      await deleteCoupon(id).unwrap();
      setOpenModal(false); // Close popup after action
      setDiscount(0);
      setCode("");
      setExpiryDate(new Date());
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div>
      <div>
        <DForm handleFormSubmit={handleFormSubmit} header={false}>
          <DHeader>Coupon Details</DHeader>
          <DInput
            id="coupon_code"
            name="coupon_code"
            label="Coupon Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <DInput
            id="discount"
            name="discount"
            label="Discount (%)"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            required
          />
          <DDatePicker
            id="expiry_date"
            name="expiry_date"
            label="Expiry Date"
            selectedDate={expiryDate}
            onChange={handleDateChange}
            required
            className="max-w-sm"
          />
          <div className="flex gap-4 max-sm:flex-col">
            <Button type="submit">{id ? "Update Coupon" : "Add Coupon"}</Button>
            {id && (
              <Button
                type="button"
                onClick={() => setOpenModal(true)}
                className="bg-red-500 focus:ring-red-500/30 hover:bg-red-700"
              >
                Delete Coupon
              </Button>
            )}
          </div>
        </DForm>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this coupon?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleOpenModal}
                className={`px-4 py-2 rounded 
                  bg-red-600 text-white hover:bg-red-700`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto relative mt-5">
        {isCouponsLoading || isLoading || updateDoing || makingActive ? (
          <div className="absolute w-full top-0 right-1/2 inset-0 bg-black/30">
            <Loading />
          </div>
        ) : (
          ""
        )}
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Code</th>
              <th className="py-2 px-4 border-b">Discount (%)</th>
              <th className="py-2 px-4 border-b">Expiry Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allCoupons?.data.map((coupon: Coupon & MetaData) => (
              <tr key={coupon.id}>
                <td className="py-2 px-4 border-b text-center">
                  {coupon.codeKey}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {coupon.discount}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {new Date(coupon.valid).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleEdit(coupon.id)}
                    className="bg-button text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleActive(coupon.id)}
                    className={` text-white px-3 py-1 w-24 rounded mr-2 ${
                      coupon.isActive ? "bg-button" : "bg-red-500"
                    }`}
                  >
                    {coupon.isActive ? "Active" : "InActive"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponPage;
