import React from "react";

// Extend the existing select attributes
interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  name: string;
  label?: string;
  className?: string;
  options: { value: string; label: string }[]; // Array of options
  defaultValue?: string; // Optional default value prop
  required?: boolean;
}

// Custom Select Component
const DSelect: React.FC<CustomSelectProps> = ({
  id,
  name,
  className = "",
  options,
  defaultValue,
  onChange,
  label,
  required,
  ...rest // This will capture any additional props
}) => {
  return (
    <div className="my-5">
      {label && (
        <label htmlFor={id} className="font-semibold">
          {label}{" "}
          {label && required && <span className="text-red-500 mx-1">*</span>}
        </label>
      )}
      <select
        id={id}
        name={name}
        required={required}
        className={`w-full px-3 py-[6px] border border-gray-300 !border-b-black/70  focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all ${className}`}
        defaultValue={defaultValue} // Set the default value
        onChange={onChange}
        {...rest} // Spread the rest of the props to the select element
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DSelect;
