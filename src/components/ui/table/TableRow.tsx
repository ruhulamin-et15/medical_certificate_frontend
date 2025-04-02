"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Header {
  key: string;
  isCustom?: boolean; // Optional property for custom columns
}

interface TableRowProps {
  item: any;
  index: number;
  headers: Header[]; // Accept headers as props
}

const TableRow: React.FC<TableRowProps> = ({ item, index, headers }) => {
  const path = usePathname();
  return (
    <tr
      className={
        index % 2 === 0
          ? "bg-white hover:bg-blue-100"
          : "bg-blue-50 hover:bg-blue-100"
      }
    >
      <td className="whitespace-normal w-0 pl-6 py-4 text-sm ">{index + 1}.</td>
      {headers.map((header, headerIndex) => (
        <td
          key={header.key}
          className={`whitespace-nowrap px-2 py-2 ${
            headerIndex === 0 ? "w-0" : ""
          }`}
        >
          {header.key === "imageUrl" ? (
            <div className="h-12 w-12 relative">
              <Image
                src={item?.imageUrl}
                alt={item?.title}
                sizes="400"
                fill
                className="object-cover rounded"
              />
            </div>
          ) : header?.key === "approved" ? (
            <div className="w-fit text-center mx-auto items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              {item?.approved || 0} {/* Default to 0 if not set */}
            </div>
          ) : header?.key === "title" ? (
            <div className="px-4  xl:w-40">
              <Link
                className="text-primary underline hover:no-underline font-medium"
                href={`${path}/${item?.id}`}
              >
                {item[header?.key]}
              </Link>
            </div>
          ) : header?.key === "pending" ? (
            <div className="w-fit text-center mx-auto items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-600">
              {item?.pending || 0} {/* Default to 0 if not set */}
            </div>
          ) : header?.key === "rejected" ? (
            <div className="w-fit text-center mx-auto items-center rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-800">
              {item?.rejected || 0} {/* Default to 0 if not set */}
            </div>
          ) : header?.key === "refunded" ? (
            <div className="w-fit text-center mx-auto items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {item?.refunded || 0} {/* Default to 0 if not set */}
            </div>
          ) : (
            <div className="text-sm text-center font-medium text-gray-900">
              {item[header?.key]}
            </div>
          )}
        </td>
      ))}
      <td className="whitespace-nowrap text-center px-1 py-4 font-medium text-sm">
        <Link href={`${path}/${item?.id}`}>
          <button className="text-primary hover:no-underline underline">
            View All
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default TableRow;
