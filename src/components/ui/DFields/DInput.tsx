import React from "react";
import Input from "../Input";

interface DInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  answer?: any;
}

const DInput: React.FC<DInputProps> = ({
  answer,
  id,
  name,
  label,
  className = "",
  onChange,
  required,
  type,
  ...rest // This will capture any additional props
}) => {
  return (
    <div className="w-full mt-3">
      {label && (
        <div className="mb-2">
          <label htmlFor={id} className="font-semibold">
            {label}{" "}
            {label && required && <span className="text-red-500 mx-1">*</span>}
          </label>
        </div>
      )}

      <div>
        {answer !== undefined && typeof answer !== "object" ? (
          <div className=" mb-4">
            <span className="font-bold underline">Answer:</span> {answer}
          </div>
        ) : (
          <Input
            required={required}
            id={id}
            className={`${className} border border-b-black !rounded max-w-md`}
            name={name}
            onChange={onChange}
            type={type}
            {...rest}
          />
        )}
      </div>
    </div>
  );
};

export default DInput;
