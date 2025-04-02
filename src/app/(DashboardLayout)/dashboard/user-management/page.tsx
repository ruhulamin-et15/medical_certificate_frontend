"use client";
// import Button from "@/components/ui/Button";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";
import SnapImg from "@/assets/image/png/awsnap.png";
import AnimateHeader from "@/components/ui/AnimateHeader";
// import Link from "next/link";
import DataTable from "./DataTable";

const Details = () => {
  const [showData, setShowData] = React.useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("/user-management")) {
      setShowData(true);
    }
  }, [pathname]);

  const words = " Opps... Route Not Found".split("");

  return (
    <div>
      {showData ? (
        <>
          <div>
            <AnimateHeader words={"User Management".split(" ")} center />
          </div>

          <DataTable />
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
            className="text-gray-600 font-semibold text-2xl"
          ></AnimateHeader>
        </div>
      )}
    </div>
  );
};

export default Details;
