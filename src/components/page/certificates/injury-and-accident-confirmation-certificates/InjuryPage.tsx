"use client";
import DForm from "@/components/page/request-certificate/Dform";
import { usePathname, useRouter } from "next/navigation";
import certificates from "../../../../../public/cardData.json";
import React, { FormEvent, useState } from "react";
import DHeader from "@/components/ui/DFields/DHeader";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import DTextArea from "@/components/ui/DFields/DTextarea";
import DPriority from "@/components/ui/DFields/DPriority";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import RequestFooter from "@/components/Request/RequestFooter";
import {
  InjuryAccidentConfirmationRequest,
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

const InjuryPage = ({
  isAdmin,
  certificateData,
}: {
  isAdmin?: boolean;
  certificateData?: InjuryAccidentConfirmationRequest;
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
  const [gpRegarding, setGpRegarding] = useState(
    certificateData?.discussedWithGP === true
  );
  const [gpConducted, setGpConducted] = useState(false);
  const [medicalTreatment, setMedicalTreatment] = useState(
    certificateData?.medicalTreatment === true
  );
  const [medicalCondition, setMedicalCondition] = useState(false);
  const [currentlyTreatment, setCurrentlyTreatment] = useState(false);
  const [priority, setPriority] = useState("STANDARD_REQUEST");
  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const data: InjuryAccidentConfirmationRequest = {
      amount: finalPrice,
      firstName: (form.get("req-firstname") as string) ?? "",
      lastName: (form.get("req-lastname") as string) ?? "",
      email: (form.get("req-email") as string) ?? "",
      mobileNumber: (form.get("req-mobile") as string) ?? "",
      dateOfBirth: new Date((form.get("req-dob") as string) ?? ""), // Converting to Date
      gender: sex ?? "",
      incidentDate: (form.get("incident_date") as string) ?? "", // Converting to Date
      incidentLocation: (form.get("incident_Location") as string) ?? "",
      incidentDescription: (form.get("incident_describe") as string) ?? "",
      medicalTreatment: medicalTreatment, // Boolean for medical treatment
      medicalTDetail: (form.get("medical_treatment_input") as string) ?? "",
      medicalTests: (form.get("medical_tests") as string) ?? "",
      currentTreatment: currentlyTreatment, // Boolean for current treatment
      discussedWithGP: form.get("GP_regarding") === "yes", // Boolean based on form value
      GPAssessment: gpConducted, // Boolean for GP Assessment
      confirmationReason: (form.get("certificate_purpose") as string) ?? "",
      additionalInformation: (form.get("relevant_information") as string) ?? "",
      specificDetails: (form.get("certificate_include") as string) ?? "",
      allergies: medicalCondition, // Boolean for allergies
      GPRelevant: (form.get("GP_regarding_input") as string) ?? "",
      priorityOption: priority as PriorityOption, // Assuming this is handled
      couponCode: (form.get("cupon-code") as string) ?? "", // Add this field in the form if applicable
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

  const handlePriceChange = (e: number) => {
    setPrice(e);
    setFinalPrice(e);
  };

  const handleMedicalTreatment = (value: any) => {
    if (value === "yes") {
      setMedicalTreatment(true);
    } else {
      setMedicalTreatment(false);
    }
  };
  const handleCurrentlyTreatment = (value: any) => {
    if (value === "yes") {
      setCurrentlyTreatment(true);
    } else {
      setCurrentlyTreatment(false);
    }
  };
  const handleGpConducted = (value: any) => {
    if (value === "yes") {
      setGpConducted(true);
    } else {
      setGpConducted(false);
    }
  };
  const handleGpRegarding = (value: string) => {
    if (value === "yes") {
      setGpRegarding(true);
      // console.log("working yes");
    } else {
      setGpRegarding(false);
      // console.log("working no");
    }
  };
  const handleMedicalCondition = (value: any) => {
    if (value === "yes") {
      setMedicalCondition(true);
    } else {
      setMedicalCondition(false);
    }
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
        isAdmin={isAdmin}
        resData={certificateData}
        imageSrc={certificate?.imageUrl as string}
        handleFormSubmit={handleFormSubmit}
        handleSexChange={handleSexChange}
        subtitle="Injury and Accident Confirmation Certificates"
      >
        <DHeader>Details of the Injury or Accident</DHeader>

        <DInput
          id="incident_date"
          className="mb-4"
          name="incident_date"
          label="Date and time of the incident:"
          required={true}
          readOnly={isAdmin}
          answer={certificateData?.incidentDate}
        ></DInput>
        <DInput
          id="incident_Location"
          className="mb-4"
          name="incident_Location"
          label="Location where the incident occurred:"
          required={true}
          readOnly={isAdmin}
          answer={certificateData?.incidentLocation}
        ></DInput>
        <DInput
          id="incident_describe"
          className="mb-4"
          name="incident_describe"
          label="Briefly describe the nature of the injury or accident:"
          required={true}
          readOnly={isAdmin}
          answer={certificateData?.incidentDescription}
        ></DInput>
        <DHeader>Medical Evaluation</DHeader>

        <DRadioGroup
          label="Have you sought medical treatment for this injury or accident? "
          options={yesNoOptions}
          onChange={handleMedicalTreatment}
          required
          name="medical_treatment"
          id="medical_treatment"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.medicalTreatment
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(medicalTreatment || certificateData?.medicalTreatment == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="medical_treatment_input"
              className="mb-4"
              name="medical_treatment_input"
              label="Please provide details of the healthcare provider(s) you visited."
              required={medicalTreatment}
              readOnly={isAdmin}
              answer={certificateData?.medicalTDetail}
            />
          </div>
        )}

        <DTextArea
          id="medical_tests "
          name="medical_tests"
          label="Describe any medical tests or diagnostic procedures you have undergone as a result of this incident."
          required={true}
          readOnly={isAdmin}
          answer={certificateData?.medicalTests}
        ></DTextArea>
        <DRadioGroup
          label="Are you currently receiving medical treatment or therapy for this injury or accident? "
          options={yesNoOptions}
          onChange={handleCurrentlyTreatment}
          required
          name="currentlyTreatment"
          id="currentlyTreatment"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.currentTreatment
                ? "Yes"
                : "No"
              : " "
          }
        />

        <DHeader>Doctor&lsquo;s Assessment</DHeader>

        <DRadioGroup
          label="Have you discussed your injury or accident with your GP regarding the need for an Injury and Accident Confirmation Certificate? "
          options={yesNoOptions}
          onChange={handleGpRegarding}
          required
          name="GP_regarding"
          id="GP_regarding"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.discussedWithGP
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(gpRegarding || certificateData?.discussedWithGP == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="GP_regarding_input"
              className="mb-4"
              name="GP_regarding_input"
              label="Please provide The MEDIC's name and contact information."
              required={gpRegarding}
              readOnly={isAdmin}
              answer={certificateData?.GPRelevant}
            />
          </div>
        )}
        <DRadioGroup
          label="Did your GP conduct any medical examinations or assessments related to this injury or accident?"
          options={yesNoOptions}
          onChange={handleGpConducted}
          required={true}
          name="GP_conducted "
          id="GP_conducted"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.GPAssessment
                ? "Yes"
                : "No"
              : " "
          }
        />
        {/* {gpConducted && (
          <div className="my-5 md:pl-5">
            <DInput
              id="GP_conducted_input"
              className="mb-4"
              name="GP_conducted_input"
              label="Please provide details of the assessment. "
              required={gpConducted}
            />
          </div>
        )} */}

        <DHeader>Confirmation Requirements</DHeader>

        <DTextArea
          id="certificate_purpose"
          name="certificate_purpose"
          label="Why do you require an Injury and Accident Confirmation Certificate? (Provide a brief explanation of your circumstances or the purpose of the certificate.)"
          required={true}
          readOnly={isAdmin}
          answer={certificateData?.confirmationReason}
        ></DTextArea>
        <DInput
          id="certificate_include"
          className="mb-4"
          name="certificate_include"
          label="Are there specific details or information you would like your GP to include in the certificate? "
          required={true}
          readOnly={isAdmin}
          answer={certificateData?.specificDetails}
        />
        <DHeader>Additional Information</DHeader>

        <DRadioGroup
          label="Do you have any allergies or medical conditions that healthcare professionals should be aware of in relation to this injury or accident?"
          options={yesNoOptions}
          onChange={handleMedicalCondition}
          required={true}
          name="medical_conditions "
          id="medical_conditions"
          isAdmin={isAdmin}
          answer={
            certificateData ? (certificateData?.allergies ? "Yes" : "No") : " "
          }
        />

        <DInput
          id="relevant_information"
          className="mb-4"
          name="relevant_information"
          label="Is there any other relevant information you would like to share with your GP regarding this incident? "
          required={true}
          readOnly={isAdmin}
          answer={certificateData?.additionalInformation}
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
              <DConfirmDetails latterType="Injury and Accident Confirmation Certificates"></DConfirmDetails>
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

export default InjuryPage;
