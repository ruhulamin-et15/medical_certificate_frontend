import React from "react";

const DAnswer = ({ answer, label }: { answer: any; label?: string }) => {
  return (
    <div>
      {answer !== undefined &&
        answer !== " " &&
        answer !== "" &&
        answer !== null &&
        typeof answer !== "object" && (
          <div className="mt-2 mb-4 font-medium text-lg">
            {label && (
              <div className="font-semibold">
                {label} <span className="text-xl text-red-500">*</span>
              </div>
            )}
            <span className="font-bold underline">Answer:</span>{" "}
            {typeof answer === "boolean"
              ? answer
                ? "Yes"
                : "No"
              : answer?.toString()}
          </div>
        )}
    </div>
  );
};

export default DAnswer;
