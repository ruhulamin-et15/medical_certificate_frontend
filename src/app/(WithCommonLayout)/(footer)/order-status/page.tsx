"use client";
import Button from "@/components/ui/Button";
import DSelect from "@/components/ui/DFields/DSelect";
import React, { useState } from "react";
import certificate from "../../../../../public/cardData.json";
import DInput from "@/components/ui/DFields/DInput";
import baseApiHandler from "@/utils/baseApiHandler";

const OrderStatus = () => {
  const [data, setData] = useState<any>(null); // Initial data state set to null
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const handleCirtificatOrderSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(null); // Clear previous errors

    const form = new FormData(e.currentTarget);
    const route = (form.get("find_order") as string)?.trim();
    const id = (form.get("cirtificate-order") as string)?.trim();

    try {
      const response = await fetch(
        `${baseApiHandler()}/certificate/${route}/${id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("No order found. Please try again.");
      }

      const data = await response.json();
      setData(data?.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setData(null);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const options = certificate.map((a) => {
    const labels = a.id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return { value: a.id, label: labels };
  });

  return (
    <div className="min-h-[400px] mx-5 mb-10">
      <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] mt-10 text-center">
        Check your Certificate Order Status
      </h1>
      <h3 className="text-center px-3 my-3">
        (Make sure your certificate title is the same as your applied
        certificate title.)
      </h3>
      <form
        onSubmit={handleCirtificatOrderSubmit}
        className="flex flex-col max-w-xl mx-auto items-center gap-2 mt-4"
      >
        <DSelect
          label="Please select your Certificate"
          options={options}
          id="find_order"
          required
          className="w-full max-w-xl rounded-md border !border-gray-300 !border-b-black/70"
          name="find_order"
        />
        <DInput
          label="Enter your order Id"
          id="cirtificate-order"
          name="cirtificate-order"
          autoComplete="on"
          type="text"
          placeholder="Enter your order ID"
          className="!max-w-xl"
          required
        />
        <Button type="submit" className="px-4 mt-5">
          {loading ? "Loading..." : "Check Order Status"}
        </Button>
      </form>

      {error && <p className="text-center text-red-600 mt-4">{error}</p>}

      {data && !error && !loading && (
        <div className="flex flex-col items-center mt-10 py-16 bg-gradient-to-b from-primary/10 to-primary/5 p-6">
          <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-8 md:p-12 lg:p-16">
            <h1 className="text-3xl font-bold text-center mb-6">
              Order Status
            </h1>

            <table className="w-full text-left table-auto border-separate border-spacing-y-0 border">
              <tbody>
                {[
                  {
                    label: "Name",
                    value: `${data?.firstName} ${data?.lastName}`,
                  },
                  { label: "Email", value: data?.email },
                  {
                    label: "Request Status",
                    value: (
                      <span
                        className={`${
                          data?.requestStatus === "PENDING"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {data?.requestStatus}
                      </span>
                    ),
                  },
                  {
                    label: "Priority Level",
                    value: data?.priorityOption?.replace("_", " "),
                  },
                  { label: "Amount", value: `£${data?.amount}` },
                  {
                    label: "Applied At",
                    value: new Date(data?.createdAt).toLocaleDateString(),
                  },
                  {
                    label: "Last Updated",
                    value: new Date(data?.updatedAt).toLocaleDateString(),
                  },
                ].map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-primary/10" : "bg-white"
                    } rounded-lg`}
                  >
                    <td className="px-4 py-2 font-semibold">{item.label}</td>
                    <td className="px-4 py-2">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
