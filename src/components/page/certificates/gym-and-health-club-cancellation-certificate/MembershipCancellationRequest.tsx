"use client";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import { GymCancellationCertificateRequest } from "@/lib/interface/request.interface";
import React, { useState } from "react";

const MembershipCancellationRequest = ({
  isAdmin,
  certificateData,
}: {
  isAdmin?: boolean;
  certificateData?: GymCancellationCertificateRequest;
}) => {
  const [healthclubcancellation, sethealthclubcancellation] =
    useState<string>();

  const handlehealthclubcancellation = (e: string) => {
    sethealthclubcancellation(e);
  };
  const yesNoOptions: DOptions[] = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  return (
    <div className="my-14">
      <h1 className="text-2xl font-bold">Membership Cancellation Request</h1>
      <hr className="mt-2 mb-4 w-full border" />

      <div className="my-6">
        <DInput
          id="cancellation-gym"
          label="Why are you requesting the cancellation of your gym/health club
          membership?"
          type="text"
          required
          name="cancellation-gym"
          className="border border-gray-200 border-b-gray-500 p-1 w-full max-w-md rounded"
          answer={certificateData?.reasonForCancellation}
          readOnly={isAdmin}
        />
      </div>

      <div className="my-6">
        <DRadioGroup
          label="Do you understand the terms and conditions of the membership
          cancellation, including any fees or notice periods?"
          options={yesNoOptions}
          required
          name="membership-cancellation"
          id="membership-cancellation"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.includeFees
                ? "Yes"
                : "No"
              : " "
          }
        />
      </div>

      <div className="my-14">
        <h1 className="text-2xl font-bold">Doctor&#39;s Information</h1>
        <hr className="mt-2 mb-4 w-full border" />

        <div className="my-6">
          <DRadioGroup
            onChange={handlehealthclubcancellation}
            label=" Have you consulted with your GP regarding your gym/health club
            cancellation request?"
            options={yesNoOptions}
            required
            name="healthclubcancellation"
            id="healthclubcancellation"
            isAdmin={isAdmin}
            answer={
              certificateData
                ? certificateData?.consultedGP
                  ? "Yes"
                  : "No"
                : " "
            }
          />
          {(healthclubcancellation == "yes" ||
            certificateData?.consultedGP == true) && (
            <div className="my-5">
              <label htmlFor="" className="font-bold">
                Please provide details.{" "}
                <span className="text-xl text-red-500">*</span>
              </label>{" "}
              <br />
              <input
                required={healthclubcancellation == "yes"}
                type="text"
                name="provide-details2"
                className="border border-gray-200 w-full max-w-md border-b-gray-500 p-1 rounded"
              />
            </div>
          )}
        </div>
      </div>

      <div className="my-14">
        <h1 className="text-2xl font-bold">Additional Information</h1>
        <hr className="mt-2 mb-4 w-full border" />
        <div className="my-6">
          <DInput
            id="relevant-information-cancellation"
            label="Is there any other relevant information you would like to share with
            your GP regarding your gym/health club membership cancellation?"
            type="text"
            required
            name="relevant-information-cancellation"
            className="border border-gray-200 border-b-gray-500 p-1 w-full max-w-md rounded"
            answer={certificateData?.additionalInformation}
            readOnly={isAdmin}
          />
        </div>
      </div>
    </div>
  );
};

export default MembershipCancellationRequest;
