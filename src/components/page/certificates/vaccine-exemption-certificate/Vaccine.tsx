"use client";
import DForm from "@/components/page/request-certificate/Dform";
import React, { useEffect, useState } from "react";
import PageImage from "@/assets/image/placeholder/employee-fitness-to-work-medical.jpg";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import DPriority from "@/components/ui/DFields/DPriority";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import DHeader from "@/components/ui/DFields/DHeader";
import RequestFooter from "@/components/Request/RequestFooter";
import {
  PriorityOption,
  RequestStatus,
  VaccineCertificateRequest,
} from "@/lib/interface/request.interface";
import {
  PaymentType,
  usePaymentCertificateMutation,
} from "@/redux/api/payment/payment.api";
import { usePathname, useRouter } from "next/navigation";
import { getPrices } from "@/utils/getPriceInCirtificateRequest";
import Loading from "@/components/ui/Loading";
import { RegisterUserInterface } from "@/redux/api/user/user.auth.interface";
import { useUser } from "@/lib/provider/UserProvider";
import { useRegisterMutation } from "@/redux/api/user/user.auth";
import { useCertificateRequestPostMutation } from "@/redux/api/certificate/certificate.post";
import AdminPriority from "@/components/Request/AdminPriority";

const Vaccine = ({
  isAdmin = false,
  data: resData,
}: {
  isAdmin?: boolean;
  data?: VaccineCertificateRequest;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const prices = getPrices(pathname, isAdmin);

  const { price1, price2, path, name } = prices;
  // const price1 = cirtificate?.pricing.originalPrice as number;
  // const price2 = cirtificate?.pricing.discountedPrice as number;
  const [priority, setPriority] = useState("STANDARD_REQUEST");
  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };
  // ("data", resData);
  const [openAdverse, setOpenAdverse] = useState(false);
  const [price, setPrice] = useState<number>(price1);

  const [finalPrice, setFinalPrice] = useState(price1);

  const [openReceivedAdverse, setOpenReceivedAdverse] = useState(false);
  const handleSexChange = () => {
    //
  };

  const handleAdverseReactions = (value: any) => {
    if (value === "yes") {
      setOpenAdverse(true);
    } else {
      setOpenAdverse(false);
    }
  };

  useEffect(() => {
    if (resData && resData?.adverseVaccineReactions === true) {
      setOpenAdverse(true);
    }
    if (resData && resData?.vaccineReceivedInPast) {
      setOpenReceivedAdverse(true);
    }
  }, [resData]);

  const handleReceivedAdverseReactions = (value: any) => {
    if (value === "yes") {
      setOpenReceivedAdverse(true);
    } else {
      setOpenReceivedAdverse(false);
    }
  };

  const handlePriceChange = (e: number) => {
    setPrice(e);
    setFinalPrice(e);
  };

  const [postVaccineReq, { isLoading }] = useCertificateRequestPostMutation();
  const [paymentCertificate, { isLoading: loading2 }] =
    usePaymentCertificateMutation();
  const [createAccountUser, { isSuccess }] = useRegisterMutation();
  const { user, login } = useUser();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // Create a data object to store all form values
    const data: VaccineCertificateRequest = {
      firstName: form.get("req-firstname") as string,
      lastName: form.get("req-lastname") as string,
      email: form.get("req-email") as string,
      mobileNumber: form.get("req-mobile") as string,
      dateOfBirth: new Date(form.get("req-dob") as string),
      gender: (form.get("radio-sex") as string) ?? "male",
      severeAllergicReactions: form.get("allergic_reactions") === "yes",
      immuneDisorders: form.get("immune_system") === "yes",
      adverseVaccineReactions: form.get("adverse_reactions") === "yes",
      adverseVaccineReactionsDetails: form.get("adverse_reactions_input")
        ? (form.get("adverse_reactions_input") as string)
        : "",
      currentMedications: form.get("medications") === "yes",
      specificVaccine: form.get("specific_vaccine") as string,
      vaccineReceivedInPast: form.get("received_adverse_reactions") === "yes",
      vaccineReceivedInPastDetails: form.get(
        "received_adverse_reactions_input"
      ) as string,
      healthConditions: form.get("chronic_conditions") === "yes",
      pregnant: form.get("pregnant") === "yes",
      breastfeeding: form.get("breastfeeding") === "yes",
      recentProcedures: form.get("surgical_procedures") === "yes",
      consultedSpecialist: form.get("consult_specialist") === "yes",
      medicalDocumentsProvided: form.get("medical_documents") as string,
      additionalInformation: form.get("additional_info") as string,
      amount: finalPrice,
      priorityOption: priority as PriorityOption,
      requestStatus: "PENDING" as RequestStatus,
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
        subtitle={name}
        imageSrc={PageImage.src}
        handleFormSubmit={handleFormSubmit}
      >
        <DHeader>Medical History</DHeader>

        {/* Allergic Reactions */}
        <DRadioGroup
          answer={resData?.severeAllergicReactions}
          isAdmin={isAdmin}
          label="Have you experienced any severe allergic reactions (anaphylaxis) to vaccines or vaccine components in the past?"
          options={yesNoOptions}
          required
          name="allergic_reactions"
          id="allergic_reactions"
        />

        {/* Immune System */}
        <DRadioGroup
          answer={resData?.immuneDisorders}
          isAdmin={isAdmin}
          label="Do you have a history of severe immune system disorders or immunodeficiency conditions?"
          options={yesNoOptions}
          required
          name="immune_system"
          id="immune_system"
        />

        {/* Adverse Reactions */}
        <DRadioGroup
          answer={resData?.adverseVaccineReactions}
          isAdmin={isAdmin}
          label="Have you previously experienced adverse reactions to vaccines?"
          options={yesNoOptions}
          onChange={handleAdverseReactions}
          required
          name="adverse_reactions"
          id="adverse_reactions"
        />
        {openAdverse && (
          <div className="my-5 md:pl-5">
            <DInput
              answer={resData?.adverseVaccineReactionsDetails}
              readOnly={isAdmin}
              id="adverse_reactions_input"
              className="mb-4"
              name="adverse_reactions_input"
              label="Please provide details?"
              required={openAdverse}
            />
          </div>
        )}

        {/* Medications */}
        <DRadioGroup
          answer={resData?.currentMedications}
          isAdmin={isAdmin}
          label="Are you currently taking any medications or treatments that may affect your ability to receive vaccines?"
          options={yesNoOptions}
          required
          name="medications"
          id="medications"
        />

        {/* Specific Vaccine Information */}
        <DHeader>Specific Vaccine Information</DHeader>

        <DInput
          answer={resData?.specificVaccine}
          readOnly={isAdmin}
          id="specific_vaccine"
          className="mb-4"
          name="specific_vaccine"
          label="Which specific vaccine(s) are you seeking exemption from?"
          required
        />
        {/* Adverse Reactions */}
        <DRadioGroup
          answer={resData?.vaccineReceivedInPast}
          isAdmin={isAdmin}
          label="Have you received this vaccine in the past?"
          options={yesNoOptions}
          onChange={handleReceivedAdverseReactions}
          required
          name="vaccine_received"
          id="vaccine_received"
        />
        {openReceivedAdverse && (
          <div className="my-5 md:pl-5">
            <DInput
              answer={resData?.vaccineReceivedInPastDetails}
              readOnly={isAdmin}
              id="received_adverse_reactions_input"
              className="mb-4"
              name="received_adverse_reactions_input"
              label="Were there any adverse reactions? "
              required={openAdverse}
            />
          </div>
        )}

        {/* Current Health Status */}
        <DHeader>Current Health Status</DHeader>

        <DRadioGroup
          answer={resData?.healthConditions}
          isAdmin={isAdmin}
          label="Do you have any chronic medical conditions or disabilities that may contraindicate vaccination?"
          options={yesNoOptions}
          required
          name="chronic_conditions"
          id="chronic_conditions"
        />

        <DRadioGroup
          answer={resData?.pregnant}
          isAdmin={isAdmin}
          label="Are you pregnant or planning to become pregnant?"
          options={yesNoOptions}
          required
          name="pregnant"
          id="pregnant"
        />

        <DRadioGroup
          answer={resData?.breastfeeding}
          isAdmin={isAdmin}
          label="Are you currently breastfeeding?"
          options={yesNoOptions}
          required
          name="breastfeeding"
          id="breastfeeding"
        />

        <DRadioGroup
          answer={resData?.recentProcedures}
          isAdmin={isAdmin}
          label="Have you recently undergone any surgical procedures or medical treatments?"
          options={yesNoOptions}
          required
          name="surgical_procedures"
          id="surgical_procedures"
        />

        {/* Consultation with a Specialist */}
        <DHeader>Consultation with a Specialist</DHeader>

        <DRadioGroup
          answer={resData?.consultedSpecialist}
          isAdmin={isAdmin}
          label="Have you consulted with a specialist or immunologist regarding your vaccine exemption request?"
          options={yesNoOptions}
          required
          name="consult_specialist"
          id="consult_specialist"
        />

        <DInput
          answer={resData?.medicalDocumentsProvided}
          readOnly={isAdmin}
          id="medical_documents"
          name="medical_documents"
          required
          label="Do you have any medical documents or reports related to your vaccine exemption request that you can provide?"
        />

        {/* Additional Information */}
        <DHeader className="my-5">Additional Information</DHeader>
        <DInput
          answer={resData?.additionalInformation}
          readOnly={isAdmin}
          id="additional_info"
          name="additional_info"
          required
          label="Is there any other relevant medical history or information you believe is important for The MEDIC to know?"
        />
        <div>
          {isAdmin || resData ? (
            <AdminPriority data={resData} />
          ) : (
            <div>
              <DPriority
                handlePriorityChange={handlePriorityChange}
                image={PageImage}
                handlePriceChange={handlePriceChange}
                price1={price1}
                price2={price2}
              ></DPriority>
              <DConfirmDetails latterType="hello"></DConfirmDetails>
              <RequestFooter
                setFinalPrice={setFinalPrice}
                price={price}
              ></RequestFooter>
            </div>
          )}
        </div>
      </DForm>
    </div>
  );
};

export default Vaccine;
