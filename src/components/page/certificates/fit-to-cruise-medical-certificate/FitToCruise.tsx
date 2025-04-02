"use client";
import DForm from "@/components/page/request-certificate/Dform";
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import certificates from "../../../../../public/cardData.json";
import DHeader from "@/components/ui/DFields/DHeader";
import DInput from "@/components/ui/DFields/DInput";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import DTextArea from "@/components/ui/DFields/DTextarea";
import DFileUpload from "@/components/ui/DFields/DFileUpload";
import DPriority from "@/components/ui/DFields/DPriority";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import RequestFooter from "@/components/Request/RequestFooter";
import {
  FitToCruiseRequest,
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

function FitToCruise({
  isAdmin = false,
  data: resData,
}: {
  isAdmin?: boolean;
  data?: FitToCruiseRequest;
}) {
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

  const [preExistingMedicalConditions, setPreExistingMedicalConditions] =
    useState(resData?.preExistingMedicalConditions === true);
  const [medications, setMedications] = useState(
    resData?.currentlyTakingMedications === true
  );
  const [previousCruise, setPreviousCruise] = useState(
    resData?.previousCruiseExperience === true
  );
  const [allergies, setAllergies] = useState(resData?.allergies === true);
  const [significantIllnesses, setSignificantIllnesses] = useState(
    resData?.recentIllnessOrSurgery === true
  );
  const [specialistName, setSpecialistName] = useState(
    resData?.medicalConsultations === true
  );
  const [physicalActivity, setPhysicalActivity] = useState(false);
  const [motionSickness, setMotionSickness] = useState<boolean>(
    resData?.motionSickness === true
  );
  const [passport, setPassport] = useState<File | null>(null);

  const [priority, setPriority] = useState("STANDARD_REQUEST");
  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const data: FitToCruiseRequest = {
      firstName: form.get("req-firstname") as string,
      lastName: form.get("req-lastname") as string,
      email: form.get("req-email") as string,
      mobileNumber: form.get("req-mobile") as string,
      dateOfBirth: new Date(form.get("req-dob") as string), // Parsing to Date
      gender: sex,
      passportNumber: form.get("Passport_Number") as string,
      cruiseLineNameAndBooking: form.get("Line_Name") as string,
      departureDate: new Date(form.get("Departure_data") as string), // Parsing to Date
      itinerary: form.get("Duration_of_Cruise") as string,
      preExistingMedicalConditions: preExistingMedicalConditions, // Boolean, assumed handled
      preExistingMedicalDetails: form.get(
        "preExistingMedicalConditions_input"
      ) as string,
      currentlyTakingMedications: medications, // Boolean, assumed handled
      currentlyTakingListThem: form.get("medications_input") as string,
      previousCruiseExperience: previousCruise, // Boolean, assumed handled
      previousCruiseDetails: form.get("previous_cruise_input") as string,
      allergies: allergies, // Boolean, assumed handled
      allergySpecify: form.get("allergies_input") as string,
      recentIllnessOrSurgery: allergies, // Boolean, assumed handled
      recentIllnessOrSurgeryDetails: form.get(
        "significant_illnesses_input"
      ) as string,
      medicalConsultations: specialistName, // Assuming this is handled correctly
      medicalConsultationName: form.get("specialist_name_input") as string, // Assuming this is handled correctly
      physicalActivity: physicalActivity, // Assuming this is handled correctly
      motionSickness: motionSickness, // Assuming this is handled correctly
      motionSicknessManage: form.get("motion_sickness_input") as string,
      specialDietary: form.get("requirementsRestrictions") as string,
      emergencyContacts: form.get("emergencyContacts") as string,
      additionalInformation: form.get("medicalInformation") as string,
      passportUpload: passport?.name as string, // Assuming passport can be null
      priorityOption: priority as PriorityOption, // Assuming this is handled correctly
      amount: finalPrice, // Assuming this is a number and handled correctly
      couponCode: form.get("cupon-code") as string,
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

  // // (passport)
  const handleSexChange = (e: string) => {
    setSex(e);
  };
  const yesNoOptions: DOptions[] = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const handlePreExistingMedicalConditions = (value: any) => {
    if (value === "yes") {
      setPreExistingMedicalConditions(true);
    } else {
      setPreExistingMedicalConditions(false);
    }
  };
  const handleMedications = (value: any) => {
    if (value === "yes") {
      setMedications(true);
    } else {
      setMedications(false);
    }
  };
  const handlePreviousCruise = (value: any) => {
    if (value === "yes") {
      setPreviousCruise(true);
    } else {
      setPreviousCruise(false);
    }
  };
  const handleAllergies = (value: any) => {
    if (value === "yes") {
      setAllergies(true);
    } else {
      setAllergies(false);
    }
  };
  const handleSignificantIllnesses = (value: any) => {
    if (value === "yes") {
      setSignificantIllnesses(true);
    } else {
      setSignificantIllnesses(false);
    }
  };
  const handleSpecialistName = (value: any) => {
    if (value === "yes") {
      setSpecialistName(true);
    } else {
      setSpecialistName(false);
    }
  };
  const handlePhysicalActivity = (value: any) => {
    if (value === "yes") {
      setPhysicalActivity(true);
    } else {
      setPhysicalActivity(false);
    }
  };
  const handleMotionSickness = (value: string) => {
    setMotionSickness(value === "yes");
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
        subtitle="Fit-to-Cruise Medical Certificate"
      >
        <DHeader>Personal Information</DHeader>

        <DInput
          answer={resData?.passportNumber}
          readOnly={isAdmin}
          id="Passport_Number"
          className="mb-4"
          name="Passport_Number"
          label="Passport Number (for identification purposes):"
          required={true}
        ></DInput>
        <DHeader>Cruise Details</DHeader>
        <DInput
          answer={resData?.cruiseLineNameAndBooking}
          readOnly={isAdmin}
          id="Line_Name"
          className="mb-4"
          name="Line_Name"
          label="Cruise Line Name and Booking Reference:"
          required={true}
        ></DInput>
        <DInput
          answer={
            resData?.departureDate &&
            new Date(resData.departureDate).toISOString().split("T")[0]
          }
          disabled={isAdmin}
          type="date"
          id="Departure_data"
          className="mb-4"
          name="Departure_data"
          label="Departure Port and Date:"
          required={true}
        ></DInput>
        <DInput
          answer={resData?.itinerary}
          readOnly={isAdmin}
          id="Duration_of_Cruise"
          className="mb-4"
          name="Duration_of_Cruise"
          label="Itinerary (ports of call) and Duration of Cruise:"
          required={true}
        ></DInput>
        <DHeader>Medical History</DHeader>

        <DRadioGroup
          answer={resData?.preExistingMedicalConditions}
          isAdmin={isAdmin}
          label="Do you have any pre-existing medical conditions or chronic illnesses? "
          options={yesNoOptions}
          onChange={handlePreExistingMedicalConditions}
          required
          name="preExistingMedicalConditions"
          id="preExistingMedicalConditions"
        />
        {preExistingMedicalConditions && (
          <div className="my-5 md:pl-5">
            <DInput
              answer={resData?.preExistingMedicalDetails}
              id="preExistingMedicalConditions_input"
              className="mb-4"
              name="preExistingMedicalConditions_input"
              label="Please provide details."
              required={preExistingMedicalConditions}
            />
          </div>
        )}

        <DRadioGroup
          answer={resData?.currentlyTakingMedications}
          label="Are you currently taking any medications?"
          options={yesNoOptions}
          onChange={handleMedications}
          required
          name="medications"
          id="medications"
        />
        {medications && (
          <div className="my-5 md:pl-5">
            <DInput
              answer={resData?.currentlyTakingListThem}
              id="medications_input"
              className="mb-4"
              name="medications_input"
              label="Please provide details."
              required={medications}
            />
          </div>
        )}
        <DHeader>Previous Cruise Experience</DHeader>

        <DRadioGroup
          answer={resData?.previousCruiseExperience}
          label="Have you previously been on a cruise?"
          options={yesNoOptions}
          onChange={handlePreviousCruise}
          required
          name="previous_cruise"
          id="previous_cruise"
        />
        {previousCruise && (
          <div className="my-5 md:pl-5">
            <DInput
              answer={resData?.previousCruiseDetails}
              id="previous_cruise_input"
              className="mb-4"
              name="previous_cruise_input"
              label="Please provide details of any medical incidents or health-related concerns during previous cruises."
              required={previousCruise}
            />
          </div>
        )}

        <DHeader>Allergies</DHeader>
        <DRadioGroup
          answer={resData?.allergies}
          label="Do you have any known allergies to medications, food, or other substances?"
          options={yesNoOptions}
          onChange={handleAllergies}
          required
          name="allergies"
          id="allergies"
        />
        {allergies && (
          <div className="my-5 md:pl-5">
            <DInput
              answer={resData?.allergySpecify}
              id="allergies_input"
              className="mb-4"
              name="allergies_input"
              label="Please specify."
              required={allergies}
            />
          </div>
        )}
        <DHeader>Recent Illness or Surgery</DHeader>
        <DRadioGroup
          answer={resData?.recentIllnessOrSurgery}
          label="Have you had any significant illnesses, surgeries, or medical procedures in the last six months?"
          options={yesNoOptions}
          onChange={handleSignificantIllnesses}
          required
          name="significant_illnesses"
          id="significant_illnesses"
        />
        {significantIllnesses && (
          <div className="my-5 md:pl-5">
            <DTextArea
              answer={resData?.recentIllnessOrSurgeryDetails}
              id="significant_illnesses_input"
              className="mb-4"
              name="significant_illnesses_input"
              label="Please provide details of any significant illnesses, surgeries, or medical procedures."
              required={significantIllnesses}
            />
          </div>
        )}
        <DHeader>Medical Consultations</DHeader>
        <DRadioGroup
          answer={resData?.medicalConsultations}
          label="Have you consulted with your GP or any other healthcare professionals regarding your fitness for cruise travel?"
          options={yesNoOptions}
          onChange={handleSpecialistName}
          required
          name="specialist_name"
          id="specialist_name"
        />
        {specialistName && (
          <div className="my-5 md:pl-5">
            <DInput
              answer={resData?.medicalConsultationName}
              id="specialist_name_input"
              className="mb-4"
              name="specialist_name_input"
              label="Please provide The MEDIC's or specialist's name and contact information."
              required={specialistName}
            />
          </div>
        )}
        <DHeader>Physical Activity and Mobility</DHeader>
        <DRadioGroup
          answer={resData?.physicalActivity}
          label="Are there any restrictions on your physical activity or mobility that may impact your ability to participate in cruise activities or emergencies onboard?"
          options={yesNoOptions}
          onChange={handlePhysicalActivity}
          required
          name="physical_activity"
          id="physical_activity"
        />

        <DHeader>Motion Sickness</DHeader>
        <DRadioGroup
          answer={resData?.motionSickness}
          label="Have you experienced motion sickness or seasickness in the past? "
          options={yesNoOptions}
          onChange={handleMotionSickness}
          required
          name="motion_sickness"
          id="motion_sickness"
        />
        {motionSickness && (
          <div className="my-5 md:pl-5">
            <DInput
              answer={resData?.motionSicknessManage}
              id="motion_sickness_input"
              className="mb-4"
              name="motion_sickness_input"
              label="How did you manage it?"
              required={motionSickness}
            />
          </div>
        )}

        <DHeader>Special Dietary Requirements</DHeader>
        <DInput
          answer={resData?.specialDietary}
          id="requirementsRestrictions"
          className="mb-4"
          name="requirementsRestrictions"
          label="Do you have any specific dietary requirements or restrictions that the cruise line should be aware of for your meals onboard?"
          required={true}
        />
        <DHeader>Emergency Contacts</DHeader>
        <DTextArea
          answer={resData?.emergencyContacts}
          id="emergencyContacts"
          className="mb-4"
          name="emergencyContacts"
          label="Please provide the names and contact information for two emergency contacts who can be reached in case of a medical emergency during the cruise. "
          required={true}
        />
        <DHeader>Additional Information</DHeader>
        <DTextArea
          answer={resData?.additionalInformation}
          id="medicalInformation"
          className="mb-4"
          name="medicalInformation"
          label="Is there any other relevant medical information or concerns you would like to share with your GP regarding your fitness for cruise travel?"
          required={true}
        />
        <DFileUpload
          title="Passport Upload"
          description="Please upload a scanned copy or clear image of your passport for identification and verification purposes."
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
            <DConfirmDetails latterType="Fit-to-Cruise Medical Certificate"></DConfirmDetails>
            <RequestFooter
              price={price}
              setFinalPrice={setFinalPrice}
            ></RequestFooter>
          </div>
        )}
      </DForm>
    </div>
  );
}

export default FitToCruise;
