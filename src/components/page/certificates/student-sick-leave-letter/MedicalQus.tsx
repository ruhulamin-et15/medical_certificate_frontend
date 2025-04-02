"use client";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup from "@/components/ui/DFields/DRadio";
import { StudentSickLeaveRequest } from "@/lib/interface/request.interface";
import React, { useState } from "react";

const MedicalQus = ({ resData}: { resData?: StudentSickLeaveRequest}) => {
  const [condition1, setCondition1] = useState<string>("");
  const [condition2, setCondition2] = useState<string>("");

  const handlePreExisting = (e: string) => {
    // const value = e.target.value;
    setCondition1(e);
  };

  const handleMedications = (e: string) => {
    // const value = e.target.value;
    setCondition2(e);
  };

  const Options = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold ">Medical Questions</h2>
      <hr className="border w-full mb-4 mt-2" />
      <div className="mb-4 ">
        <div>
          <DRadioGroup
            id="preexisting"
            name="preexisting"
            label=" Do you have any pre-existing health conditions your Partner
            Practitioner should be aware of?"
            options={Options}
            required
            onChange={handlePreExisting}
            answer={resData?.preExistingConditions}></DRadioGroup>


        </div>
        {condition1 == "yes" || resData?.preExistingConditions == true ? (
          <div className="my-6">
            <DInput
              id="provide-details"
              type="text"
              name="provide-details"
              label=" Please provide information about your pre-existing health
              conditions."
              required
              className="border p-1 w-full max-w-md border-gray-300 border-b-gray-500"
              answer={resData?.preExistingConditionsDetails}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="mb-4">
        <div>
          <DRadioGroup
            id="medications"
            name="medications"
            options={Options}
            onChange={handleMedications}
            required
            answer={resData?.medications}
            label="Are you taking any medications regularly?"></DRadioGroup>
        </div>
        {condition2 === "yes" || resData?.medications == true ? (
          <div className="my-6">
            <label className="font-semibold">
              Please tell us which medications and their doses that you take.
              <span className="text-xl text-red-500">*</span>
            </label>
            <DInput
            id="provide-details2"
              type="text"
              name="provide-details2"
              answer={resData?.medicationsDetails}
              className="border p-1 w-full max-w-md border-gray-300 border-b-gray-500"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default MedicalQus;
