"use client";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup from "@/components/ui/DFields/DRadio";
import React, { useState } from "react";

const MedicalQus = ({ resData, }: { resData?: any, }) => {
  const [condition1, setCondition1] = useState<string>("");
  const [condition2, setCondition2] = useState<string>("");

  const handlePreExisting = (e: string) => {
    setCondition1(e);
  };

  const yesNoOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" }
  ]
  const breathOptions = [
    { label: "Few hundred yards", value: "fewHundredYards" },
    { label: "Limited to 1 mile", value: "limitedTo1Mile" },
    { label: "Unlimited", value: "unlimited" }
  ];

  const handleMedications = (e: string) => {
    // const value = e.target.value;
    setCondition2(e);
  };
  // (resData?.preExistingConditions);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Medical Questions</h1>
      <hr className="border w-full mb-4 mt-2" />
      <div className="mb-4 ">
        <div>
          <DRadioGroup
            name="preexisting"
            label="Do you have any pre-existing health conditions your Partner
            Practitioner should be aware of?"
            required
            id="preexisting"
            onChange={handlePreExisting}
            options={yesNoOptions}
            answer={resData?.preExistingConditions}
          />
        </div>
        {condition1 === "yes" || resData?.preExistingConditions == true ? (
          <div className="my-6">
            <DInput
              type="text"
              id="provide-information"
              name="provide-information"
              label="Please provide information about your pre-existing health
              conditions."
              required
              answer={resData?.preExistingConditions}
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
            onChange={handleMedications}
            options={yesNoOptions}
            label=" Are you taking any medications regularly?"
            required
            answer={resData?.medications}
          ></DRadioGroup>
        </div>
        {condition2 === "yes" || resData?.medications == true ? (
          <div className="my-6">
            <label className="font-semibold">
              Please tell us which medications and their doses that you take.
              <span className="text-xl text-red-500">*</span>
            </label>
            <DInput
              id="medications-take"
              type="text"
              name="medications-take"
              answer={resData?.medicationsDetails}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="mb-4">
        <DRadioGroup
          id="breath"
          name="breath"
          label=" How far can you walk before you have to stop to catch your breath"
          required
          options={breathOptions}
          answer={resData?.walkingAbility}
        ></DRadioGroup>
      </div>
    </section>
  );
};

export default MedicalQus;
