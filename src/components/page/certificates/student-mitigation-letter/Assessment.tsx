"use client";
import DInput from "@/components/ui/DFields/DInput";
import { MitigationLetter } from "@/lib/interface/request.interface";
import React from "react";

const Assessment = ({ resData, isAdmin }: { resData?: MitigationLetter, isAdmin?: boolean }) => {
  return (
    <section className="my-12">
      <h1 className="text-2xl font-bold ">Impact on Assessment</h1>
      <hr className="border w-full mb-4 mt-2" />
      <div className="my-6">
        <label htmlFor="" className="font-semibold">
          Please describe in detail how the mitigating circumstance impacted
          your ability to complete the assessment.
        </label>
        <textarea
          name="mitigatingimpact"
          id=""
          className="w-11/12 h-32 rounded p-1 border border-b-gray-500"
          readOnly={isAdmin}
          defaultValue={resData?.impactOnAssessment}
        ></textarea>
      </div>

      <div>
        <label htmlFor="" className="font-semibold">
          If applicable, explain any steps you took to attempt to complete the
          assessment despite the mitigating circumstance.
        </label>{" "}
        <br />
        <DInput
          type="text"
          name="completeassessment"
          answer={resData?.circumstance}
          id="completeassessment"
        />
      </div>
    </section>
  );
};

export default Assessment;
