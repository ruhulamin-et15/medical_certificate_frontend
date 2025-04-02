"use client";
import React from "react";
import DSelect from "@/components/ui/DFields/DSelect";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import DInput from "@/components/ui/DFields/DInput";
import DTextArea from "@/components/ui/DFields/DTextarea";

const Dpage = () => {
  const sexOptions: DOptions[] = [
    { label: "Male", value: "male", inputProps: { disabled: false } },
    { label: "Female", value: "female", inputProps: { disabled: false } },
    {
      label: "Prefer not to say",
      value: "prefer_not_to_say",
      inputProps: { disabled: false },
    },
  ];

  const handleSexChange = () => {
    // ("Selected sex:", value);
  };

  return (
    <div className="container flex flex-col gap-4">
      <DRadioGroup
        id="radio-1"
        name="radio-1"
        options={sexOptions}
        onChange={handleSexChange}
        label="Your sex?"
      />
      <DSelect
        id="d-select"
        name="d-select"
        options={[{ value: "option1", label: "Option 1" }]}
      />
      <DInput
        label="This is a title"
        required
        type="date"
        placeholder="12-12-2024"
        id="d-input"
        name="d-input"
      />
      <DTextArea id="d-area" name="d-area" title="This is a title" required />
    </div>
  );
};

export default Dpage;
