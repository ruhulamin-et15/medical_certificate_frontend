"use client";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup from "@/components/ui/DFields/DRadio";
import { MitigationLetter } from "@/lib/interface/request.interface";
import { formatDate } from "@/utils/formateDate";
import React, { useState } from "react";

const MedicalQus = ({ resData }: { resData?: MitigationLetter }) => {
  const [condition, setCondition] = useState<string>("");

  const handleMitigating = (e: string) => {
    // const value = e.target.value;
    // console.log(value);
    setCondition(e);
  };
  const mitigationOptions = [
    { label: "Common cold or flu", value: "common_cold_flu" },
    { label: "Headache", value: "headache" },
    { label: "Migraine", value: "migraine" },
    { label: "Back pain", value: "back_pain" },
    { label: "Period pain", value: "period_pain" },
    { label: "Anxiety, stress or depression", value: "anxiety_stress_depression" },
    { label: "Other", value: "other" }
  ];


  const yesNoOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" }
  ]


  return (
    <div>
      <div className="my-5">
        <h1 className="text-2xl font-bold my-4">Medical Questions</h1>
        <hr className="border w-full mb-4 mt-2" />
        <div>
          <DRadioGroup
            label=" Reason for Mitigation Request"
            required
            id="medicalletter"
            name="medicalletter"
            answer={resData?.mitigationReason}
            options={mitigationOptions}></DRadioGroup>
        </div>
      </div>
      <div className="my-5">
        <div>
          <DRadioGroup
            id="preexisting"
            name="preexisting"
            label="Do you or your child have any pre-existing health conditions your Partner Practitioner should be aware of?"
            options={yesNoOptions}
            required
            answer={resData?.preExistingConditions}></DRadioGroup>
        </div>
      </div>
      <div className="my-5">
        <DRadioGroup
          id="medications"
          name="medications"
          required
          label=" Are you taking any medications regularly?"
          options={yesNoOptions}
          answer={resData?.takeMedications}></DRadioGroup>
      </div>
      <div className="my-5">
        <DRadioGroup
          id="mitigating"
          name="mitigating"
          required
          onChange={handleMitigating}
          label="Have you consulted a GP or other healthcare professional regarding
            the mitigating circumstance?"
          options={yesNoOptions}
          answer={resData?.consultedGP}></DRadioGroup>
      </div>

      {condition == "yes" || resData?.consultedGP == true ? (
        <div>
          <div className="my-5">
            <h1 className="font-bold my-5">
              If yes, please provide the following information (optional)
            </h1>
            <div>
              <DInput
                id="date-consultation"
                type="date"
                name="date-consultation"
                label="Date of consultation:"
                required
                answer={resData ? formatDate(resData?.gpConsultationDate as any, true) : null}
              />
            </div>
          </div>
          <div className="my-5">
            <div>
              <DInput
                id="name-gp"
                type="text"
                name="name-gp"
                label="Name of GP/healthcare professional"
                answer={resData?.gpName}

              />
            </div>
          </div>
          <div className="my-5">
            <div>
              <DInput
                type="text"
                name="description"
                id="description"
               label=" Brief description of the consultation (optional): (This
                information will not be shared with the university but can help
                your GP understand your needs)"
                answer={resData?.description}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MedicalQus;
