"use client";
import Answer from "@/components/ui/Answer";
import DCheckbox, { CheckboxItem } from "@/components/ui/DFields/DCheckbox";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import { FitForFlightRequest } from "@/lib/interface/request.interface";
import { formatDate } from "@/utils/formateDate";
import React, { useState } from "react";

export const checkboxItemsFitFor: CheckboxItem[] = [
  { name: "anaemia-blood", label: "Anaemia/low blood cell count" },
  { name: "cell-disease", label: "Sickle cell disease or trait" },
  { name: "blood-clots", label: "History of blood clots" },
  { name: "blood-pressure", label: "High blood pressure" },
  {
    name: "controlled-diabetes",
    label: "Poorly controlled diabetes (high blood sugar)",
  },
  {
    name: "complications-pregnancies",
    label: "Complications with previous pregnancies",
  },
  {
    name: "placental-abnormalities",
    label: "Placental abnormalities",
  },
  {
    name: "historyofearly",
    label: "History of early onset of labour (before 37 weeks)",
  },
  {
    name: "trimester",
    label: "2nd trimester miscarriage(s)",
  },
  {
    name: "none",
    label: "None of the above",
  },
];

const yesNoOptions: DOptions[] = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const bmiOptions = [
  { label: "Underweight: Below 18.5", value: "underweight" },
  { label: "Normal: 18.5-24.9", value: "normal" },
  { label: "Overweight: 25-29.9", value: "overweight" },
  { label: "Obese: 30 or above", value: "obese" },
];
const bloodPressureOptions = [
  { label: "Low (below 90/60mmHg)", value: "low" },
  { label: "Normal (over 90/60mmHg, below 140/90 mmHg)", value: "normal" },
  { label: "High (over 140/90 mmHg)", value: "high" },
];

const bloodPressureTakenOptions = [
  { label: "Within the last month", value: "within_last_month" },
  { label: "1-3 months ago", value: "1_3_months" },
  { label: "3-7 months ago", value: "3_7_months" },
  { label: "Over 7 months ago", value: "over_7_months" },
];

