"use client";
import DInput from "@/components/ui/DFields/DInput";
import { MitigationLetter } from "@/lib/interface/request.interface";
import React from "react";

const EducationalInstitution = ({ resData, isAdmin }: { resData?: MitigationLetter, isAdmin?: boolean }) => {
  return (
    <section className="my-10">
      <h1 className="text-2xl font-bold">Your educational institution</h1>
      <hr className="border w-full mb-4 mt-2" />
      <div className="my-6">
        
        <DInput
          type="text"
          name="college-name"
          id="college-name"
          label=" Please confirm which University or College you attend"
          required
          answer={resData?.institutionName}
          
        />
      </div>
      <div className="my-6">
        <label htmlFor="" className="font-semibold">
          Please confirm which course and year of study
          <span className="text-xl text-red-500 font-bold">*</span>
        </label>{" "}
        <br />
        <DInput
          type="text"
          name="course-year"
          readOnly={isAdmin}
          answer={resData?.courseName}
          id="course-year"
        />
      </div>

      <div className="my-12">
        <h1 className="text-2xl font-bold">Additional Information</h1>
        <div className="my-6">
          <label htmlFor="" className="font-semibold">
            Please confirm which course and year of study
            <span className="text-xl text-red-500 font-bold">*</span>
          </label>{" "}
          <br />
          <textarea
            className="border border-gray-300 p-1 w-11/12 h-32 border-b-gray-500"
            name="additional-information"
            readOnly={isAdmin}
            defaultValue={resData?.additionalInfo}
            id=""
          />
        </div>
      </div>
    </section>
  );
};

export default EducationalInstitution;
