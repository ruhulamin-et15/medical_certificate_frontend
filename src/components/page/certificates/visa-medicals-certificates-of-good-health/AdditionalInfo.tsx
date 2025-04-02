"use client";
import { VisaCertificate } from "@/lib/interface/request.interface";
import React from "react";

const AdditionalInfo = ({resData, isAdmin}: {resData?: VisaCertificate, isAdmin?: boolean}) => {
  return (
    <div className="my-10">
      <h1 className="text-2xl font-bold">Additional Information</h1>
      <hr className="w-full border mt-2 mb-4" />
      <div className="my-6">
        <label htmlFor="" className="font-bold">
          Is there any other relevant medical information or specific
          requirements related to your visa application that you would like to
          share with The MEDIC for the Visa Medical Certificate or Certificate
          of Good Health?
        </label>{" "}
        <br />
        <textarea
          name="medical-information"
          id=""
          readOnly={isAdmin}
          defaultValue={resData?.additionalInfo}
          className="w-full rounded border border-gray-200 border-b-gray-500 p-2 h-32"
        ></textarea>
      </div>
    </div>
  );
};

export default AdditionalInfo;
