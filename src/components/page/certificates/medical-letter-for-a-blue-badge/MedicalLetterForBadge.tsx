"use client";

import DForm from "@/components/page/request-certificate/Dform";
import { usePathname, useRouter } from "next/navigation";
import certificates from "../../../../../public/cardData.json";
import React, { FormEvent, useState } from "react";
import DHeader from "@/components/ui/DFields/DHeader";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import DInput from "@/components/ui/DFields/DInput";
import DTextArea from "@/components/ui/DFields/DTextarea";
import DFileUpload from "@/components/ui/DFields/DFileUpload";
import DPriority from "@/components/ui/DFields/DPriority";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import RequestFooter from "@/components/Request/RequestFooter";
import {
  MedicalLetterBlueBadgeRequest,
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

const MedicalLetterForBadge = ({
  isAdmin = false,
  data: resData,
}: {
  isAdmin?: boolean;
  data?: MedicalLetterBlueBadgeRequest;
}) => {
  const pathname = usePathname();
  const prices = getPrices(pathname, isAdmin);
  const { price1, price2, path, name } = prices;
  const [price, setPrice] = useState(price1);
  const [finalPrice, setFinalPrice] = useState(price1);

  const router = useRouter();

  const [postVaccineReq, { isLoading }] = useCertificateRequestPostMutation();

  const [paymentCertificate, { isLoading: loading2 }] =
    usePaymentCertificateMutation();
  const [createAccountUser, { isSuccess }] = useRegisterMutation();
  const { user, login } = useUser();

  const certificate = certificates.find((item) => item.id === (path as string));
  const [sex, setSex] = useState("male");
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [difficultyWalking, setDifficultyWalking] = useState(false);
  const [unableToWalk, setUnableToWalk] = useState(false);
  const [walkingPain, setWalkingPain] = useState(false);
  const [transportation, setTransportation] = useState(false);
  const [caregivers, setCaregivers] = useState(false);
  const [underSpecialist, setUnderSpecialist] = useState(false);
  const [havePrescribed, setHavePrescribed] = useState(false);
  const [passport, setPassport] = useState<File | null>(null);
  const [priority, setPriority] = useState("STANDARD_REQUEST");
  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const data: MedicalLetterBlueBadgeRequest = {
      firstName: (form.get("req-firstname") as string) ?? "",
      lastName: (form.get("req-lastname") as string) ?? "",
      email: (form.get("req-email") as string) ?? "",
      mobileNumber: (form.get("req-mobile") as string) ?? "",
      dateOfBirth: new Date((form.get("req-dob") as string) ?? ""), // Parsing to Date
      gender: sex ?? "",
      blueBadge: alreadyApplied as boolean,
      blueBadgeDetails: (form.get("already_applied_input") as string) ?? "",
      applyBlueBadge: (form.get("apply_blue_Badge") as string) ?? "",
      medicalDisability: (form.get("health_condition") as string) ?? "",
      medicalCondition: (form.get("condition_long") as string) ?? "",
      medicalDailyLife: (form.get("medical_affect") as string) ?? "",
      medicalTreatments: (form.get("undergone_treatments") as string) ?? "",
      difficultyWalking: difficultyWalking as boolean,
      limitedMobility: unableToWalk as boolean,
      standing: walkingPain as boolean,
      transportation: transportation as boolean,
      medicalConditonImpact:
        (form.get("medical_condition_impact") as string) ?? "",
      difficultiesFinding: (form.get("parking_condition") as string) ?? "",
      performDaily: (form.get("medical_condition_affects") as string) ?? "",
      assistanceCaregiver: caregivers as boolean,
      careSpecialist: underSpecialist as boolean,
      specialistDevices: havePrescribed as boolean,
      additionalInfo: (form.get("relevant_information") as string) ?? "",
      passportUpload: (passport?.name as string) ?? "", // Assuming passport can be null
      amount: finalPrice, // Assuming this is a number and handled correctly
      priorityOption: priority as PriorityOption, // Assuming this is handled correctly
      couponCode: (form.get("cupon-code") as string) ?? "",
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
            id: user?.id ?? 0,
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

  const handleAlreadyApplied = (value: any) => {
    if (value === "yes") {
      setAlreadyApplied(true);
    } else {
      setAlreadyApplied(false);
    }
  };
  const handleDifficultyWalking = (value: any) => {
    if (value === "yes") {
      setDifficultyWalking(true);
    } else {
      setDifficultyWalking(false);
    }
  };
  const handleUnableToWalk = (value: any) => {
    if (value === "yes") {
      setUnableToWalk(true);
    } else {
      setUnableToWalk(false);
    }
  };
  const handleWalkingPain = (value: any) => {
    if (value === "yes") {
      setWalkingPain(true);
    } else {
      setWalkingPain(false);
    }
  };
  const handleTransportation = (value: any) => {
    if (value === "yes") {
      setTransportation(true);
    } else {
      setTransportation(false);
    }
  };
  const handleCaregivers = (value: any) => {
    if (value === "yes") {
      setCaregivers(true);
    } else {
      setCaregivers(false);
    }
  };
  const handleUnderSpecialist = (value: any) => {
    if (value === "yes") {
      setUnderSpecialist(true);
    } else {
      setUnderSpecialist(false);
    }
  };
  const handleHavePrescribed = (value: any) => {
    if (value === "yes") {
      setHavePrescribed(true);
    } else {
      setHavePrescribed(false);
    }
  };
  const handlePriceChange = (e: number) => {
    setPrice(e);
    setFinalPrice(e);
  };
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
        resData={resData}
        isAdmin={isAdmin}
        imageSrc={certificate?.imageUrl as string}
        handleFormSubmit={handleFormSubmit}
        handleSexChange={handleSexChange}
        subtitle="Medical Letter for a Blue Badge"
      >
        <DHeader>Blue Badge Application Details</DHeader>

        <DRadioGroup
          answer={resData?.blueBadge}
          label="Have you already applied for a Blue Badge? "
          options={yesNoOptions}
          onChange={handleAlreadyApplied}
          required
          name="already_applied"
          id="already_applied"
        />
        {(alreadyApplied || resData?.blueBadge === true) && (
          <div className="my-5 md:pl-5">
            <DInput
              answer={resData?.blueBadgeDetails}
              id="already_applied_input"
              className="mb-4"
              name="already_applied_input"
              label="Please provide the application reference number and any previous decisions. "
              required={alreadyApplied}
            />
          </div>
        )}

        <DInput
          answer={resData?.applyBlueBadge}
          id="apply_blue_Badge"
          className="mb-4 mt-2"
          name="apply_blue_Badge"
          label="Are you applying for a new Blue Badge or renewing an existing one?"
          required={alreadyApplied}
        />
        <DHeader>Medical Condition Information</DHeader>

        <DTextArea
          answer={resData?.medicalDisability}
          id="health_condition"
          name="health_condition"
          label="Please describe your medical disability or health condition in detail. "
          required={true}
        ></DTextArea>
        <DInput
          answer={resData?.medicalCondition}
          id="condition_long"
          name="condition_long"
          label="How long have you had this condition? "
          required={true}
        ></DInput>
        <DInput
          answer={resData?.medicalDailyLife}
          id="medical_affect"
          name="medical_affect"
          label="How does your medical condition affect your daily life and mobility?"
          required={true}
        ></DInput>
        <DInput
          answer={resData?.medicalTreatments}
          id="undergone_treatments"
          name="undergone_treatments"
          label="Have you undergone any recent medical treatments or surgeries related to your condition? *"
          required={true}
        ></DInput>
        <DHeader>Mobility and Accessibility</DHeader>
        <DRadioGroup
          answer={resData?.difficultyWalking}
          label="Did your GP conduct any medical examinations or assessments related to this injury or accident?"
          options={yesNoOptions}
          onChange={handleDifficultyWalking}
          required={true}
          name="difficulty_walking"
          id="difficulty_walking"
        />
        <DRadioGroup
          answer={resData?.difficultyWalking}
          label="Are you unable to walk or have limited mobility without assistance? "
          options={yesNoOptions}
          onChange={handleUnableToWalk}
          required={true}
          name="unable_to_walk "
          id="unable_to_walk"
        />
        <DRadioGroup
          answer={resData?.standing}
          label="Do you experience pain, discomfort, or fatigue when walking or standing?"
          options={yesNoOptions}
          onChange={handleWalkingPain}
          required={true}
          name="walking_pain"
          id="walking_pain"
        />
        <DHeader>Transportation and Parking</DHeader>
        <DRadioGroup
          answer={resData?.transportation}
          label="Do you experience pain, discomfort, or fatigue when walking or standing?"
          options={yesNoOptions}
          onChange={handleTransportation}
          required={true}
          name="transportation"
          id="transportation"
        />

        <DInput
          answer={resData?.medicalConditonImpact}
          id="medical_condition_impact "
          name="medical_condition_impact"
          label="How does your medical condition impact your ability to access public transportation?"
          required={true}
        ></DInput>

        <DInput
          answer={resData?.difficultiesFinding}
          id="parking_condition"
          name="parking_condition"
          label="Have you experienced difficulties finding suitable parking due to your condition?"
          required={true}
        ></DInput>

        <DHeader>Daily Living Activities</DHeader>
        <DTextArea
          answer={resData?.performDaily}
          id="medical_condition_affects"
          name="medical_condition_affects"
          label="Describe how your medical condition affects your ability to perform daily living activities such as dressing, bathing, and cooking"
          required={true}
        ></DTextArea>
        <DRadioGroup
          answer={resData?.assistanceCaregiver}
          label="Do you require assistance from caregivers or family members for daily tasks?"
          options={yesNoOptions}
          onChange={handleCaregivers}
          required={true}
          name="caregivers"
          id="caregivers"
        />

        <DHeader>Medical Treatment and Support</DHeader>
        <DRadioGroup
          answer={resData?.careSpecialist}
          label="Are you currently under the care of a specialist or medical professional for your condition? "
          options={yesNoOptions}
          onChange={handleUnderSpecialist}
          required={true}
          name="under_specialist"
          id="under_specialist"
        />
        <DRadioGroup
          answer={resData?.specialistDevices}
          label="Have you been prescribed mobility aids or assistive devices by a healthcare provider?"
          options={yesNoOptions}
          onChange={handleHavePrescribed}
          required={true}
          name="have_prescribed"
          id="have_prescribed"
        />

        <DHeader>Additional Information</DHeader>
        <DInput
          answer={resData?.additionalInfo}
          id="relevant_information"
          name="relevant_information"
          label="Is there any other relevant medical information or details about your condition that you would like to share with The MEDIC for the Medical Letter?"
          required={true}
        ></DInput>
        <DFileUpload
          title="Passport or Identification Upload"
          description="Please upload a scanned copy or clear image of your passport or identification for verification purposes."
          required
          accept="image/*,.pdf"
          maxSize={10 * 1024 * 1024} // 10MB
          onFileChange={setPassport}
          value={passport}
        />

        {isAdmin || resData ? (
          <AdminPriority data={resData} />
        ) : (
          <div>
            <DPriority
              handlePriorityChange={handlePriorityChange}
              image={certificate?.imageUrl as string}
              price1={price1}
              price2={price2}
              handlePriceChange={handlePriceChange}
            ></DPriority>
            <DConfirmDetails latterType="Medical Letter for a Blue Badge"></DConfirmDetails>
            <RequestFooter
              price={price}
              setFinalPrice={setFinalPrice}
            ></RequestFooter>
          </div>
        )}
      </DForm>
    </div>
  );
};

export default MedicalLetterForBadge;
