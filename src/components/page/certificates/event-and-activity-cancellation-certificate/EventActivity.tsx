"use client";
import DForm from "@/components/page/request-certificate/Dform";
import DHeader from "@/components/ui/DFields/DHeader";
import DInput from "@/components/ui/DFields/DInput";
import DPriority from "@/components/ui/DFields/DPriority";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import DTextArea from "@/components/ui/DFields/DTextarea";
import certificates from "../../../../../public/cardData.json";
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import RequestFooter from "@/components/Request/RequestFooter";
import {
  EventActivityCancellationRequest,
  PriorityOption,
} from "@/lib/interface/request.interface";
import { getPrices } from "@/utils/getPriceInCirtificateRequest";
import { useCertificateRequestPostMutation } from "@/redux/api/certificate/certificate.post";
import {
  PaymentType,
  usePaymentCertificateMutation,
} from "@/redux/api/payment/payment.api";
import { useRegisterMutation } from "@/redux/api/user/user.auth";
import { useUser } from "@/lib/provider/UserProvider";
import { RegisterUserInterface } from "@/redux/api/user/user.auth.interface";
import Loading from "@/components/ui/Loading";
import AdminPriority from "@/components/Request/AdminPriority";
// import image1 from "../"

const EventActivity = ({
  isAdmin,
  certificateData,
}: {
  isAdmin?: boolean;
  certificateData?: EventActivityCancellationRequest;
}) => {
  const [sex, setSex] = useState("male");
  const [medicalCondition, setMedicalCondition] = useState(false);
  const [gpRegarding, setGpRegarding] = useState(false);
  const [gpConducted, setGpConducted] = useState(false);

  const [priority, setPriority] = useState("STANDARD_REQUEST");
  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  const pathname = usePathname();
  const prices = getPrices(pathname, isAdmin);
  const { price1, price2, path, name } = prices;
  const [price, setPrice] = useState(price1);
  const [finalPrice, setFinalPrice] = useState(price1);

  const certificate = certificates.find((item) => item.id === (path as string));

  const router = useRouter();
  const [postVaccineReq, { isLoading }] = useCertificateRequestPostMutation();
  const [paymentCertificate, { isLoading: loading2 }] =
    usePaymentCertificateMutation();
  const [createAccountUser, { isSuccess }] = useRegisterMutation();
  const { user, login } = useUser();

  const handleMedicalCondition = (value: any) => {
    // (value);
    if (value === "yes") {
      setMedicalCondition(true);
    } else {
      setMedicalCondition(false);
    }
  };
  const handleGpConducted = (value: any) => {
    // (value);
    if (value === "yes") {
      setGpConducted(true);
    } else {
      setGpConducted(false);
    }
  };
  const handleGpRegarding = (value: any) => {
    // (value);
    if (value === "yes") {
      setGpRegarding(true);
    } else {
      setGpRegarding(false);
    }
  };
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const data: EventActivityCancellationRequest = {
      firstName: (form.get("req-firstname") as string) ?? "",
      lastName: (form.get("req-lastname") as string) ?? "",
      email: (form.get("req-email") as string) ?? "",
      mobileNumber: (form.get("req-mobile") as string) ?? "",
      dateOfBirth: new Date((form.get("req-dob") as string) ?? ""), // Parsing to Date
      gender: sex ?? "male",
      eventName: (form.get("Name_event") as string) ?? "",
      eventDate: new Date((form.get("date_event") as string) ?? ""), // Parsing to Date
      eventLocation: (form.get("location_event") as string) ?? "",
      cancellationReason: (form.get("reason_cancellation") as string) ?? "",
      medicalCondition: medicalCondition, // Assume this is already handled
      medicalDetails: (form.get("medical_condition_input") as string) ?? "",
      impactOnParticipation:
        (form.get("medical_condition_impact") as string) ?? "",
      consultedDoctor: gpRegarding, // Assume this is already handled
      GPNameInfo: (form.get("GP_regarding_input") as string) ?? "",
      amount: finalPrice, // Assuming this is a number and handled elsewhere
      doctorAssessment: gpConducted, // Assume this is already handled
      assessmentDetails: (form.get("GP_conducted_input") as string) ?? "",
      additionalInfo: (form.get("medical_concerns") as string) ?? "",
      priorityOption: priority as PriorityOption, // Assuming this is already handled
      couponCode: (form.get("coupon_code") as string) ?? "", // Add this field in the form if applicable
    };

    const createAccount = form.get("createAccount") === "on";
    if (createAccount) {
      const registerData: RegisterUserInterface = {
        firstName: form.get("req-firstname")?.toString() || "",
        lastName: form.get("req-lastname")?.toString() || "",
        email: form.get("req-email")?.toString() || "",
        password: form.get("req-password") as string,
        phone: form.get("req-mobile")?.toString() || "",
      };
      await createAccountUser(registerData);
      if (isSuccess) {
        login({
          email: registerData.email,
          password: registerData.password,
        });
      }
    }
    // (path);
    await postVaccineReq({ data: data, route: path })
      .unwrap()
      .then(async (res) => {
        if (res.data) {
          const paymentData: PaymentType = {
            items: [
              {
                price_data: {
                  currency: "gbp", // Dynamic currency
                  product_data: {
                    name: name, // Dynamic product name
                  },
                  unit_amount: finalPrice * 100, // Dynamic unit amount
                },
                quantity: 1, // Dynamic quantity
              },
            ],
            orderId: res.data.id,
          };
          const paymentIfo = await paymentCertificate({
            data: paymentData,
            id: user?.id,
          }).unwrap();
          router.push(paymentIfo?.data?.url);
        }
      });
  };

  const handleSexChange = (e: string) => {
    setSex(e);
  };

  const yesNoOptions: DOptions[] = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const handlePriceChange = (e: number) => {
    setPrice(e);
    setFinalPrice(e);
  };
  // console.log(certificateData);

  return (
    <div>
      {isLoading || loading2 ? (
        <div className="min-h-screen w-full fixed top-0 left-0 bg-black/25 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        ""
      )}
      <DForm
        isAdmin={isAdmin}
        resData={certificateData}
        imageSrc={certificate?.imageUrl as string}
        handleFormSubmit={handleFormSubmit}
        handleSexChange={handleSexChange}
        subtitle="Event and Activity Cancellation Certificate"
      >
        <DHeader>Event/Activity Details</DHeader>

        <DInput
          id="Name_event"
          className="mb-4"
          name="Name_event"
          label="Name of the Event or Activity "
          required={true}
          readOnly={isAdmin}
          answer={certificateData?.eventName}
        ></DInput>
        <DInput
          type="date"
          id="date_event"
          className="mb-4"
          name="date_event"
          required
          label="Date of the Event or Activity "
          placeholder="DD-MM-YYYY"
          defaultValue={
            certificateData?.eventDate &&
            new Date(certificateData.eventDate).toISOString().split("T")[0]
          }
          readOnly={isAdmin}
        ></DInput>
        <DInput
          id="location_event"
          className="mb-4"
          name="location_event"
          label="Location of the Event or Activity "
          required={true}
          readOnly={isAdmin}
          answer={certificateData?.eventLocation}
        ></DInput>
        <DHeader>Reason for Cancellation Request</DHeader>
        <DTextArea
          id="reason_cancellation"
          name="reason_cancellation"
          label="Please provide a brief explanation of why you need to cancel your participation in the event or activity."
          required={true}
          readOnly={isAdmin}
          answer={certificateData?.cancellationReason}
        ></DTextArea>

        <DRadioGroup
          label="Do you have a medical condition or health concern that prevents you from participating in the event or activity?"
          options={yesNoOptions}
          onChange={handleMedicalCondition}
          required
          name="medical_condition"
          id="medical_condition"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.medicalCondition
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(medicalCondition || certificateData?.medicalCondition == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="medical_condition_input"
              className="mb-4"
              name="medical_condition_input"
              label="Please provide details?"
              required={medicalCondition}
            />
          </div>
        )}

        <DInput
          id="medical_condition_impact"
          className="mb-4"
          name="medical_condition_impact"
          label="How does your medical condition impact your ability to attend or participate in the event or activity?"
          required={true}
          readOnly={isAdmin}
          answer={certificateData?.impactOnParticipation}
        />
        <DHeader>Doctor&lsquo;s Assessment</DHeader>

        <DRadioGroup
          label="Have you consulted with your GP regarding your medical condition and the need for an Event and Activity Cancellation Certificate?"
          options={yesNoOptions}
          onChange={handleGpRegarding}
          required
          name="GP_regarding"
          id="GP_regarding"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.consultedDoctor
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(gpRegarding || certificateData?.consultedDoctor == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="GP_regarding_input"
              className="mb-4"
              name="GP_regarding_input"
              label="Please provide The MEDIC's name and contact information."
              required={gpRegarding}
              readOnly={isAdmin}
              answer={certificateData?.GPNameInfo}
            />
          </div>
        )}
        <DRadioGroup
          label="Have you consulted with your GP regarding your medical condition and the need for an Event and Activity Cancellation Certificate?"
          options={yesNoOptions}
          onChange={handleGpConducted}
          required
          name="GP_conducted"
          id="GP_conducted"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.doctorAssessment
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(gpConducted || certificateData?.doctorAssessment == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="GP_conducted_input"
              className="mb-4"
              name="GP_conducted_input"
              label="Please provide details of the assessment. "
              required={gpConducted}
              readOnly={isAdmin}
              answer={certificateData?.assessmentDetails}
            />
          </div>
        )}
        <DHeader>Additional Information</DHeader>
        <DInput
          id="medical_concerns"
          className="mb-4"
          name="medical_concerns"
          label="Do you have any other medical concerns or conditions that healthcare professionals should be aware of in relation to the event or activity cancellation? "
          required={true}
          readOnly={isAdmin}
          answer={certificateData?.additionalInfo}
        />
        <div>
          {isAdmin ? (
            <AdminPriority data={certificateData} />
          ) : (
            <div>
              <DPriority
                handlePriorityChange={handlePriorityChange}
                image={certificate?.imageUrl as string}
                price1={price1}
                price2={price2}
                handlePriceChange={handlePriceChange}
              ></DPriority>
              <DConfirmDetails latterType="Event and Activity Cancellation Certificate"></DConfirmDetails>
              <RequestFooter
                price={price}
                setFinalPrice={setFinalPrice}
              ></RequestFooter>
            </div>
          )}
        </div>
      </DForm>
    </div>
  );
};

export default EventActivity;
