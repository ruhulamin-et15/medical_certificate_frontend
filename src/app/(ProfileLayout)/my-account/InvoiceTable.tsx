import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import Link from "next/link";
import React, { useState } from "react";
import { FaCopy } from "react-icons/fa6";

const InvoiceTable = ({
  data,
  isLoading,
}: {
  data: any[];
  isLoading: boolean;
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (id: string, idx: number) => {
    navigator.clipboard.writeText(id);
    setCopiedIndex(idx); // Only show tooltip for the clicked index
    setTimeout(() => setCopiedIndex(null), 1500); // Hide after 1.5 seconds
  };

  // console.log(data);

  return (
    <div>
      {!data && !isLoading ? (
        <p>No Records Found</p>
      ) : (
        <div className="overflow-x-auto min-h-20 relative">
          {isLoading && (
            <div className="w-full h-full inset-0 bg-black/30 flex items-center justify-center absolute left-0 top-0">
              <Loading />
            </div>
          )}
          <table className="min-w-full bg-white border border-gray-300 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border-b">Order ID</th>
                <th className="px-3 py-2 text-left border-b">Product Name</th>
                <th className="px-3 py-2 border-b">Total Amount</th>
                <th className="px-3 py-2 border-b">Payment Status</th>
                <th className="px-3 py-2 border-b">Payment Method</th>
                <th className="px-3 py-2 border-b">Date</th>
                <th className="px-3 py-2 border-b">Action</th>
              </tr>
            </thead>

            <tbody>
              {!data || data.length === 0 ? (
                <tr>
                  <td className="px-3 py-2 text-center">No data available</td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td
                      className="px-3 py-2 border-b relative group underline cursor-pointer"
                      onClick={() => handleCopy(item.orderId, idx)}
                    >
                      {/* Display truncated orderId */}
                      {item.orderId.slice(0, item.orderId.length - 18)}...
                      {/* Copy Icon - appears on hover */}
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <FaCopy className="text-gray-500 hover:text-gray-700" />
                      </span>
                      {/* Tooltip for "Copied!" message - only shown if copiedIndex matches the current index */}
                      {copiedIndex === idx && (
                        <span
                          className="absolute w-20 bg-gray-700 text-white text-xs px-2 py-1 rounded-lg transform -translate-x-1/2 -translate-y-8"
                          style={{
                            left: "50%",
                          }}
                        >
                          Order ID copied!
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 border-b ">{item.productName}</td>
                    <td className="px-3 py-2 border-b text-center">
                      {item.currency.toUpperCase()} {item.totalAmount}
                    </td>
                    <td className="px-3 py-2 border-b text-center">
                      {item.paymentStatus}
                    </td>
                    <td className="px-3 py-2 border-b text-center">
                      {item.paymentMethod}
                    </td>
                    <td className="px-3 py-2 border-b text-center">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2 border-b text-center">
                      <Link href={`/my-account/${item.id}`}>
                        <Button size="small" className="text-sm py-[2px] px-3">
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InvoiceTable;
