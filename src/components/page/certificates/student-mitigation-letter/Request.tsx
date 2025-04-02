"use client";
import DInput from "@/components/ui/DFields/DInput";
import { MitigationLetter } from "@/lib/interface/request.interface";
import { formatDate } from "@/utils/formateDate";
import React from "react";

const Request = ({
  resData,
  isAdmin,
}: {
  resData?: MitigationLetter;
  isAdmin?: boolean;
}) => {
  return (
    <section className="my-12">
      <h1 className="text-2xl font-bold mb-5">Mitigation Request</h1>
      <hr className="border w-full mb-4 mt-2" />
      <div>
        <label className="block mb-2">
          Do you propose an alternative solution for the assessment? If so,
          please explain. (e.g., extension, retaking the assessment, alternative
          assessment method)
        </label>{" "}
        <DInput
          type="text"
          name="solution"
          answer={resData?.mitigationProposal}
          id="solution"
        />
      </div>

      <h1 className="text-2xl font-bold my-8">
        How long do you need this for?
      </h1>
      <div className="w-full max-w-md">
        <DInput
          id="valid-data"
          type="date"
          name="valid-data"
          label="  Valid from date"
          answer={resData ? formatDate(resData?.validFrom as any, true) : null}
        />
        <br />
        <DInput
          type="date"
          name="valid-to-date"
          id="valid-to-date"
          label=" Valid to date"
          readOnly={isAdmin}
          answer={resData ? formatDate(resData?.validTo as any, true) : null}
        />
        <p>
          Your Partner Practitioner may suggest a different end date based on
          their professional judgement for your consultation.
        </p>
      </div>
    </section>
  );
};

export default Request;
