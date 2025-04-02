"use client";
import { StudentSickLeaveRequest } from "@/lib/interface/request.interface";
import React from "react";

const EducationalInstitution = ({
  resData,
  isAdmin,
}: {
  resData?: StudentSickLeaveRequest;
  isAdmin?: boolean;
}) => {
  return (
    <section className="my-12">
      <h1 className="text-2xl font-bold">How long do you need this for?</h1>
      <hr className="border w-full mt-2 mb-4" />
      <div>
        <div className="max-w-md">
          <div>
            <label htmlFor="validForm">
              Valid from <span className="text-xl text-red-500">*</span>
            </label>{" "}
            <br />
            <input
              required
              type="date"
              name="validfrom"
              id="validfrom"
              className="border p-1 w-full max-w-md"
              readOnly={isAdmin}
              defaultValue={
                resData?.validFrom &&
                new Date(resData.validFrom).toISOString().split("T")[0]
              }
            />{" "}
          </div>
          <div className="mt-4">
            <label htmlFor="validTo">
              Valid to <span className="text-xl text-red-500">*</span>
            </label>{" "}
            <br />
            <input
              required
              type="date"
              name="validTo"
              id="validTo"
              className="border p-1 w-full max-w-md"
              readOnly={isAdmin}
              defaultValue={
                resData?.validTo &&
                new Date(resData.validTo).toISOString().split("T")[0]
              }
            />{" "}
          </div>
          <br />
          <br />
          <p>
            Your Partner Practitioner may suggest a different end date based on
            their professional judgment for your consultation. Please note
            Partner Practitioners do not write notes for longer than 14 days at
            a time and are unable to backdate them.
          </p>
        </div>
      </div>

      <div className="my-10">
        <h1 className="text-2xl font-bold">Your educational institution</h1>
        <hr className="border w-full mt-2 mb-4" />
        <div>
          <label htmlFor="confirm-university" className="font-semibold">
            Please confirm which University or College you attend{" "}
            <span className="text-xl text-red-500">*</span>
          </label>{" "}
          <br />
          <input
            required
            id="confirm-university"
            readOnly={isAdmin}
            type="text"
            name="confirm-university"
            defaultValue={resData?.institutionName ?? ""}
            className="border p-1 w-full max-w-md border-gray-300 border-b-gray-500"
          />
        </div>
      </div>
    </section>
  );
};

export default EducationalInstitution;
