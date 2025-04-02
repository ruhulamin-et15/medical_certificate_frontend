"use client";
import Header from "@/components/ui/Header";
import Image from "next/image";
import certificates from "../../../../public/cardData.json";
import { FC } from "react";

import Button from "@/components/ui/Button";
import Link from "next/link";

const CertificatesPage: FC = () => {
  return (
    <div className="min-h-screen py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header center large className="mb-8">
          Medical Certificates
        </Header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate, index) => (
            <div key={index} className="bg-white shadow-xl overflow-hidden">
              <div className="p-5 sm:p-6 flex h-full flex-col justify-between">
                <div>
                  <div className="relative  w-full">
                    <Image
                      src={certificate.imageUrl}
                      alt={certificate.title}
                      height={300}
                      width={400}
                      style={{ width: "100%", height: "auto" }}
                      className="min-w-[100px] md:!h-[220px] object-cover"
                    />
                  </div>
                  <h2 className="text-base font-semibold text-black min-h-10 mt-3">
                    {certificate.title}
                  </h2>
                  <p className="text-lg font-medium text-primary mb-2">
                    {certificate.price}
                  </p>
                  <p className="text-gray-700 text-sm sm:text-base mb-4">
                    {certificate.description}
                  </p>
                </div>
                <Link href={`/medical-certificate/${certificate.id}`}>
                  <Button className="w-full text-sm sm:text-base btn font-semibold">
                    Request Certificate
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificatesPage;
