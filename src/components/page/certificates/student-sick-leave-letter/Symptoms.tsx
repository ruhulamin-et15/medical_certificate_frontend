"use client";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup from "@/components/ui/DFields/DRadio";
import DTextArea from "@/components/ui/DFields/DTextarea";
import { StudentSickLeaveRequest } from "@/lib/interface/request.interface";
import { formatDate } from "@/utils/formateDate";
import React, { useState } from "react";

const Symptoms = ({ resData }: { resData?: StudentSickLeaveRequest }) => {
  const [medicalCare, setMedicalCare] = useState<string>("");
  const handleMedicalCare = (e: string) => {
    // const value = e.target.value;
    setMedicalCare(e);
    // // (value);
  };

  const medicalReasons = [
    { label: "Headache", value: "headache" },
    { label: "Migraine", value: "migraine" },
    { label: "Back pain", value: "backpain" },
    { label: "Period pain", value: "periodpain" },
    {
      label: "Anxiety, stress or depression",
      value: "Anxietystressordepression",
    },
    { label: "Other", value: "other" },
  ];
  const medicalCareOptions = [
    { label: "Yes, from my GP", value: "yesgp" },
    { label: "Yes, I visited my local A&E", value: "yeslocala&e" },
    { label: "No", value: "no" },
  ];

  // const recoveryStatusOptions = [
  //   { label: "Please Select", value: "default" },
  //   { label: "Ongoing", value: "ONGOING" },
  //   { label: "Fully Recovered", value: "FULLY_RECOVERED" },
  //   { label: "Partially Recovered", value: "PARTIALLY_RECOVERED" },
  // ];

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold ">Symptoms</h2>
      <hr className="border w-full mb-4 mt-2" />
      <div className="mb-4">
        <DInput
          id="symptomstartdate"
          label="Start date of symptoms"
          answer={
            resData ? formatDate(resData.symptomsStartDate as any, true) : null
          }
          type="date"
          name="symptomstartdate"
          required
          className="border border-gray-300 p-1 rounded w-96"
        />
      </div>
      <div className="my-6">
        <div>
          <DRadioGroup
            id="medicalletter"
            name="medicalletter"
            options={medicalReasons}
            label="Main reason for medical letter"
            required
            answer={resData?.medicalReason}
          ></DRadioGroup>
        </div>
      </div>
      <div className="mb-4">
        <DTextArea
          id="symptom-details"
          name="symptom-details"
          label="  Please describe the timeline and the details of your symptoms"
          className="w-full p-2 border border-gray-300 h-36 rounded"
          placeholder="Describe your symptoms..."
          required
          answer={resData?.symptomsDetails}
        />
      </div>

      <div className="mb-4">
        <DRadioGroup
          id="medicalcare"
          name="medicalcare"
          label="Have you sought medical care from your GP or local A&E for your
            medical issue?"
          onChange={handleMedicalCare}
          answer={resData?.medicalCare}
          options={medicalCareOptions}
        ></DRadioGroup>
      </div>
      <div className="mb-4">
        {medicalCare === "yesgp" || resData?.medicalCare === "yesgp" ? (
          <div>
            <DInput
              id="administeredGP"
              label=" What treatment was administered in A&E or by your GP?"
              type="text"
              name="administeredGP"
              className="w-full max-w-md border p-1 border-b-gray-400 rounded-md border-gray-300"
              answer={resData?.medicalCareDetails}
            />
          </div>
        ) : medicalCare === "yeslocala&e" ||
          resData?.medicalCare === "yeslocala&e" ? (
          <div>
            <label className="font-bold">
              Please upload your A&E discharge summary, if available{" "}
              <span className="text-xl text-red-600">*</span>
            </label>
            <input
              required
              type="file"
              name="a&efile"
              className="w-full max-w-md border p-1 border-b-gray-400 rounded-md border-gray-300"
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="my-6">
        <div className="mb-4 max-w-md">
          <label
            htmlFor="condition-status"
            className="block font-semibold mb-1"
          >
            Condition Status <span className="text-xl text-red-600">*</span>
          </label>
          <select
            id="condition-status"
            name="conditionstatus"
            className="w-full p-2 border max-w-md border-gray-300 rounded"
            required
            value={resData?.conditionStatus}
          >
            <option value="">Please Select</option>
            <option value="ONGOING">Ongoing</option>
            <option value="FULLY_RECOVERED">Fully Recovered</option>
            <option value="PARTIALLY_RECOVERED">Partially recovered</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default Symptoms;
