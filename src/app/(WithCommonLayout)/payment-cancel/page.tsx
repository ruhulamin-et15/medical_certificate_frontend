"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Loading from "@/components/ui/Loading";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { VscError } from "react-icons/vsc";
import Button from "@/components/ui/Button";
import { useGetPaymentStatusQuery } from "@/redux/api/payment/payment.api";

const PaymentCancel: React.FC = () => {
  const query = useSearchParams();
  const session_id = query.get("session_id"); // Extract session ID from query
  const { data, isFetching, error, isLoading } = useGetPaymentStatusQuery({
    paymentId: session_id as string,
  });
  const [paymentData, setPaymentData] = useState<any>(null);
  const router = useRouter();

  // Fetch payment data when session_id is available
  useEffect(() => {
    const getPaymentStatus = async () => {
      setPaymentData(data?.data);
    };
    if (session_id) {
      getPaymentStatus();
    }
  }, [data?.data, data?.status, isFetching, session_id]);

  return (
    <div className="payment-success  container mt-20 mb-40">
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center">
          {(data || !error) && (
            <div className="text-6xl animate-pulse text-white bg-green-400 flex items-center justify-center rounded-full w-20 h-20">
              <IoMdCheckmarkCircleOutline />
            </div>
          )}
          {paymentData ? (
            <div className="text-xl">
              <h1 className="font-bold mt-3 mb-10 text-3xl">Payment Success</h1>
              <p>
                <strong>Payment ID:</strong> {paymentData?.paymentId}
              </p>
              <p>
                <strong>Status:</strong> {paymentData?.paymentStatus}
              </p>
              <p>
                <strong>Amount:</strong> {paymentData?.totalAmount / 100}{" "}
                {paymentData?.currency}
              </p>
              <div className="flex justify-center mt-10">
                <Button>Download Invoice</Button>
              </div>
            </div>
          ) : (
            <div>
              {error && (
                <div className="flex items-center flex-col">
                  <div className="text-6xl animate-pulse text-white bg-red-500 flex items-center justify-center rounded-full w-20 h-20">
                    <VscError />
                  </div>
                  <h1 className="font-bold mt-3 mb-10 text-3xl">
                    Payment Error
                  </h1>
                  <Button onClick={() => router.back()}>Try again</Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentCancel;
