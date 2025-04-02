import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DDatePickerProps {
  id: string;
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

const DDatePicker: React.FC<DDatePickerProps> = ({
  id,
  name,
  label,
  className = "",
  required = false,
  selectedDate,
  onChange,
}) => {
  return (
    <div className="my-5">
      {label && (
        <label htmlFor={id} className="font-semibold">
          {label} {required && <span className="text-red-500 mx-1">*</span>}
        </label>
      )}
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={onChange}
          className={`${className} w-full border-b-black/70 !rounded max-w-md border border-gray-300 p-2`}
          id={id}
          name={name}
          required={required}
          placeholderText="Select a date"
          dateFormat="yyyy-MM-dd"
        />
      </div>
    </div>
  );
};

export default DDatePicker;
