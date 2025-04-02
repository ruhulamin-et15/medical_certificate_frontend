"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import certificated from "../../../../../../public/cardData.json";
import Image from "next/image";
import SnapImg from "@/assets/image/png/awsnap.png";
import AnimateHeader from "@/components/ui/AnimateHeader";
import DataTable from "./DataTable";
import { useGetAllCertificateQuery } from "@/redux/api/certificate/certificate.post";
import Loading from "@/components/ui/Loading";

const Details = () => {
  const [showData, setShowData] = useState(false);
  const [route, setRoute] = useState("");
  const [title, setTitle] = useState("");
  const pathname = usePathname();
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search

  useEffect(() => {
    const foundCertificate = certificated.find((certificate) =>
      pathname?.includes(certificate.id)
    );
    if (foundCertificate) {
      setShowData(true);
      setTitle(foundCertificate.title);
      setRoute(foundCertificate.id);
    }
  }, [pathname]);



  const words = "Opps... Route Not Found".split(" ");
  const { data: certificateData, isLoading } = useGetAllCertificateQuery({
    route,
    limit: itemsPerPage,
    page: currentPage,
    search: searchQuery, // Include search query
  });

  const certificates = certificateData?.data?.result || [];
  const totalPage = certificateData?.data?.totalPages;
  const totalCount = certificateData?.data?.totalCount;

  return (
    <div>
      {showData ? (
        <>
          <AnimateHeader words={title.split(" ").concat(["Requests"])} center />
          {!isLoading ? (
            <DataTable
              data={certificates}
              totalPage={totalPage}
              totalCount={totalCount}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
              searchQuery={searchQuery} // Pass search query to DataTable
              setSearchQuery={setSearchQuery} // Pass setSearchQuery to DataTable
            />
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <div className="flex w-full flex-col h-full items-center justify-center">
          <Image
            alt="snap"
            src={SnapImg}
            width={150}
            height={150}
            style={{ width: "auto", height: "auto" }}
            className="max-w-20"
          />
          <AnimateHeader
            words={words}
            className="text-text font-semibold text-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default Details;
