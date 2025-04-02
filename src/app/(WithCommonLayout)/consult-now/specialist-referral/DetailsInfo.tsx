"use client";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup from "@/components/ui/DFields/DRadio";
import DTextArea from "@/components/ui/DFields/DTextarea";
import React, { useState } from "react";
import stripButton from "../../../../assets/image/tgc-stripe-button.png";
import Image from "next/image";
import { BookConsultation } from "@/lib/interface/request.interface";
import { formatDate } from "@/utils/formateDate";

const DetailsInfo = ({
  handleFormSubmit,
  resData,
  isAdmin,
}: {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resData?: BookConsultation;
  isAdmin?: boolean;
}) => {
  const [specialistCondition, setspecialistCondition] = useState<string>("");
  const [medicalCondition, setmedicalCondition] = useState<string>("");
  const [medicationTreatment, setmedicationTreatment] = useState<string>("");
  const sexOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Prefer not to say", value: "preferNotToSay" },
  ];

  const handlespcialistCondition = (e: string) => {
    setspecialistCondition(e);
  };

  const handleMedicalCondition = (e: string) => {
    setmedicalCondition(e);
  };

  const handleMedicationTreatment = (e: string) => {
    setmedicationTreatment(e);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <h1 className="text-2xl font-bold ">Your Details</h1>
        <hr className="mt-2 mb-4 w-full border border-black" />
        <div className="grid grid-cols-1 my-3 max-sm:max-w-md sm:grid-cols-2 py-2 gap-4">
          <div>
            <label htmlFor={"req-firstname"} className="font-semibold">
              Full Name<span className="text-red-500 mx-2">*</span>
            </label>
            <DInput
              label=""
              name="req-firstname"
              id="req-firstname"
              type="text"
              placeholder="Last Name"
              required
              answer={resData?.firstName}
            />
            First Name
          </div>
          <div className="flex justify-between flex-col">
            <div></div>
            <div>
              <DInput
                label=" "
                name="req-lastname"
                id="req-lastname"
                type="text"
                answer={resData?.lastName}
                placeholder="Last Name"
              />
              Last Name
            </div>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="grid grid-cols-1 max-sm:max-w-md sm:grid-cols-2 py-2 gap-4">
        <div>
          <DInput
            label="Your Email"
            name="req-email"
            type="email"
            id="req-email"
            placeholder="mail@example.com"
            answer={resData?.email}
            required
          />
        </div>
      </div>

      {/* Mobile Number and Date of Birth */}
      <div className="grid grid-cols-1 my-3 max-sm:max-w-md sm:grid-cols-2 py-2 gap-4">
        <div>
          <DInput
            name="req-mobile"
            type="tel"
            label="Mobile Number"
            id="req-mobile"
            placeholder="Your mobile number"
            required
            answer={resData?.mobileNumber}
          />
          <p className="mt-2">
            Note: Medic Online may contact you to confirm certain information.
          </p>
        </div>
        <div>
          <DInput
            label="Date of Birth"
            name="req-dob"
            type="date"
            id="req-dob"
            placeholder="DD-MM-YYYY"
            required
            answer={
              resData?.dateOfBirth
                ? formatDate(resData?.dateOfBirth as any, true)
                : null
            }
          />
        </div>
      </div>

      {/* Sex */}
      <div className="my-7">
        <DRadioGroup
          defaultChecked={sexOptions[0].value}
          name="radio-sex"
          id="radio-sex"
          label="Sex"
          options={sexOptions}
          required
          answer={resData?.gender}
          className="" // additional styling for radio inputs if needed
        />
      </div>

      <div className="my-7">
        <DInput
          id="1"
          name="address"
          label="What is your address?"
          required
          answer={resData?.address}
        ></DInput>
        <span className={isAdmin ? "hidden" : "block"}>
          (e.g., 49 ABC Street, London, XY1 Q23, United Kingdom)
        </span>
      </div>

      <div className="my-7">
        <DInput
          id="1"
          name="NHS-number"
          answer={resData?.nhsNumber}
          label="What is your NHS number?"
        ></DInput>
        <span className={isAdmin ? "hidden" : "block"}>
          (N/A if you don&#39;t have one)
        </span>
      </div>

      <div className="my-7">
        <DInput
          id="1"
          name="symptoms-details"
          label="Please share specific details about your condition and symptoms."
          answer={resData?.symptomDetails}
        ></DInput>
        <span className={isAdmin ? "hidden" : "block"}>
          Please also provide info on any existing conditions, medication,
          allergies, and surgical history.
        </span>
      </div>

      <div className="my-7">
        <DInput
          id="1"
          name="health-concern"
          answer={resData?.healthConcern}
          label="Describe your current medical condition or health concern."
        ></DInput>
      </div>

      <div className="my-7">
        <DInput
          id="1"
          name="condition-began"
          answer={resData?.symptomsStartDate}
          label="When did you first notice the symptoms or the condition began?"
        ></DInput>
      </div>

      <div className="my-7">
        <DInput
          id="1"
          name="symptoms-onset"
          answer={resData?.symptomProgression}
          label="Have the symptoms improved, worsened, or remained the same since their onset?"
        ></DInput>
      </div>

      <div className="my-7">
        <DTextArea
          id="1"
          name="symptoms-details2"
          answer={resData?.symptomDetails}
          title="Please provide detailed information about the symptoms you are experiencing."
        ></DTextArea>
      </div>

      <div className="my-7">
        <DInput
          id="1"
          name="symptoms-exacerbate"
          answer={resData?.symptomTriggers}
          label="Are there any specific triggers or factors that exacerbate your symptoms?"
        ></DInput>
      </div>

      <div className="my-7">
        <DInput
          id="1"
          name="symptoms-effect"
          answer={resData?.dailyLifeImpact}
          label="How does your medical condition affect your daily life, including work, activities, and overall well-being?"
        ></DInput>
      </div>

      <div className="my-7">
        <DTextArea
          id="1"
          name="concerns-details"
          answer={resData?.specificConcerns}
          label="Are there any specific concerns or challenges related to your condition that you would like to address in the referral?"
        ></DTextArea>
      </div>

      <div className="my-7">
        <DRadioGroup
          id="1"
          name="specialist-review"
          label="Do you believe you need to see a specialist for your condition? "
          required
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
          answer={resData?.needsSpecialist}
          onChange={handlespcialistCondition}
        ></DRadioGroup>
        {specialistCondition == "yes" || resData?.needsSpecialist == true ? (
          <div className="my-7">
            <DInput
              id="1"
              name="specialist-require"
              answer={resData?.needsSpecialistDetails}
              label="Please specify the type of specialist you believe is required."
              required
            ></DInput>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="my-7">
        <DInput
          id="1"
          name="specialist-reason"
          answer={resData?.specialistUrgency}
          label="How soon do you think you need to be seen by a specialist?"
        ></DInput>
      </div>

      <div className="my-7">
        <DRadioGroup
          id="1"
          name="medical-record"
          label="Have you received any previous treatment or medical care for this condition? "
          required
          answer={resData?.previousTreatment}
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
          onChange={handleMedicalCondition}
        ></DRadioGroup>
        {medicalCondition == "yes" || resData?.previousTreatment == true ? (
          <div className="my-7">
            <DInput
              id="1"
              name="medical-record-details"
              label="Please provide details."
              required
              answer={resData?.previousTreatmentDetails}
            ></DInput>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="my-7">
        <DRadioGroup
          id="1"
          name="medical-record-result-details"
          answer={resData?.hasMedicalRecords}
          label="Do you have any relevant medical records, test results, or documentation related to your condition?"
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
        ></DRadioGroup>
      </div>

      <div className="my-7">
        <DRadioGroup
          id="1"
          name="medications-treatment"
          label="Are you currently taking any medications or undergoing any treatments for your condition?"
          required
          answer={resData?.currentMedications}
          options={[
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ]}
          onChange={handleMedicationTreatment}
        ></DRadioGroup>
        {medicationTreatment == "yes" || resData?.currentMedications == true ? (
          <div className="my-7">
            <DInput
              id="1"
              name="provide-details2"
              answer={resData?.currentMedicationsDetails}
              label="Please provide details of the medications and treatments."
            ></DInput>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="my-7">
        <DInput
          id="1"
          name="medical-information"
          answer={resData?.additionalMedicalInfo}
          label="Is there any other relevant medical information or specific concerns that you would like to share with The MEDIC for the referral?"
        ></DInput>
      </div>

      <div className={isAdmin == true ? "hidden" : "block my-7"}>
        <button type="submit">
          <Image alt="" src={stripButton}></Image>
        </button>
      </div>
    </form>
  );
};

export default DetailsInfo;
