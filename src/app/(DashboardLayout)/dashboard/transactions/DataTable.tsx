"use client";

import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import DTable from "@/components/ui/table/DTable";
import { useGetAllTransitionsQuery } from "@/redux/api/admin/transitions";
import { formatDate } from "@/utils/formateDate";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const DataTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const itemsPerPage = 20;
  const {
    data: paymentResponse,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useGetAllTransitionsQuery({
    search: searchQuery,
    page: currentPage,
    limit: itemsPerPage,
  });

  const data = !isLoading
    ? paymentResponse?.data?.transactions?.map((payment: any) => ({
        id: payment.orderId,
        name: `${payment?.customerDetails?.name} ${
          payment?.customerDetails?.lastName || ""
        }`.trim(),
        paymentId: payment?.id,
        email: payment?.customerDetails?.email,
        phone: payment?.customerDetails?.phone || "N/A",
        status: payment.paymentStatus?.toLowerCase() || "Not Paid",
        date: formatDate(payment?.createdAt) || "",
        amount:
          `${(payment?.totalAmount / 100).toFixed(
            2
          )} (${payment?.currency.toUpperCase()})` || "",
      }))
    : [];

  const totalPages = paymentResponse?.data?.totalPages || 1;

  // (paymentResponse);

  const columns = [
    { key: "SL", label: "SL" },
    { key: "name", label: "User" },
    { key: "email", label: "Email" },
    { key: "id", label: "Order ID" },
    { key: "paymentId", label: "Payment Id" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === "paid"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (_data: any, item: any) => (
        <Link href={`${pathname}/${item?.paymentId}`} passHref>
          <button className="px-3 py-1 text-xs font-semibold bg-button text-white rounded-md hover:bg-button/70">
            View
          </button>
        </Link>
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-between max-h-[calc(100vh-130px)] overflow-y-auto space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2  my-4">
        <Link href={"/dashboard/certificate-requests"}>
          <Button
            size="static"
            className="bg-gray-50 !rounded-md border border-gray-300 text-gray-600 font-medium text-sm"
          >
            {"<"} Back
          </Button>
        </Link>
        <div className="flex max-h-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, order ID, phone, email"
            className="px-3 py-2 w-auto outline-none rounded-l-md text-gray-700"
          />
          <button
            onClick={() => setCurrentPage(1)}
            className="px-4 py-2 border border-transparent bg-button text-white rounded-r-md hover:bg-button-hover"
          >
            {!isFetching ? (
              <FaSearch />
            ) : (
              <div
                className={`animate-spin border border-b-transparent border-t-white h-4 w-4 rounded-full`}
              />
            )}
          </button>
        </div>
      </div>

      <DTable
        currentPage={currentPage}
        pageSize={itemsPerPage}
        isLoading={isLoading}
        isFetching={isFetching}
        data={data}
        columns={columns}
        className="shadow-md rounded-lg"
      />

      <Pagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        dataLength={paymentResponse?.data?.totalCount || 0} // Ensure dataLength is derived from actual data array length
        startIndex={(currentPage - 1) * itemsPerPage + 1}
        endIndex={Math.min(
          currentPage * itemsPerPage,
          paymentResponse?.data?.totalCount || 0
        )}
      />
    </div>
  );
};
export default DataTable;
