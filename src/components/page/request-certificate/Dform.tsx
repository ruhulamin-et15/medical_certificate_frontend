"use client";

import React, { ReactNode } from "react";
import DInput from "../../ui/DFields/DInput";
import DRadioGroup, { DOptions } from "../../ui/DFields/DRadio";
import RequestHeader from "./RequestHeader";
import { StaticImageData } from "next/image";
// import { useUser } from "@/lib/provider/UserProvider";
import { usePathname } from "next/navigation";
import DTextArea from "@/components/ui/DFields/DTextarea";
import { useDispatch, useSelector } from "react-redux";
import { updateValue } from "@/redux/slice/ShowDetailsSlice";
import { RootState } from "@/redux/store";

interface DFormProps {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  header?: boolean;
  subtitle?: string;
  imageSrc?: string | StaticImageData;
  handleSexChange?: (value: string) => void;
  resData?: any;
  isAdmin?: boolean;
}

// Usage Example
const DForm: React.FC<DFormProps> = ({
  children,
  handleFormSubmit,
  header = true,
  subtitle,
  imageSrc,
  isAdmin,
  handleSexChange,
  resData,
}) => {
  // const { user } = useUser();
  const pathName = usePathname();
  const dispatch = useDispatch();
  const details = useSelector((state: RootState) => state.ShowDetailsReducer);
  // Define the options for the "Sex" radio group
  // const [createAccount, setCreateAccount] = useState(false);

  const sexOptions: DOptions[] = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Prefer not to say", value: "preferNotToSay" },
  ];

  return (
    <div className=" flex items-center justify-center p-4">
      <div className="max-w-[50rem] w-full bg-white rounded-sm sm:shadow-[0_4px_8px_rgba(0,0,0,0.3)] sm:p-6">
        {header ? (
          <RequestHeader
            title="Medical Letter Questionnaire"
            subtitle={subtitle ? subtitle : ""}
            description="Before releasing your medical letter, our group of practitioners will review the evidence you submit. Only upon approval, shall you receive the medical letter via email including a unique reference number, which can be used to confirm its authenticity"
            imageSrc={imageSrc ? imageSrc : ""} // replace with actual path
            imageAlt={imageSrc ? imageSrc?.toString() : ""}

            // Dynamic inputs passed as React children
          >
            <form onSubmit={handleFormSubmit}>
              <div>
                <div className="grid grid-cols-1 max-sm:max-w-md sm:grid-cols-2 py-2 gap-4">
                  <div>
                    <label htmlFor={"req-firstname"} className="font-semibold">
                      Full Name<span className="text-red-500 mx-2">*</span>
                    </label>
                    <DInput
                      label=""
                      name="req-firstname"
                      id="req-firstname"
                      type="text"
                      placeholder="First Name"
                      required
                      onChange={(e) =>
                        dispatch(
                          updateValue({ ...details, firstName: e.target.value })
                        )
                      }
                      readOnly={isAdmin}
                      defaultValue={resData?.firstName}
                    />
                    First Name
                  </div>
                  <div className="flex justify-between flex-col">
                    <div></div>
                    <div>
                      <DInput
                        label=""
                        name="req-lastname"
                        id="req-lastname"
                        type="text"
                        onChange={(e) =>
                          dispatch(
                            updateValue({
                              ...details,
                              lastName: e.target.value,
                            })
                          )
                        }
                        placeholder="Last Name"
                        readOnly={isAdmin}
                        defaultValue={resData?.lastName}
                      />
                      Last Name
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="grid grid-cols-1 max-sm:max-w-md sm:grid-cols-2 py-2 gap-4">
                <div>
                  <DInput
                    label="Your Email"
                    name="req-email"
                    type="email"
                    id="req-email"
                    onChange={(e) =>
                      dispatch(
                        updateValue({ ...details, email: e.target.value })
                      )
                    }
                    placeholder="mail@example.com"
                    required
                    readOnly={isAdmin}
                    defaultValue={resData?.email}
                  />
                  <div className="flex justify-end cursor-pointer items-center mt-2">
                    {/* {!user && (
                      <div className="cursor-pointer">
                        <input
                          type="checkbox"
                          id="createAccount"
                          readOnly={isAdmin}
                          checked={createAccount}
                          onChange={(e) => setCreateAccount(e.target.checked)}
                          className="mr-2 cursor-pointer"
                        />
                        <label
                          htmlFor="createAccount"
                          className=" cursor-pointer text-sm"
                        >
                          Create Account?
                        </label>
                      </div>
                    )} */}
                  </div>
                </div>
                <div>
                  {/* {!user && (
                    <DInput
                      label="Your Password"
                      name="req-password"
                      type="password"
                      readOnly={isAdmin}
                      id="req-password"
                      placeholder="********"
                      required
                    />
                  )} */}
                </div>
              </div>

              {/* Mobile Number and Date of Birth */}
              <div className="grid grid-cols-1 max-sm:max-w-md sm:grid-cols-2 py-2 gap-4">
                <div>
                  <DInput
                    name="req-mobile"
                    type="tel"
                    label="Mobile Number"
                    id="req-mobile"
                    onChange={(e) => {
                      dispatch(
                        updateValue({ ...details, phone: e.target.value })
                      );
                    }}
                    readOnly={isAdmin}
                    placeholder="Your mobile number"
                    defaultValue={resData?.mobileNumber}
                    required
                  />
                  <p className="  mt-1">
                    Note: Medic Online may contact you to confirm certain
                    information.
                  </p>
                </div>
                <div>
                  <DInput
                    disabled={isAdmin}
                    label="Date of Birth"
                    name="req-dob"
                    readOnly={isAdmin}
                    type="date"
                    id="req-dob"
                    placeholder="DD-MM-YYYY"
                    onChange={(e) =>
                      dispatch(
                        updateValue({
                          ...details,
                          dateOfBirth: new Date(e.target.value)
                            .toISOString()
                            .split("T")[0],
                        })
                      )
                    }
                    defaultValue={
                      resData?.dateOfBirth &&
                      new Date(resData.dateOfBirth).toISOString().split("T")[0]
                    }
                    required
                  />
                </div>
              </div>

              {/* Address */}
              {pathName ==
              "/request-certificate/visa-medicals-certificates-of-good-health" ? (
                <div className="mt-4">
                  <DTextArea
                    label="Address"
                    title="Address"
                    readOnly={isAdmin}
                    name="req-address"
                    id="1"
                    defaultValue={resData?.address}
                  ></DTextArea>
                </div>
              ) : (
                ""
              )}

              {/* Sex */}
              <div className="mt-4">
                <DRadioGroup
                  defaultChecked={
                    resData?.gender ? resData?.gender : ''
                  }
                  name="radio-sex"
                  id="radio-sex"
                  label="Sex"
                  isAdmin={isAdmin}
                  options={sexOptions}
                  onChange={(e: string) => {
                    if (handleSexChange) handleSexChange(e);
                    dispatch(
                      updateValue({
                        ...details,
                        sex: e ? e : sexOptions[0].value,
                      })
                    );
                  }}
                  required
                  className="" // additional styling for radio inputs if needed
                />
              </div>
              <div className="my-3">{children}</div>
            </form>
          </RequestHeader>
        ) : (
          <form onSubmit={handleFormSubmit}>{children}</form>
        )}
      </div>
    </div>
  );
};

export default DForm;
