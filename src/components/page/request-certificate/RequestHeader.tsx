"use client";
import Image, {  StaticImageData } from "next/image";
import React, { ReactNode } from "react";

interface RequestHeaderProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
  children: ReactNode;
}

const RequestHeader: React.FC<RequestHeaderProps> = ({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  children,
}) => {
  return (
    <div>
      <div>
        {/* Header */}
        <h2 className="text-2xl md:text-4xl font-bold text-primary">{title}</h2>
        <p className="mt-2 border-b pb-5 border-black/30">{description}</p>

        {/* Image */}
        <div className="mt-6 flex justify-center">
          <Image
            priority
            width={500}
            height={400}
            src={imageSrc}
            alt={imageAlt}
            className="w-full max-w-xs md:max-w-md"
          />
        </div>

        {/* Medical Letter Info */}
        <p className="mt-6 text-lg text-gray-500 font-bold">
          I am in need of a Medical Letter regarding:
          <span className="text-primary ml-1 font-semibold">{subtitle}</span>
        </p>

        {/* Form */}
        <div className="mt-8">
          <h3 className="text-2xl pb-2 mb-4 border-b border-black/70 font-semibold">
            Your Details
          </h3>

          {children}
        </div>
      </div>
    </div>
  );
};

export default RequestHeader;
