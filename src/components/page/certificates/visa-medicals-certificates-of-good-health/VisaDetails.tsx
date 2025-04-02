"use client";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import { VisaCertificate } from "@/lib/interface/request.interface";
import React, { useState } from "react";

const VisaDetails = ({ resData }: { resData?: VisaCertificate }) => {
  const [visaCondition, setVisaCondition] = useState<string>("");

  const handleVisa = (e: string) => {
    // const value = e.target.value;
    setVisaCondition(e);
  };

  const yesNoOptions: DOptions[] = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  return (
    <section>
      <h1 className="text-2xl font-bold">Travel and Visa Details</h1>
      <hr className="border w-full mt-2 mb-4" />
      <div className="my-6">
        <DInput
          type="text"
          id="purpose-visa"
          label="What is the purpose of your visit (e.g., work, study, tourism)?"
          required
          answer={resData?.visaPurpose}
          name="purpose-visa"
        />
      </div>
      <div className="my-6">
       
        <DInput
          type="text"
          name="visa-country"
          id="visa-country"
          label=" Which country or countries are you applying for a visa to?"
          required
          answer={resData?.visaCountry}
        />
      </div>

      <div className="my-6">
        <DRadioGroup
        id="visaissued"
        name="visaissued"
        label=" Have you previously been issued a visa for the destination country?"
        onChange={handleVisa}
        answer={resData?.previouslyIssuedVisa}
        required
        options={yesNoOptions}></DRadioGroup>
        {visaCondition == "yes" || resData?.previouslyIssuedVisa == true ? (
          <div className="my-6">
            <DInput
              type="text"
              id="provide-details"
              name="provide-details"
              label=" Please provide details."
              required
              answer={resData?.previouslyIssuedVisaDetails}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default VisaDetails;
