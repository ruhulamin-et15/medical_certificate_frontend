"use client";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import { GymCancellationCertificateRequest } from "@/lib/interface/request.interface";
import React, { useState } from "react";

const HealthFitnessInformation = ({
  isAdmin,
  certificateData,
}: {
  isAdmin?: boolean;
  certificateData?: GymCancellationCertificateRequest;
}) => {
  const [healthissuesgym, sethealthissuesgym] = useState<string>("");

  const handlehealthissuesgym = (e: string) => {
    sethealthissuesgym(e);
  };

  const yesNoOptions: DOptions[] = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  return (
    <div className="my-14">
      <h1 className="text-2xl font-bold">Health and Fitness Information</h1>
      <hr className="mt-2 mb-4 w-full border" />
      <div className="my-6">
        <DRadioGroup
          label="Do you have any pre-existing medical conditions that affect your
          ability to use the gym or health club facilities?"
          options={yesNoOptions}
          required
          name="pre-existing-medical"
          id="pre-existing-medical"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.medicalConditionAffectsUsage
                ? "Yes"
                : "No"
              : " "
          }
        />
      </div>

      <div className="my-6">
        <DRadioGroup
          label="Have you experienced any injuries or health issues related to your gym
          or health club activities?"
          options={yesNoOptions}
          required
          name="healthissuesgym"
          onChange={handlehealthissuesgym}
          id="healthissuesgym"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.injuriesOrHealthIssues
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(healthissuesgym == "yes" ||
          certificateData?.injuriesOrHealthIssues == true) && (
          <div className="my-5">
            <label htmlFor="" className="font-bold">
              Please provide details.{" "}
              <span className="text-xl text-red-500">*</span>
            </label>{" "}
            <br />
            <input
              required={healthissuesgym == "yes"}
              name="provide-details"
              className="border w-full max-w-md border-gray-200 border-b-gray-500 p-1 rounded"
            />
          </div>
        )}
      </div>
      <div className="my-6">
        <DRadioGroup
          label="re you currently under medical treatment or taking any medications
          that affect your ability to use the gym or health club facilities?"
          options={yesNoOptions}
          required
          name="gym-ability"
          id="gym-ability"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.currentMedicalTreatment
                ? "Yes"
                : "No"
              : " "
          }
        />
      </div>
    </div>
  );
};

export default HealthFitnessInformation;
