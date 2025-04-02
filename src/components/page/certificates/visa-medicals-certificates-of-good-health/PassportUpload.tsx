"use client";
import DInput from "@/components/ui/DFields/DInput";
import { VisaCertificate } from "@/lib/interface/request.interface";
import React from "react";

const PassportUpload = ({resData} : {resData? : VisaCertificate}) => {
  return (
    <div className="my-10">
      <h1 className="text-2xl font-bold">Passport or Identification Upload</h1>
      <hr className="w-full border mt-2 mb-5" />
      <div className="my-6">
        <DInput
          type="text"
          name="passport-name"
          id="passport-name"
          label="Passport Number"
          required
          answer={resData?.passportNumber}
        />
      </div>
      <div className="my-6">
        <label htmlFor="" className="font-bold">
          Please upload a scanned copy or clear image of your passport or
          identification for verification purposes.
        </label>{" "}
        <br />
        <input
          type="file"
          name="image-copy"
          defaultValue={resData?.passportUpload as any}
          className="w-full max-w-md border border-gray-200 border-b-gray-500 p-1"
        />
      </div>
    </div>
  );
};

export default PassportUpload;
