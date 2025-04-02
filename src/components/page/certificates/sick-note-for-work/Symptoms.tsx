"use client";
import DAnswer from "@/components/ui/DFields/DAnswer";
import { SickNoteRequest } from "@/lib/interface/request.interface";
import React, { useState } from "react";

const Symptoms = ({
  isAdmin,
  resData,
}: {
  resData?: SickNoteRequest;
  isAdmin?: boolean;
}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Check the word count
    const wordCount = value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    // Validate word count
    if (wordCount < 20 && wordCount > 1) {
      setErrorMessage("Please enter at least 20 words.");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <section className="my-10">
      <h1 className="text-2xl font-bold">Symptoms</h1>
      <hr className="border w-full mb-4 mt-2" />
      {/* <div className='my-5'>
                <label htmlFor="" className='font-semibold'>What treatment was administered in A&E or by your GP? <span className='text-xl text-red-500'>*</span></label>
                <input type="text" className='border p-1 w-full max-w-md border-gray-300 border-b-gray-500' />
            </div> */}
      <div className="my-5">
        <label htmlFor="" className="font-semibold">
          Start date of symptoms <span className="text-xl text-red-500">*</span>
        </label>{" "}
        <br />
        <input
          required
          type="date"
          defaultValue={
            resData?.symptomStartDate &&
            new Date(resData.symptomStartDate).toISOString().split("T")[0]
          }
          disabled={isAdmin}
          placeholder="DD-MM-YYYY"
          name="symptoms-date"
          className="border p-1 w-full max-w-md border-gray-300 border-b-gray-500"
        />
      </div>
      <div className="my-5">
        <label htmlFor="" className="font-semibold">
          Main reason for medical letter{" "}
          <span className="text-xl text-red-500">*</span>
        </label>
        {resData?.medicalReason !== undefined ? (
          <DAnswer
            answer={
              resData.medicalReason === "commoncoldorflu"
                ? "Common cold or flu"
                : resData.medicalReason === "headache"
                ? "Headache"
                : resData.medicalReason === "migraine"
                ? "Migraine"
                : resData.medicalReason === "backpain"
                ? "Back pain"
                : resData.medicalReason === "periodpain"
                ? "Period pain"
                : resData.medicalReason === "anxietystressordepression"
                ? "Anxiety, stress, or depression"
                : resData.medicalReason === "other"
                ? "Other"
                : "No specific medical reason"
            }
          />
        ) : (
          <div>
            <input
              required
              disabled={isAdmin}
              type="radio"
              name="medicalletter"
              id="medicalletter1"
              value="commoncoldorflu"
              className="mr-2"
            />
            <label htmlFor="medicalletter1">Common cold or flu</label>
            <br />
            <input
              required
              disabled={isAdmin}
              defaultChecked={
                resData?.medicalReason === "headache" ? true : false
              }
              type="radio"
              name="medicalletter"
              id="medicalletter2"
              value="headache"
              className="mr-2"
            />
            <label htmlFor="medicalletter2">Headache</label>
            <br />
            <input
              required
              disabled={isAdmin}
              type="radio"
              defaultChecked={
                resData?.medicalReason === "migraine" ? true : false
              }
              name="medicalletter"
              id="medicalletter3"
              value="migraine"
              className="mr-2"
            />
            <label htmlFor="medicalletter3">Migraine</label>
            <br />
            <input
              required
              disabled={isAdmin}
              defaultChecked={
                resData?.medicalReason == "backpain" ? true : false
              }
              type="radio"
              name="medicalletter"
              id="medicalletter4"
              value="backpain"
              className="mr-2"
            />
            <label htmlFor="medicalletter4">Back pain</label>
            <br />
            <input
              required
              disabled={isAdmin}
              defaultChecked={
                resData?.medicalReason === "periodpain" ? true : false
              }
              type="radio"
              name="medicalletter"
              id="medicalletter5"
              value="periodpain"
              className="mr-2"
            />
            <label htmlFor="medicalletter5">Period pain</label>
            <br />
            <input
              required
              disabled={isAdmin}
              defaultChecked={
                resData?.medicalReason == "Anxietystressordepression"
                  ? true
                  : false
              }
              type="radio"
              name="medicalletter"
              id="medicalletter6"
              value="Anxietystressordepression"
              className="mr-2"
            />
            <label htmlFor="medicalletter6">
              Anxiety, stress or depression
            </label>
            <br />
            <input
              required
              disabled={isAdmin}
              defaultChecked={resData?.medicalReason === "other" ? true : false}
              id="medicalletter7"
              type="radio"
              name="medicalletter"
              value="other"
              className="mr-2"
            />
            <label htmlFor="medicalletter">Other</label>
          </div>
        )}
      </div>
      <div className="my-5">
        <div className="font-bold">
          Please describe the timeline and the details of your symptoms.{" "}
          <span className="text-xl text-red-500">*</span>
        </div>
        {resData?.symptomsDetails !== undefined ? (
          <DAnswer answer={resData.symptomsDetails} />
        ) : (
          <textarea
            required
            name="symptomsdetails"
            onChange={handleTextareaChange}
            disabled={isAdmin}
            className="w-11/12 h-32 border p-2 border-gray-300 rounded border-b-gray-500"
            id="id-1"
          ></textarea>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
      {resData?.medicalCareSought !== undefined ? (
        <DAnswer
          answer={
            resData?.medicalCareSought === "yesmedic" || "yesgp"
              ? "Yes, from my MEDIC"
              : resData?.medicalCareSought === "yeslocala&e"
              ? "Yes, I visited my local A&E"
              : resData?.medicalCareSought === "no"
              ? "No"
              : "No information provided"
          }
        />
      ) : (
        <div>
          <label htmlFor="" className="font-bold">
            Have you sought medical care from your GP or local A&E for your
            medical issue? <span className="text-xl text-red-500">*</span>
          </label>
          <label className="flex items-center mb-2">
            <input
              required
              type="radio"
              name="medicalcare"
              value="yesmedic"
              className="mr-2"
              disabled={isAdmin}
            />
            <span>Yes, from my GP</span>
          </label>
          <label className="flex items-center mb-2">
            <input
              required
              type="radio"
              name="medicalcare"
              value="yeslocala&e"
              className="mr-2"
              disabled={isAdmin}
            />
            <span>Yes, I visited my local A&E</span>
          </label>
          <label className="flex items-center mb-2">
            <input
              required
              type="radio"
              name="medicalcare"
              value="no"
              className="mr-2"
              disabled={isAdmin}
            />
            <span>No</span>
          </label>
        </div>
      )}

      <div className="my-6">
        <label htmlFor="" className="font-semibold">
          Condition Status <span className="text-xl text-red-500">*</span>
        </label>
        {resData?.conditionStatus !== undefined ? (
          <DAnswer
            answer={
              resData.conditionStatus === "ONGOING"
                ? "Ongoing"
                : resData.conditionStatus === "FULLY_RECOVERED"
                ? "Fully Recovered"
                : resData.conditionStatus === "PARTIALLY_RECOVERED"
                ? "Partially Recovered"
                : "Status not specified"
            }
          />
        ) : (
          <select
            id="condition-status"
            name="conditionstatus"
            className="w-full p-2 border border-gray-300 rounded"
            required
            value={resData?.conditionStatus}
          >
            <option value="">Please Select</option>
            <option value="ONGOING">Ongoing</option>
            <option value="FULLY_RECOVERED">Fully Recovered</option>
            <option value="PARTIALLY_RECOVERED">Partially recovered</option>
          </select>
        )}
        <span>
          Are your symptoms still ongoing, partially recovered <br /> or are you
          fully recovered?
        </span>
      </div>
    </section>
  );
};

export default Symptoms;
