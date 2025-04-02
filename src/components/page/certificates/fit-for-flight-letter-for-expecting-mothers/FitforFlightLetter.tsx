"use client";
import DForm from "@/components/page/request-certificate/Dform";
import RequestFooter from "@/components/Request/RequestFooter";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import DPriority from "@/components/ui/DFields/DPriority";
import React, { useState } from "react";
import fitnessImage from "../../../../../public/assets/images/employee-fitness-to-work-medical.jpg";
import MedicalQus, { checkboxItemsFitFor } from "./MedicalQus";
import FlightDetails from "./FlightDetails";
import {
  FitForFlightRequest,
  PriorityOption,
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

const FitforFlightLetter = ({
  data,
  isAdmin,
}: {
  data?: FitForFlightRequest;
  isAdmin?: boolean;
}) => {
  const [priority, setPriority] = useState("STANDARD_REQUEST");

  const title: string = "Fit for Flight Letter for Expecting Mothers";

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
  // (finalPrice);
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const data: FitForFlightRequest = {
      firstName: (form.get("req-firstname") as string) ?? "",
      lastName: (form.get("req-lastname") as string) ?? "",
      email: (form.get("req-email") as string) ?? "",
      mobileNumber: (form.get("req-mobile") as string) ?? "",
      dateOfBirth: new Date(form.get("dob") as string),
      gender: (form.get("radio-sex")?.toString() as string) ?? "male",
      pregnancyDueDate: new Date(form.get("delivery-date") as string),
      pregnancyComplications:
        form.get("pregnancy")?.toString().toLowerCase() === "yes",
      pregnancyConception: (form.get("conception") as string) ?? "",
      pregnancyConceptionDetails: (form.get("conceive-method") as string) ?? "",
      anyExperience:
        form.get("complication")?.toString().toLowerCase() === "yes",
      medicalConditions:
        checkboxItemsFitFor
          .map((item) => (form.get(item.name) ? item.label : null))
          .filter(Boolean)
          .join(", ") || "",
      adverseConditionsDuring:
        (form.get("adverse-conditions-during") as string) ?? "",
      nonPregnencyDetails:
        (form.get("non-pregnancy-condition") as string) ?? "",
      currentPrescribe:
        form.get("prescribedmedications")?.toString().toLowerCase() === "yes",
      antenatalCareLocation: (form.get("antenatal-care") as string) ?? "",
      bmiAtStartOfPregnancy: (form.get("BMI") as string) ?? "",
      bloodPressure: (form.get("bloodpressure") as string) ?? "",
      recentBloodPressureDate: (form.get("bloodpressuretaken") as string) ?? "",
      outboundFlightDate: new Date(form.get("flight-date") as string),
      airlineName: (form.get("airline") as string) ?? "",
      flightDuration: (form.get("flight-duration") as string) ?? "",
      pregnancyWeeksAtFlight: parseInt(
        (form.get("pregnancy-outbound") as string) ?? 0,
        10
      ),
      amount: finalPrice,
      returnFlight:
        form.get("returnflight")?.toString().toLowerCase() === "yes",
      returnFlightDate: new Date(form.get("return-flight-date") as string),
      priorityOption: priority as PriorityOption,
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

  const handleSexChange = () => {
    // (e);
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
        handleFormSubmit={handleFormSubmit}
        imageSrc={fitnessImage}
        subtitle={title}
        handleSexChange={handleSexChange}
        resData={data}
        isAdmin={isAdmin}
      >
        <MedicalQus resData={data} isAdmin={isAdmin}></MedicalQus>
        <FlightDetails resData={data}></FlightDetails>
        {isAdmin ? (
          <AdminPriority data={data} />
        ) : (
          <div>
            <DPriority
              handlePriorityChange={handlePriorityChange}
              handlePriceChange={handlePriceChange}
              image={fitnessImage}
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
    </div>
  );
};

export default FitforFlightLetter;
