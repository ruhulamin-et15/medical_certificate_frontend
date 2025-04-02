import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import { TravelMedicationLetterRequest } from "@/lib/interface/request.interface";
import React, { useState } from "react";

const MedicalCondition = ({
  certificateData,
  isAdmin,
}: {
  certificateData?: TravelMedicationLetterRequest;
  isAdmin?: boolean;
}) => {
  const [preexistingmedical, setPreexistingmedical] = useState<string>("");
  const [experienced, setexperienced] = useState<string>("");

  const handlePreexistingMedical = (e: string) => {
    const value = e;
    setPreexistingmedical(value);
  };

  const handleExperienced = (e: string) => {
    const value = e;
    setexperienced(value);
  };

  const yesNoOptions: DOptions[] = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Medical Condition and Medications</h1>
      <hr className="border w-full mb-4 mt-2" />
      <div className="my-6">
        <DRadioGroup
          onChange={handlePreexistingMedical}
          name="preexistingmedical"
          answer={certificateData?.medicalCondition}
          required
          id="preexistingmedical"
          options={yesNoOptions}
          label="Do you have a pre-existing medical condition that requires medication
          during travel?"
        />
        {(preexistingmedical === "yes" ||
          certificateData?.medicalCondition == true) && (
          <div className="my-6">
            <label className="font-bold">
              Please provide details.{" "}
              <span className="text-lg text-red-500 font-bold">*</span>
            </label>
            <br />
            <input
              required={preexistingmedical === "yes"}
              type="text"
              name="medical_condition_input" // Added name attribute here
              className="border w-full max-w-md border-gray-200 border-b-gray-500 p-1 "
              defaultValue={certificateData?.medicalConditionDetails}
              readOnly={isAdmin}
            />
          </div>
        )}
      </div>
      <div className="my-5">
        <label className="font-bold">
          List all the medications you need to carry during your journey.{" "}
          <span className="text-lg text-red-500 font-bold"> *</span>
        </label>
        <br />
        <input
          required
          type="text"
          name="all-medicines" // Ensure name is set here
          className="border border-gray-200 border-b-gray-500 w-full max-w-md p-1 rounded"
          defaultValue={certificateData?.medicationList}
          readOnly={isAdmin}
        />
      </div>
      <div className="my-5">
        <label className="font-bold">
          Specify the name of the medication, dosage, and frequency of use.{" "}
          <span className="text-lg text-red-500 font-bold"> *</span>
        </label>
        <br />
        <input
          required
          type="text"
          name="specify-medicine" // Ensure name is set here
          className="border border-gray-200 border-b-gray-500 w-full max-w-md p-1 rounded"
          defaultValue={certificateData?.medicationDetails}
          readOnly={isAdmin}
        />
      </div>
      <div className="my-6">
        <DRadioGroup
          required
          onChange={handleExperienced}
          name="experience"
          answer={certificateData?.recentMedicalChanges}
          id="experience"
          options={yesNoOptions}
          label="Have you experienced any recent changes in your medical condition or
          medication regimen?"
        />
        {(experienced === "yes" ||
          certificateData?.recentMedicalChanges == true) && (
          <div className="my-6">
            <label className="font-bold">
              Please provide your recent change&#39;s details.{" "}
              <span className="text-lg text-red-500 font-bold">*</span>
            </label>
            <br />
            <input
              required={experienced === "yes"}
              type="text"
              name="provide-details" // Ensure name is set here
              className="border w-full max-w-md border-gray-200 border-b-gray-500 p-1 "
              defaultValue={certificateData?.recentMedicalChangesDetails}
              readOnly={isAdmin}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalCondition;
