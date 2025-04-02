"use client";
import DForm from "@/components/page/request-certificate/Dform";
import React, { useState } from "react";
import sicknoteimage from "../../../../../public/assets/images/pexels-shvets-production-7176317(1).jpg";
import RequestFooter from "@/components/Request/RequestFooter";
import MedicalQus from "./MedicalQus";
import Symptoms from "./Symptoms";
import Workplace from "./Workplace";
import DPriority from "@/components/ui/DFields/DPriority";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import {
  ConditionStatus,
  PriorityOption,
  RequestStatus,
  SickNoteRequest,
} from "@/lib/interface/request.interface";
import { usePathname, useRouter } from "next/navigation";
import { getPrices } from "@/utils/getPriceInCirtificateRequest";
import { RegisterUserInterface } from "@/redux/api/user/user.auth.interface";
import {
  PaymentType,
  usePaymentCertificateMutation,
} from "@/redux/api/payment/payment.api";
import { useRegisterMutation } from "@/redux/api/user/user.auth";
import { useUser } from "@/lib/provider/UserProvider";
import { useCertificateRequestPostMutation } from "@/redux/api/certificate/certificate.post";
import Loading from "@/components/ui/Loading";
import AdminPriority from "@/components/Request/AdminPriority";

const SickNoteForWork = ({
  isAdmin = false,
  data: fetchedData,
}: {
  isAdmin?: boolean;
  data?: SickNoteRequest;
}) => {
  const router = useRouter();
  const [postCertificateReq, { isLoading }] =
    useCertificateRequestPostMutation();
  const [paymentCertificate, { isLoading: loading2 }] =
    usePaymentCertificateMutation();
  const [createAccountUser, { isSuccess }] = useRegisterMutation();
  const { user, login } = useUser();
  const pathname = usePathname();

  const prices = getPrices(pathname, isAdmin);
  const { price1, price2, path, name } = prices;

  const [price, setPrice] = useState(price1);
  const [finalPrice, setFinalPrice] = useState(price1);
  const [priority, setPriority] = useState("STANDARD_REQUEST");
  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  const handlePriceChange = (e: number) => {
    setPrice(e);
    setFinalPrice(e);
  };

  if (fetchedData) {
    // ("DATA", fetchedData);
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const from = new FormData(e.currentTarget);

    const data: SickNoteRequest = {
      firstName: from.get("req-firstname") as string,
      lastName: from.get("req-lastname") as string,
      mobileNumber: from.get("req-mobile") as string,
      email: from.get("req-email") as string,
      gender: (from.get("radio-sex") as string) ?? "male",
      dateOfBirth: new Date(from.get("req-dob") as string),
      preexistingConditions: from.get("preexisting") === "yes",
      preexistingConditionsDetails:
        (from.get("health-details") as string) || "",
      regularMedication: from.get("medications") === "yes",
      regularMedicationDetails:
        (from.get("medications-details") as string) || "",
      certifiedForWeek: from.get("selfcertified") === "yes",
      validFrom: new Date(from.get("valid-from") as string),
      validTo: new Date(from.get("valid-to") as string),
      symptomStartDate: new Date(from.get("symptoms-date") as string),
      medicalReason: from.get("medicalletter") as string,
      symptomsDetails: from.get("symptomsdetails") as string,
      medicalCareSought: from.get("medicalcare") as string,
      conditionStatus: from.get("conditionstatus") as ConditionStatus,
      workplace: from.get("workplace") as string,
      workActivities: from.get("workActivities") as string,
      amount: finalPrice,
      priorityOption: priority as PriorityOption,
      couponCode: from.get("cupon-code") as string,
      requestStatus: "PENDING" as RequestStatus,
    };

    // console.log(data);

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

  const handleSexChange = () => {};
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
        resData={fetchedData}
        isAdmin={isAdmin}
        handleFormSubmit={handleFormSubmit}
        subtitle="Fit/Sick Note for Work"
        handleSexChange={handleSexChange}
        imageSrc={sicknoteimage}
      >
        <MedicalQus resData={fetchedData} isAdmin={isAdmin}></MedicalQus>
        <Symptoms resData={fetchedData} isAdmin={isAdmin}></Symptoms>
        <Workplace resData={fetchedData} isAdmin={isAdmin}></Workplace>
        {fetchedData || isAdmin ? (
          <AdminPriority data={fetchedData} />
        ) : (
          <div>
            <DPriority
              handlePriorityChange={handlePriorityChange}
              handlePriceChange={handlePriceChange}
              image={sicknoteimage}
              price1={price1}
              price2={price2}
            ></DPriority>

            <DConfirmDetails latterType="Fit/Sick Note for Work"></DConfirmDetails>
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

export default SickNoteForWork;
