import { formatDate } from "@/utils/formateDate";
import React from "react";

interface InvoiceInfo {
  productName: string;
  id: string;
  orderId: string;
  customerDetails: {
    name: string;
    email: string;
    phone?: string;
  };
  totalAmount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  mode: string;
  createdAt: string;
}

const InvoiceComponent: React.FC<{ info: InvoiceInfo }> = ({ info }) => {
  // (info);
  return (
    <div
      className="bg-white p-16 h-[297mm] print:h-[150mm] print:p-0  mx-auto border border-black print:border-0"
      style={{
        printColorAdjust: "-moz-initial",
        WebkitPrintColorAdjust: "-moz-initial",
        page: "auto",
        width: "210mm",
      }}
    >
      {/* Invoice Title */}
      <h1 className="text-2xl font-semibold text-center print:-ml-20 mb-20">
        INVOICE
      </h1>

      {/* Company Information */}
      <div className="text-lg font-medium mb-2">MEDIC Team</div>

      {/* Payment Confirmation Heading */}
      <div className="text-base font-medium mb-2">
        Payment Confirmation for &#34;{info.productName}&#34; Certificate
        Request
      </div>

      {/* Payment and Order IDs */}
      <div className="text-sm mb-4">
        <p>Payment ID: {info?.id}</p>
        <p>Order ID: {info.orderId}</p>
        <p>Date: {formatDate(info.createdAt).split(" ")[0]}</p>
      </div>

      {/* User Information */}
      <div className="text-lg font-medium mb-2">User Information</div>
      <div className="text-sm mb-4">
        <p>Name: {info.customerDetails.name}</p>
        <p>Email: {info.customerDetails.email}</p>
        {info.customerDetails.phone && (
          <p>Phone: {info.customerDetails.phone}</p>
        )}
      </div>

      {/* Table for Payment Details */}
      <div className=" pt-2">
        <div className="flex text-sm font-medium border-b-2 border-black pb-1 mb-2">
          <span className="w-1/2">Field</span>
          <span className="w-1/2">Details</span>
        </div>

        {/* Table Rows */}
        <div className="border-b-2 px-2 text-lg border-black">
          <div className="flex pb-1 ">
            <span className="w-1/2">Payment Method</span>
            <span className="w-1/2 first-letter:uppercase">
              {info.paymentMethod}
            </span>
          </div>
          <div className="flex pb-1">
            <span className="w-1/2">Payment Status</span>
            <span className="w-1/2 first-letter:uppercase">
              {info.paymentStatus}
            </span>
          </div>
          <div className="flex pb-1">
            <span className="w-1/2">Mode</span>
            <span className="w-1/2 first-letter:uppercase">{info.mode}</span>
          </div>
          <div className="flex pb-1">
            <span className="w-1/2">Total Amount</span>
            <span className="w-1/2">
              {(info.totalAmount / 100).toFixed(2)}{" "}
              {info.currency.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceComponent;
