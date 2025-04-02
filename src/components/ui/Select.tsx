import React from "react";

// Extend the existing select attributes
interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  name: string;
  className?: string;
  options: { value: string; label: string }[]; // Array of options
  defaultValue?: string; // Optional default value prop
}

// Custom Select Component
const CustomSelect: React.FC<CustomSelectProps> = ({
  id,
  name,
  className = "",
  options,
  defaultValue,
  onChange,
  ...rest // This will capture any additional props
}) => {
  return (
    <select
      id={id}
      name={name}
      className={`w-full px-3 py-[6px] border border-b-gray-500 border-gray-200 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all ${className}`}
      defaultValue={defaultValue} // Set the default value
      onChange={onChange}
      {...rest} // Spread the rest of the props to the select element
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
