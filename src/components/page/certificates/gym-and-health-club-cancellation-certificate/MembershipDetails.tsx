"use client";
import DInput from "@/components/ui/DFields/DInput";
import { GymCancellationCertificateRequest } from "@/lib/interface/request.interface";
import React from "react";

const MembershipDetails = ({ isAdmin, certificateData }: { isAdmin?: boolean, certificateData?: GymCancellationCertificateRequest }) => {



  return (
    <div className="my=14">
      <h1 className="text-2xl font-bold">Membership Details</h1>
      <hr className="mt-2 mb-4 w-full border" />
      <div className="my-6">
        <DInput
          label="Gym/Health Club Name"
          id="gym-name"
          name="gym-name"
          className="border border-gray-200 border-b-gray-500 p-1 w-full max-w-md rounded"
          answer={certificateData?.gymOrHealthClubName}
          readOnly={isAdmin}
        />
      </div>
      <div className="my-6">
        <DInput
          label="Membership ID or Number"
          id="membership-id"
          name="membership-id"
          className="border border-gray-200 border-b-gray-500 p-1 w-full max-w-md rounded"
          answer={certificateData?.membershipId}
          readOnly={isAdmin}
        />

      </div>
      <div className="my-6">
        <DInput
          type="date"
          label="Date of Joining"
          id="date-join"
          name="date-join"
          className="border border-gray-200 border-b-gray-500 p-1 w-full max-w-md rounded"
          placeholder="DD-MM-YYYY"
          defaultValue={
            certificateData?.dateOfJoining &&
            new Date(certificateData.dateOfJoining).toISOString().split("T")[0]
          }
          readOnly={isAdmin}
        />

      </div>
      <div className="my-6">
        <DInput
          label="Reason for Cancellation"
          id="cancellation"
          name="cancellation"
          className="border border-gray-200 border-b-gray-500 p-1 w-full max-w-md rounded"
          answer={certificateData?.reasonForCancellation}
          readOnly={isAdmin}
        />

      </div>
    </div>
  );
};

export default MembershipDetails;
