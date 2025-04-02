"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { FaRegClock } from "react-icons/fa6";
import { FaMoneyCheck } from "react-icons/fa";
import DetailsInfo from "./DetailsInfo";
import {
  BookConsultation,
  RequestStatus,
} from "@/lib/interface/request.interface";
import { usePathname, useRouter } from "next/navigation";
import { getPrices } from "@/utils/getPriceInCirtificateRequest";
import { useCreateConsultMutation } from "@/redux/api/certificate/certificate.post";
import {
  PaymentType,
  usePaymentCertificateMutation,
} from "@/redux/api/payment/payment.api";
import { useUser } from "@/lib/provider/UserProvider";
import { useRegisterMutation } from "@/redux/api/user/user.auth";
import { RegisterUserInterface } from "@/redux/api/user/user.auth.interface";
import Loading from "@/components/ui/Loading";
import { formatDate } from "@/utils/formateDate";
const SpecialistReferral = ({
  data: resData,
  isAdmin,
}: {
  data?: BookConsultation;
  isAdmin?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const prices = getPrices(pathname);

  const { price1, path, name } = prices;

  const [specialistDate, setspecialistDate] = useState<string>("");
  const [specialistDateTime, setspecialistDateTime] = useState<boolean>(false);
  const [getTimeSchedule, setgetTimeSchedule] = useState<string>("");
  const [showButton, setshowButton] = useState<boolean>(false);
  const specialistdate = useRef<HTMLInputElement | null>(null);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setspecialistDate(e.target.value);
  };

  // console.log(resData);

  const handleTimeSchedule = (e: string) => {
    setshowButton(true);
    setgetTimeSchedule(e);
  };

  const [createConsult, { isLoading }] = useCreateConsultMutation();
  const [paymentCertificate, { isLoading: loading2 }] =
    usePaymentCertificateMutation();
  const [createAccountUser, { isSuccess }] = useRegisterMutation();
  const { user, login } = useUser();
  // const [finalPrice, setFinalPrice] = useState(price1);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fromData = new FormData(e.currentTarget);

    const data: BookConsultation = {
      selectedDate: specialistdate.current
        ? new Date(specialistdate.current.value)
        : new Date(),
      selectedTime: getTimeSchedule as string,
      firstName: fromData.get("req-firstname") as string,
      lastName: fromData.get("req-lastname") as string,
      mobileNumber: fromData.get("req-mobile") as string,
      email: fromData.get("req-email") as string,
      gender: (fromData.get("radio-sex") as string) ?? "male",
      dateOfBirth: new Date(fromData.get("req-dob") as string),
      address: fromData.get("address") as string,
      nhsNumber: fromData.get("NHS-number") as string,
      conditionSymtoms: fromData.get("symptoms-details") as string,
      healthConcern: fromData.get("health-concern") as string,
      symptomsStartDate: fromData.get("condition-began") as string,
      symptomProgression: fromData.get("symptoms-onset") as string,
      symptomDetails: fromData.get("symptoms-details2") as string,
      symptomTriggers: fromData.get("symptoms-exacerbate") as string,
      dailyLifeImpact: fromData.get("symptoms-effect") as string,
      specificConcerns: fromData.get("concerns-details") as string,
      needsSpecialist:
        fromData.get("specialist-review") == "yes" ? true : false,
      needsSpecialistDetails: fromData.get("specialist-require") as string,
      specialistUrgency: fromData.get("specialist-reason") as string,
      previousTreatment: fromData.get("medical-record") == "yes" ? true : false,
      previousTreatmentDetails: fromData.get(
        "medical-record-details"
      ) as string,
      hasMedicalRecords:
        fromData.get("medical-record-result-details") == "yes" ? true : false,
      currentMedications:
        fromData.get("medications-treatment") == "yes" ? true : false,
      currentMedicationsDetails: fromData.get("provide-details2") as string,
      additionalMedicalInfo: fromData.get("medical-information") as string,
      requestStatus: "PENDING" as RequestStatus,
      amount: price1,
    };

    const createAccount = fromData.get("createAccount") === "on";
    if (createAccount) {
      const registerData: RegisterUserInterface = {
        firstName: fromData.get("req-firstname")?.toString() || "",
        lastName: fromData.get("req-lastname")?.toString() || "",
        email: fromData.get("req-email")?.toString() || "",
        password: fromData.get("req-password") as string,
        phone: fromData.get("req-mobile")?.toString() || "",
      };
      await createAccountUser(registerData);
      if (isSuccess) {
        login({
          email: registerData.email,
          password: registerData.password,
        });
      }
    }
    await createConsult({ data: data, route: path })
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
                  unit_amount: price1 * 100, // Dynamic unit amount
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
    <section className="flex gap-28 w-8/12 container">
      {isLoading || loading2 ? (
        <div className="min-h-screen w-full fixed top-0 left-0 bg-black/25 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        ""
      )}
      <div>
        <h1 className="text-3xl font-bold">Specialist Referrals</h1>
        <p className="text-lg flex gap-3 font-bold">
          <FaRegClock className="font-extrabold my-auto"></FaRegClock>
          <span className="italic">10 min</span>
        </p>
        <p className="text-lg flex gap-3 font-bold">
          <FaMoneyCheck className="font-extrabold my-auto"></FaMoneyCheck>
          <span className="italic">£45 GBP</span>
        </p>
        <div className="w-48 font-medium ml-5">
          <ul className="list-disc">
            <li>Speak with a registered UK practitioner </li>
            <li>Receive general advice, a specialist referral</li>
            <li>Open 7 days a week - 6am to midnight BST</li>
          </ul>
        </div>
        <div className="w-72 font-medium">
          <p>
            Please note, your Partner Practitioner is unable to prescribe
            controlled substances under the Misuse of Drugs Act 1971.
          </p>
        </div>
      </div>
      <div>
        {isAdmin || (
          <div className={specialistDateTime == false ? "block" : "hidden"}>
            <label htmlFor="" className="text-2xl">
              Select a Date
            </label>{" "}
            <br />
            <input
              required
              type="date"
              name="specialist-date"
              ref={specialistdate}
              onChange={handleDateChange}
              className="border w-52 border-gray-200 border-b-primary p-1"
            />
            {specialistDate ? (
              <div className="my-6">
                <h1 className="text-3xl font-bold my-3">Select a Time</h1>
                <button
                  name="morning"
                  onClick={() => handleTimeSchedule("morning")}
                  className="px-4 py-2 font-semibold border-2 bg-white border-gray-300 rounded mr-4"
                >
                  Morning
                </button>
                <button
                  name="afternoon"
                  onClick={() => handleTimeSchedule("afternoon")}
                  className="px-4 py-2 font-semibold border-2 bg-white border-gray-300 rounded mr-4"
                >
                  Afternoon
                </button>
                <button
                  name="evening"
                  onClick={() => handleTimeSchedule("evening")}
                  className="px-4 py-2 font-semibold border-2 bg-white border-gray-300 rounded mr-4"
                >
                  Evening
                </button>
              </div>
            ) : (
              ""
            )}
            {showButton == true ? (
              <div className="my-4">
                <button
                  name="next"
                  onClick={() => setspecialistDateTime(true)}
                  className="px-4 py-2 text-white font-semibold border bg-primary border-gray-300 rounded mr-4"
                >
                  Next
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        )}

        <div
          className={specialistDateTime == true || isAdmin ? "block" : "hidden"}
        >
          <div className={isAdmin ? "block space-y-2 mb-5" : "hidden"}>
            <h1 className="text-2xl font-bold">Shecdule for consult</h1>
            <div>
              <label htmlFor="" className="text-lg font-semibold">
                Select a Date
              </label>
              <p>
                <span className="font-semibold">Answer :</span>
                {formatDate(resData?.selectedDate as any, true)}
              </p>
            </div>
            <div>
              <label htmlFor="" className="text-lg font-semibold">
                Select a time
              </label>
              <p>
                <span className="font-semibold">Answer :</span>
                {resData?.selectedTime}
              </p>
            </div>
          </div>
          <DetailsInfo
            resData={resData}
            isAdmin={isAdmin}
            handleFormSubmit={handleFormSubmit}
          ></DetailsInfo>
        </div>
      </div>
    </section>
  );
};

export default SpecialistReferral;
