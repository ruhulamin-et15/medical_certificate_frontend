"use client";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import Link from "next/link";
import React, { useMemo, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import DTable from "./DTable";
import { usePathname } from "next/navigation";

interface DataTableProps {
  data: any[];
  totalPage: number;
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  searchQuery: string; // New prop for search query
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>; // New prop for search query setter
}
const DataTable: React.FC<DataTableProps> = ({
  data,
  totalPage,
  totalCount,
  currentPage,
  itemsPerPage,
  setCurrentPage,
  searchQuery,
  setSearchQuery,
}) => {
  const path = usePathname();
  const filteredData = useMemo(
    () =>
      data?.filter(
        (item) =>
          item?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.orderId?.toString().includes(searchQuery) ||
          item?.phone?.includes(searchQuery) ||
          item?.email?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [data, searchQuery]
  );

  const totalFilteredPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData;

  useEffect(() => {
    // Reset to the first page when the search query changes
    setCurrentPage(1);
  }, [searchQuery, setCurrentPage]);

  const columns = [
    { key: "SL", label: "SL" },
    {
      key: "fullName",
      label: "Full Name",
      render: (_value: string, item: any) =>
        `${item.firstName} ${item.lastName}`,
    },
    { key: "email", label: "Email" },
    { key: "amount", label: "Amount" },
    {
      key: "createdAt",
      label: "Date",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "requestStatus",
      label: "Request Status",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === "PENDING"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (_value: any, item: any) => (
        <Link href={`${path}/${item.id}`}>
          <Button className="px-3 py-1 text-white rounded">View</Button>
        </Link>
      ),
    },
  ];

  useEffect(() => {
    // Reset to the first page when the search query changes
    setCurrentPage(1);
  }, [searchQuery, setCurrentPage]);

  return (
    <div className="flex flex-col justify-between max-h-[calc(100vh-130px)] overflow-y-auto space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2 my-4">
        <Link href="/dashboard/all-certificates">
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
            <FaSearch />
          </button>
        </div>
      </div>

      <DTable
        currentPage={currentPage}
        pageSize={itemsPerPage}
        data={searchQuery.length > 0 ? currentItems : data}
        columns={columns}
        className="shadow-md rounded-lg"
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPage ? totalPage : totalFilteredPages} // Use filtered pages
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        dataLength={totalCount}
        startIndex={startIndex + 1}
        endIndex={Math.min(endIndex, totalCount)}
      />
    </div>
  );
};

export default DataTable;
