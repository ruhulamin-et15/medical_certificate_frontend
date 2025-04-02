"use client";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import { VisaCertificate } from "@/lib/interface/request.interface";
import React, { useState } from "react";

const MedicalHistory = ({ resData }: { resData?: VisaCertificate }) => {
  const [medicalCondition, setMedicalCondition] = useState<string>("");
  const [prescription, setPrescription] = useState<string>("");
  const handleMedicalCondition = (e: string) => {
    // const value = e.target.value;
    setMedicalCondition(e);
  };

  const handlePrescription = (e: string) => {
    // const value = e.target.value;
    setPrescription(e);
  };

  const yesNoOptions: DOptions[] = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  return (
    <section className="my-14">
      <h1 className="text-2xl font-bold">Medical History</h1>
      <hr className="border w-full mt-2 mb-4" />
      <div className="my-6">

        <DRadioGroup
          id="medicalCondition"
          name="medicalCondition"
          label="Do you have any known medical conditions or chronic illnesses?"
          onChange={handleMedicalCondition}
          options={yesNoOptions}
          answer={resData?.medicalHistoryConditions}
          required></DRadioGroup>
        {medicalCondition == "yes" || resData?.medicalHistoryConditions == true ? (
          <div className="my-6">
            <DInput
              type="text"
              name="provide-details2"
              id="provide-details2"
              answer={resData?.medicalHistoryConditionsDetails}
              label=" please describe."
              required
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="my-6">
        <DRadioGroup
          id="prescriptionmedications"
          name="prescriptionmedications"
          label=" Are you currently taking any prescription medications?"
          onChange={handlePrescription}
          options={yesNoOptions}
          answer={resData?.takingPrescription}
          required></DRadioGroup>
        {prescription == "yes" || resData?.takingPrescription == true ? (
          <div className="my-6">
            <DInput
              type="text"
              name="list-item"
              id="list-item"
              label="please list them, including the name, dosage, and frequency."
              answer={resData?.takingPrescriptionDetails}
              required
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="my-10">
        <DRadioGroup
          id="diagnosed"
          name="diagnosed"
          label="  Have you ever been diagnosed with a contagious disease (e.g.,
          tuberculosis, HIV/AIDS)?"
          options={yesNoOptions}
          answer={resData?.contagiousDisease}
          required></DRadioGroup>
      </div>
    </section>
  );
};

export default MedicalHistory;
