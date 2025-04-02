"use client";
import DForm from "@/components/page/request-certificate/Dform";
import RequestFooter from "@/components/Request/RequestFooter";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import DPriority from "@/components/ui/DFields/DPriority";
import React, { useState } from "react";
import travelImage from "../../../../../public/assets/images/travelling-certificate.jpg";
import TravelDetails from "./TravelDetails";
import MedicalCondition from "./MedicalCondition";
import DoctorInformation from "./DoctorInformation";
import {
  PriorityOption,
  TravelMedicationLetterRequest,
} from "@/lib/interface/request.interface";
import { usePathname, useRouter } from "next/navigation";
import { getPrices } from "@/utils/getPriceInCirtificateRequest";
import { RegisterUserInterface } from "@/redux/api/user/user.auth.interface";
import {
  PaymentType,
  usePaymentCertificateMutation,
} from "@/redux/api/payment/payment.api";
import { useCertificateRequestPostMutation } from "@/redux/api/certificate/certificate.post";
import { useRegisterMutation } from "@/redux/api/user/user.auth";
import { useUser } from "@/lib/provider/UserProvider";
import Loading from "@/components/ui/Loading";
import AdminPriority from "@/components/Request/AdminPriority";

// to - do
// 1. there is button to in request footer for form to check the data . remove it
// 2. add input field travel-medication-explanation

const TravelWithMedication = ({
  certificateData,
  isAdmin,
}: {
  certificateData?: TravelMedicationLetterRequest;
  isAdmin?: boolean;
}) => {
  const [gender, setGender] = useState<string | null>(null);
  const title: string = "Travel with Medication Letter";
  const [priority, setPriority] = useState("STANDARD_REQUEST");

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

  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  const handlePriceChange = (e: number) => {
    setPrice(e);
    setFinalPrice(e);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const from = new FormData(form);

    const data: TravelMedicationLetterRequest = {
      amount: finalPrice,
      firstName: (from.get("req-firstname") as string) ?? "",
      lastName: (from.get("req-lastname") as string) ?? "",
      email: (from.get("req-email") as string) ?? "",
      mobileNumber: (from.get("req-mobile") as string) ?? "",
      dateOfBirth: new Date((from.get("req-dob") as string) ?? ""),
      gender: (gender as string) ?? "",
      destination: (from.get("destination-travel") as string) ?? "",
      travelDates: new Date((from.get("return-date") as string) ?? ""),
      purposeOfTravel: (from.get("purpose-travel") as string) ?? "",
      medicalCondition: from.get("preexistingmedical") === "yes",
      medicalConditionDetails:
        (from.get("medical_condition_input") as string) ?? "",
      medicationList: (from.get("all-medicines") as string) ?? "",
      medicationDetails: (from.get("specify-medicine") as string) ?? "",
      recentMedicalChanges: from.get("experience") === "yes",
      recentMedicalChangesDetails:
        (from.get("provide-details") as string) ?? "",
      consultedGP: from.get("travelmedication") === "yes",
      consultedGPDetails: (from.get("provide-details2") as string) ?? "",
      circumstancesDetails:
        (from.get("travel-medication-letter") as string) ?? "",
      travelRegulationsAwareness: from.get("travel-regulations") === "yes",
      travelMedicationExplanation:
        (from.get("travel-medication-explanation") as string) ?? "",
      allergiesOrConditions: from.get("allergies-condition") === "yes",
      additionalInformation: (from.get("relevant-information") as string) ?? "",
      priorityOption: priority as PriorityOption,
      couponCode: (from.get("cupon-code") as string) ?? "",
    };

    const createAccount = from.get("createAccount") === "on";
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
    setGender(e);
  };

  // (certificateData);
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
        resData={certificateData}
        handleFormSubmit={handleFormSubmit}
        imageSrc={travelImage}
        subtitle={title}
        handleSexChange={handleSexChange}
      >
        <TravelDetails
          certificateData={certificateData}
          isAdmin={isAdmin}
        ></TravelDetails>
        <MedicalCondition
          certificateData={certificateData}
          isAdmin={isAdmin}
        ></MedicalCondition>
        <DoctorInformation
          certificateData={certificateData}
          isAdmin={isAdmin}
        ></DoctorInformation>
        <div>
          {isAdmin ? (
            <AdminPriority data={certificateData} />
          ) : (
            <div>
              <DPriority
                handlePriorityChange={handlePriorityChange}
                image={travelImage}
                price1={price1}
                price2={price2}
                handlePriceChange={handlePriceChange}
              ></DPriority>
              <DConfirmDetails latterType="Travel with Medication Letter"></DConfirmDetails>
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

export default TravelWithMedication;
