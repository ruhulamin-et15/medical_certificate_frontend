"use client";

import Loading from "@/components/ui/Loading";
import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

type ColumnConfig = {
  key: string;
  label: string;
  render?: (value: any, item?: any) => React.ReactNode;
  maxWidth?: string; // Optional maxWidth for custom column styling
};

type SortConfig = {
  key: string;
  direction: "asc" | "desc";
};

interface DynamicTableProps {
  data: any[];
  columns: ColumnConfig[];
  className?: string;
  isFetching?: boolean;
  isLoading?: boolean;
  currentPage: number;
  pageSize: number;
}

export default function DTable({
  data,
  columns,
  className = "",
  isFetching,
  isLoading,
  currentPage,
  pageSize,
}: DynamicTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // Sort data based on sortConfig
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Toggle sorting direction or set a new sortConfig
  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Render each cell and calculate SL based on current page and page size
  const renderCell = (item: any, column: ColumnConfig, index: number) => {
    if (column.key === "SL") {
      const slIndex = (currentPage - 1) * pageSize + index + 1;
      return sortConfig?.key === "SL" && sortConfig.direction === "desc"
        ? sortedData.length - index
        : slIndex;
    }
    return column.render
      ? column.render(item[column.key], item)
      : item[column.key];
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-3 py-4 font-medium text-gray-900 cursor-pointer hover:bg-gray-100 ${
                  column.key === "SL" ? "max-w-[70px] w-[70px]" : ""
                }`}
                onClick={() => requestSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.label}
                  {sortConfig?.key === column.key ? (
                    sortConfig.direction === "asc" ? (
                      <FaAngleUp className="w-4 h-4" />
                    ) : (
                      <FaAngleDown className="w-4 h-4" />
                    )
                  ) : (
                    <div className="w-4 h-4"></div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {!(isLoading || isFetching || sortedData?.length <= 0) &&
            sortedData.map((item, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-white hover:bg-blue-100"
                    : "bg-blue-50 hover:bg-blue-100"
                }
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`pl-3 pr-2 py-2 lg:py-4 ${
                      column.key === "SL" ? "max-w-[70px] w-[70px]" : ""
                    }`}
                  >
                    {renderCell(item, column, index)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      {
        // Check if it's loading or fetching and show the loader
        isLoading || isFetching ? (
          <div className="min-h-[500px] flex items-center">
            <Loading />
          </div>
        ) : // If not loading/fetching and there are no items, show "No items found."
        sortedData?.length === 0 && !(isLoading || isFetching) ? (
          <div className="min-h-[500px] flex items-center justify-center text-center">
            No items found.
          </div>
        ) : null
      }
    </div>
  );
}
