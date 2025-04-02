"use client";
import RequestFooter from "@/components/Request/RequestFooter";
import React, { useState } from "react";
import MedicalQus from "./MedicalQus";
import SymptomsForm from "./SymptomsForm";
// import Image1 from "@/assets/image/placeholder/hp-3-steps-1.jpg";
import DForm from "@/components/page/request-certificate/Dform";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import chickenPoxImage from "/public/assets/images/chickenpox-flight-clearance-medical.png";
import { usePathname, useRouter } from "next/navigation";
import DPriority from "@/components/ui/DFields/DPriority";
import { getPrices } from "@/utils/getPriceInCirtificateRequest";
import {
  ChickenpoxCertificateRequest,
  ConditionStatus,
  PriorityOption,
  RequestStatus,
} from "@/lib/interface/request.interface";
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
const Chickenpox = ({
  data,
  isAdmin,
}: {
  data?: ChickenpoxCertificateRequest;
  isAdmin?: boolean;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const prices = getPrices(pathname);
  const { price1, price2, path, name } = prices;
  const [price, setPrice] = useState(price1);
  const [finalPrice, setFinalPrice] = useState(price1);
  const [priority, setPriority] = useState("STANDARD_REQUEST");
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
    const form = new FormData(e.currentTarget);
    const data: ChickenpoxCertificateRequest = {
      firstName: form.get("req-firstname") as string,
      lastName: form.get("req-lastname") as string,
      mobileNumber: form.get("req-mobile") as string,
      email: form.get("req-email") as string,
      gender: (form.get("radio-sex") as string) ?? "male",
      dateOfBirth: new Date(form.get("req-dob") as string),
      preExistingCondition: form.get("pre-existing") === "yes",
      preExistingConditionDetails:
        (form.get("pre-existing-details") as string) ?? "",
      regularMedications: form.get("medications") === "yes",
      regularMedicationsDetails: form.get("medications-details") as string,
      flightDate: new Date(form.get("flight-date") as string),
      arrivalLocation: form.get("airline") as string,
      amount: finalPrice,
      symptomStartDate: new Date(form.get("symptom-start-date") as string),
      symptomsDetails: form.get("symptom-details") as string,
      treatmentGP: form.get("medicalcare") as string,
      treatmentGPDetails: form.get("administeredGP") as string,
      treatmentGPFile: form.get("a&efile") as string,
      chickenpoxScabbed: form.get("newspots") === "yes",
      conditionStatus: form.get("condition-status") as ConditionStatus,
      feverLast48Hours: form.get("fever") === "yes",
      priorityOption: priority as PriorityOption,
      requestStatus: "PENDING" as RequestStatus,
      monkeypoxContact: form.get("contact-monkeypox") === "yes",
    };
    //

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
        imageSrc={chickenPoxImage}
        handleFormSubmit={handleFormSubmit}
        subtitle="Chickenpox Flight Clearance Medical"
        resData={data}
        isAdmin={isAdmin}
      >
        <MedicalQus resData={data}></MedicalQus>
        <SymptomsForm resData={data} isAdmin={isAdmin}></SymptomsForm>
        {isAdmin ? (
          <AdminPriority data={data} />
        ) : (
          <div>
            <DPriority
              handlePriorityChange={handlePriorityChange}
              handlePriceChange={handlePriceChange}
              image={chickenPoxImage}
              price1={price1}
              price2={price2}
            ></DPriority>
            <DConfirmDetails latterType="Chickenpox Flight Clearance Medical"></DConfirmDetails>
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

export default Chickenpox;
