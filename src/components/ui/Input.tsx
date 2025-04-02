import React from "react";

// Extend the existing input attributes
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  className?: string;
}

// PasswordInput Component
const Input: React.FC<InputProps> = ({
  id,
  name,
  className = "",
  onChange,
  type,
  ...rest // This will capture any additional props
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      className={`w-full px-3  py-[6px] border border-b-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all ${className}`}
      onChange={onChange}
      {...rest} // Spread the rest of the props to the input element
    />
  );
};

export default Input;
