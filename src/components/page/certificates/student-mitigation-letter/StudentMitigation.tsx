"use client";
import DForm from "@/components/page/request-certificate/Dform";
import RequestFooter from "@/components/Request/RequestFooter";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import DPriority from "@/components/ui/DFields/DPriority";
import React, { useState } from "react";
import mitigationimage from "../../../../../public/assets/images/thegpclinic-student-mitigation-letter-1.jpg";
import MedicalQus from "./MedicalQus";
import Symptoms from "./Symptoms";
import Assessment from "./Assessment";
import Request from "./Request";
import EducationalInstitution from "./EducationalInstitution";
import {
  ConditionStatus,
  MitigationLetter,
  PriorityOption,
  RequestStatus,
} from "@/lib/interface/request.interface";
import { usePathname, useRouter } from "next/navigation";
import { getPrices } from "@/utils/getPriceInCirtificateRequest";
import { useUser } from "@/lib/provider/UserProvider";
import {
  PaymentType,
  usePaymentCertificateMutation,
} from "@/redux/api/payment/payment.api";
import { useRegisterMutation } from "@/redux/api/user/user.auth";
import { RegisterUserInterface } from "@/redux/api/user/user.auth.interface";
import { useCertificateRequestPostMutation } from "@/redux/api/certificate/certificate.post";
import Loading from "@/components/ui/Loading";
import AdminPriority from "@/components/Request/AdminPriority";

const StudentMitigation = ({
  data,
  isAdmin,
}: {
  data?: MitigationLetter;
  isAdmin?: boolean;
}) => {
  const pathname = usePathname();
  const prices = getPrices(pathname, isAdmin);
  const { price1, price2, path, name } = prices;
  const [finalPrice, setFinalPrice] = useState(price1);
  const [price, setPrice] = useState(price1);
  const handlePriceChange = (e: number) => {
    setPrice(e);
    setFinalPrice(e);
  };

  const [priority, setPriority] = useState("STANDARD_REQUEST");
  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };
  const router = useRouter();
  const [postVaccineReq, { isLoading }] = useCertificateRequestPostMutation();
  const [paymentCertificate, { isLoading: loading2 }] =
    usePaymentCertificateMutation();
  const [createAccountUser, { isSuccess }] = useRegisterMutation();
  const { user, login } = useUser();

  const title: string = "Student Mitigation Letter";

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const from = new FormData(e.currentTarget);

    const data: MitigationLetter = {
      firstName: from.get("req-firstname") as string,
      lastName: from.get("req-lastname") as string,
      mobileNumber: from.get("req-mobile") as string,
      email: from.get("req-email") as string,
      gender: (from.get("radio-sex") as string) || "male",
      dateOfBirth: new Date(from.get("req-dob") as string),
      mitigationReason: from.get("medicalletter") as string,
      preExistingConditions: from.get("preexisting") == "yes" ? true : false,
      takeMedications: from.get("medications") == "yes" ? true : false,
      consultedGP: from.get("mitigating") == "yes" ? true : false,
      gpConsultationDate: new Date(from.get("date-consultation") as string),
      gpName: from.get("name-gp") as string,
      description: from.get("description") as string,
      symptomsStartDate: new Date(from.get("startdate") as string),
      symptomsDetails: from.get("symptomstimeline") as string,
      medicalCare: from.get("medicalissue") as string,
      conditionStatus: from.get("conditionstatus") as ConditionStatus,
      impactOnAssessment: from.get("mitigatingimpact") as string,
      circumstance: from.get("completeassessment") as string,
      mitigationProposal: from.get("solution") as string,
      validFrom: new Date(from.get("valid-data") as string),
      validTo: new Date(from.get("valid-to-date") as string),
      institutionName: from.get("college-name") as string,
      courseName: from.get("course-year") as string,
      additionalInfo: from.get("additional-information") as string,
      amount: finalPrice,
      priorityOption: priority as PriorityOption,
      requestStatus: "PENDING" as RequestStatus,
      couponCode: from.get("cupon-code") as string,
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
        handleFormSubmit={handleFormSubmit}
        subtitle={title}
        handleSexChange={handleSexChange}
        imageSrc={mitigationimage}
        resData={data}
        isAdmin={isAdmin}
      >
        <MedicalQus resData={data}></MedicalQus>
        <Symptoms resData={data}></Symptoms>
        <Assessment resData={data} isAdmin={isAdmin}></Assessment>
        <Request resData={data} isAdmin={isAdmin}></Request>
        <EducationalInstitution
          resData={data}
          isAdmin={isAdmin}
        ></EducationalInstitution>
        {isAdmin ? (
          <AdminPriority data={data} />
        ) : (
          <div>
            <DPriority
              handlePriorityChange={handlePriorityChange}
              handlePriceChange={handlePriceChange}
              image={mitigationimage}
              price1={price1}
              price2={price2}
              resData={data}
            ></DPriority>
            <DConfirmDetails latterType={title}></DConfirmDetails>
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

export default StudentMitigation;
