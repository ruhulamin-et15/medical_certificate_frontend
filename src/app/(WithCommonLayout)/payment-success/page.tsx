"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Loading from "@/components/ui/Loading";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { VscError } from "react-icons/vsc";
import Button from "@/components/ui/Button";
import { useGetPaymentStatusQuery } from "@/redux/api/payment/payment.api";
import InvoiceComponent from "@/components/ui/payment/InvoiceComponent";
import { FaPrint } from "react-icons/fa6";

const PaymentSuccess: React.FC = () => {
  const query = useSearchParams();
  const session_id = query.get("session_id"); // Extract session ID from query
  const [paymentData, setPaymentData] = useState<any>(null);
  const router = useRouter();
  const { data, isFetching, error, isLoading } = useGetPaymentStatusQuery({
    paymentId: session_id as string,
  });

  // Fetch payment data when session_id is available
  useEffect(() => {
    const getPaymentStatus = async () => {
      setPaymentData(data?.data);
    };
    if (session_id) {
      getPaymentStatus();
    }
  }, [data?.data, data?.status, isFetching, session_id]);

  // (data?.data);
  return (
    <div className="payment-success  container mt-20 mb-40">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center">
          {(data || !error) && (
            <div className="text-6xl print:hidden animate-pulse text-white bg-green-400 flex items-center justify-center rounded-full w-20 h-20">
              <IoMdCheckmarkCircleOutline />
            </div>
          )}
          <h1 className="font-bold print:hidden mt-3 mb-10 text-3xl">
            Payment Success
          </h1>
          {paymentData ? (
            // Call the Invoice component and pass the payment data as props
            <div className="print:pl-10">
              <div className="flex print:hidden justify-center max-w-xl mx-auto mb-10">
                <Button
                  className="flex items-center gap-2 text-xl px-5"
                  onClick={() => window.print()}
                >
                  <FaPrint />
                  Print Invoice
                </Button>
              </div>
              <InvoiceComponent info={paymentData} />
            </div>
          ) : (
            <div>
              {error ? (
                <div className="flex items-center flex-col">
                  <div className="text-6xl animate-pulse text-white bg-red-500 flex items-center justify-center rounded-full w-20 h-20">
                    <VscError />
                  </div>
                  <h1 className="font-bold mt-3 mb-10 text-3xl">
                    Payment Error
                  </h1>
                  <Button onClick={() => router.back()}>Try again</Button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
