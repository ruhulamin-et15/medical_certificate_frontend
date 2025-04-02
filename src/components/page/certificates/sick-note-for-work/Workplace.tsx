"use client";
import DAnswer from "@/components/ui/DFields/DAnswer";
import { SickNoteRequest } from "@/lib/interface/request.interface";
import React from "react";

const Workplace = ({
  isAdmin,
  resData,
}: {
  resData?: SickNoteRequest;
  isAdmin?: boolean;
}) => {
  return (
    <section>
      <h1 className="text-2xl font-bold">Your workplace</h1>
      <hr className="border w-full mb-4 mt-2" />

      {/* Workplace Confirmation */}
      <div className="my-5">
        <label htmlFor="workplace" className="font-semibold">
          Please confirm where you work{" "}
          <span className="text-xl text-red-500">*</span>
        </label>
        <br />
        {resData?.workplace !== undefined ? (
          <DAnswer answer={resData.workplace || "No workplace specified"} />
        ) : (
          <input
            required
            defaultValue={resData?.workplace}
            disabled={isAdmin}
            type="text"
            name="workplace"
            id="workplace"
            className="border p-1 w-full max-w-md border-gray-300 border-b-gray-500"
          />
        )}
      </div>

      {/* Daily Work Activities */}
      <div className="my-5">
        <label htmlFor="work-activities" className="font-semibold">
          Please describe your daily work activities{" "}
          <span className="text-xl text-red-500">*</span>
        </label>
        <br />
        {resData?.workActivities !== undefined ? (
          <DAnswer
            answer={resData.workActivities || "No work activities specified"}
          />
        ) : (
          <input
            required
            defaultValue={resData?.workActivities}
            type="text"
            name="workActivities"
            id="work-activities"
            className="border p-1 w-full max-w-md border-gray-300 border-b-gray-500"
          />
        )}
      </div>
    </section>
  );
};

export default Workplace;
