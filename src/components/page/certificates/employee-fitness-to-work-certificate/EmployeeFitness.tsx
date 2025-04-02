"use client";
import DForm from "@/components/page/request-certificate/Dform";
import RequestFooter from "@/components/Request/RequestFooter";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import DPriority from "@/components/ui/DFields/DPriority";
import React, { useState } from "react";
import employeefitness from "../../../../../public/assets/images/testimonial-2.jpg";
import MedicalQus from "./MedicalQus";
import Request from "./Request";
import Workplace from "./Workplace";
import { usePathname, useRouter } from "next/navigation";
import { getPrices } from "@/utils/getPriceInCirtificateRequest";
import {
  EmployeeFitnessCertificate,
  PriorityOption,
  RequestStatus,
} from "@/lib/interface/request.interface";
import { RegisterUserInterface } from "@/redux/api/user/user.auth.interface";
import {
  PaymentType,
  usePaymentCertificateMutation,
} from "@/redux/api/payment/payment.api";
import { useUser } from "@/lib/provider/UserProvider";
import { useRegisterMutation } from "@/redux/api/user/user.auth";
import { useCertificateRequestPostMutation } from "@/redux/api/certificate/certificate.post";
import Loading from "@/components/ui/Loading";
import AdminPriority from "@/components/Request/AdminPriority";

const EmployeeFitness = ({
  data,
  isAdmin,
}: {
  data?: EmployeeFitnessCertificate;
  isAdmin?: boolean;
}) => {
  // // (data);

  const pathname = usePathname();
  const [priority, setPriority] = useState("STANDARD_REQUEST");
  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };
  const prices = getPrices(pathname, isAdmin);
  const { price1, price2, path, name } = prices;
  const [price, setPrice] = useState(price1);
  const [finalPrice, setFinalPrice] = useState(price1);

  const router = useRouter();
  // (price1);

  const [postCertificateReq, { isLoading }] =
    useCertificateRequestPostMutation();

  const [paymentCertificate, { isLoading: loading2 }] =
    usePaymentCertificateMutation();
  const [createAccountUser, { isSuccess }] = useRegisterMutation();
  const { user, login } = useUser();

  const handlePriceChange = (e: number) => {
    setPrice(e);
    setFinalPrice(e);
  };

  const title: string = "Employee Fitness to Work Certificate";

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const from = new FormData(e.currentTarget);

    const data: EmployeeFitnessCertificate = {
      firstName: from.get("req-firstname") as string,
      lastName: from.get("req-lastname") as string,
      mobileNumber: from.get("req-mobile") as string,
      email: from.get("req-email") as string,
      gender: (from.get("radio-sex") as string) ?? "male",
      dateOfBirth: new Date(from.get("req-dob") as string),
      preExistingConditions: from.get("preexisting") == "yes" ? true : false,
      preExistingConditionsDetails: from.get("provide-information") as string,
      medications: from.get("medications") == "yes" ? true : false,
      medicationsDetails: from.get("medications-take") as string,
      walkingAbility: from.get("breath") as string,
      workExplanation: from.get("letterdetails") as string,
      uploadFile: from.get("dischargefile") as string,
      workplace: from.get("confirm-work") as string,
      workActivities: from.get("details-work") as string,
      priorityOption: priority as PriorityOption,
      requestStatus: "PENDING" as RequestStatus,
      amount: finalPrice,
      couponCode: from.get("cupon-code") as string,
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
        isAdmin={isAdmin}
        handleFormSubmit={handleFormSubmit}
        subtitle={title}
        handleSexChange={handleSexChange}
        imageSrc={employeefitness}
        resData={data}
      >
        <MedicalQus resData={data}></MedicalQus>
        <Request resData={data} isAdmin={isAdmin}></Request>
        <Workplace resData={data}></Workplace>
        {isAdmin ? (
          <AdminPriority data={data} />
        ) : (
          <div>
            <DPriority
              resData={data}
              handlePriorityChange={handlePriorityChange}
              handlePriceChange={handlePriceChange}
              image={employeefitness}
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

export default EmployeeFitness;
