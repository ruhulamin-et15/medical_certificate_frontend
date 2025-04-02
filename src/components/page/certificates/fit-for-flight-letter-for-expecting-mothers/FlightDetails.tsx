"use client";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup from "@/components/ui/DFields/DRadio";
import { FitForFlightRequest } from "@/lib/interface/request.interface";
import { formatDate } from "@/utils/formateDate";
import React, { useState } from "react";

const FlightDetails = ({ resData }: { resData?: FitForFlightRequest }) => {
  const [flightCondition, setFlightCondition] = useState<string>("");
  const handleFlight = (e: string) => {
    // const value = e.target.value;
    setFlightCondition(e);
  };
  const flightDurationOptions = [
    { label: "Short-haul flight: 1-3 hours", value: "1-3 hours" },
    { label: "Medium-haul flight: 3-6 hours", value: "3-6 hours" },
    { label: "Long-haul flight: 6-12 hours", value: "6-12 hours" },
  ];
  const returnFlightOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  return (
    <section>
      <h1 className="text-2xl font-bold">Confirm your flight details</h1>
      <hr className="border mt-2 mb-4" />
      <div className="my-6 w-full max-w-md">
        <DInput
          required
          id="flight-date"
          type="date"
          name="flight-date"
          label=" Outbound flight date"
          placeholder="DD-MM-YYYY"
          className="border w-full p-1 border-gray-200 border-b-gray-500 "
          answer={
            resData && formatDate(resData?.outboundFlightDate as any, true)
          }
        />
        <br />
        <span className="">
          Please note that most airlines will only accept letters dated within
          14 days of your outbound flight. Check your airline&#39;s policy.
        </span>
      </div>
      <div className="my-6">
        <DInput
          id="airline"
          type="text"
          name="airline"
          label="Airline "
          required
          placeholder="Name of airline you are traveling with"
          className="border w-full max-w-md p-1 border-gray-200 border-b-gray-500 "
          answer={resData?.airlineName}
        />
      </div>
      <div className="my-6">
        <DRadioGroup
          id="flight-duration"
          name="flight-duration"
          label="What is the duration of your flight? "
          required
          options={flightDurationOptions}
          answer={resData?.flightDuration}
        ></DRadioGroup>
      </div>

      <div className="my-6 ">
        <DInput
          id="pregnancy-outbound"
          label="How far along will your pregnancy be at the time of your outbound
          flight (in weeks)?"
          type="number"
          name="pregnancy-outbound"
          className="border w-full max-w-md border-gray-200 border-b-gray-500"
          placeholder="e.g. 28"
          required
          answer={resData?.pregnancyWeeksAtFlight}
        />
        <div className="w-full max-w-md">
          <span>
            Number of weeks pregnant. Your Partner Practitioner is unable to
            certify you as fit-to-fly if your gestation is of 36 weeks or over
            by your flight date.
          </span>
        </div>
      </div>

      <div className="my-6">
        <DRadioGroup
          id="returnflight"
          name="returnflight"
          options={returnFlightOptions}
          label="Do you have a return flight?"
          required
          onChange={handleFlight}
          answer={resData?.returnFlight}
        ></DRadioGroup>

        {flightCondition == "yes" || resData?.returnFlight ? (
          <div className="my-6">
            <label htmlFor="return-flight-date" className="font-bold">
              Return flight date <span className="text-xl text-red-500">*</span>
            </label>{" "}
            <br />
            <DInput
              required={flightCondition == "yes"}
              id="return-flight-date"
              type="date"
              name="return-flight-date"
              placeholder="DD-MM-YYYY"
              className="border w-full max-w-md p-1 border-gray-200 border-b-gray-500 "
              answer={
                resData && formatDate(resData?.returnFlightDate as any, true)
              }
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default FlightDetails;
