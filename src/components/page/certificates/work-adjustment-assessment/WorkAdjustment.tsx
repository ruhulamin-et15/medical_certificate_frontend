"use client";
import DForm from "@/components/page/request-certificate/Dform";
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import certificates from "../../../../../public/cardData.json";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import DInput from "@/components/ui/DFields/DInput";
import DHeader from "@/components/ui/DFields/DHeader";
import DSelect from "@/components/ui/DFields/DSelect";
import DPriority from "@/components/ui/DFields/DPriority";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import RequestFooter from "@/components/Request/RequestFooter";
import {
  PriorityOption,
  WorkAdjustmentAssessmentRequest,
  // WorkAdjustmentAssessmentRequest,
} from "@/lib/interface/request.interface";
import {
  PaymentType,
  usePaymentCertificateMutation,
} from "@/redux/api/payment/payment.api";
import { RegisterUserInterface } from "@/redux/api/user/user.auth.interface";
import { getPrices } from "@/utils/getPriceInCirtificateRequest";
import { useCertificateRequestPostMutation } from "@/redux/api/certificate/certificate.post";
import { useRegisterMutation } from "@/redux/api/user/user.auth";
import { useUser } from "@/lib/provider/UserProvider";
import Loading from "@/components/ui/Loading";
import AdminPriority from "@/components/Request/AdminPriority";
const WorkAdjustment = ({
  isAdmin,
  certificateData,
}: {
  isAdmin?: boolean;
  certificateData?: WorkAdjustmentAssessmentRequest;
}) => {
  // (certificateData);
  const pathname = usePathname();
  const prices = getPrices(pathname, isAdmin);
  const { price1, price2, path, name } = prices;
  const certificate = certificates.find((item) => item.id === (path as string));
  const [price, setPrice] = useState(price1);
  const [finalPrice, setFinalPrice] = useState(price1);

  const router = useRouter();

  const [postVaccineReq, { isLoading }] = useCertificateRequestPostMutation();
  const [paymentCertificate, { isLoading: loading2 }] =
    usePaymentCertificateMutation();
  const [createAccountUser, { isSuccess }] = useRegisterMutation();
  const { user, login } = useUser();

  const [sex, setSex] = useState("male");
  const [reasonForAdjustment, setReasonForAdjustment] = useState<string>("");
  const [hasMedicalConditions, setHasMedicalConditions] = useState(
    certificateData?.medicalCondition === true
  );
  const [isTakingMedications, setIsTakingMedications] = useState(
    certificateData?.medication === true
  );

  const [jobDuties, setJobDuties] = useState<string>();
  const isOtherSelected = reasonForAdjustment === "other";
  const [environmentalFactors, setEnvironmentalFactors] = useState(
    certificateData?.environmentalFactors === true
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [environmentalDescription, setEnvironmentalDescription] = useState("");
  const [functionalLifting, setFunctionalLifting] = useState("");
  const [functionalSitting, setFunctionalSitting] = useState("");
  const [specificHours, setSpecificHours] = useState("");
  const [specificTasks, setSpecificTasks] = useState("");
  const [specificTasksImpact, setSpecificTasksImpact] = useState("");
  const [meetingDeadlines, setMeetingDeadlines] = useState("");
  const [workingIndependently, setWorkingIndependently] = useState("");
  const [interactingWithOthers, setInteractingWithOthers] = useState("");
  const [jobDutiesDescription, setJobDutiesDescription] = useState("");
  const [priority, setPriority] = useState("STANDARD_REQUEST");

  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };
  const handleReasonChange = (value: string) => {
    setReasonForAdjustment(value);
  };
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    // const password= form.get("req-password") as string;
    const data: WorkAdjustmentAssessmentRequest = {
      firstName: (form.get("req-firstname") as string) || "",
      lastName: (form.get("req-lastname") as string) || "",
      email: (form.get("req-email") as string) || "",
      gender: sex,
      mobileNumber: (form.get("req-mobile") as string) || "",
      dateOfBirth: new Date(form.get("req-dob") as string),
      reasonForAdjustment: reasonForAdjustment,
      otherReason: (form.get("other_reason") as string) || "",
      medicalCondition: form.get("medicalConditions") === "yes",
      medicalConditionDetails:
        (form.get("medicalConditionsDetails") as string) || "",
      medication: form.get("medications") === "yes",
      medicationDetails: (form.get("medications_details") as string) || "",
      physicalDemandsSitting: (form.get("sittingFrequency") as string) || "",
      physicalDemandsWalking: (form.get("walkingFrequency") as string) || "",
      physicalDemandsStanding: (form.get("standingFrequency") as string) || "",
      physicalDemandsBending: (form.get("bendingFrequency") as string) || "",
      physicalDemandsReaching: (form.get("reachingFrequency") as string) || "",
      physicalDemandsClimbing: (form.get("climbingFrequency") as string) || "",
      physicalDemandsliftingWeight: (form.get("liftingWeight") as string) || "",
      physicalDemandstemperatures:
        (form.get("exposureToExtremeTemps") as string) || "",
      mentalDemandsIndependently:
        (form.get("Working_independently") as string) || "",
      mentalDemandUnderPressure:
        (form.get("Working_under_pressure") as string) || "",
      mentalDemandMeeting: (form.get("Meeting_deadlines") as string) || "",
      mentalDemandMultitasking: (form.get("Multitasking") as string) || "",
      mentalDemandConcentration: (form.get("Concentration") as string) || "",
      mentalDemandDecision: (form.get("Decision_making") as string) || "",
      mentalDemandEmotional: (form.get("Emotional_stress") as string) || "",
      mentalDemandInteraction:
        (form.get("Interaction_with_others") as string) || "",
      environmentalFactors,
      environmentalDescription,
      functionalLifting,
      functionalSitting,
      specificHours,
      specificTasks,
      specificTasksImpact,
      workingIndependently,
      interactingWithOthers,
      meetingDeadlines,
      priorityOption: priority as PriorityOption,
      jobDuties: form.get("jobDuties") === "yes",
      jobDutiesDescription: jobDuties === "yes" ? jobDutiesDescription : "",
      amount: finalPrice,
      couponCode: (form.get("cupon-code") as string) || "",
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
    // (path);
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
    setSex(e);
  };

  const yesNoOptions: DOptions[] = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const reasonOptions = [
    { label: "Recent Injury", value: "recent_injury" },
    { label: "Ongoing Medical Condition", value: "ongoing_condition" },
    { label: "Other (Please specify):", value: "other" },
  ];

  const liftingOptions = [
    { label: "No", value: "no" },
    { label: "Less than 5 Kg", value: "less_than_5" },
    { label: "5-10 Kg", value: "5_10" },
    { label: "10 – 20 Kg", value: "10_20" },
    { label: "More than 20 Kg", value: "more_than_20" },
  ];
  const handleMedicalConditionsChange = (value: string) => {
    if (value === "yes") {
      setHasMedicalConditions(true);
    } else {
      setHasMedicalConditions(false);
    }
  };

  const handleMedicationsChange = (value: string) => {
    if (value === "yes") {
      setIsTakingMedications(true);
    } else {
      setIsTakingMedications(false);
    }
  };

  // (certificateData);

  const frequencyOptions = [
    { label: "Never", value: "never" },
    { label: "Occasionally", value: "occasionally" },
    { label: "Frequently", value: "frequently" },
    { label: "Constantly", value: "constantly" },
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  const handlePriceChange = (e: number) => {
    setPrice(e);
    setFinalPrice(e);
  };

  const independently = [
    { label: "Never", value: "never" },
    { label: "Occasionally", value: "occasionally" },
    { label: "Frequently", value: "frequently" },
    { label: "Constantly", value: "constantly" },
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  const options = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  const FuncationalOptions = [
    { label: "No Impact", value: "noimpact" },
    { label: "Slight Impact", value: "slightimpact" },
    { label: "Moderate Impact", value: "moderateimpact" },
    { label: "Significant Impact", value: "significantimpact" },
  ];

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
        imageSrc={certificate?.imageUrl as string}
        handleFormSubmit={handleFormSubmit}
        handleSexChange={handleSexChange}
        subtitle="Work Adjustment Assessment"
      >
        <DHeader>Medical Questions</DHeader>

        <DRadioGroup
          id="reasonForAdjustment"
          label="Reason for Adjustment (Choose one)"
          options={reasonOptions}
          onChange={handleReasonChange}
          required
          isAdmin={isAdmin}
          answer={certificateData?.reasonForAdjustment}
          name="reasonForAdjustment"
        />

        {(isOtherSelected || certificateData?.reasonForAdjustment == "yes") && (
          <div className="my-5 md:pl-5">
            <DInput
              id="other_reason"
              className="mb-4"
              name="other_reason"
              label="Other (Please specify):"
              required
              value={certificateData?.otherReason}
              disabled
            />
          </div>
        )}
        <DHeader>Medical History</DHeader>

        <DRadioGroup
          id="medicalConditions"
          label="Have you been diagnosed with any medical conditions that may impact your work?"
          options={yesNoOptions}
          onChange={handleMedicalConditionsChange}
          required
          answer={certificateData?.medicalCondition}
          isAdmin={isAdmin}
          name="medicalConditions"
        />
        {(hasMedicalConditions ||
          certificateData?.medicalCondition == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="medicalConditionsDetails"
              className="mb-4"
              name="medicalConditionsDetails"
              label="If yes, please list:"
              required
              defaultValue={certificateData?.medicalConditionDetails}
              readOnly={isAdmin}
            />
          </div>
        )}

        <DRadioGroup
          id="medications"
          label="Are you currently taking any medications?"
          options={yesNoOptions}
          isAdmin={isAdmin}
          answer={certificateData?.medication}
          onChange={handleMedicationsChange}
          required
          name="medications"
        />
        {(isTakingMedications || certificateData?.medication == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              answer={certificateData?.medicationDetails}
              id="medications_details"
              className="mb-4"
              name="medications_details"
              label="Please tell us which medications and their doses that you take."
              required
            />
          </div>
        )}

        <h3>Current Work Activities</h3>

        <DHeader>Physical Demands:</DHeader>
        <p>
          For each activity, choose the frequency and intensity that best
          describes your job:
        </p>

        <div className="my-5">
          <DSelect
            id="sittingFrequency"
            label="Sitting"
            options={frequencyOptions}
            onChange={() => {}}
            required
            value={
              certificateData?.physicalDemandsSitting &&
              certificateData?.physicalDemandsSitting
            }
            name="sittingFrequency"
          />
        </div>
        <div className="my-5">
          <DSelect
            id="standingFrequency"
            label="Standing"
            options={frequencyOptions}
            onChange={() => {}}
            value={
              certificateData?.physicalDemandsStanding &&
              certificateData?.physicalDemandsStanding
            }
            required
            name="standingFrequency"
          />
        </div>
        <div className="my-5">
          <DSelect
            id="walkingFrequency"
            label="Walking"
            options={frequencyOptions}
            onChange={() => {}}
            value={
              certificateData?.physicalDemandsWalking &&
              certificateData?.physicalDemandsWalking
            }
            required
            name="walkingFrequency"
          />
        </div>
        <div className="my-5">
          <DSelect
            id="bendingFrequency"
            label="Bending"
            options={frequencyOptions}
            onChange={() => {}}
            value={
              certificateData?.physicalDemandsBending &&
              certificateData?.physicalDemandsBending
            }
            required
            name="bendingFrequency"
          />
        </div>
        <div className="my-5">
          <DSelect
            id="reachingFrequency"
            label="Reaching"
            options={frequencyOptions}
            onChange={() => {}}
            value={
              certificateData?.physicalDemandsReaching &&
              certificateData?.physicalDemandsReaching
            }
            required
            name="reachingFrequency"
          />
        </div>
        <div className="my-5">
          <DSelect
            id="climbingFrequency"
            label="Climbing"
            options={frequencyOptions}
            onChange={() => {}}
            value={
              certificateData?.physicalDemandsClimbing &&
              certificateData?.physicalDemandsClimbing
            }
            required
            name="climbingFrequency"
          />
        </div>
        <h2>Physical Conditions:</h2>

        <div className="my-5">
          <DRadioGroup
            id="liftingWeight"
            label="Does your work involve lifting (weight):"
            options={liftingOptions}
            required
            answer={
              certificateData && certificateData?.physicalDemandsliftingWeight
            }
            isAdmin={isAdmin}
            name="liftingWeight"
          />
        </div>

        <div className="my-5">
          <DRadioGroup
            id="exposureToExtremeTemps"
            label="Does your work involve exposure to extreme temperatures"
            options={yesNoOptions}
            required
            answer={certificateData?.physicalDemandstemperatures}
            isAdmin={isAdmin}
            name="exposureToExtremeTemps"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Mental/Emotional Demands:</h1>
          <hr className="mt-2 mb-4 w-full border" />
          <div className="my-6">
            <h2 className="font-semibold my-5">
              For each activity, choose the frequency and intensity that best
              describes your job:
            </h2>
            <div className="my-5">
              <label htmlFor="" className="font-semibold">
                Working independently
              </label>
              <DSelect
                name="Working_independently"
                id="Working_independently"
                options={independently}
                value={
                  certificateData?.workingIndependently &&
                  certificateData?.workingIndependently
                }
              ></DSelect>
            </div>
            <div className="my-5">
              <label htmlFor="" className="font-semibold">
                Working under pressure
              </label>
              <DSelect
                name="Working_under_pressure"
                id="Working_under_pressure"
                options={independently}
                value={
                  certificateData?.mentalDemandUnderPressure &&
                  certificateData?.mentalDemandUnderPressure
                }
              ></DSelect>
            </div>
            <div className="my-5">
              <label htmlFor="" className="font-semibold">
                Meeting deadlines
              </label>
              <DSelect
                name="Meeting_deadlines"
                id="Meeting_deadlines"
                options={independently}
                value={
                  certificateData?.mentalDemandMeeting &&
                  certificateData?.mentalDemandMeeting
                }
              ></DSelect>
            </div>
            <div className="my-5">
              <label htmlFor="" className="font-semibold">
                Multitasking
              </label>
              <DSelect
                name="Multitasking"
                id="Multitasking"
                options={independently}
                value={
                  certificateData?.mentalDemandMultitasking &&
                  certificateData?.mentalDemandMultitasking
                }
              ></DSelect>
            </div>
            <div className="my-5">
              <label htmlFor="" className="font-semibold">
                Concentration
              </label>
              <DSelect
                name="Concentration"
                id="Concentration"
                options={independently}
                value={
                  certificateData?.mentalDemandConcentration &&
                  certificateData?.mentalDemandConcentration
                }
              ></DSelect>
            </div>
            <div className="my-5">
              <label htmlFor="" className="font-semibold">
                Decision making
              </label>
              <DSelect
                name="Decision_making"
                id="Decision making"
                options={independently}
                value={
                  certificateData?.mentalDemandDecision &&
                  certificateData?.mentalDemandDecision
                }
              ></DSelect>
            </div>
            <div className="my-5">
              <label htmlFor="" className="font-semibold">
                Emotional stress
              </label>
              <DSelect
                name="Emotional_stress"
                id="Emotional stress"
                options={independently}
                value={
                  certificateData?.mentalDemandEmotional &&
                  certificateData?.mentalDemandEmotional
                }
              ></DSelect>
            </div>
            <div className="my-5">
              <label htmlFor="" className="font-semibold">
                Interaction with others
              </label>
              <DSelect
                name="Interaction_with_others"
                id="Interaction with others"
                options={independently}
                value={
                  certificateData?.mentalDemandInteraction &&
                  certificateData?.mentalDemandInteraction
                }
              ></DSelect>
            </div>
          </div>

          <h1 className="text-2xl font-bold">Work Environment:</h1>
          <hr className="mt-2 mb-4 w-full border" />
          <div className="my-6">
            <DRadioGroup
              id="environmentalFactors"
              name="environmentalFactors"
              label="Are there any environmental factors impacting your ability to perform your job duties?"
              onChange={(e) =>
                setEnvironmentalFactors(e === "yes" ? true : false)
              }
              answer={certificateData?.environmentalFactors}
              isAdmin={isAdmin}
              options={options}
            />
            {(environmentalFactors ||
              certificateData?.environmentalFactors == true) && (
              <DInput
                answer={certificateData?.environmentalDescription}
                id="environmentalDescription"
                name="environmentalDescription"
                label="If yes, please describe:"
                readOnly={isAdmin}
                onChange={(e) => setEnvironmentalDescription(e.target.value)}
              />
            )}
          </div>
        </div>

        <div className="my-14">
          <h1 className="text-2xl font-bold">Functional Limitations</h1>
          <hr className="mt-2 mb-4 w-full border" />
          <p className="font-semibold my-10">
            How does your medical condition or limitations impact your ability
            to perform the following work activities? (Choose one for each)
          </p>

          <div className="my-6">
            <DRadioGroup
              id="liftingObjects"
              name="liftingObjects"
              isAdmin={isAdmin}
              answer={certificateData?.functionalLifting}
              label="Lifting objects:"
              onChange={setFunctionalLifting}
              options={FuncationalOptions}
            />
          </div>

          <div className="my-6">
            <DRadioGroup
              id="sittingStanding"
              name="sittingStanding"
              isAdmin={isAdmin}
              answer={certificateData?.functionalSitting}
              label="Sitting/Standing for extended periods:"
              onChange={setFunctionalSitting}
              options={FuncationalOptions}
            />
          </div>

          <div className="my-6">
            <DRadioGroup
              id="specificHours"
              name="specificHours"
              label="Working specific hours (e.g., nights, weekends):"
              isAdmin={isAdmin}
              answer={certificateData?.specificHours}
              onChange={setSpecificHours}
              options={FuncationalOptions}
            />
          </div>

          <div className="my-6">
            <DInput
              id="specificTasks"
              name="specificTasks"
              readOnly={isAdmin}
              defaultValue={certificateData?.specificTasks}
              label="Performing specific tasks (describe)"
              onChange={(e) => setSpecificTasks(e.target.value)}
            />
          </div>

          <div className="my-6">
            <DRadioGroup
              id="specificTasksImpact"
              name="specificTasksImpact"
              label="Performing above specific tasks (Impact)"
              onChange={setSpecificTasksImpact}
              isAdmin={isAdmin}
              answer={certificateData?.specificTasksImpact}
              options={FuncationalOptions}
            />
          </div>

          <div className="my-6">
            <DRadioGroup
              id="meetingDeadlines"
              name="meetingDeadlines"
              label="Meeting deadlines:"
              onChange={setMeetingDeadlines}
              isAdmin={isAdmin}
              answer={certificateData?.meetingDeadlines}
              options={FuncationalOptions}
            />
          </div>

          <div className="my-6">
            <DRadioGroup
              id="workingIndependently"
              name="workingIndependently"
              label="Working independently:"
              onChange={setWorkingIndependently}
              isAdmin={isAdmin}
              answer={certificateData?.workingIndependently}
              options={FuncationalOptions}
            />
          </div>

          <div className="my-6">
            <DRadioGroup
              id="interactingWithOthers"
              name="interactingWithOthers"
              label="Interacting with others:"
              onChange={setInteractingWithOthers}
              isAdmin={isAdmin}
              answer={certificateData?.interactingWithOthers}
              options={FuncationalOptions}
            />
          </div>
        </div>

        <div className="my-14">
          <h1 className="text-2xl font-bold">Recommended Adjustments</h1>
          <hr className="mt-2 mb-4 w-full border" />
          <div className="my-6">
            <DRadioGroup
              id="jobDuties"
              name="jobDuties"
              label="Do you have any suggestions for adjustments that could help you perform your job duties more effectively?"
              onChange={setJobDuties}
              isAdmin={isAdmin}
              answer={certificateData?.jobDuties}
              options={options}
            />
            {(jobDuties === "yes" || certificateData?.jobDuties == true) && (
              <DInput
                id="jobDutiesDescription"
                name="jobDutiesDescription"
                label="If yes, please describe:"
                readOnly={isAdmin}
                defaultValue={certificateData?.jobDutiesDescription}
                onChange={(e) => setJobDutiesDescription(e.target.value)}
              />
            )}
          </div>
        </div>
        <div>
          {isAdmin ? (
            <AdminPriority data={certificateData} />
          ) : (
            <div>
              <DPriority
                handlePriorityChange={handlePriorityChange}
                image={certificate?.imageUrl as string}
                price1={price1}
                price2={price2}
                handlePriceChange={handlePriceChange}
              ></DPriority>
              <DConfirmDetails latterType="Work Adjustment Assessment"></DConfirmDetails>
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

export default WorkAdjustment;
