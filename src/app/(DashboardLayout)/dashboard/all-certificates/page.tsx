"use client";

import AnimateHeader from "@/components/ui/AnimateHeader";
import certificated from "../../../../../public/cardData.json";
import Table from "@/components/ui/table/Table";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import baseApiHandler from "@/utils/baseApiHandler";
import Loading from "@/components/ui/Loading";

const token = Cookies.get("token");

const itemsPerPage = 20;

function ProvidCertificates() {
  const data = certificated;

  const startIndex = (1 - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [certificateData, setCertificateData] = useState<any>([]);

  // Adding the pending field to the sliced data directly
  const currentItems = data
    .slice(startIndex, endIndex)
    .map((cert: any, idx: number) => ({
      ...cert,
      pending:
        certificateData[idx]?.result?.filter(
          (data: any) => data.requestStatus === "PENDING"
        ).length ?? 0, // Add Pending status
      rejected:
        certificateData[idx]?.result?.filter(
          (data: any) => data.requestStatus === "REJECTED"
        ).length ?? 0, // Add Pending status
      refunded:
        certificateData[idx]?.result?.filter(
          (data: any) => data.requestStatus === "REFUNDED"
        ).length ?? 0, // Add Pending status
      approved:
        certificateData[idx]?.result?.filter(
          (data: any) => data.requestStatus === "APPROVED"
        ).length ?? 0, // Add Pending status
    }));

  // (currentItems);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // (currentItems);

  useEffect(() => {
    const fetchCertificateData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const certificatePromises = certificated.map(async (cert) => {
          const certificateId = cert.id.trim(); // Ensures there are no leading/trailing spaces
          return await fetch(
            `${baseApiHandler()}/certificate/${certificateId}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          ).then((res) => {
            if (!res.ok)
              throw new Error(
                `Failed to fetch certificate ID: ${certificateId}`
              );
            return res.json();
          });
        });

        const results: any[] = await Promise.all(certificatePromises);
        const allCertificates = results
          .map((response: any) => response.data)
          .flat();

        setCertificateData(allCertificates); // Set the data with the new field
      } catch (err: any) {
        console.error("Error fetching certificates:", err);
        setError(
          err.message || "An error occurred while loading certificates."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificateData();
  }, []);

  const headers = [
    { label: "Image", key: "imageUrl" },
    { label: "Title", key: "title" },
    { label: "Price", key: "price" },
    { label: "Pending", key: "pending", isCustom: true }, // Custom column
    { label: "Rejected", key: "rejected", isCustom: true }, // Custom column
    { label: "Refunded", key: "refunded", isCustom: true }, // Custom column
    { label: "Approved", key: "approved", isCustom: true }, // Custom column
  ];
  return (
    <div className="w-full">
      <AnimateHeader
        className="mb-5 text-primary"
        words={"Select Certificate".split(" ")}
        center
      />

      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="w-full min-h-80 flex h-full justify-center items-center">
          Something went wrong.
        </div>
      ) : (
        <Table headers={headers} items={currentItems} />
      )}
      {/* Use the updated currentItems */}
    </div>
  );
}

export default ProvidCertificates;
