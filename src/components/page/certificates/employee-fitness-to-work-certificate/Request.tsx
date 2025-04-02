"use client";
import { EmployeeFitnessCertificate } from "@/lib/interface/request.interface";
import React, { useState } from "react";

const Request = ({
  resData,
  isAdmin,
}: {
  resData?: EmployeeFitnessCertificate;
  isAdmin?: boolean;
}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  // (resData);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Check the word count
    const wordCount = value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    // Validate word count
    if (wordCount < 20 && wordCount > 1) {
      setErrorMessage("Please enter at least 20 words.");
    } else {
      setErrorMessage("");
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Your request</h1>
      <hr className="border w-full mb-4 mt-2" />
      <div>
        <label htmlFor="">
          Please explain why you need a fit to start work letter.{" "}
          <span className="text-xl text-red-500">*</span>
        </label>
        <textarea
          name="letterdetails"
          onChange={handleTextareaChange}
          className="w-11/12 h-32 p-2 border border-gray-300 rounded border-b-gray-500"
          defaultValue={resData?.workExplanation}
          readOnly={isAdmin}
          id=""
        ></textarea>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
      <div className="my-5">
        <label htmlFor="">
          Please upload your A&E discharge summary, if available
        </label>
        <br />
        <br />
        <input
         
          className="border rounded-md w-full max-w-md border-b-black/70 p-1 text-center transition-colors"
          type="file"
          name="dischargefile"
          readOnly={isAdmin}
        />
      </div>
    </div>
  );
};

export default Request;
