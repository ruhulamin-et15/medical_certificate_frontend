"use client";
import { TravelMedicationLetterRequest } from "@/lib/interface/request.interface";
import React from "react";

const TravelDetails = ({ certificateData, isAdmin }: { certificateData?: TravelMedicationLetterRequest, isAdmin?: boolean }) => {
  return (
    <div className="my-14">
      <h1 className="text-2xl font-bold">Travel Details</h1>
      <hr className="border w-full mb-4 mt-2" />

      <div className="my-6">
        <div className="my-5">
          <label htmlFor="destination-travel" className="font-bold">
            Destination(s) of Travel
            <span className="text-lg text-red-500 font-bold"> *</span>
          </label>
          <br />
          <input
            required
            type="text"
            className="border border-gray-200 border-b-gray-500 w-full max-w-md p-1 rounded"
            name="destination-travel" // Matches handleFormSubmit key
            id="destination-travel"
            defaultValue={certificateData?.destination}
            readOnly={isAdmin}
          />
        </div>
        <div className="my-5">
          <label htmlFor="return-date" className="font-bold">
            Departure and Return Dates{" "}
            <span className="text-lg text-red-500 font-bold"> *</span>
          </label>
          <br />
          <input
            required
            type="date"
            className="border border-gray-200 border-b-gray-500 w-full max-w-md p-1 rounded"
            name="return-date" // Matches handleFormSubmit key
            id="return-date"
            defaultValue={
              certificateData?.dateOfBirth &&
              new Date(certificateData.dateOfBirth).toISOString().split("T")[0]
            }
            readOnly={isAdmin}
          />
        </div>
        <div className="my-5">
          <label htmlFor="purpose-travel" className="font-bold">
            Purpose of Travel (e.g., vacation, business trip){" "}
            <span className="text-lg text-red-500 font-bold"> *</span>
          </label>
          <br />
          <input
            required
            type="text"
            className="border border-gray-200 border-b-gray-500 w-full max-w-md p-1 rounded"
            name="purpose-travel" // Matches handleFormSubmit key
            id="purpose-travel"
            defaultValue={certificateData?.purposeOfTravel}
            readOnly={isAdmin}
          />
        </div>
      </div>
    </div>
  );
};

export default TravelDetails;
