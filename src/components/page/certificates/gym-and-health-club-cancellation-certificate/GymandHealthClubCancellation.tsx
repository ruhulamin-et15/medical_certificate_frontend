"use client";
import DForm from "@/components/page/request-certificate/Dform";
import RequestFooter from "@/components/Request/RequestFooter";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import DPriority from "@/components/ui/DFields/DPriority";
import React, { useState } from "react";
import gymimage from "../../../../../public/assets/images/jym-and-health-cancellation-certificate.png";
import MembershipDetails from "./MembershipDetails";
import HealthFitnessInformation from "./HealthFitnessInformation";
import MembershipCancellationRequest from "./MembershipCancellationRequest";
import {
  GymCancellationCertificateRequest,
  PriorityOption,
} from "@/lib/interface/request.interface";
import { usePathname, useRouter } from "next/navigation";
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

const GymandHealthClubCancellation = ({
  isAdmin,
  certificateData,
}: {
  isAdmin?: boolean;
  certificateData?: GymCancellationCertificateRequest;
}) => {
  const [gender, setGender] = useState<string | null>(null);
  const title: string = "Gym and Health Club Cancellation Certificate";
  const [priority, setPriority] = useState("STANDARD_REQUEST");

  const pathname = usePathname();
  const prices = getPrices(pathname);
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

    const data: GymCancellationCertificateRequest = {
      amount: finalPrice,
      firstName: (from.get("req-firstname") as string) ?? "",
      lastName: (from.get("req-lastname") as string) ?? "",
      email: (from.get("req-email") as string) ?? "",
      mobileNumber: (from.get("req-mobile") as string) ?? "",
      dateOfBirth: new Date((from.get("req-dob") as string) ?? ""), // Convert to Date
      gender: (gender as string) ?? "",
      gymOrHealthClubName: (from.get("gym-name") as string) ?? "",
      membershipId: (from.get("membership-id") as string) ?? "",
      dateOfJoining: new Date((from.get("date-join") as string) ?? ""), // Convert to Date
      reasonForCancellation: (from.get("cancellation") as string) ?? "",
      medicalConditionAffectsUsage: from.get("pre-existing-medical") === "yes", // Boolean
      injuriesOrHealthIssues: from.get("healthissuesgym") === "yes", // Boolean
      injuriesOrHealthExplanation:
        (from.get("provide-details") as string) ?? "",
      currentMedicalTreatment: from.get("gym-ability") === "yes", // Boolean
      whyCancellation: (from.get("cancellation-gym") as string) ?? "",
      includeFees: from.get("membership-cancellation") === "yes", // Boolean
      consultedGP: from.get("healthclubcancellation") === "yes", // Boolean
      consultedGPDetails: (from.get("provide-details2") as string) ?? "",
      additionalInformation:
        (from.get("relevant-information-cancellation") as string) ?? "",
      priorityOption: priority as PriorityOption,
      couponCode: (from.get("cupon-code") as string) ?? "",
    };

    const createAccount = from.get("createAccount") === "on";
    if (createAccount) {
      const registerData: RegisterUserInterface = {
        firstName: from.get("req-firstname")?.toString() || "",
        lastName: from.get("req-lastname")?.toString() || "",
        email: from.get("req-email")?.toString() || "",
        password: from.get("req-password") as string,
        phone: from.get("req-mobile")?.toString() || "",
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
        handleFormSubmit={handleFormSubmit}
        imageSrc={gymimage}
        subtitle={title}
        handleSexChange={handleSexChange}
      >
        <MembershipDetails
          certificateData={certificateData}
          isAdmin={isAdmin}
        ></MembershipDetails>
        <HealthFitnessInformation
          certificateData={certificateData}
          isAdmin={isAdmin}
        ></HealthFitnessInformation>
        <MembershipCancellationRequest
          certificateData={certificateData}
          isAdmin={isAdmin}
        ></MembershipCancellationRequest>
        <div>
          {isAdmin ? (
            <AdminPriority data={certificateData} />
          ) : (
            <div>
              <DPriority
                handlePriorityChange={handlePriorityChange}
                image={gymimage}
                price1={price1}
                price2={price2}
                handlePriceChange={handlePriceChange}
              ></DPriority>
              <DConfirmDetails latterType="Gym and Health Club Cancellation Certificate"></DConfirmDetails>
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

export default GymandHealthClubCancellation;
