// components/TextArea.tsx

import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  name: string;
  label?: string;
  required?: boolean;
  answer?: any;
  title?: string;
}

const DTextArea: React.FC<TextAreaProps> = ({
  label,
  className,
  required,
  id,
  title,
  name,
  answer,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={id} className="font-semibold">
        {label ? label : title}{" "}
        {required && <span className="text-red-500">*</span>}
      </label>
      {answer !== undefined && typeof answer !== "object" ? (
        <div className="mt-2 font-medium pb-5">
          <span className="font-bold underline">Answer:</span> {answer}
        </div>
      ) : (
        <textarea
          required
          id={id}
          name={name}
          className={`w-full px-3 min-h-[100px]  py-[6px] border border-b-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all ${className}`}
          {...props}
        />
      )}
    </div>
  );
};

export default DTextArea;
