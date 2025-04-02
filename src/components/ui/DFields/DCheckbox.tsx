"use client";
// // components/CheckboxList.tsx
// import React from "react";

// // Define the type for each checkbox item
// export type CheckboxItem = {
//   name: string;
//   label: string;
// };

// // Array of checkbox items

// interface DCheckboxInterface {
//   id: string;
//   label?: string;
//   className?: string;
//   required?: boolean;
//   value: CheckboxItem[];
// }

// const DCheckbox: React.FC<DCheckboxInterface> = ({
//   id,
//   className,
//   label,
//   required,
//   value,
// }) => {
//   return (
//     <div className="space-y-2">
//       {label && (
//         <label htmlFor={id} className="font-semibold">
//           {label}{" "}
//           {label && required && <span className="text-red-500 mx-1">*</span>}
//         </label>
//       )}
//       {value.map((item, idx: number) => (
//         <label
//           htmlFor={`${id}-${idx}`}
//           key={idx}
//           className="flex select-none cursor-pointer items-center space-x-1"
//         >
//           {/* Checkbox input */}
//           <input
//             id={`${id}-${idx}`}
//             type="checkbox"
//             name={item.name}
//             required={required}
//             className={`${className} mr-1`}
//           />
//           {/* Label */}
//           <span className="text-gray-700 ">{item.label}</span>
//         </label>
//       ))}
//     </div>
//   );
// };
// export default DCheckbox;
import React, { useEffect, useState } from "react";

// Define the type for each checkbox item
export type CheckboxItem = {
  name: string;
  label: string;
};

// Define the interface for the checkbox component
interface DCheckboxInterface {
  id: string;
  label?: string;
  className?: string;
  required?: boolean;
  value: CheckboxItem[];
  onChange?: (selected: string[]) => void; // Function to track selected checkboxes
}

const DCheckbox: React.FC<DCheckboxInterface> = ({
  id,
  className,
  label,
  required,
  value,
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedValues?.length === 0) {
      setSelectedId(null);
    }
  }, [selectedValues?.length]);

  // Handle checkbox change
  const handleChange = (name: string, id: string) => {
    setSelectedId(id);
    setSelectedValues((prevSelected) => {
      const updatedSelection = prevSelected.includes(name)
        ? prevSelected.filter((item) => item !== name)
        : [...prevSelected, name];

      onChange?.(updatedSelection); // Call the parent function if provided
      return updatedSelection;
    });
  };

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="font-semibold">
          {label} {required && <span className="text-red-500 mx-1">*</span>}
        </label>
      )}
      {value.map((item, idx) => (
        <label
          htmlFor={`${id}-${idx}`}
          key={idx}
          className="flex select-none cursor-pointer items-center space-x-1"
        >
          <input
            id={`${id}-${idx}`}
            type="checkbox"
            name={item.name}
            required={required && selectedId !== id}
            className={`${className} mr-1`}
            onChange={() => handleChange(item.name, id)}
            checked={selectedValues.includes(item.name)}
          />
          <span className="text-gray-700">{item.label}</span>
        </label>
      ))}
    </div>
  );
};

export default DCheckbox;
