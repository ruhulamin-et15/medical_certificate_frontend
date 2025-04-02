"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, X } from "lucide-react";
import copy from "clipboard-copy";
import { useGetActiveCouponQuery } from "@/redux/api/coupon/coupon";
import { useUser } from "@/lib/provider/UserProvider";

export default function Coupon() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { user } = useUser();
  const handleCopyClick = async (text: string) => {
    try {
      await copy(text);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };
  const isAdmin = user?.role === "ADMIN";
  const { data: coupon, isLoading: loading } =
    useGetActiveCouponQuery(undefined);

  useEffect(() => {
    const intervalTime = 600000; // 10 minutes in milliseconds

    // Function to open the modal and update localStorage
    const openModal = () => {
      setIsOpen(true);
      localStorage.setItem("lastModalTime", Date.now().toString());
    };

    // Check if modal should be opened based on the last stored time
    const checkModal = () => {
      const lastModalTime = localStorage.getItem("lastModalTime");
      const currentTime = Date.now();

      // Open modal if it’s been 10 minutes since the last time
      if (
        !lastModalTime ||
        currentTime - parseInt(lastModalTime, 10) >= intervalTime
      ) {
        openModal();
      }
    };

    // Set an interval to check every 10 minutes
    const interval = setInterval(checkModal, intervalTime);

    // Run the check on component mount
    checkModal();

    return () => clearInterval(interval);
  }, []);

  const closeModal = () => setIsOpen(false);

  function checkValidity(validTill: string): string {
    const currentDate = new Date();
    const expiryDate = new Date(validTill);

    if (currentDate > expiryDate) {
      return "Expired";
    } else {
      // Format the date to be human-readable
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };

      const formattedExpiryDate = expiryDate.toLocaleString("en-US", options);
      return `Valid till ${formattedExpiryDate}`;
    }
  }

  return (
    <AnimatePresence>
      {!loading && isOpen && coupon?.data && !isAdmin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex max-md:items-center  md:pt-40  justify-center p-4 z-50"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-primary w-full lg:w-[500px] h-[250px] max-w-[400px] rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 w-full flex justify-center items-center flex-col gap-4 md:gap-5">
              <div className="flex items-center w-full justify-center">
                <h2 className="text-center text-2xl font-bold text-primary w-fit bg-white px-4 py-3">
                  FLASH SALE
                </h2>
              </div>
              <div className="flex flex-col items-center space-y-4 text-white">
                <p className="text-center text-sm md:text-lg font-semibold  uppercase">
                  <span className="text-2xl">{coupon?.data.discount}% </span>{" "}
                  DISCOUNT {checkValidity(coupon?.data.valid)}
                </p>
                <div className="flex justify-center items-center gap-3 text-white">
                  <div className="border-2 border-dashed border-white px-4 py-2">
                    <p className="text-lg font-semibold">
                      Code: {coupon?.data.codeKey}
                    </p>
                  </div>
                  <motion.div
                    key={isCopied ? "check" : "copy"}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="cursor-pointer"
                  >
                    {isCopied ? (
                      <Check />
                    ) : (
                      <Copy
                        onClick={() => handleCopyClick(coupon.data.codeKey)}
                      />
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
            <button
              className="absolute right-4 top-4 text-white opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-sm transition-opacity"
              onClick={closeModal}
            >
              <X className="h-8 w-8" strokeWidth={3} />
              <span className="sr-only">Close</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
