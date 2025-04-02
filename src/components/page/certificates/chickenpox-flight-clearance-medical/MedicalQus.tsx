"use client";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup from "@/components/ui/DFields/DRadio";
import { ChickenpoxCertificateRequest } from "@/lib/interface/request.interface";
import { formatDate } from "@/utils/formateDate";
import  { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

const MedicalQus = ({ resData }: { resData?: ChickenpoxCertificateRequest }) => {
  const [healthConditions, sethealthConditions] = useState<string>("");
  const [medications, setmedications] = useState<string>("");
  const handleHealthCondition = (e: string) => {
    sethealthConditions(e);
  };

  const handleMedicationas = (e: string) => {
    setmedications(e);
  };

  const yesNoOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" }
  ]

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Medical Questions</h1>
      <hr className="border w-full mb-4 mt-2" />
      <div className="mb-4">
        <div>
          <DRadioGroup
            id="pre-existing"
            name="pre-existing"
            label=" Do you have any pre-existing health conditions your Partner
            Practitioner should be aware of?"
            required
            answer={resData?.preExistingCondition}
            options={yesNoOptions}
            onChange={handleHealthCondition} />
        </div>

        {healthConditions == "yes" || resData?.preExistingCondition ? (
          <div className="my-4">
          
            <DInput
              id="pre-existing-details"
              type="text"
              name="pre-existing-details"
              label="Please provide information about your pre-existing health
              conditions."
              answer={resData?.preExistingConditionDetails}
              required
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
            label=" Are you taking any medications regularly?"
            required
            options={yesNoOptions}
            onChange={handleMedicationas}
            answer={resData?.regularMedications}></DRadioGroup>

        </div>
        {medications == "yes" || resData?.regularMedications ? (
          <div className="mty4">
           
            <DInput
              type="text"
              id="medications-details"
              name="medications-details"
              label="Please tell us which medications and their doses that you take."
              answer={resData?.regularMedicationsDetails}
              required
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4">Confirm your flight details</h2>
      <div className="mb-4">
        {/* <input
                
                        type="datetime-local"
                        id="flight-date"
                        placeholder="DD-MM-YYYY"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    /> */}
        {/* <DatePicker name='flight-name' className='border border-gray-300 p-1 rounded w-96' placeholderText='DD-MM-YYYY'></DatePicker> */}
        <DInput
          type="date"
          id="flight-date"
          name="flight-date"
          required
          answer={resData?.flightDate ? formatDate(resData?.flightDate as any, true) : null}
          label="Flight Date"
        />
      </div>

      <div className="mb-4">
        <DInput
          type="text"
          id="airline"
          name="airline"
          answer={resData?.arrivalLocation}
          label="Airline"
          className="border border-gray-300 p-1 rounded w-96"
          required
        />
      </div>
    </div>
  );
};

export default MedicalQus;
