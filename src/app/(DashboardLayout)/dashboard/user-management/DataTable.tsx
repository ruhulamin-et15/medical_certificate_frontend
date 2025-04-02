"use client";

import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import DTable from "@/components/ui/table/DTable";
import { useGetUserForAdminQuery } from "@/redux/api/admin/user.api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const DataTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const {
    data: usersResponse,
    isLoading,
    isFetching,
  } = useGetUserForAdminQuery({
    searchTerm: searchQuery,
    page: currentPage,
  });

  const data = !isLoading
    ? usersResponse?.data?.data?.map((user: any) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName || ""}`.trim(),
        email: user.email,
        phone: user.phone || "N/A",
        status: user.status?.toLowerCase() || "blocked",
      }))
    : [];

  const meta = usersResponse?.data?.meta;
  const itemsPerPage = meta?.limit || 20;
  const totalPages = Math.ceil(meta?.total / itemsPerPage);

  // console.log(meta?.limit);

  const columns = [
    { key: "SL", label: "SL" },
    { key: "name", label: "Name" },
    { key: "id", label: "ID" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === "active"
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
      render: (_: any, item: any) => (
        <Link href={`${pathname}/${item.id}`} passHref>
          <button className="px-3 py-1 text-xs font-semibold bg-primary text-white rounded-md hover:bg-primary/70">
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
            className="px-4 py-2 border border-transparent bg-primary text-white rounded-r-md hover:bg-primary-hover"
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
        dataLength={meta?.total}
        startIndex={(currentPage - 1) * itemsPerPage + 1}
        endIndex={Math.min(currentPage * itemsPerPage, meta?.total)}
      />
    </div>
  );
};
export default DataTable;
