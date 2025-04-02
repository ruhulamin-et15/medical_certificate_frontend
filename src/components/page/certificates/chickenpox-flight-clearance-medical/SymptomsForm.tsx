"use client";
import DFileUpload from "@/components/ui/DFields/DFileUpload";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup from "@/components/ui/DFields/DRadio";
import { ChickenpoxCertificateRequest } from "@/lib/interface/request.interface";
import { formatDate } from "@/utils/formateDate";
import React, { useState } from "react";

const SymptomsForm = ({
  resData,
  isAdmin,
}: {
  resData?: ChickenpoxCertificateRequest;
  isAdmin?: boolean;
}) => {
  const [passport, setPassport] = useState<File | null>(null);

  const [medicalCare, setMedicalCare] = useState<string>("");
  const handleMedicalCare = (e: string) => {
    // const value = e.target.value;
    setMedicalCare(e);
    // console.log(value);
  };
  // console.log(resData);

  const yesNoOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const gpOptions = [
    { label: "Yes, from my GP", value: "gp" },
    { label: "Yes, I visited my local A&E", value: "ae" },
    { label: "No", value: "no" },
  ];

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Symptoms</h1>
      <hr className="border w-full mb-4 mt-2" />

      <div className="mb-4">
        <DInput
          type="date"
          id="symptom-start-date"
          name="symptom-start-date"
          label=" Start date of symptoms "
          required
          answer={
            resData?.symptomStartDate
              ? formatDate(resData?.symptomStartDate as any, true)
              : null
          }
        />
      </div>

      <div className="mb-4">
        <label htmlFor="symptom-details" className="block font-semibold mb-1">
          Please describe the timeline and the details of your symptoms{" "}
          <span className="text-xl text-red-600">*</span>
        </label>
        <textarea
          id="symptom-details"
          name="symptom-details"
          className="w-full p-2 border border-gray-300 h-36 rounded"
          placeholder="Describe your symptoms..."
          defaultValue={resData?.symptomsDetails}
          readOnly={isAdmin}
          required
        />
      </div>

      <div className="mb-4">
        <DRadioGroup
          id="medicalcare"
          name="medicalcare"
          options={gpOptions}
          label=" Have you sought medical care from your GP or local A&E for your
            medical issue?"
          required
          onChange={handleMedicalCare}
          answer={resData?.treatmentGP}
        ></DRadioGroup>
      </div>
      <div className="mb-4">
        {medicalCare === "yesgp" || resData?.treatmentGP === "yesgp" ? (
          <div>
            <DInput
              type="text"
              name="administeredGP"
              id="administeredGP"
              label="  What treatment was administered in A&E or by your GP?"
              required
              answer={resData?.treatmentGPDetails}
            />
          </div>
        ) : medicalCare === "yeslocala&e" ||
          resData?.treatmentGP === "yeslocala&e" ? (
          <div>
            <label className="font-bold">
              Please upload your A&E discharge summary, if available{" "}
              <span className="text-xl text-red-600">*</span>
            </label>
            <input
              required={medicalCare === "yeslocala&e"}
              type="file"
              name="a&efile"
              className="w-full max-w-md border-2 p-1 border-b-gray-400 rounded-md border-gray-300"
            />
            <DFileUpload
              title="Passport Upload"
              description="Please upload your A&E discharge summary, if available "
              required
              accept="image/*,.pdf"
              maxSize={10 * 1024 * 1024} // 10MB
              onFileChange={setPassport}
              value={passport}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="condition-status" className="block font-semibold mb-1">
          Condition Status <span className="text-xl text-red-600">*</span>
        </label>
        <select
          id="condition-status"
          name="condition-status"
          className="w-full p-2 border border-gray-300 rounded"
          required
          defaultValue={
            resData?.conditionStatus ? resData?.conditionStatus : ""
          }
        >
          <option value="">Please Select</option>
          <option value={"ONGOING"}>Ongoing</option>
          <option value={"FULLY_RECOVERED"}>Fully_Recovered</option>
          <option value={"PARTIALLY_RECOVERED"}>Partially_recovered</option>
        </select>
      </div>

      <div className="mb-4">
        <DRadioGroup
          id="newspots"
          name="newspots"
          options={yesNoOptions}
          label="Can you confirm that over the last 48 hours, no new spots have
            appeared, and that all the chickenpox spots have now scabbed over?"
          required
          answer={resData?.chickenpoxScabbed}
        ></DRadioGroup>
      </div>

      <div className="mb-4">
        <DRadioGroup
          id="fever"
          name="fever"
          options={yesNoOptions}
          label=" Have you had any fever within the last 48 hours?"
          required
          answer={resData?.feverLast48Hours}
        ></DRadioGroup>
      </div>

      <div className="mb-4">
        <DRadioGroup
          id="contactmonkeypox"
          name="contactmonkeypox"
          options={yesNoOptions}
          label="Have you been in contact with anyone with Monkeypox?"
          required
          answer={resData?.monkeypoxContact}
        ></DRadioGroup>
      </div>
    </div>
  );
};

export default SymptomsForm;
