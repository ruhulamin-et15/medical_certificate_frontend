"use client";
import React, { FormEvent, useState } from "react";
import certificates from "../../../../../public/cardData.json";
import { usePathname, useRouter } from "next/navigation";
import DForm from "@/components/page/request-certificate/Dform";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import DInput from "@/components/ui/DFields/DInput";
import DTextArea from "@/components/ui/DFields/DTextarea";
import DHeader from "@/components/ui/DFields/DHeader";
import DFileUpload from "@/components/ui/DFields/DFileUpload";
import DPriority from "@/components/ui/DFields/DPriority";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import RequestFooter from "@/components/Request/RequestFooter";
import {
  AllergyCertificateRequest,
  PriorityOption,
  RequestStatus,
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

// import { AllergyCertificateRequest } from "@/lib/interface/request.interface";
const AllergyCertificate = ({
  data: resData,
  isAdmin = false,
}: {
  data?: AllergyCertificateRequest;
  isAdmin?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const prices = getPrices(pathname, isAdmin);
  const { price1, price2, path, name } = prices;
  // const prices = getPrices(path)
  // const id = pathname.split("/")[2];
  const certificate = certificates.find((item) => item.id === (path as string));
  const [sex, setSex] = useState("male");
  const [passport, setPassport] = useState<File | null>(null);
  const [price, setPrice] = useState(
    Number(certificate?.pricing?.discountedPrice)
  );
  const [finalPrice, setFinalPrice] = useState(
    Number(certificate?.pricing?.discountedPrice)
  );

  const [postVaccineReq, { isLoading }] = useCertificateRequestPostMutation();
  const [paymentCertificate, { isLoading: loading2 }] =
    usePaymentCertificateMutation();
  const [createAccountUser, { isSuccess }] = useRegisterMutation();
  const { user, login } = useUser();

  const [hasAllergies, setHasAllergies] = useState(false);
  const [experiencedAnaphylaxis, setExperiencedAnaphylaxis] = useState(false);
  const [hasEmergencyMedication, setHasEmergencyMedication] =
    useState<boolean>(false);
  const [frequentlyTravelsOrDinesOut, setFrequentlyTravelsOrDinesOut] =
    useState<boolean>(false);
  const [carriesMedication, setCarriesMedication] = useState<boolean>(false);
  const [requiresMedicalTreatment, setRequiresMedicalTreatment] =
    useState<boolean>(false);
  const [hasUndergoneTesting, setHasUndergoneTesting] =
    useState<boolean>(false);
  const [isTakingMedications, setIsTakingMedications] =
    useState<boolean>(false);
  const [isAllergicToMedications, setIsAllergicToMedications] =
    useState<boolean>(false);
  const [priority, setPriority] = useState("STANDARD_REQUEST");
  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  // console.log(isAdmin);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const data: AllergyCertificateRequest = {
      firstName: form.get("req-firstname") as string,
      lastName: form.get("req-lastname") as string,
      email: form.get("req-email") as string,
      mobileNumber: form.get("req-mobile") as string,
      dateOfBirth: new Date(form.get("req-dob") as string),
      gender: sex,
      allergies: hasAllergies,
      allergiesDetails: form.get("allergyType") as string,
      specificAllergies: form.get("specificAllergens") as string,
      circumstanceSymptoms: form.get("anaphylaxisDetails") as string,
      severeReaction: experiencedAnaphylaxis,
      emergencyPrescribed: hasEmergencyMedication,
      emergencyDetails: form.get("medicationDetails") as string,
      emergencyMedication: carriesMedication,
      emergencyReadily: form.get("accessibilityDescription") as string,
      allergyImpact: form.get("allergyImpact") as string,
      allergyTreatment: requiresMedicalTreatment,
      allergyTreatmentDetails: form.get("treatmentDetails") as string,
      previousTreatment: hasUndergoneTesting,
      previousTreatmentDetails: form.get("testingDetails") as string,
      currentMedication: isTakingMedications,
      currentMedicationDetails: form.get("medicationsInclude") as string,
      currentAnyMedication: isAllergicToMedications,
      currentAnyMedicationSpecify: form.get("allergyDetails") as string,
      travelFrequency: frequentlyTravelsOrDinesOut,
      travelFrequencyDetails: form.get("allergyManagementDetails") as string,
      additionalInfo: form.get("additionalInfo") as string,
      passportUpload: passport?.name as string,
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

  // (passport);
  const handleSexChange = (e: string) => {
    setSex(e);
  };
  const yesNoOptions: DOptions[] = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const handleHasAllergies = (value: string) => {
    if (value === "yes") {
      setHasAllergies(true);
    } else {
      setHasAllergies(false);
    }
  };
  const handleFrequentlyTravelsOrDinesOut = (value: string) => {
    if (value === "yes") {
      setFrequentlyTravelsOrDinesOut(true);
    } else {
      setFrequentlyTravelsOrDinesOut(false);
    }
  };
  const handleExperiencedAnaphylaxis = (value: string) => {
    if (value === "yes") {
      setExperiencedAnaphylaxis(true);
    } else {
      setExperiencedAnaphylaxis(false);
    }
  };
  const handleHasEmergencyMedication = (value: string) => {
    if (value === "yes") {
      setHasEmergencyMedication(true);
    } else {
      setHasEmergencyMedication(false);
    }
  };

  const handleCarriesMedication = (value: string) => {
    if (value === "yes") {
      setCarriesMedication(true);
    } else {
      setCarriesMedication(false);
    }
  };
  const handleRequiresMedicalTreatment = (value: string) => {
    if (value === "yes") {
      setRequiresMedicalTreatment(true);
    } else {
      setRequiresMedicalTreatment(false);
    }
  };
  const handleHasUndergoneTesting = (value: string) => {
    if (value === "yes") {
      setHasUndergoneTesting(true);
    } else {
      setHasUndergoneTesting(false);
    }
  };
  const handleIsTakingMedications = (value: string) => {
    if (value === "yes") {
      setIsTakingMedications(true);
    } else {
      setIsTakingMedications(false);
    }
  };

  const handleIsAllergicToMedications = (value: string) => {
    if (value === "yes") {
      setIsAllergicToMedications(true);
    } else {
      setIsAllergicToMedications(false);
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
        isAdmin={isAdmin}
        resData={resData}
        imageSrc={certificate?.imageUrl as string}
        handleFormSubmit={handleFormSubmit}
        handleSexChange={handleSexChange}
        subtitle="Allergy Certificate"
      >
        <DHeader>Allergy Information</DHeader>

        <DRadioGroup
          answer={resData?.allergies}
          label="Do you have any known allergies?"
          options={yesNoOptions}
          onChange={handleHasAllergies}
          required
          name="hasAllergies"
          id="hasAllergies"
        />

        {(hasAllergies || resData?.allergies === true) && (
          <>
            <DInput
              answer={resData?.allergiesDetails}
              id="allergyType"
              className="mb-4"
              name="allergyType"
              label="Please specify the type of allergy (e.g., food allergy, environmental allergy, medication allergy)."
              required={hasAllergies}
            />
          </>
        )}

        <DTextArea
          answer={resData?.specificAllergies}
          id="specificAllergens"
          className="mb-4"
          name="specificAllergens"
          label="List the specific allergens that trigger your allergic reactions (e.g., peanuts, pollen, penicillin)."
          required={true}
        />
        <DRadioGroup
          answer={resData?.severeReaction}
          label="Have you ever experienced a severe allergic reaction or anaphylaxis?"
          options={yesNoOptions}
          onChange={handleExperiencedAnaphylaxis}
          required
          name="experiencedAnaphylaxis"
          id="experiencedAnaphylaxis"
        />

        {(experiencedAnaphylaxis || resData?.severeReaction === true) && (
          <DInput
            answer={resData?.circumstanceSymptoms}
            id="anaphylaxisDetails"
            className="mb-4"
            name="anaphylaxisDetails"
            label="Please describe the circumstances and the symptoms."
            required={experiencedAnaphylaxis}
          />
        )}

        <DHeader>Emergency Medication</DHeader>

        <DRadioGroup
          answer={resData?.emergencyPrescribed}
          label="Are you prescribed any emergency medications (e.g., epinephrine auto-injector) for allergic reactions?"
          options={yesNoOptions}
          onChange={handleHasEmergencyMedication}
          required
          name="hasEmergencyMedication"
          id="hasEmergencyMedication"
        />

        {(hasEmergencyMedication || resData?.emergencyPrescribed === true) && (
          <DInput
            answer={resData?.emergencyDetails}
            id="medicationDetails"
            className="mb-4"
            name="medicationDetails"
            label="Please provide details of the medication and its usage instructions."
            required={hasEmergencyMedication}
          />
        )}

        <DRadioGroup
          answer={resData?.emergencyMedication}
          label="Do you carry your emergency medication with you at all times?"
          options={yesNoOptions}
          onChange={handleCarriesMedication}
          required
          name="carriesMedication"
          id="carriesMedication"
        />

        {(carriesMedication || resData?.emergencyMedication === true) && (
          <DInput
            answer={resData?.emergencyReadily}
            id="accessibilityDescription"
            className="mb-4"
            name="accessibilityDescription"
            label="Please describe how you ensure it's readily accessible."
            required={carriesMedication}
          />
        )}

        <DHeader>Allergy Impact</DHeader>

        <DInput
          answer={resData?.allergyImpact}
          id="allergyImpact"
          className="mb-4"
          name="allergyImpact"
          label="How do your allergies affect your daily life, activities, and dietary choices?"
          required
        />

        <DRadioGroup
          answer={resData?.allergyTreatment}
          label="Have your allergies ever required medical treatment or hospitalization?"
          options={yesNoOptions}
          onChange={handleRequiresMedicalTreatment}
          required
          name="requiresMedicalTreatment"
          id="requiresMedicalTreatment"
        />

        {(requiresMedicalTreatment || resData?.allergyTreatment === true) && (
          <DInput
            answer={resData?.allergyTreatmentDetails}
            id="treatmentDetails"
            className="mb-4"
            name="treatmentDetails"
            label="Please provide details."
            required={requiresMedicalTreatment}
          />
        )}

        <DHeader>Previous Allergy Testing</DHeader>

        <DRadioGroup
          answer={resData?.previousTreatment}
          label="Have you undergone any allergy testing (e.g., skin prick tests, blood tests) to confirm your allergies?"
          options={yesNoOptions}
          onChange={handleHasUndergoneTesting}
          required
          name="hasUndergoneTesting"
          id="hasUndergoneTesting"
        />

        {(hasUndergoneTesting || resData?.previousTreatment === true) && (
          <DTextArea
            answer={resData?.previousTreatmentDetails}
            id="testingDetails"
            className="mb-4"
            name="testingDetails"
            title="Please provide the results and the date of testing."
            required={hasUndergoneTesting}
          />
        )}

        <DHeader>Medications and Allergies</DHeader>

        <DRadioGroup
          answer={resData?.currentMedication}
          label="Are you currently taking any medications for your allergies or to manage allergic reactions (e.g., antihistamines)?"
          options={yesNoOptions}
          onChange={handleIsTakingMedications}
          required
          name="isTakingMedications"
          id="isTakingMedications"
        />

        {(isTakingMedications || resData?.currentMedication === true) && (
          <DTextArea
            answer={resData?.currentMedicationDetails}
            id="medicationsInclude"
            className="mb-4"
            name="medicationsInclude"
            title="Please list them, including the name, dosage, and frequency."
            required={isTakingMedications}
          />
        )}

        <DRadioGroup
          answer={resData?.currentAnyMedication}
          label="Are you allergic to any medications?"
          options={yesNoOptions}
          onChange={handleIsAllergicToMedications}
          required
          name="isAllergicToMedications"
          id="isAllergicToMedications"
        />

        {(isAllergicToMedications ||
          resData?.currentAnyMedication === true) && (
          <DInput
            answer={resData?.currentAnyMedicationSpecify}
            id="allergyDetails"
            className="mb-4"
            name="allergyDetails"
            label="Please specify."
            required={isAllergicToMedications}
          />
        )}

        <DHeader>Travel and Dining</DHeader>

        <DRadioGroup
          answer={resData?.travelFrequency}
          label="Do you frequently travel or dine out?"
          options={yesNoOptions}
          onChange={handleFrequentlyTravelsOrDinesOut}
          required
          name="frequentlyTravelsOrDinesOut"
          id="frequentlyTravelsOrDinesOut"
        />

        {(frequentlyTravelsOrDinesOut || resData?.travelFrequency === true) && (
          <DTextArea
            answer={resData?.travelFrequencyDetails}
            id="allergyManagementDetails"
            className="mb-4"
            name="allergyManagementDetails"
            title="How do you manage your allergies in these situations?"
            required={frequentlyTravelsOrDinesOut}
          />
        )}

        <DHeader>Additional Information</DHeader>

        <DTextArea
          answer={resData?.additionalInfo}
          id="additionalInfo"
          className="mb-4"
          name="additionalInfo"
          title="Is there any other relevant medical information or details about your allergies that you would like to share with The MEDIC for the Allergy Certificate?"
          required
        />
        <DFileUpload
          title="Passport or Identification Upload"
          description="Please upload a scanned copy or clear image of your passport or identification for verification purposes. "
          required
          accept="image/*,.pdf"
          maxSize={10 * 1024 * 1024} // 10MB
          onFileChange={setPassport}
          value={passport}
        />

        {resData || isAdmin ? (
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
            <DConfirmDetails latterType="Allergy Certificate"></DConfirmDetails>
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

export default AllergyCertificate;
