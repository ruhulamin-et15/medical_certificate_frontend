"use client";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup from "@/components/ui/DFields/DRadio";
import { MitigationLetter } from "@/lib/interface/request.interface";
import { formatDate } from "@/utils/formateDate";
import React from "react";

const Symptoms = ({ resData }: { resData?: MitigationLetter, }) => {

  const gpOptions = [
    { label: "Yes, from my GP", value: "gp" },
    { label: "Yes, I visited my local A&E", value: "ae" },
    { label: "No", value: "no" }
  ];

  return (
    <section>
      <h1 className="text-2xl font-bold">Symptoms</h1>
      <div className="my-6">
        <DInput
          id="startdate"
          type="date"
          name="startdate"
          label="Start date of symptoms"
          required
          className="border w-full max-w-md  p-1 border-b-gray-500 rounded"
          answer={
            resData ? formatDate(resData?.symptomsStartDate as any, true) : null
          }
        />
      </div>
      <div className="my-6">
        <DInput
          type="text"
          id="symptomstimeline"
          name="symptomstimeline"
          label=" Please describe the timeline and the details of your symptoms"
          answer={resData?.symptomsDetails}
        />
      </div>
      <div className="my-6">
        <DRadioGroup
          name="medicalissue"
          id="medicalissue"
          options={gpOptions}
          label=" Have you sought medical care from your GP or local A&E for your
          medical issue?"
          required
          answer={resData?.medicalCare}
        ></DRadioGroup>
      </div>
      <div className="my-6">
        <label htmlFor="condition-status" className="block font-semibold mb-1">
          Condition Status{" "}
        </label>
        <select
          id="condition-status"
          name="conditionstatus"
          className="w-full p-2 border border-gray-300 rounded"
          value={resData?.conditionStatus}
          required
        >
          <option value="">Please Select</option>
          <option value="ONGOING">Ongoing</option>
          <option value="FULLY_RECOVERED">Fully Recovered</option>
          <option value="PARTIALLY_RECOVERED">Partially recovered</option>
        </select>
      </div>
    </section>
  );
};

export default Symptoms;
