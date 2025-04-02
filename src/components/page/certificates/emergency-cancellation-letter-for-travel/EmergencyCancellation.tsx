"use client";
import DForm from "@/components/page/request-certificate/Dform";
import certificates from "../../../../../public/cardData.json";
import React, { FormEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import DInput from "@/components/ui/DFields/DInput";
import DHeader from "@/components/ui/DFields/DHeader";
import DTextArea from "@/components/ui/DFields/DTextarea";
import DPriority from "@/components/ui/DFields/DPriority";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import RequestFooter from "@/components/Request/RequestFooter";
import DFileUpload from "@/components/ui/DFields/DFileUpload";
import {
  EmergencyCancellationRequest,
  PriorityOption,
  RequestStatus,
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
import { formatDate } from "@/utils/formateDate";

const EmergencyCancellation = ({
  data: resData,
  isAdmin,
}: {
  data?: EmergencyCancellationRequest;
  isAdmin?: boolean;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const prices = getPrices(pathName, isAdmin);
  const { price1, price2, path, name } = prices;
  const certificate = certificates?.find(
    (item) => item.id === (path as string)
  );
  const [sex, setSex] = useState("male");
  const [passport, setPassport] = useState<File | null>(null);
  const [price, setPrice] = useState(
    Number(certificate?.pricing?.discountedPrice)
  );
  const [finalPrice, setFinalPrice] = useState(
    Number(certificate?.pricing?.discountedPrice)
  );

  const [preExistingHealthConditions, setPreExistingHealthConditions] =
    useState(resData?.medicalPractitioner === true);
  const [regularMedications, setRegularMedications] = useState(false);
  const [threeOptions1, setThreeOptions1] = useState("no");
  const [medicalReason, setMedicalReason] = useState("");
  const [symptomsDate, setSymptomsDate] = useState("");
  const [symptomsDetails, setSymptomsDetails] = useState("");
  const [priority, setPriority] = useState("STANDARD_REQUEST");
  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  const [postVaccineReq, { isLoading }] = useCertificateRequestPostMutation();
  const [paymentCertificate, { isLoading: loading2 }] =
    usePaymentCertificateMutation();
  const [createAccountUser, { isSuccess }] = useRegisterMutation();
  const { user, login } = useUser();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const data: EmergencyCancellationRequest = {
      firstName: form.get("req-firstname") as string,
      lastName: form.get("req-lastname") as string,
      email: form.get("req-email") as string,
      mobileNumber: form.get("req-mobile") as string,
      dateOfBirth: new Date(form.get("req-dob") as string),
      gender: sex,
      medicalPractitioner: preExistingHealthConditions as boolean,
      medicalPractitionerDetails: form.get(
        "preExistingHealthConditions_input"
      ) as string,
      medicalRegularly: regularMedications as boolean,
      medicalRegularlyDetails: form.get("regularMedications_input") as string,
      mainReasonForCancellation: medicalReason,
      symptomsStartDate: new Date(symptomsDate),
      symptomsDescription: symptomsDetails as string,
      priorityOption: priority as PriorityOption,
      medicalCondition: form.get("preExistingMedicalConditions") as string,
      medicalConditionDetails: form.get(
        "preExistingMedicalConditions_input"
      ) as string,
      medicalConditionFile: form.get("") as string,
      amount: finalPrice,
      requestStatus: "PENDING" as RequestStatus,
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
      try {
        await createAccountUser(registerData);
        if (isSuccess) {
          login({
            email: registerData.email,
            password: registerData.password,
          });
        }
      } catch (error) {
        if (error) {
          alert("Something went wrong. Please try again.");
        }
      }
    }
    try {
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
    } catch (error) {
      if (error) {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const handleSexChange = (e: string) => {
    setSex(e);
  };
  const yesNoOptions: DOptions[] = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const handlePreExistingHealthConditions = (value: any) => {
    if (value === "yes") {
      setPreExistingHealthConditions(true);
    } else {
      setPreExistingHealthConditions(false);
    }
  };

  const handleRegularMedications = (value: any) => {
    if (value === "yes") {
      setRegularMedications(true);
    } else {
      setRegularMedications(false);
    }
  };

  const handlePriceChange = (e: number) => {
    setPrice(e);
    setFinalPrice(e);
  };

  const threeOptions: DOptions[] = [
    { label: "Yes, from my GP", value: "yesGP" },
    { label: "Yes, I visited my local A&E", value: "yesLocalA&E" },
    { label: "No", value: "no" },
  ];
  const handlePreExistingMedicalConditions = (value: any) => {
    setThreeOptions1(value);
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
        imageSrc={certificate?.imageUrl as string}
        handleFormSubmit={handleFormSubmit}
        handleSexChange={handleSexChange}
        subtitle="Emergency Cancellation Letter for Travel"
        resData={resData}
        isAdmin={isAdmin}
      >
        <DHeader>Medical Questions</DHeader>

        <DRadioGroup
          label="Do you have any pre-existing health conditions your Partner Practitioner should be aware of?"
          options={yesNoOptions}
          onChange={handlePreExistingHealthConditions}
          required
          answer={resData?.medicalPractitioner}
          name="preExistingHealthConditions"
          id="preExistingHealthConditions"
        />

        {preExistingHealthConditions && (
          <div className="my-5 md:pl-5">
            <DInput
              id="preExistingHealthConditions_input"
              className="mb-4"
              answer={resData?.medicalPractitionerDetails}
              name="preExistingHealthConditions_input"
              label="Please provide information about your pre-existing health conditions."
              required={preExistingHealthConditions}
            />
          </div>
        )}

        <DRadioGroup
          label="Are you taking any medications regularly?"
          options={yesNoOptions}
          onChange={handleRegularMedications}
          required
          answer={resData?.medicalRegularly}
          name="regularMedications"
          id="regularMedications"
        />

        {regularMedications || resData?.medicalRegularly ? (
          <div className="my-5 md:pl-5">
            <DInput
              id="regularMedications_input"
              className="mb-4"
              answer={resData?.medicalRegularlyDetails}
              name="regularMedications_input"
              label="Please tell us which medications and their doses that you take."
              required={regularMedications}
            />
          </div>
        ) : (
          ""
        )}

        <DHeader>Your Unforeseen Illness or Injury</DHeader>

        {/* Medical reason for cancellation */}
        <DRadioGroup
          label="Main reason for travel or holiday cancellation"
          options={[
            { label: "Serious illness", value: "Serious illness" },
            { label: "Acute injury", value: "Acute injury" },
            {
              label: "Surgery or hospitalisation",
              value: "Surgery or hospitalisation",
            },
            {
              label: "Flare-ups of chronic condition",
              value: "Flare-ups of chronic condition",
            },
            { label: "Mental health crisis", value: "Mental health crisis" },
            {
              label: "Distress due to bereavement",
              value: "Distress due to bereavement",
            },
            { label: "Infectious disease", value: "Infectious disease" },
            {
              label: "Pregnancy-related concerns or complications",
              value: "Pregnancy-related concerns or complications",
            },
            { label: "Other", value: "Other" },
          ]}
          onChange={(value) => setMedicalReason(value)}
          required
          name="medical_reason"
          id="medical_reason"
          answer={resData?.mainReasonForCancellation}
        />

        {/* Start date of symptoms */}
        <DInput
          type="date"
          id="symptoms_date"
          className="mb-4"
          name="symptoms_date"
          label="Start date of symptoms"
          required={true}
          value={symptomsDate}
          answer={
            resData?.symptomsStartDate
              ? formatDate(resData?.symptomsStartDate as any, true)
              : null
          }
          onChange={(e) => setSymptomsDate(e.target.value)}
        />

        {/* Symptoms details */}
        <DTextArea
          id="symptoms_details"
          className="mb-4"
          answer={resData?.symptomsDescription}
          name="symptoms_details"
          label="Please describe the timeline and the details of your symptoms"
          title="Please describe the timeline and the details of your symptoms"
          required={true}
          value={symptomsDetails}
          onChange={(e) => setSymptomsDetails(e.target.value)}
        />

        {/* to do some */}

        <DRadioGroup
          label="Do you have any pre-existing medical conditions or chronic illnesses? "
          options={threeOptions}
          onChange={handlePreExistingMedicalConditions}
          required
          answer={resData?.medicalCondition}
          name="preExistingMedicalConditions"
          id="preExistingMedicalConditions"
        />
        {threeOptions1 == "yesGP" || resData?.medicalCondition == "yesGP" ? (
          <div className="my-5 md:pl-5">
            <DInput
              id="preExistingMedicalConditions_input"
              className="mb-4"
              name="preExistingMedicalConditions_input"
              label="Please provide details."
              required={true}
              answer={resData?.medicalConditionDetails}
            />
          </div>
        ) : threeOptions1 == "yesLocalA&E" ||
          resData?.medicalCondition == "yesLocalA&E" ? (
          <div>
            <DFileUpload
              title="Passport Upload"
              description="Please upload a scanned copy or clear image of your passport for identification and verification purposes."
              required
              accept="image/*,.pdf"
              maxSize={10 * 1024 * 1024} // 10MB
              onFileChange={setPassport}
              value={passport}
            />
            {resData?.medicalConditionFile &&
            resData?.medicalConditionFile?.length > 2 ? (
              <iframe
                src={resData?.medicalConditionFile ?? ""}
                width="100%"
                height="500"
                style={{ border: "none" }}
              />
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}

        {isAdmin ? (
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
            <DConfirmDetails latterType="Emergency Cancellation Letter for Travel"></DConfirmDetails>
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

export default EmergencyCancellation;
