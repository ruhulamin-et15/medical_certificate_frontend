"use client";
import React, { useState, useEffect, InputHTMLAttributes } from "react";

// Define the type for the options, extending with HTML input attributes for radio
export type DOptions = {
  label: string;
  value: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>; // Extend with HTML radio attributes
};

interface RadioGroupProps {
  label: string;
  options: DOptions[];
  onChange?: (value: string) => void;
  required?: boolean;
  className?: string;
  id: string;
  name: string;
  defaultChecked?: string;
  isAdmin?: boolean;
  answer?: any;
}

const DRadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  onChange,
  required = false,
  className,
  name,
  isAdmin,
  defaultChecked,
  answer,
}) => {
  // Initialize selectedValue with defaultChecked if provided
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultChecked
  );

  // Sync selectedValue with defaultChecked when component mounts
  useEffect(() => {
    if (defaultChecked) setSelectedValue(defaultChecked);
  }, [defaultChecked]);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    if (onChange) onChange(value);
  };

  // (answer);
  return (
    <div className="mt-4">
      <label className="font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {answer !== undefined &&
      answer !== " " &&
      answer !== "" &&
      answer !== null &&
      typeof answer !== "object" ? (
        <div className="mt-2 mb-4 font-medium ">
          <span className="font-bold underline">Answer:</span>{" "}
          {typeof answer === "boolean"
            ? answer
              ? "Yes"
              : "No"
            : answer?.toString()}
        </div>
      ) : (
        <div className="text-lg">
          {options.map((option, idx) => (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                required={required}
                id={`${name}-${idx}`}
                name={name}
                value={option.value}
                checked={selectedValue === option.value} // Control checked based on selectedValue state
                onChange={() => handleChange(option.value)}
                className={`mr-2 cursor-pointer ${className}`}
                disabled={isAdmin}
                {...option.inputProps} // Spread additional input properties
              />
              <label htmlFor={`${name}-${idx}`} className="cursor-pointer">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DRadioGroup;
