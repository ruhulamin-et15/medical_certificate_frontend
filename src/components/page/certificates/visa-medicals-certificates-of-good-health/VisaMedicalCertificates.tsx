"use client";
import DForm from "@/components/page/request-certificate/Dform";
import RequestFooter from "@/components/Request/RequestFooter";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import DPriority from "@/components/ui/DFields/DPriority";
import React, { useState } from "react";
import visaImage from "../../../../../public/assets/images/visa-certificate.jpg";
import VisaDetails from "./VisaDetails";
import MedicalHistory from "./MedicalHistory";
import VacationHistory from "./VacationHistory";
import AdditionalInfo from "./AdditionalInfo";
import PassportUpload from "./PassportUpload";
// import HardCopy from "./HardCopy";
import {
  PriorityOption,
  RequestStatus,
  VisaCertificate,
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

const VisaMedicalCertificates = ({
  data,
  isAdmin,
}: {
  data?: VisaCertificate;
  isAdmin?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const prices = getPrices(pathname, isAdmin);
  const { price1, price2, path, name } = prices;
  const [price, setPrice] = useState(price1);
  const [finalPrice, setFinalPrice] = useState(price1);

  const title: string = "Visa Medicals Certificates of Good Health";
  const [priority, setPriority] = useState("STANDARD_REQUEST");
  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  const handlePriceChange = (e: number) => {
    setPrice(e);
    setFinalPrice(e);
  };

  // console.log(data);

  const [postVaccineReq, { isLoading }] = useCertificateRequestPostMutation();
  const [paymentCertificate, { isLoading: loading2 }] =
    usePaymentCertificateMutation();
  const [createAccountUser, { isSuccess }] = useRegisterMutation();
  const { user, login } = useUser();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const from = new FormData(e.currentTarget);
    const data: VisaCertificate = {
      firstName: from.get("req-firstname") as string,
      lastName: from.get("req-lastname") as string,
      mobileNumber: from.get("req-mobile") as string,
      email: from.get("req-email") as string,
      gender: (from.get("radio-sex") as string) ?? "male",
      address: from.get("req-address") as string,
      dateOfBirth: new Date(from.get("req-dob") as string),
      visaPurpose: from.get("purpose-visa") as string,
      visaCountry: from.get("visa-country") as string,
      previouslyIssuedVisa: from.get("visaissued") == "yes",
      previouslyIssuedVisaDetails: from.get("provide-details") as string,
      medicalHistoryConditions: from.get("medicalCondition") === "yes",
      medicalHistoryConditionsDetails: from.get("provide-details2") as string,
      takingPrescription: from.get("prescriptionmedications") === "yes",
      takingPrescriptionDetails: from.get("list-item") as string,
      contagiousDisease: from.get("diagnosed") === "yes",
      vaccinationReceived: from.get("vaccinations") === "yes",
      vaccinationReceivedDetails: from.get("provide-details3") as string,
      recentExposure: from.get("contagiousdiseases") === "yes",
      recentExposureDetails: from.get("provide-details4") as string,
      travelHistory: from.get("travelhistory") === "yes",
      travelHistoryDetails: from.get("provide-details5") as string,
      healthInsurance: from.get("healthinsurance") === "yes",
      healthInsuranceDetails: from.get("provide-details6") as string,
      additionalInfo: from.get("medical-information") as string,
      passportNumber: from.get("passport-name") as string,
      passportUpload: from.get("image-copy") as File,
      amount: finalPrice,
      couponCode: (from.get("cupon-code") as string) ?? "",
      priorityOption: priority as PriorityOption,
      requestStatus: "PENDING" as RequestStatus,
    };
    // (data);

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
  const handleSexChange = () => {
    // (e);
  };
  return (
    <section>
      {isLoading || loading2 ? (
        <div className="min-h-screen w-full fixed top-0 left-0 bg-black/25 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        ""
      )}
      <DForm
        handleFormSubmit={handleFormSubmit}
        imageSrc={visaImage}
        subtitle={title}
        handleSexChange={handleSexChange}
        isAdmin={isAdmin}
        resData={data}
      >
        <VisaDetails resData={data}></VisaDetails>
        <MedicalHistory resData={data}></MedicalHistory>
        <VacationHistory resData={data}></VacationHistory>
        <AdditionalInfo resData={data} isAdmin={isAdmin}></AdditionalInfo>
        <PassportUpload resData={data}></PassportUpload>
        {isAdmin ? (
          <AdminPriority data={data} />
        ) : (
          <div>
            <DPriority
              handlePriorityChange={handlePriorityChange}
              handlePriceChange={handlePriceChange}
              image={visaImage}
              price1={price1}
              price2={price2}
            ></DPriority>
            {/* <HardCopy></HardCopy> */}
            <DConfirmDetails latterType={title}></DConfirmDetails>
            <RequestFooter
              price={price}
              setFinalPrice={setFinalPrice}
            ></RequestFooter>
          </div>
        )}
      </DForm>
    </section>
  );
};

export default VisaMedicalCertificates;
