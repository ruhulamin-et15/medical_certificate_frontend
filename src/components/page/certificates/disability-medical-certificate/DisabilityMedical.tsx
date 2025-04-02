"use client";
import DForm from "@/components/page/request-certificate/Dform";
import React, { useState } from "react";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import DPriority from "@/components/ui/DFields/DPriority";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import DHeader from "@/components/ui/DFields/DHeader";
import RequestFooter from "@/components/Request/RequestFooter";
import {
  DisabilityCertificateRequest,
  PriorityOption,
} from "@/lib/interface/request.interface";
import { usePathname, useRouter } from "next/navigation";
import { getPrices } from "@/utils/getPriceInCirtificateRequest";
import {
  PaymentType,
  usePaymentCertificateMutation,
} from "@/redux/api/payment/payment.api";
import Loading from "@/components/ui/Loading";
import { useRegisterMutation } from "@/redux/api/user/user.auth";
import { RegisterUserInterface } from "@/redux/api/user/user.auth.interface";
import { useUser } from "@/lib/provider/UserProvider";
import { useCertificateRequestPostMutation } from "@/redux/api/certificate/certificate.post";
import AdminPriority from "@/components/Request/AdminPriority";

const DisabilityMedical = ({
  isAdmin = false,
  data: resData,
}: {
  isAdmin?: boolean;
  data?: DisabilityCertificateRequest;
}) => {
  const [openAdverse, setOpenAdverse] = useState(false);
  const pathname = usePathname();
  const { price1, price2, path, name } = getPrices(pathname);
  const [price, setPrice] = useState(price1);
  const [finalPrice, setFinalPrice] = useState(price1);
  const [priority, setPriority] = useState("STANDARD_REQUEST");
  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };
  const router = useRouter();
  const [openReceivedAdverse, setOpenReceivedAdverse] = useState(
    resData?.workOrEducationSupport === true
  );
  const [openMedicalDetails, setOpenMedicalDetails] = useState(
    resData?.previousMedicalHistoryDetails
      ? resData?.previousMedicalHistoryDetails
      : false
  );
  const [openMedicalDetails2, setOpenMedicalDetails2] = useState(
    resData?.currentMedications == true
  );
  const handleSexChange = () => {
    // // ("Selected sex:", value);
  };
  // (resData);
  const handleAdverseReactions = (value: any) => {
    if (value === "yes") {
      setOpenAdverse(true);
    } else {
      setOpenAdverse(false);
    }
  };
  const handleReceivedAdverseReactions = (value: any) => {
    if (value === "yes") {
      setOpenReceivedAdverse(true);
    } else {
      setOpenReceivedAdverse(false);
    }
  };
  const handleOpenMedical = (value: any) => {
    if (value === "yes") {
      setOpenMedicalDetails(true);
    } else {
      setOpenMedicalDetails(false);
    }
  };
  const handleOpenMedical2 = (value: any) => {
    if (value === "yes") {
      setOpenMedicalDetails2(true);
    } else {
      setOpenMedicalDetails2(false);
    }
  };

  const handlePriceChange = (e: number) => {
    setPrice(e);
    setFinalPrice(e);
  };

  // fetch mutations
  const [postCertificateReq, { isLoading }] =
    useCertificateRequestPostMutation();
  const [paymentCertificate, { isLoading: loading2 }] =
    usePaymentCertificateMutation();
  const [createAccountUser, { isSuccess }] = useRegisterMutation();
  const { user, login } = useUser();

  // form event
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const data: DisabilityCertificateRequest = {
      firstName: form.get("req-firstname")?.toString() || "",
      lastName: form.get("req-lastname")?.toString() || "",
      email: form.get("req-email")?.toString() || "",
      mobileNumber: form.get("req-mobile")?.toString() || "",
      dateOfBirth: new Date(form.get("req-dob") as string),
      gender: form.get("radio-sex")?.toString() || "male",
      disabilityDescription: form.get("disability_nature")?.toString() || "",
      disabilityTime: form.get("disability_time")?.toString() || "",
      impactOnDailyLife: form.get("disability_affect")?.toString() || "",
      specificChallenges: form.get("disability_challenges")?.toString() || "",
      previousMedicalHistory: form.get("disability_previous_medical") === "yes",
      previousMedicalHistoryDetails:
        form.get("disability_previous_medical_input")?.toString() || "",
      relevantMedicalRecords: form.get("disablity_medical_records") === "yes",
      workOrEducationSupport:
        form.get("disability_medical_treatment") === "yes",
      workOrEducationSupportDetails:
        form.get("disability_medical_treatment_input")?.toString() || "",
      currentMedications: form.get("treatment_and_medications") === "yes",
      currentMedicationsDetails:
        form.get("treatment_and_medications_input")?.toString() || "",
      consultedSpecialists: form.get("disablity_specialist") === "yes",
      consultedSpecialistsDetails:
        form.get("disablity_specialist_input")?.toString() || "",
      supportingInformation:
        form.get("disability_support_services")?.toString() || "",
      additionalInformation: form.get("additional_info")?.toString() || "",
      amount: finalPrice,
      priorityOption: priority as PriorityOption,
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
        login({ email: registerData.email, password: registerData.password });
      }
    }

    await postCertificateReq({ data: data, route: path })
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

  const yesNoOptions: DOptions[] = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

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
        resData={resData}
        handleSexChange={handleSexChange}
        subtitle="Disability Medical Certificate"
        imageSrc="/assets/images/disability-medial-certificate.jpg"
        handleFormSubmit={handleFormSubmit}
      >
        <DHeader>Nature of Disability</DHeader>

        <DInput
          answer={resData?.disabilityDescription}
          id="disability_nature"
          className="mb-4"
          name="disability_nature"
          label="Please describe your disability and its nature."
          required
        />
        <DInput
          answer={resData?.disabilityTime}
          id="disability_time"
          className="mb-4"
          name="disability_time"
          label="When were you diagnosed with this disability? "
          required
        />
        <DHeader>Impact on Daily Life</DHeader>
        <DInput
          answer={resData?.impactOnDailyLife}
          id="disability_affect"
          className="mb-4"
          name="disability_affect"
          label="How does your disability affect your daily life, including work, education, and personal activities?"
          required
        />
        <DInput
          answer={resData?.specificChallenges}
          id="disability_challenges"
          className="mb-4"
          name="disability_challenges"
          label="Are there specific challenges or limitations you face due to your disability?"
          required
        />
        <DHeader>Previous Medical History</DHeader>
        {/* Allergic Reactions */}
        <DRadioGroup
          answer={resData?.previousMedicalHistory}
          label="Have you received any previous medical treatment, therapy, or surgeries related to your disability?"
          options={yesNoOptions}
          required
          name="disability_previous_medical"
          id="disability_previous_medical"
          onChange={handleOpenMedical}
        />
        {openMedicalDetails && (
          <div className="my-5 md:pl-5">
            <DInput
              answer={resData?.previousMedicalHistoryDetails}
              id="disability_previous_medical_input"
              className="mb-4"
              name="disability_previous_medical_input"
              label="Please provide the details."
              required
            />
          </div>
        )}

        {/* Immune System */}
        <DRadioGroup
          answer={resData?.relevantMedicalRecords}
          label="Do you have any relevant medical records, test results, or documentation related to your disability?"
          options={yesNoOptions}
          required
          name="disablity_medical_records"
          id="disablity_medical_records"
        />

        {/* Specific Vaccine Information */}
        <DHeader>Work or Education Requirements</DHeader>

        <DRadioGroup
          answer={resData?.workOrEducationSupport}
          label="Are you seeking a Disability Medical Certificate for workplace accommodations or educational support?"
          options={yesNoOptions}
          onChange={handleReceivedAdverseReactions}
          required
          name="disability_medical_treatment"
          id="disability_medical_treatment"
        />
        {openReceivedAdverse && (
          <div className="my-5 md:pl-5">
            <DInput
              answer={resData?.workOrEducationSupportDetails}
              id="disability_medical_treatment_input"
              className="mb-4"
              name="disability_medical_treatment_input"
              label="Please specify your requirements."
              required
            />
          </div>
        )}
        <DHeader>Treatment and Medications</DHeader>
        {/* Allergic Reactions */}
        <DRadioGroup
          answer={resData?.currentMedications}
          label="Have you received any previous medical treatment, therapy, or surgeries related to your disability?"
          options={yesNoOptions}
          required
          name="treatment_and_medications"
          id="treatment_and_medications"
          onChange={handleOpenMedical2}
        />
        {openMedicalDetails2 && (
          <div className="my-5 md:pl-5">
            <DInput
              answer={resData?.currentMedicationsDetails}
              id="treatment_and_medications_input"
              className="mb-4"
              name="treatment_and_medications_input"
              label="Please provide the details."
              required
            />
          </div>
        )}
        {/* Current Health Status */}
        <DHeader>Supporting Information</DHeader>
        {/* Adverse Reactions */}
        <DInput
          answer={resData?.supportingInformation}
          id="disability_support_services"
          className="mb-4"
          name="disability_support_services"
          label="Are there any specific accommodations or support services you believe you require due to your disability?"
          required
        />
        {/* Consultation with a Specialist */}
        <DHeader>Specialist or Consultant Information (if applicable)</DHeader>
        <DRadioGroup
          answer={resData?.consultedSpecialists}
          label="Have you previously experienced adverse reactions to vaccines?"
          options={yesNoOptions}
          onChange={handleAdverseReactions}
          required
          name="disablity_specialist"
          id="disablity_specialist"
        />
        {openAdverse && (
          <div className="my-5 md:pl-5">
            <DInput
              answer={resData?.consultedSpecialistsDetails}
              id="disablity_specialist_input"
              className="mb-4"
              name="disablity_specialist_input"
              label="Please provide their names and contact information."
              required={openAdverse}
            />
          </div>
        )}

        <DHeader className="my-5">Additional Information</DHeader>
        <DInput
          answer={resData?.additionalInformation}
          id="additional_info"
          name="additional_info"
          label="Is there any other relevant medical information or specific concerns that you would like to share with The MEDIC for the Disability Medical Certificate?"
        />
        {isAdmin || resData ? (
          <AdminPriority data={resData} />
        ) : (
          <div>
            <DPriority
              handlePriorityChange={handlePriorityChange}
              image={"/assets/images/disability-medial-certificate.jpg"}
              handlePriceChange={handlePriceChange}
              price1={price1}
              price2={price2}
            ></DPriority>
            <DConfirmDetails latterType="Disability Medical Certificate"></DConfirmDetails>
            <RequestFooter
              setFinalPrice={setFinalPrice}
              price={price}
            ></RequestFooter>
          </div>
        )}
      </DForm>
    </div>
  );
};

export default DisabilityMedical;
