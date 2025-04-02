import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import { TravelMedicationLetterRequest } from "@/lib/interface/request.interface";
import React, { useState } from "react";

const DoctorInformation = ({
  certificateData,
  isAdmin,
}: {
  certificateData?: TravelMedicationLetterRequest;
  isAdmin?: boolean;
}) => {
  const [travelmedication, settravelmedication] = useState<string>("");

  const handleTravelMedication = (e: string) => {
    settravelmedication(e);
  };

  const yesNoOptions: DOptions[] = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  return (
    <div className="my-14">
      <h1 className="text-2xl font-bold">Doctor&#39;s Information</h1>
      <hr className="mt-2 mb-4 w-full border" />
      <div className="my-6">
        <DRadioGroup
          onChange={handleTravelMedication}
          name="travelmedication"
          answer={certificateData?.consultedGP}
          id="travelmedication"
          required
          options={yesNoOptions}
          label="Have you consulted your Medic regarding your travel and the need for a Travel with Medication Letter?"
        />
        {(travelmedication === "yes" ||
          certificateData?.consultedGP == true) && (
          <div className="my-6">
            <label className="font-bold">
              Please provide The MEDIC&#39;s name and contact information.{" "}
              <span className="text-lg text-red-500 font-bold">*</span>
            </label>
            <br />
            <input
              required
              type="text"
              name="provide-details2"
              className="border w-full max-w-md border-gray-200 border-b-gray-500 p-1"
              defaultValue={certificateData?.medicalConditionDetails}
              readOnly={isAdmin}
            />
          </div>
        )}
      </div>
      <div className="my-14">
        <h1 className="text-2xl font-bold">
          Travel Medication Letter Requirements
        </h1>
        <hr className="mt-2 mb-4 w-full border" />
        <div className="my-6">
          <label className="font-bold">
            Why do you believe you need a Travel with Medication Letter?
            (Provide a brief explanation of your circumstances.){" "}
            <span className="text-lg text-red-500 font-bold">*</span>
          </label>
          <br />
          <textarea
            required
            name="travel-medication-letter"
            className="w-full h-32 border border-gray-200 border-b-gray-500 rounded"
            defaultValue={certificateData?.circumstancesDetails}
            readOnly={isAdmin}
          ></textarea>
        </div>
        <div className="my-6">
          <DRadioGroup
            required
            name="travel-regulations"
            answer={certificateData?.travelRegulationsAwareness}
            id="travel-regulations"
            options={yesNoOptions}
            label="Are there specific travel regulations or restrictions related to your medication that you are aware of?"
          />
        </div>
      </div>

      <div className="my-14">
        <h1 className="text-2xl font-bold">Additional Information</h1>
        <hr className="mt-2 mb-4 w-full border" />
        <div className="my-6">
          <DRadioGroup
            required
            name="allergies-condition"
            answer={certificateData?.allergiesOrConditions}
            id="allergies-condition"
            options={yesNoOptions}
            label="Do you have any allergies or medical conditions that healthcare professionals should be aware of during your travel?"
          />
        </div>
        <div className="my-6">
          <DInput
            label="Is there any other relevant information you would like to share with your Medic regarding your travel and medication needs?"
            id="relevant-information"
            type="text"
            name="relevant-information"
            className="border border-gray-200 border-b-gray-500 p-1 w-full max-w-md"
            answer={certificateData?.additionalInformation}
            readOnly={isAdmin}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorInformation;
