"use client";
import DForm from "@/components/page/request-certificate/Dform";
import RequestFooter from "@/components/Request/RequestFooter";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import DPriority from "@/components/ui/DFields/DPriority";
import React, { useState } from "react";
import sickImage from "../../../../../public/assets/images/student-sick-leave-letter.jpg";
import MedicalQus from "./MedicalQus";
import Symptoms from "./Symptoms";
import EducationalInstitution from "./EducationalInstitution";
import {
  ConditionStatus,
  PriorityOption,
  RequestStatus,
  StudentSickLeaveRequest,
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

const StudentSickLeave = ({
  data,
  isAdmin,
}: {
  data?: StudentSickLeaveRequest;
  isAdmin?: boolean;
}) => {
  const title: string = "Student Sick Leave Letter";

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

  const [priority, setPriority] = useState("STANDARD_REQUEST");

  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  const handlePriceChange = (e: number) => {
    setFinalPrice(e);
    setPrice(e);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const from = new FormData(e.currentTarget);
    const data: StudentSickLeaveRequest = {
      firstName: (from.get("req-firstname") as string) ?? "",
      lastName: (from.get("req-lastname") as string) ?? "",
      mobileNumber: (from.get("req-mobile") as string) ?? "",
      email: (from.get("req-email") as string) ?? "",
      gender: (from.get("radio-sex") as string) ?? "male" ?? "male",
      dateOfBirth: new Date((from.get("req-dob") as string) ?? ""),
      preExistingConditions: from.get("preexisting") == "yes",
      preExistingConditionsDetails:
        (from.get("provide-details") as string) ?? "",
      medications: from.get("medications") == "yes",
      medicationsDetails: (from.get("provide-details2") as string) ?? "",
      symptomsStartDate: new Date(
        (from.get("symptomstartdate") as string) ?? ""
      ),
      medicalReason: (from.get("medicalletter") as string) ?? "",
      medicalCareDetails: from.get("administeredGP") as string,
      symptomsDetails: (from.get("symptom-details") as string) ?? "",
      medicalCare: (from.get("medicalcare") as string) ?? "",
      conditionStatus: (from.get("conditionstatus") as ConditionStatus) ?? "",
      validFrom: new Date((from.get("validfrom") as string) ?? ""),
      validTo: new Date((from.get("validTo") as string) ?? ""),
      institutionName: (from.get("confirm-university") as string) ?? "",
      priorityOption: (priority as PriorityOption) ?? "",
      requestStatus: "PENDING" as RequestStatus,
      amount: finalPrice,
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
  const handleSexChange = () => {
    //  setSex(e)
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
        imageSrc={sickImage}
        subtitle={title}
        handleSexChange={handleSexChange}
        resData={data}
        isAdmin={isAdmin}
      >
        <MedicalQus resData={data}></MedicalQus>
        <Symptoms resData={data}></Symptoms>
        <EducationalInstitution
          resData={data}
          isAdmin={isAdmin}
        ></EducationalInstitution>
        {isAdmin || data ? (
          <AdminPriority data={data} />
        ) : (
          <div>
            <DPriority
              handlePriorityChange={handlePriorityChange}
              handlePriceChange={handlePriceChange}
              image={sickImage}
              price1={price1}
              price2={price2}
            ></DPriority>
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

export default StudentSickLeave;
