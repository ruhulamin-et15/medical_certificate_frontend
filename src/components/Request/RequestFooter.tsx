"use client";
import React, { useState } from "react";
// import stripButton from "../../assets/image/tgc-stripe-button.png";
// import Image from "next/image";
// import Input from "../ui/Input";
import Button from "../ui/Button";
import DRadioGroup from "../ui/DFields/DRadio";
import RequestTerms from "./RequestTerms";
import { AnimatePresence, motion } from "framer-motion";
// import { useCouponValidationMutation } from "@/redux/api/user/user.auth";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const RequestFooter = ({}: // price,
// setFinalPrice,
{
  price: number;
  setFinalPrice: (e: number) => void;
}) => {
  // const [coupon, setCupon] = useState("");
  // const [couponFinal, setCuponFinal] = useState("");
  // const [cuponErr, setCuponErr] = useState("");
  // const [isCurrectCupon, setisCurrectCupon] = useState(false);
  // const [priceResult, setPriceResult] = useState<number>(price);

  // const [checkValidCoupon, { isLoading, data, error }] =
  //   useCouponValidationMutation();

  // const handleApplyCoupon = async () => {
  //   if (!coupon) {
  //     setCuponErr("Please enter Coupon code");
  //     setFinalPrice(price); // Set final price without any discount
  //     return;
  //   }

  //   setCuponFinal(coupon);
  //   setCuponErr(""); // Clear any previous error messages

  //   try {
  //     // Call the coupon validation mutation
  //     await checkValidCoupon({ codeKey: coupon });
  //   } catch (err) {
  //     console.error("Unexpected error during coupon validation", err);
  //     setCuponErr("An unexpected error occurred. Please try again.");
  //   }
  // };

  // Use useEffect to monitor changes in 'data' from the mutation response
  // useEffect(() => {
  //   if (data?.data) {
  //     const couponData = data.data;

  //     // Check if the response data contains a valid coupon code
  //     if (couponData.codeKey === couponFinal) {
  //       setisCurrectCupon(true); // Update state to indicate valid coupon
  //       // (couponData); // Confirm data received

  //       const priceInCents = Math.round(price * 100); // Convert the price to cents
  //       const percentage = couponData.discount ?? 0; // Define discount percentage
  //       const discountAmount = Math.round((percentage / 100) * priceInCents); // Calculate discount in cents

  //       const finalPriceInCents = priceInCents - discountAmount; // Subtract discount from price
  //       const finalPrice = finalPriceInCents / 100; // Convert back to dollars if needed for display

  //       // Update state for Stripe and display values
  //       setPriceResult(discountAmount / 100); // Set the discount in dollars for display
  //       setFinalPrice(finalPrice);
  //     }
  //   } else if (error) {
  //     // Handle errors when 'data' is not valid
  //     if ((error as FetchBaseQueryError)?.data) {
  //       const errorData = (error as FetchBaseQueryError).data as {
  //         message?: string;
  //       };
  //       setCuponErr(errorData.message || "Invalid coupon code");
  //     } else {
  //       setCuponErr("An unexpected error occurred. Please try again.");
  //     }
  //   }
  // }, [couponFinal, data, error, price, setFinalPrice]);

  // (isCurrectCupon);
  const [accept, setAccept] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <section className="my-10">
      <h1 className="font-bold text-xl">Terms</h1>
      <hr className="border w-full border-gray-300 mt-3 mb-10" />
      <RequestTerms />
      <div>
        <div className="my-10">
          <DRadioGroup
            label="Do you agree to the above Terms?"
            id="terms"
            name="terms"
            onChange={(e) => setAccept(e)}
            options={[{ label: "Agree", value: "agree" }]}
            required
            className="mr-2"
          />
        </div>
        <div>
          {/* <h1 className="text-2xl">Coupon Code</h1>
          {!isCurrectCupon ? (
            <>
              <div className="flex items-center max-sm:flex-col gap-2">
                <Input
                  id="cupon-code"
                  name="cupon-code"
                  type="text"
                  onChange={(e) => setCupon(e.currentTarget.value)}
                  className="max-sm:mb-5 sm:max-w-[250px] h-fit"
                />
                <Button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={isLoading}
                  className="h-fit px-3 py-1 disabled:bg-primary/75 bg-primary rounded-md text-base text-white"
                >
                  Apply Coupon Code
                </Button>
                <div>
                  {isLoading && (
                    <div className="w-4 h-4 animate-spin border-l-primary border-r-primary border-t-primary rounded-full border border-b-white"></div>
                  )}
                </div>
              </div>
              <div className="text-red-500 mt-5">
                {cuponErr ? cuponErr : ""}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center my-5 gap-5">
                <div>
                  {coupon} {10}%
                </div>
                <Button
                  type="button"
                  className="bg-red-500 "
                  onClick={() => {
                    setCupon("");
                    setisCurrectCupon(false);
                  }}
                >
                  Remove Coupon
                </Button>
              </div>
              <table className="w-full font-medium border-collapse border border-gray-300 text-left">
                <tbody>
                  <tr>
                    <td className="font-bold p-4 border border-gray-300">
                      Subtotal
                    </td>
                    <td className="p-4 border border-gray-300 text-right">
                      £{price.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold p-4 border border-gray-300">
                      Discount
                    </td>
                    <td className="p-4 border border-gray-300 text-right">
                      £{priceResult.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold p-4 border border-gray-300">
                      Total
                    </td>
                    <td className="p-4 border border-gray-300 text-right">
                      £{(price - priceResult).toFixed(2)}
                      {/* <input
                        id="final-price"
                        name="final-price"
                        type="text"
                        disabled
                        className="bg-transparent text-right p-0 outline-none"
                        value={`${price - priceResult}`}
                      /> *
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )} */}
          <div className="w-fit mx-auto">
            {/* <button type="submit" className="">
              <Image
                alt=""
                className=" my-16 shadow-xl hover:shadow-lg active:shadow-md transition-shadow"
                src={stripButton}
              ></Image>
            </button> */}
            {/* <Button
              disabled={accept !== "agree"}
              type="submit"
              className="py-3 my-16 disabled:bg-primary/50 font-semibold px-6 text-lg md:text-xl md:px-10"
            >
              Pay now
            </Button> */}
            <div className="relative inline-block">
              {/* Button */}
              <Button
                type={accept !== "agree" ? "button" : "submit"}
                className={
                  "py-3  disabled:bg-primary/50 font-semibold px-6 text-lg md:text-xl md:px-10 relative" +
                  `${
                    accept !== "agree"
                      ? "cursor-not-allowed !bg-primary/50"
                      : ""
                  }`
                }
                onMouseEnter={() => {
                  if (accept !== "agree") setShowTooltip(true);
                }}
                onMouseLeave={() => setShowTooltip(false)}
              >
                Pay now
              </Button>

              {/* Tooltip Message */}
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute -top-20 w-[200px] -left-[50px] md:left-[-24px]  mb-2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-md"
                  >
                    Please accept the terms and conditions first.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestFooter;
