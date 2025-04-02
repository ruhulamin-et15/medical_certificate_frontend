"use client";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import { VisaCertificate } from "@/lib/interface/request.interface";
import React, { useState } from "react";

const VacationHistory = ({ resData }: { resData?: VisaCertificate }) => {
  const [vaccination, setVaccination] = useState<string>();
  const [contagiousdiseases, setcontagiousdiseases] = useState<string>("");
  const [travelhistory, setTravelhistory] = useState<string>("");
  const [healthinsurance, setHealthinsurance] = useState<string>("");
  const handleVaccinations = (e: string) => {
    // const value = e.target.value;
    setVaccination(e);
  };

  const handlecontagiousdiseases = (e: string) => {
    // const value = e.target.value;
    setcontagiousdiseases(e);
  };

  const handleTravelHistory = (e: string) => {
    // const value = e.target.value;
    setTravelhistory(e);
  };

  const handleHealthInsurance = (e: string) => {
    // const value = e.target.value;
    setHealthinsurance(e);
  };

  const yesNoOptions: DOptions[] = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];


  return (
    <div className="my-10">
      <h1 className="text-2xl font-bold">Vaccination History</h1>
      <hr className="w-full border mt-2 mb-4" />
      <div className="my-6">
        <DRadioGroup
          id="vaccinations"
          name="vaccinations"
          label="Have you received vaccinations for diseases required by the
          destination country (e.g., yellow fever, COVID-19)?"
          onChange={handleVaccinations}
          answer={resData?.vaccinationReceived}
          required
          options={yesNoOptions}></DRadioGroup>
        {vaccination == "yes" || resData?.vaccinationReceived == true ? (
          <div className="my-6">
            <DInput
              type="text"
              name="provide-details3"
              id="provide-details3"
              label="please provide vaccination details."
              answer={resData?.vaccinationReceivedDetails}
              className="border w-full max-w-md border-gray-200 border-b-gray-500 p-1 "
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="my-10">
        <h1 className="text-2xl font-bold">Recent Illness or Exposure</h1>
        <hr className="w-full border mt-2 mb-4" />
        <div className="my-6">
          <DRadioGroup
            id="contagiousdiseases"
            name="contagiousdiseases"
            label=" Have you been recently ill or exposed to individuals with contagious
            diseases? If yes, please provide details of the illness and
            treatment received."
            onChange={handlecontagiousdiseases}
            answer={resData?.recentExposure}
            required
            options={yesNoOptions}></DRadioGroup>
          {contagiousdiseases == "yes" || resData?.recentExposure == true ? (
            <div className="my-6">
               
              <DInput
                type="text"
                name="provide-details4"
                id="provide-details4"
                label=" please provide details of the illness and treatment received."
                required
                answer={resData?.recentExposureDetails}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="my-10">
        <h1 className="text-2xl font-bold">Travel History</h1>
        <hr className="w-full border mt-2 mb-4" />
        <div className="my-6">
          <DRadioGroup
            id="travelhistory"
            name="travelhistory"
            label=" Have you traveled to other countries in the past year?"
            onChange={handleTravelHistory}
            answer={resData?.travelHistory}
            required
            options={yesNoOptions}></DRadioGroup>
          {travelhistory == "yes" || resData?.travelHistory ? (
            <div className="my-6">
              <DInput
                type="text"
                name="provide-details5"
                id="provide-details5"
                label="please provide details of the destinations and durations of your
                trips."
                required
                answer={resData?.travelHistoryDetails}
                className="border w-full max-w-md border-gray-200 border-b-gray-500 p-1 "
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="my-10">
        <h1 className="text-2xl font-bold">Health Insurance</h1>
        <hr className="w-full border mt-2 mb-4" />
        <div className="my-6">

          <DRadioGroup
            id="healthinsurance"
            name="healthinsurance"
            label="Do you have health insurance coverage that is valid in the
            destination country? If yes, please provide insurance details."
            onChange={handleHealthInsurance}
            answer={resData?.healthInsurance}
            required
            options={yesNoOptions}></DRadioGroup>
          {healthinsurance == "yes" || resData?.healthInsurance == true ? (
            <div className="my-6">
              <DInput
                type="text"
                name="provide-details6"
                id="provide-details6"
                label="please provide insurance details."
                answer={resData?.healthInsuranceDetails}
                className="border w-full max-w-md border-gray-200 border-b-gray-500 p-1 "
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default VacationHistory;
