"use client";
import DAnswer from "@/components/ui/DFields/DAnswer";
import { SickNoteRequest } from "@/lib/interface/request.interface";
import React, { useState } from "react";

const MedicalQus = ({
  isAdmin,
  resData,
}: {
  resData?: SickNoteRequest;
  isAdmin?: boolean;
}) => {
  const [condition1, setCondition1] = useState<string>("");
  const [condition2, setCondition2] = useState<string>("");

  const handlePreExisting = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCondition1(value);
  };

  const handleMedications = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCondition2(value);
  };

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Medical Questions</h1>
      <hr className="border w-full mb-4 mt-2" />

      <div className="mb-4 ">
        <label className="flex font-semibold items-center mb-2">
          {/* <input type="radio" name="medications" value="yes" className="mr-2 cursor-pointer" /> */}
          <span>
            Do you have any pre-existing health conditions your Partner
            Practitioner should be aware of?{" "}
            <span className="text-xl text-red-600">*</span>
          </span>
        </label>
        {resData?.preexistingConditions !== undefined ? (
          <DAnswer answer={resData.preexistingConditions} />
        ) : (
          <div>
            <input
              required
              type="radio"
              name="preexisting"
              onChange={handlePreExisting}
              value="yes"
              disabled={isAdmin}
              className="mr-2 cursor-pointer"
              id="preexisting1"
            />
            <label htmlFor="preexisting1" className="cursor-pointer">
              Yes
            </label>{" "}
            <br />
            <input
              type="radio"
              required
              name="preexisting"
              id="preexisting2"
              onChange={handlePreExisting}
              value="no"
              defaultChecked={resData?.preexistingConditions ? true : false}
              disabled={isAdmin}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="preexisting2" className="cursor-pointer">
              No
            </label>
          </div>
        )}
        {condition1 === "yes" || resData?.preexistingConditions === true ? (
          <div className="my-6">
            <label className="font-semibold">
              Please provide information about your pre-existing health
              conditions.<span className="text-xl text-red-500">*</span>
            </label>
            <input
              defaultValue={resData?.preexistingConditionsDetails ?? ""}
              disabled={isAdmin}
              required={condition1 === "yes"}
              type="text"
              name="health-details"
              className="border p-1 w-full border-gray-300 border-b-gray-500"
            />
          </div>
        ) : (
          <div>
            <DAnswer
              label=" Please provide information about your pre-existing health
              conditions."
              answer={resData?.preexistingConditionsDetails}
            />
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="flex  font-semibold items-center mb-2">
          {/* <input type="radio" name="medications" value="yes" className="mr-2 cursor-pointer" /> */}
          <span>
            Are you taking any medications regularly?{" "}
            <span className="text-xl text-red-600">*</span>
          </span>
        </div>
        {resData?.regularMedication !== undefined ? (
          <DAnswer answer={resData.regularMedication} />
        ) : (
          <div>
            <input
              required
              type="radio"
              name="medications"
              id="medications1"
              onChange={handleMedications}
              value="yes"
              disabled={isAdmin}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="medications1" className="cursor-pointer">
              Yes
            </label>
            <br />
            <input
              required
              type="radio"
              name="medications"
              id="medications2"
              onChange={handleMedications}
              disabled={isAdmin}
              value="no"
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="medications2" className="cursor-pointer">
              No
            </label>
          </div>
        )}
        {condition2 === "yes" &&
        resData?.regularMedicationDetails == undefined ? (
          <div className="my-6">
            <label className="font-semibold">
              Please tell us which medications and their doses that you take.
              <span className="text-xl text-red-500">*</span>
            </label>
            <input
              disabled={isAdmin}
              type="text"
              required={condition2 === "yes"}
              name="medications-details"
              className="border p-1 w-full border-gray-300 border-b-gray-500"
            />
          </div>
        ) : (
          <div>
            <DAnswer
              label=" Please tell us which medications and their doses that you take."
              answer={resData?.regularMedicationDetails}
            />
          </div>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold">How long do you need this for?</h1>
        <hr className="border w-full mb-4 mt-2" />
        <div className="my-7">
          <label htmlFor="" className="font-semibold">
            Have you self-certified for a week already?{" "}
          </label>{" "}
          <br />
          {resData?.certifiedForWeek !== undefined ? (
            <DAnswer answer={resData.certifiedForWeek} />
          ) : (
            <div>
              <input
                required
                type="radio"
                name="selfcertified"
                id="selfcertified1"
                className="mr-2 cursor-pointer"
                value="yes"
                disabled={isAdmin}
              />
              <label htmlFor="selfcertified1">Yes</label> <br />
              <input
                required
                type="radio"
                name="selfcertified"
                id="selfcertified2"
                className="mr-2 cursor-pointer"
                disabled={isAdmin}
                value="no"
              />
              <label htmlFor="selfcertified2">No</label>
            </div>
          )}
        </div>
        <div className="w-full max-w-md">
          <label htmlFor="" className="font-semibold">
            Valid from <span className="text-xl text-red-500">*</span>
          </label>
          <input
            defaultValue={
              resData?.validFrom &&
              new Date(resData.validFrom).toISOString().split("T")[0]
            }
            disabled={isAdmin}
            type="date"
            required
            className="border p-1 w-full border-gray-300 border-b-gray-500"
            placeholder="DD-MM-YYYY"
            name="valid-from"
            id="valid-from-date"
          />
          <span>
            Please note, length of absence recommended is at the doctor&#39;s
            discretion based on the information provided, a follow-up call and
            the doctor&#39;s own clinical experience. We can only back-date upto
            two weeks.
          </span>
          <br />
          <br />
          <label htmlFor="" className="font-semibold">
            Valid to
          </label>
          <input
            defaultValue={
              resData?.validTo &&
              new Date(resData.validTo).toISOString().split("T")[0]
            }
            disabled={isAdmin}
            type="date"
            required
            className="border p-1 w-full border-gray-300 border-b-gray-500"
            placeholder="DD-MM-YYYY"
            name="valid-to"
            id="valid-to-date"
          />
        </div>
      </div>
    </section>
  );
};

export default MedicalQus;