const MedicalQus = ({
  resData,
  isAdmin,
}: {
  resData?: FitForFlightRequest;
  isAdmin?: boolean;
}) => {
  const [condition, setCondition] = useState<string>("");
  const [complicationsCondition, setcomplicationsCondition] =
    useState<string>("");
  const [prescribedCondition, setPrescribedCondition] = useState<string>("");
  const handleConception = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCondition(value);
  };
  // (resData);

  const handleComplication = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setcomplicationsCondition(value);
  };

  const handlePrescribedMedications = (e: string) => {
    setPrescribedCondition(e);
  };
  console.log(resData);
  return (
    <section className="my-12">
      <h1 className="text-2xl font-bold">Medical Questions</h1>
      <hr className="border w-full mb-4 mt-2 " />

      <div className="my-6">
        <label htmlFor="" className="font-semibold">
          When is your estimated delivery date?{" "}
          <span className="text-xl text-red-500">*</span>
        </label>{" "}
        <br />
        {isAdmin == true ? (
          <Answer
            answer={formatDate(resData?.pregnancyDueDate as any, true)}
          ></Answer>
        ) : (
          <div>
            <input
              type="date"
              required
              name="delivery-date"
              className="border w-full max-w-md p-1 border-gray-300 border-b-gray-500"
            />{" "}
            <br />
            <span>Date</span>
          </div>
        )}
      </div>

      <div className="my-6">
        <label htmlFor="pregnancy" className="font-semibold">
          Is your pregnancy single or multiple?{" "}
          <span className="text-xl text-red-500">*</span>
        </label>
        <br />
        {isAdmin == true ? (
          <Answer answer={resData?.pregnancyComplications}></Answer>
        ) : (
          <div>
            <input
              type="radio"
              name="pregnancy"
              id="pregnancy1"
              value={"single"}
              required
              className="mr-2"
            />
            <label htmlFor="pregnancy1" className="cursor-pointer">
              Single
            </label>{" "}
            <br />
            <input
              type="radio"
              required
              name="pregnancy"
              id="pregnancy2"
              value={"multiple"}
              className="mr-2"
            />
            <label htmlFor="pregnancy2" className="cursor-pointer">
              Multiple
            </label>{" "}
            <br />
          </div>
        )}
      </div>

      <div className="my-6">
        <label htmlFor="" className="font-semibold">
          Did conception occur naturally or with the assistance of medical
          procedures (e.g., IVF, fertility treatments)?
          <span className="text-xl text-red-500">*</span>
        </label>{" "}
        <br />
        {isAdmin ? (
          <Answer answer={resData?.pregnancyConception}></Answer>
        ) : (
          <div>
            <input
              type="radio"
              name="conception"
              onChange={handleConception}
              value={"naturally"}
              id="conception1"
              required
              className="mr-2"
            />
            <label htmlFor="conception1" className="cursor-pointer">
              Naturally
            </label>{" "}
            <br />
            <input
              type="radio"
              name="conception"
              onChange={handleConception}
              value={"medicalprocedurs"}
              id="conception2"
              required
              className="mr-2"
            />
            <label htmlFor="conception2" className="cursor-pointer">
              With the assistance of medical procedures
            </label>{" "}
            <br />
          </div>
        )}
      </div>
      {condition == "medicalprocedurs" ||
      resData?.pregnancyConception == "medicalprocedurs" ? (
        <div className="my-6">
          <label htmlFor="" className="font-semibold">
            Please specify the method(s) used to conceive.{" "}
            <span className="text-xl text-red-500">*</span>
          </label>{" "}
          <br />
          {isAdmin ? (
            <Answer answer={resData?.pregnancyConceptionDetails}></Answer>
          ) : (
            <input
              required={condition == "medicalprocedurs"}
              type="text"
              id="conceive-method"
              name="conceive-method"
              className="border p-1 w-full max-w-md border-gray-300 border-b-gray-500"
            />
          )}
          <br />
        </div>
      ) : (
        ""
      )}

      <div className="my-6">
        <label htmlFor="" className="font-semibold">
          Have you experienced any complications or adverse events during your
          current pregnancy?<span className="text-xl text-red-500">*</span>
        </label>{" "}
        <br />
        {isAdmin ? (
          <div className="">
            <Answer answer={resData?.anyExperience}></Answer>
          </div>
        ) : (
          <div>
            <input
              type="radio"
              name="comlication"
              onChange={handleComplication}
              value={"yes"}
              required
              id="comlication1"
              className="mr-2"
            />
            <label htmlFor="comlication1" className="cursor-pointer">
              Yes
            </label>{" "}
            <br />
            <input
              type="radio"
              required
              name="comlication"
              onChange={handleComplication}
              value={"no"}
              id="comlication2"
              className="mr-2"
              // disabled={isAdmin}
            />
            <label htmlFor="comlication2" className="cursor-pointer">
              No
            </label>{" "}
            <br />
          </div>
        )}
        {complicationsCondition == "no" || resData?.anyExperience == false ? (
          isAdmin ? (
            <Answer answer={resData?.medicalConditions}></Answer>
          ) : (
            <DCheckbox
              required={complicationsCondition == "no"}
              value={checkboxItemsFitFor}
              id="medical-conditions"
              label="Do you have a history of any of the following medical conditions?"
            />
          )
        ) : (
          ""
        )}
      </div>

      <div className="my-6">
        <label htmlFor="" className="font-semibold">
          Please confirm that your midwife does not advise against flying
          <span className="text-xl text-red-500">*</span>
        </label>{" "}
        <br />
        {isAdmin ? (
          <Answer answer={resData?.adverseConditionsDuring}></Answer>
        ) : (
          <div>
            <input
              type="radio"
              name="confirm"
              value={"yes"}
              id="confirm1"
              required
              className="mr-2"
            />
            <label htmlFor="confirm1" className="confirm1">
              I have been medically advised that I may fly during my current
              pregnancy
            </label>{" "}
            <br />
            <input
              type="radio"
              required
              name="confirm"
              value={"no"}
              id="confirm2"
              className="mr-2"
            />
            <label htmlFor="confirm2" className="confirm1">
              I have been medically advised NOT to fly during my current
              pregnancy
            </label>
            <br />
          </div>
        )}
      </div>

      <div className="my-6">
        <DInput
          id="non-pregnancy-condition"
          label="Please list any non-pregnancy related health conditions you currently have (e.g., asthma, migraine, chronic back pain):"
          type="text"
          required
          name="non-pregnancy-condition"
          className="border p-1 w-full max-w-md border-gray-300 border-b-gray-500 rounded"
          answer={resData?.nonPregnencyDetails}
        />
      </div>

      <div className="my-6">
        <DRadioGroup
          id="prescribedmedications"
          label="Are you currently on any prescribed medications?"
          name="prescribedmedications"
          onChange={handlePrescribedMedications}
          options={yesNoOptions}
          className="mr-2"
          required
          answer={resData?.currentPrescribe}
        />
        {prescribedCondition == "yes" ? (
          <div className="my-6">
            <DInput
              id="medicine-list"
              type="text"
              required={prescribedCondition == "yes"}
              label="Please list the medications you are currently taking (e.g.,
              levothyroxine, aspirin)"
              name="medicine-list"
              className="border p-1 w-full max-w-md border-gray-300 border-b-gray-500 rounded"
              answer={resData?.antenatalCareLocation}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="my-6">
        <label htmlFor="antenatal-care" className="font-semibold">
          Where is your antenatal care being managed?
          <span className="text-xl text-red-500">*</span>
        </label>{" "}
        <br />
        <DInput
          required
          id="antenatal-care"
          type="text"
          name="antenatal-care"
          className="border p-1 w-full max-w-md border-gray-300 border-b-gray-500 rounded"
          answer={resData?.antenatalCareLocation}
        />
      </div>

      <div className="my-6">
        <DRadioGroup
          id="BMI"
          name="BMI"
          required
          options={bmiOptions}
          label="  What was your Body Mass Index (BMI) at the onset of your pregnancy?"
          answer={resData?.bmiAtStartOfPregnancy}
        ></DRadioGroup>
      </div>
      <div className="my-6">
        <DRadioGroup
          required
          id="bloodpressure"
          name="bloodpressure"
          label="What was your latest antenatal clinic blood pressure reading?"
          options={bloodPressureOptions}
          answer={resData?.bloodPressure}
        ></DRadioGroup>
      </div>
      <div className="my-6">
        <DRadioGroup
          required
          id="bloodpressuretaken"
          name="bloodpressuretaken"
          label=" When was your most recent blood pressure reading taken?"
          options={bloodPressureTakenOptions}
          answer={resData?.recentBloodPressureDate}
        ></DRadioGroup>
      </div>
    </section>
  );
};

export default MedicalQus;
