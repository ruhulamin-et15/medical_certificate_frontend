"use client";
import DInput from "@/components/ui/DFields/DInput";
import { EmployeeFitnessCertificate } from "@/lib/interface/request.interface";
import React from "react";

const Workplace = ({ resData, }: { resData?: EmployeeFitnessCertificate,  }) => {
  return (
    <section>
      <h1 className="text-2xl font-bold">Your workplace</h1>
      <hr className="border w-full mb-4 mt-2" />
      <div className="my-5">
        <DInput
          type="text"
          id="confirm-work"
          name="confirm-work"
          answer={resData?.workplace}
          label=" Please confirm where you work"
          required
        />
      </div>
      <div className="my-5">

        <DInput
          type="text"
          name="details-work"
          id="details-work"
          label="Please describe your daily work activities"
          required
          answer={resData?.workActivities}
        />
      </div>
    </section>
  );
};

export default Workplace;
