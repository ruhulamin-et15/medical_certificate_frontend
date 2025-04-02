"use client";
import DForm from "@/components/page/request-certificate/Dform";
import { usePathname, useRouter } from "next/navigation";
import certificates from "../../../../../public/cardData.json";
import React, { FormEvent, useState } from "react";
import DRadioGroup, { DOptions } from "@/components/ui/DFields/DRadio";
import DInput from "@/components/ui/DFields/DInput";
import DHeader from "@/components/ui/DFields/DHeader";
import DSelect from "@/components/ui/DFields/DSelect";
import DTextArea from "@/components/ui/DFields/DTextarea";
// import DFileUpload from "@/components/ui/DFields/DFileUpload";
import DPriority from "@/components/ui/DFields/DPriority";
import DConfirmDetails from "@/components/ui/DFields/DConfirmDetails";
import RequestFooter from "@/components/Request/RequestFooter";
import {
  PriorityOption,
  SportsConsultationFitnessRequest,
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

const SportsPage = ({
  isAdmin,
  certificateData,
}: {
  isAdmin?: boolean;
  certificateData?: SportsConsultationFitnessRequest;
}) => {
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

  const certificate = certificates.find((item) => item.id === (path as string));

  const [sex, setSex] = useState("male");

  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [hasConsultedGP, setHasConsultedGP] = useState<boolean>(false);
  const [highBloodPressure, setHighBloodPressure] = useState<boolean>(false);
  const [CardiacArrhythmias, setCardiacArrhythmias] = useState<boolean>(false);
  const [stroke, setStroke] = useState<boolean>(false);
  const [heartAttack, setHeartAttack] = useState<boolean>(false);
  const [asthma, setAsthma] = useState<boolean>(false);
  const [bronchitis, setBronchitis] = useState<boolean>(false);
  const [chronicDisease, setChronicDisease] = useState<boolean>(false);
  const [rheumaticFever, setRheumaticFever] = useState<boolean>(false);
  const [diabetes, setDiabetes] = useState<boolean>(false);
  const [epilepsy, setEpilepsy] = useState<boolean>(false);
  const [thyroidDisease, setThyroidDisease] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [bleedingDisorders, setBleedingDisorders] = useState<boolean>(false);
  const [heatStroke, setHeatStroke] = useState<boolean>(false);
  const [waterIntoxication, setWaterIntoxication] = useState<boolean>(false);
  const [otherMedicalDisorder, setOtherMedicalDisorder] =
    useState<boolean>(false);
  const [historyOfHeartDisease, setHistoryOfHeartDisease] = useState(false);
  const [familyHistoryOfCardiacDeath, setFamilyHistoryOfCardiacDeath] =
    useState(false);
  const [chestPain, setChestPain] = useState(false);
  const [excessiveBreathlessness, setExcessiveBreathlessness] = useState(false);
  const [dizzinessExercising, setDizzinessExercising] = useState(false);
  const [dizzinessNotExercising, setDizzinessNotExercising] = useState(false);
  const [palpitations, setPalpitations] = useState(false);
  const [collapsedOrLostConsciousness, setCollapsedOrLostConsciousness] =
    useState(false);
  const [onMedication, setOnMedication] = useState(false);
  const [admittedToHospital, setAdmittedToHospital] = useState(false);
  const [trainingForSportEvent, setTrainingForSportEvent] = useState(false);
  const [completedEntranceEvents, setCompletedEntranceEvents] = useState(false);
  const [everFainted, setEverFainted] = useState(false);
  const [otherMedicalIssues, setOtherMedicalIssues] = useState(false);
  const [performanceEnhancingDrugs, setPerformanceEnhancingDrugs] =
    useState(false);
  const [steroidsForSports, setSteroidsForSports] = useState(false);
  const [refusedMedicalInsurance, setRefusedMedicalInsurance] = useState(false);
  // const [identificationFile, setIdentificationFile] = useState<File | string>("");
  // const [additionalFormFile, setAdditionalFormFile] = useState<File | string>("");
  const [priority, setPriority] = useState("STANDARD_REQUEST");
  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // todo
    // add tyeProps SportsConsultationFitnessRequest
    // match field
    // match with prisma model

    const data: SportsConsultationFitnessRequest = {
      amount: finalPrice,
      firstName: (form.get("req-firstname") as string) ?? "",
      lastName: (form.get("req-lastname") as string) ?? "",
      email: (form.get("req-email") as string) ?? "",
      gender: sex ?? "",
      mobileNumber: (form.get("req-mobile") as string) ?? "",
      dateOfBirth: new Date(form.get("dob") as string),
      gpDetails: hasConsultedGP,
      gpName: (form.get("gpFullName") as string) ?? "",
      gpAddress: (form.get("gpAddress") as string) ?? "",
      gpTelephone: (form.get("gpTelephone") as string) ?? "",
      gpEmail: (form.get("gpEmail") as string) ?? "",
      gpConsulted: hasConsultedGP,
      gpConsulteDetails: (form.get("consultationDetails") as string) ?? "",
      height: (form.get("height") as string) ?? "",
      weight: (form.get("weight") as string) ?? "",
      BodyMass: (form.get("bmiCategory") as string) ?? "",
      lastBloodPressure: (form.get("bloodPressureReading") as string) ?? "",
      bloodPressureTiming: (form.get("bloodPressureTiming") as string) ?? "",
      suffredHighBloodPressure: highBloodPressure,
      suffredPalpitations: CardiacArrhythmias,
      suffredStroke: stroke,
      suffredHeartAttack: heartAttack,
      suffredAsthma: asthma,
      suffredBronchitis: bronchitis,
      suffredChronicDisease: chronicDisease,
      suffredRheumatic: rheumaticFever,
      suffredDiabetes: diabetes,
      suffredEpilepsy: epilepsy,
      suffredBleedingDisorders: bleedingDisorders,
      suffredThyroidDisease: thyroidDisease,
      suffredHeatStroke: heatStroke,
      suffredIntoxication: waterIntoxication,
      medicalDisorder: otherMedicalDisorder,
      medicalDisorderDetails:
        (form.get("otherMedicalDisorderDetails") as string) ?? "",
      historyHeartDisease: historyOfHeartDisease,
      historyHeartDiseaseDetails:
        (form.get("historyOfHeartDisease_input") as string) ?? "",
      suddenCardiac: familyHistoryOfCardiacDeath,
      suddenCardiacDetails:
        (form.get("familyHistoryOfCardiacDeath_input") as string) ?? "",
      chestPains: chestPain,
      chestPainsDetails: (form.get("chestPain_input") as string) ?? "",
      breathlessness: excessiveBreathlessness,
      breathlessnessDetails:
        (form.get("breathlessness_description") as string) ?? "",
      dizziness: dizzinessExercising,
      dizzinessDetails:
        (form.get("dizziness_exercising_description") as string) ?? "",
      dizzinessWhenExercising: dizzinessNotExercising,
      dizzinessWhenExercisingDetails:
        (form.get("dizziness_not_exercising_description") as string) ?? "",
      palpitations: palpitations,
      palpitationDetails:
        (form.get("palpitations_description") as string) ?? "",
      consciousness: collapsedOrLostConsciousness,
      consciousnessDetails: (form.get("collapse_description") as string) ?? "",
      currentMedications: onMedication,
      currentMedicationDetail: (form.get("medication_list") as string) ?? "",
      admittedHospital: admittedToHospital,
      admittedHospitalDetails:
        (form.get("hospital_admission_description") as string) ?? "",
      trainAdequate: trainingForSportEvent,
      cyclingRuningSwimming: (form.get("weekly_distance") as string) ?? "",
      maximumheartRate: (form.get("heart_rate_duration") as string) ?? "",
      entranceevents: completedEntranceEvents,
      entranceeventDetails:
        (form.get("entrance_events_description") as string) ?? "",
      fainted: everFainted,
      faintDetails: (form.get("fainted_description") as string) ?? "",
      smoke: (form.get("smoking_amount") as string) ?? "",
      typicalWeek: (form.get("alcohol_units") as string) ?? "",
      medicalIssues: otherMedicalIssues,
      medicalIssuesDetails:
        (form.get("medical_issues_description") as string) ?? "",
      performanceEnhancingDrugs: performanceEnhancingDrugs,
      performanceEnhancingDrugDetails:
        (form.get("performance_drugs_description") as string) ?? "",
      sportingPerformance: steroidsForSports,
      sportingPerformanceDetails:
        (form.get("steroids_description") as string) ?? "",
      medicalInsurance: refusedMedicalInsurance,
      medicalInsuranceDetails:
        (form.get("insurance_description") as string) ?? "",
      enteringOvernext12Months: (form.get("upcoming_events") as string) ?? "",

      gpSupportingSpecific: (form.get("supporting_info") as string) ?? "",
      uploadScanned: "",
      optionUpload: "",
      priorityOption: priority as PriorityOption,
      couponCode: (form.get("cupon-code") as string) ?? "",
      // ****************
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

  const handleSexChange = (e: string) => {
    setSex(e);
  };
  const yesNoOptions: DOptions[] = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  const bmiOptions = [
    { label: "Underweight: Below 18.5", value: "underweight" },
    { label: "Normal: 18.5-24.9", value: "normal" },
    { label: "Overweight: 25-29.9", value: "overweight" },
    { label: "Obese: 30 or above", value: "obese" },
  ];
  const bloodPressureOptions = [
    { label: "Low (below 90/60 mmHg)", value: "low" },
    { label: "Normal (over 90/60 mmHg, below 140/90 mmHg)", value: "normal" },
    { label: "High (over 140/90 mmHg)", value: "high" },
  ];
  const bloodPressureTimingOptions = [
    { label: "Within the last month", value: "within_last_month" },
    { label: "1-3 months ago", value: "1_3_months_ago" },
    { label: "3-7 months ago", value: "3_7_months_ago" },
    { label: "Over 7 months ago", value: "over_7_months_ago" },
  ];

  const handleHasPermission = (value: string) => {
    if (value === "yes") {
      setHasPermission(true);
    } else {
      setHasPermission(false);
    }
  };

  const handleHasConsultedGP = (value: string) => {
    if (value === "yes") {
      setHasConsultedGP(true);
    } else {
      setHasConsultedGP(false);
    }
  };
  const handleHighBloodPressure = (value: string) => {
    if (value === "yes") {
      setHighBloodPressure(true);
    } else {
      setHighBloodPressure(false);
    }
  };
  const handleCardiacArrhythmias = (value: string) => {
    if (value === "yes") {
      setCardiacArrhythmias(true);
    } else {
      setCardiacArrhythmias(false);
    }
  };
  const handleStroke = (value: string) => {
    if (value === "yes") {
      setStroke(true);
    } else {
      setStroke(false);
    }
  };

  const handleHeartAttack = (value: string) => {
    if (value === "yes") {
      setHeartAttack(true);
    } else {
      setHeartAttack(false);
    }
  };

  const handleAsthma = (value: string) => {
    if (value === "yes") {
      setAsthma(true);
    } else {
      setAsthma(false);
    }
  };

  const handleBronchitis = (value: string) => {
    if (value === "yes") {
      setBronchitis(true);
    } else {
      setBronchitis(false);
    }
  };

  const handleChronicDisease = (value: string) => {
    if (value === "yes") {
      setChronicDisease(true);
    } else {
      setChronicDisease(false);
    }
  };

  const handleRheumaticFever = (value: string) => {
    if (value === "yes") {
      setRheumaticFever(true);
    } else {
      setRheumaticFever(false);
    }
  };

  const handleDiabetes = (value: string) => {
    if (value === "yes") {
      setDiabetes(true);
    } else {
      setDiabetes(false);
    }
  };

  const handleEpilepsy = (value: string) => {
    if (value === "yes") {
      setEpilepsy(true);
    } else {
      setEpilepsy(false);
    }
  };

  const handleThyroidDisease = (value: string) => {
    if (value === "yes") {
      setThyroidDisease(true);
    } else {
      setThyroidDisease(false);
    }
  };
  const handleBleedingDisorders = (value: string) => {
    if (value === "yes") {
      setBleedingDisorders(true);
    } else {
      setBleedingDisorders(false);
    }
  };

  const handleHeatStroke = (value: string) => {
    if (value === "yes") {
      setHeatStroke(true);
    } else {
      setHeatStroke(false);
    }
  };

  const handleWaterIntoxication = (value: string) => {
    if (value === "yes") {
      setWaterIntoxication(true);
    } else {
      setWaterIntoxication(false);
    }
  };

  const handleOtherMedicalDisorder = (value: string) => {
    if (value === "yes") {
      setOtherMedicalDisorder(true);
    } else {
      setOtherMedicalDisorder(false);
    }
  };

  const handleHeartDiseaseHistory = (value: string) => {
    if (value === "yes") {
      setHistoryOfHeartDisease(true);
    } else {
      setHistoryOfHeartDisease(false);
    }
  };

  const handleFamilyHistory = (value: string) => {
    if (value === "yes") {
      setFamilyHistoryOfCardiacDeath(true);
    } else {
      setFamilyHistoryOfCardiacDeath(false);
    }
  };

  const handleChestPain = (value: string) => {
    if (value === "yes") {
      setChestPain(true);
    } else {
      setChestPain(false);
    }
  };

  const handleBreathlessnessChange = (value: string) => {
    if (value === "yes") {
      setExcessiveBreathlessness(true);
    } else {
      setExcessiveBreathlessness(false);
    }
  };

  const handleDizzinessExercisingChange = (value: string) => {
    if (value === "yes") {
      setDizzinessExercising(true);
    } else {
      setDizzinessExercising(false);
    }
  };

  const handleDizzinessNotExercisingChange = (value: string) => {
    if (value === "yes") {
      setDizzinessNotExercising(true);
    } else {
      setDizzinessNotExercising(false);
    }
  };
  const handlePalpitationsChange = (value: string) => {
    if (value === "yes") {
      setPalpitations(true);
    } else {
      setPalpitations(false);
    }
  };

  const handleCollapsedOrLostConsciousnessChange = (value: string) => {
    if (value === "yes") {
      setCollapsedOrLostConsciousness(true);
    } else {
      setCollapsedOrLostConsciousness(false);
    }
  };
  const handleOnMedicationChange = (value: string) => {
    if (value === "yes") {
      setOnMedication(true);
    } else {
      setOnMedication(false);
    }
  };

  const handleAdmittedToHospitalChange = (value: string) => {
    if (value === "yes") {
      setAdmittedToHospital(true);
    } else {
      setAdmittedToHospital(false);
    }
  };
  const handleTrainingForSportEventChange = (value: string) => {
    if (value === "yes") {
      setTrainingForSportEvent(true);
    } else {
      setTrainingForSportEvent(false);
    }
  };
  const handleCompletedEntranceEventsChange = (value: string) => {
    if (value === "yes") {
      setCompletedEntranceEvents(true);
    } else {
      setCompletedEntranceEvents(false);
    }
  };

  const handleEverFaintedChange = (value: string) => {
    if (value === "yes") {
      setEverFainted(true);
    } else {
      setEverFainted(false);
    }
  };
  const handleOtherMedicalIssuesChange = (value: string) => {
    if (value === "yes") {
      setOtherMedicalIssues(true);
    } else {
      setOtherMedicalIssues(false);
    }
  };

  const handlePerformanceEnhancingDrugsChange = (value: string) => {
    if (value === "yes") {
      setPerformanceEnhancingDrugs(true);
    } else {
      setPerformanceEnhancingDrugs(false);
    }
  };

  const handleSteroidsForSportsChange = (value: string) => {
    if (value === "yes") {
      setSteroidsForSports(true);
    } else {
      setSteroidsForSports(false);
    }
  };

  const handleRefusedMedicalInsuranceChange = (value: string) => {
    if (value === "yes") {
      setRefusedMedicalInsurance(true);
    } else {
      setRefusedMedicalInsurance(false);
    }
  };
  const handlePriceChange = (e: number) => {
    setPrice(e);
    setFinalPrice(e);
  };

  // (certificateData);

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
        subtitle="Sports Consultation and Fitness Certificate"
      >
        <h2>GP Details</h2>

        <DRadioGroup
          label="Do we have permission to write to your usual GP with the results of this medical if necessary?"
          options={yesNoOptions}
          onChange={handleHasPermission}
          required
          name="hasPermission"
          id="hasPermission"
          isAdmin={isAdmin}
          answer={
            certificateData ? (certificateData?.gpName ? "Yes" : "No") : " "
          }
        />

        {(hasPermission || certificateData?.gpName == "yes") && (
          <>
            <DInput
              id="gpFullName"
              className="mb-4"
              name="gpFullName"
              label="Registered GP’s Full Name"
              answer={certificateData?.gpName}
              readOnly={isAdmin}
            />
            <DInput
              id="gpAddress"
              className="mb-4"
              name="gpAddress"
              label="Registered GP’s Address"
              answer={certificateData?.gpAddress}
              readOnly={isAdmin}
            />
            <DInput
              id="gpTelephone"
              className="mb-4"
              name="gpTelephone"
              label="Registered GP’s Telephone Number"
              answer={certificateData?.gpTelephone}
              readOnly={isAdmin}
            />
            <DInput
              id="gpEmail"
              className="mb-4"
              name="gpEmail"
              label="Registered GP’s E-mail"
              answer={certificateData?.gpEmail}
              readOnly={isAdmin}
            />
          </>
        )}

        <DRadioGroup
          label="Have you consulted your GP for any health-related issues in the past 3 years?"
          options={yesNoOptions}
          onChange={handleHasConsultedGP}
          required
          name="hasConsultedGP"
          id="hasConsultedGP"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.gpConsulted
                ? "Yes"
                : "No"
              : " "
          }
        />

        {(hasConsultedGP || certificateData?.gpConsulted == true) && (
          <DInput
            id="consultationDetails"
            className="mb-4"
            name="consultationDetails"
            label="If yes, please describe"
            required={hasConsultedGP}
            readOnly={isAdmin}
            answer={certificateData?.consciousnessDetails}
          />
        )}

        <DHeader>Medical History</DHeader>

        <div className="mb-4">
          <DInput
            id="height"
            name="height"
            label="Height"
            required
            readOnly={isAdmin}
            answer={certificateData?.height}
          />
          <span>In cm</span>
        </div>

        <div className="mb-4">
          <DInput
            id="weight"
            name="weight"
            label="Weight"
            required
            readOnly={isAdmin}
            answer={certificateData?.weight}
          />
          <span>In Kg</span>
        </div>

        <DSelect
          onChange={() => {}}
          id="bmiCategory"
          name="bmiCategory"
          label="What is your Body Mass Index (BMI)?"
          options={bmiOptions}
          defaultValue={bmiOptions[0].value}
          value={certificateData?.BodyMass && certificateData?.BodyMass}
          required
        />
        <DSelect
          defaultValue={bloodPressureOptions[0].value}
          onChange={() => {}}
          id="bloodPressureReading"
          name="bloodPressureReading"
          label="What was your last blood pressure reading?"
          options={bloodPressureOptions}
          value={
            certificateData?.lastBloodPressure &&
            certificateData?.lastBloodPressure
          }
          required
        />

        <DSelect
          defaultValue={bloodPressureTimingOptions[0].value}
          onChange={() => {}}
          id="bloodPressureTiming"
          name="bloodPressureTiming"
          label="When was your most recent blood pressure reading taken?"
          options={bloodPressureTimingOptions}
          value={
            certificateData?.bloodPressureTiming &&
            certificateData?.bloodPressureTiming
          }
          required
        />

        <DHeader>
          Have you ever suffered from any of the following diseases?
        </DHeader>

        <DRadioGroup
          label="High blood pressure"
          options={yesNoOptions}
          onChange={handleHighBloodPressure}
          required
          name="highBloodPressure"
          id="highBloodPressure"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.suffredHighBloodPressure
                ? "Yes"
                : "No"
              : " "
          }
        />

        <DRadioGroup
          label="Cardiac Arrhythmias or Palpitations"
          options={yesNoOptions}
          onChange={handleCardiacArrhythmias}
          required
          name="cardiacArrhythmias"
          id="cardiacArrhythmias"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.suffredPalpitations
                ? "Yes"
                : "No"
              : " "
          }
        />

        <DRadioGroup
          label="Stroke"
          options={yesNoOptions}
          onChange={handleStroke}
          required
          name="stroke"
          id="stroke"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.suffredHeatStroke
                ? "Yes"
                : "No"
              : " "
          }
        />
        <DRadioGroup
          label="Heart Attack"
          options={yesNoOptions}
          onChange={handleHeartAttack}
          required
          name="heartAttack"
          id="heartAttack"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.suffredHeartAttack
                ? "Yes"
                : "No"
              : " "
          }
        />
        <DRadioGroup
          label="Asthma"
          options={yesNoOptions}
          onChange={handleAsthma}
          required
          name="asthma"
          id="asthma"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.suffredAsthma
                ? "Yes"
                : "No"
              : " "
          }
        />
        <DRadioGroup
          label="Bronchitis"
          options={yesNoOptions}
          onChange={handleBronchitis}
          required
          name="bronchitis"
          id="bronchitis"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.suffredBronchitis
                ? "Yes"
                : "No"
              : " "
          }
        />
        <DRadioGroup
          label="Any Type Of Chronic Disease"
          options={yesNoOptions}
          onChange={handleChronicDisease}
          required
          name="chronicDisease"
          id="chronicDisease"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.suffredChronicDisease
                ? "Yes"
                : "No"
              : " "
          }
        />
        <DRadioGroup
          label="Rheumatic Fever"
          options={yesNoOptions}
          onChange={handleRheumaticFever}
          required
          name="rheumaticFever"
          id="rheumaticFever"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.suffredRheumatic
                ? "Yes"
                : "No"
              : " "
          }
        />
        <DRadioGroup
          label="Diabetes"
          options={yesNoOptions}
          onChange={handleDiabetes}
          required
          name="diabetes"
          id="diabetes"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.suffredDiabetes
                ? "Yes"
                : "No"
              : " "
          }
        />
        <DRadioGroup
          label="Epilepsy"
          options={yesNoOptions}
          onChange={handleEpilepsy}
          required
          name="epilepsy"
          id="epilepsy"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.suffredEpilepsy
                ? "Yes"
                : "No"
              : " "
          }
        />
        <DRadioGroup
          label="Thyroid Disease"
          options={yesNoOptions}
          onChange={handleThyroidDisease}
          required
          name="thyroidDisease"
          id="thyroidDisease"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.suffredThyroidDisease
                ? "Yes"
                : "No"
              : " "
          }
        />
        <DRadioGroup
          label="Bleeding Disorders Such As Hemophilia"
          options={yesNoOptions}
          onChange={handleBleedingDisorders}
          required
          name="bleedingDisorders"
          id="bleedingDisorders"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.suffredBleedingDisorders
                ? "Yes"
                : "No"
              : " "
          }
        />
        <DRadioGroup
          label="Heat Stroke"
          options={yesNoOptions}
          onChange={handleHeatStroke}
          required
          name="heatStroke"
          id="heatStroke"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.suffredHeatStroke
                ? "Yes"
                : "No"
              : " "
          }
        />
        <DRadioGroup
          label="Water Intoxication"
          options={yesNoOptions}
          onChange={handleWaterIntoxication}
          required
          name="waterIntoxication"
          id="waterIntoxication"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.suffredIntoxication
                ? "Yes"
                : "No"
              : " "
          }
        />
        <DRadioGroup
          label="Any Other Medical Disorder"
          options={yesNoOptions}
          onChange={handleOtherMedicalDisorder}
          required
          name="otherMedicalDisorder"
          id="otherMedicalDisorder"
          isAdmin={isAdmin}
          answer={certificateData?.medicalDisorder}
        />
        {(otherMedicalDisorder || certificateData?.medicalDisorder == true) && (
          <div>
            <DInput
              type="text"
              name="otherMedicalDisorderDetails"
              id="otherMedicalDisorderDetails"
              label="Please provide the details"
              required={otherMedicalDisorder}
              answer={certificateData?.medicalDisorderDetails}
              readOnly={isAdmin}
            />
          </div>
        )}
        <DHeader>Heart Disease</DHeader>
        <DRadioGroup
          label="Have you any previous history of heart disease? *"
          options={yesNoOptions}
          onChange={handleHeartDiseaseHistory}
          required
          name="historyOfHeartDisease"
          id="historyOfHeartDisease"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.historyHeartDisease
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(historyOfHeartDisease ||
          certificateData?.historyHeartDisease == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="historyOfHeartDisease_input"
              className="mb-4"
              name="historyOfHeartDisease_input"
              label="If yes, please describe"
              required={historyOfHeartDisease}
              answer={certificateData?.historyHeartDiseaseDetails}
              readOnly={isAdmin}
            />
          </div>
        )}
        {historyOfHeartDisease ||
          (certificateData?.historyHeartDisease && (
            <div className="my-5 md:pl-5">
              <DInput
                id="historyOfHeartDisease_input"
                className="mb-4"
                name="historyOfHeartDisease_input"
                label="If yes, please describe"
                required={historyOfHeartDisease}
                answer={certificateData?.historyHeartDiseaseDetails}
                readOnly={isAdmin}
              />
            </div>
          ))}

        <DRadioGroup
          label="Is there any family history of sudden cardiac death in close relatives (brothers, sisters, parents) under 50 years of age? *"
          options={yesNoOptions}
          onChange={handleFamilyHistory}
          required
          name="familyHistoryOfCardiacDeath"
          id="familyHistoryOfCardiacDeath"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.suddenCardiac
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(familyHistoryOfCardiacDeath ||
          certificateData?.suddenCardiac == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="familyHistoryOfCardiacDeath_input"
              className="mb-4"
              name="familyHistoryOfCardiacDeath_input"
              label="If yes, please describe"
              required={familyHistoryOfCardiacDeath}
              answer={certificateData?.suddenCardiacDetails}
              readOnly={isAdmin}
            />
          </div>
        )}
        {familyHistoryOfCardiacDeath ||
          (certificateData?.suddenCardiac && (
            <div className="my-5 md:pl-5">
              <DInput
                id="familyHistoryOfCardiacDeath_input"
                className="mb-4"
                name="familyHistoryOfCardiacDeath_input"
                label="If yes, please describe"
                required={familyHistoryOfCardiacDeath}
                answer={certificateData?.suddenCardiacDetails}
                readOnly={isAdmin}
              />
            </div>
          ))}

        <DRadioGroup
          label="Do you suffer from or have you suffered with chest pains and/or tightness when exercising? *"
          options={yesNoOptions}
          onChange={handleChestPain}
          required
          name="chestPain"
          id="chestPain"
          isAdmin={isAdmin}
          answer={
            certificateData ? (certificateData?.chestPains ? "Yes" : "No") : " "
          }
        />
        {(chestPain || certificateData?.chestPains == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="chestPain_input"
              className="mb-4"
              name="chestPain_input"
              label="If yes, please describe"
              required={chestPain}
              answer={certificateData?.chestPainsDetails}
              readOnly={isAdmin}
            />
          </div>
        )}
        {chestPain ||
          (certificateData?.chestPains && (
            <div className="my-5 md:pl-5">
              <DInput
                id="chestPain_input"
                className="mb-4"
                name="chestPain_input"
                label="If yes, please describe"
                required={chestPain}
                answer={certificateData?.chestPainsDetails}
                readOnly={isAdmin}
              />
            </div>
          ))}
        <DRadioGroup
          label="Do you suffer from or have you suffered with excessive breathlessness or wheeze when exercising?"
          options={yesNoOptions}
          onChange={handleBreathlessnessChange}
          required
          id="excessiveBreathlessness"
          name="excessiveBreathlessness"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData.breathlessness
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(excessiveBreathlessness ||
          certificateData?.breathlessness == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="breathlessness_description"
              className="mb-4"
              name="breathlessness_description"
              label="If yes, please describe"
              required={excessiveBreathlessness}
              answer={certificateData?.breathlessnessDetails}
              readOnly={isAdmin}
            />
          </div>
        )}
        {excessiveBreathlessness ||
          (certificateData?.breathlessness && (
            <div className="my-5 md:pl-5">
              <DInput
                id="breathlessness_description"
                className="mb-4"
                name="breathlessness_description"
                label="If yes, please describe"
                required={excessiveBreathlessness}
                answer={certificateData?.breathlessnessDetails}
                readOnly={isAdmin}
              />
            </div>
          ))}

        <DRadioGroup
          label="Do you suffer from or have you suffered with dizziness when exercising?"
          options={yesNoOptions}
          onChange={handleDizzinessExercisingChange}
          required
          id="dizzinessExercising"
          name="dizzinessExercising"
          isAdmin={isAdmin}
          answer={
            certificateData ? (certificateData.dizziness ? "Yes" : "No") : " "
          }
        />
        {(dizzinessExercising || certificateData?.dizziness == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="dizziness_exercising_description"
              className="mb-4"
              name="dizziness_exercising_description"
              label="If yes, please describe"
              required={dizzinessExercising}
              answer={certificateData?.dizzinessDetails}
              readOnly={isAdmin}
            />
          </div>
        )}
        {dizzinessExercising ||
          (certificateData?.dizziness && (
            <div className="my-5 md:pl-5">
              <DInput
                id="dizziness_exercising_description"
                className="mb-4"
                name="dizziness_exercising_description"
                label="If yes, please describe"
                required={dizzinessExercising}
                answer={certificateData?.dizzinessDetails}
                readOnly={isAdmin}
              />
            </div>
          ))}

        <DRadioGroup
          label="Have you ever suffered from dizziness when not exercising?"
          options={yesNoOptions}
          onChange={handleDizzinessNotExercisingChange}
          required
          id="dizzinessNotExercising"
          name="dizzinessNotExercising"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.dizzinessWhenExercising
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(dizzinessNotExercising ||
          certificateData?.dizzinessWhenExercising == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="dizziness_not_exercising_description"
              className="mb-4"
              name="dizziness_not_exercising_description"
              label="If yes, please describe"
              required={dizzinessNotExercising}
              answer={certificateData?.dizzinessWhenExercisingDetails}
              readOnly={isAdmin}
            />
          </div>
        )}
        {dizzinessNotExercising ||
          (certificateData?.dizzinessWhenExercising && (
            <div className="my-5 md:pl-5">
              <DInput
                id="dizziness_not_exercising_description"
                className="mb-4"
                name="dizziness_not_exercising_description"
                label="If yes, please describe"
                required={dizzinessNotExercising}
                answer={certificateData?.dizzinessWhenExercisingDetails}
                readOnly={isAdmin}
              />
            </div>
          ))}

        <DRadioGroup
          label="Do you suffer from or have you suffered from palpitations (a very fast or skipped heartbeat) when exercising?"
          options={yesNoOptions}
          onChange={handlePalpitationsChange}
          required
          id="palpitations"
          name="palpitations"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.palpitations
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(palpitations || certificateData?.palpitations == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="palpitations_description"
              className="mb-4"
              name="palpitations_description"
              label="If yes, please describe"
              required={palpitations}
              answer={certificateData?.palpitationDetails}
              readOnly={isAdmin}
            />
          </div>
        )}
        {palpitations ||
          (certificateData?.palpitations && (
            <div className="my-5 md:pl-5">
              <DInput
                id="palpitations_description"
                className="mb-4"
                name="palpitations_description"
                label="If yes, please describe"
                required={palpitations}
                answer={certificateData?.palpitationDetails}
                readOnly={isAdmin}
              />
            </div>
          ))}

        <DRadioGroup
          label="Have you ever collapsed or lost consciousness whilst at rest or exercising?"
          options={yesNoOptions}
          onChange={handleCollapsedOrLostConsciousnessChange}
          required
          id="collapsedOrLostConsciousness"
          name="collapsedOrLostConsciousness"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.consciousness
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(collapsedOrLostConsciousness ||
          certificateData?.consciousness == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="collapse_description"
              className="mb-4"
              name="collapse_description"
              label="If yes, please describe"
              required={collapsedOrLostConsciousness}
              answer={certificateData?.consciousnessDetails}
              readOnly={isAdmin}
            />
          </div>
        )}
        {collapsedOrLostConsciousness ||
          (certificateData?.consciousness && (
            <div className="my-5 md:pl-5">
              <DInput
                id="collapse_description"
                className="mb-4"
                name="collapse_description"
                label="If yes, please describe"
                required={collapsedOrLostConsciousness}
                answer={certificateData?.consciousnessDetails}
                readOnly={isAdmin}
              />
            </div>
          ))}

        <h2>Current Medications</h2>

        <DRadioGroup
          label="Are you currently on any medication?"
          options={yesNoOptions}
          onChange={handleOnMedicationChange}
          required
          id="onMedication"
          name="onMedication"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.currentMedications
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(onMedication || certificateData?.currentMedications == true) && (
          <div className="my-5 md:pl-5">
            <DTextArea
              id="medication_list"
              className="mb-4"
              name="medication_list"
              title="If Yes, please list all medications that you are on:"
              required={onMedication}
              answer={certificateData?.currentMedicationDetail}
              readOnly={isAdmin}
            />
          </div>
        )}

        <DRadioGroup
          label="Have you been admitted to hospital for any reason in the past 3 years?"
          options={yesNoOptions}
          onChange={handleAdmittedToHospitalChange}
          required
          id="admittedToHospital"
          name="admittedToHospital"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.admittedHospital
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(admittedToHospital || certificateData?.admittedHospital == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="hospital_admission_description"
              className="mb-4"
              name="hospital_admission_description"
              label="If yes, please describe"
              required={admittedToHospital}
              answer={certificateData?.admittedHospitalDetails}
              readOnly={isAdmin}
            />
          </div>
        )}

        <DHeader>Training and Preparation</DHeader>

        <DRadioGroup
          id="trainingForSportEvent"
          label="Have you been training and plan to train in an adequate fashion to attempt a sporting event?"
          options={yesNoOptions}
          onChange={handleTrainingForSportEventChange}
          required
          name="trainingForSportEvent"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.trainAdequate
                ? "Yes"
                : "No"
              : " "
          }
        />

        <div className="my-5 md:pl-5">
          <DTextArea
            id="weekly_distance"
            className="mb-4"
            name="weekly_distance"
            label="How far are you cycling, running or swimming each week?"
            placeholder="How many miles or km per hour have you been cycling, running, or swimming each week?"
            required
            answer={certificateData?.cyclingRuningSwimming}
            readOnly={isAdmin}
          />
        </div>

        <div className="my-5 md:pl-5">
          <DInput
            id="heart_rate_duration"
            className="mb-4"
            name="heart_rate_duration"
            label="How long do you push your heart rate to 70% of its maximum for?"
            placeholder="Minutes"
            required
            answer={certificateData?.maximumheartRate}
            readOnly={isAdmin}
          />
          <p>Please indicate how many minutes or write that “I don’t know”</p>
        </div>

        <DRadioGroup
          id="completedEntranceEvents"
          label="Have you completed any entrance events before?"
          options={yesNoOptions}
          onChange={handleCompletedEntranceEventsChange}
          required
          name="completedEntranceEvents"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.entranceevents
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(completedEntranceEvents ||
          certificateData?.entranceevents == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="entrance_events_description"
              className="mb-4"
              name="entrance_events_description"
              label="If yes, please describe (events details)"
              required
              answer={certificateData?.entranceeventDetails}
              readOnly={isAdmin}
            />
          </div>
        )}
        {completedEntranceEvents ||
          (certificateData?.entranceevents && (
            <div className="my-5 md:pl-5">
              <DInput
                id="entrance_events_description"
                className="mb-4"
                name="entrance_events_description"
                label="If yes, please describe (events details)"
                required
                answer={certificateData?.entranceeventDetails}
                readOnly={isAdmin}
              />
            </div>
          ))}

        <DRadioGroup
          id="everFainted"
          label="Have you ever fainted?"
          options={yesNoOptions}
          onChange={handleEverFaintedChange}
          required
          name="everFainted"
          isAdmin={isAdmin}
          answer={
            certificateData ? (certificateData?.fainted ? "Yes" : "No") : " "
          }
        />
        {(everFainted || certificateData?.fainted == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="fainted_description"
              className="mb-4"
              name="fainted_description"
              label="If yes, please describe"
              required
              answer={certificateData?.faintDetails}
              readOnly={isAdmin}
            />
          </div>
        )}

        <div className="my-5">
          <DInput
            id="smoking_amount"
            className="mb-2"
            name="smoking_amount"
            label="How much do you smoke?"
            placeholder="cigarettes per day"
            required
            answer={certificateData?.smoke}
            readOnly={isAdmin}
          />
          <p>cigarettes per day</p>
        </div>
        <div className="my-5">
          <DInput
            id="alcohol_units"
            className="mb-2"
            name="alcohol_units"
            label="How many units of alcohol do you drink in a typical week?"
            placeholder="units per week"
            required
            answer={certificateData?.typicalWeek}
            readOnly={isAdmin}
          />
          <p>units per week</p>
        </div>

        <DRadioGroup
          id="otherMedicalIssues"
          label="Are there any other medical issues that we need to be aware of?"
          options={yesNoOptions}
          onChange={handleOtherMedicalIssuesChange}
          required
          name="otherMedicalIssues"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.medicalIssues
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(otherMedicalIssues || certificateData?.medicalIssues == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="medical_issues_description"
              className="mb-4"
              name="medical_issues_description"
              label="If yes, please describe (medical issues)"
              required
              answer={certificateData?.medicalIssuesDetails}
              readOnly={isAdmin}
            />
          </div>
        )}
        {otherMedicalIssues ||
          (certificateData?.medicalIssues && (
            <div className="my-5 md:pl-5">
              <DInput
                id="medical_issues_description"
                className="mb-4"
                name="medical_issues_description"
                label="If yes, please describe (medical issues)"
                required
                answer={certificateData?.medicalIssuesDetails}
                readOnly={isAdmin}
              />
            </div>
          ))}

        <DRadioGroup
          id="performanceEnhancingDrugs"
          label="Have you ever taken performance enhancing drugs?"
          options={yesNoOptions}
          onChange={handlePerformanceEnhancingDrugsChange}
          required
          name="performanceEnhancingDrugs"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.performanceEnhancingDrugs
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(performanceEnhancingDrugs ||
          certificateData?.performanceEnhancingDrugs == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="performance_drugs_description"
              className="mb-4"
              name="performance_drugs_description"
              label="If yes, please describe"
              required
              answer={certificateData?.performanceEnhancingDrugDetails}
              readOnly={isAdmin}
            />
          </div>
        )}
        {performanceEnhancingDrugs ||
          (certificateData?.performanceEnhancingDrugs && (
            <div className="my-5 md:pl-5">
              <DInput
                id="performance_drugs_description"
                className="mb-4"
                name="performance_drugs_description"
                label="If yes, please describe"
                required
                answer={certificateData?.performanceEnhancingDrugDetails}
                readOnly={isAdmin}
              />
            </div>
          ))}

        <DRadioGroup
          id="steroidsForSports"
          label="Have you ever taken steroids to improve sporting performance?"
          options={yesNoOptions}
          onChange={handleSteroidsForSportsChange}
          required
          name="steroidsForSports"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.sportingPerformance
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(steroidsForSports ||
          certificateData?.sportingPerformance == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="steroids_description"
              className="mb-4"
              name="steroids_description"
              label="If yes, please describe"
              required
              answer={certificateData?.sportingPerformanceDetails}
              readOnly={isAdmin}
            />
          </div>
        )}
        {steroidsForSports ||
          (certificateData?.sportingPerformance && (
            <div className="my-5 md:pl-5">
              <DInput
                id="steroids_description"
                className="mb-4"
                name="steroids_description"
                label="If yes, please describe"
                required
                answer={certificateData?.sportingPerformanceDetails}
                readOnly={isAdmin}
              />
            </div>
          ))}

        <DRadioGroup
          id="refusedMedicalInsurance"
          label="Have you ever been refused medical insurance?"
          options={yesNoOptions}
          onChange={handleRefusedMedicalInsuranceChange}
          required
          name="refusedMedicalInsurance"
          isAdmin={isAdmin}
          answer={
            certificateData
              ? certificateData?.medicalInsurance
                ? "Yes"
                : "No"
              : " "
          }
        />
        {(refusedMedicalInsurance ||
          certificateData?.medicalInsurance == true) && (
          <div className="my-5 md:pl-5">
            <DInput
              id="insurance_description"
              className="mb-4"
              name="insurance_description"
              label="If yes, please describe"
              required
              answer={certificateData?.medicalInsuranceDetails}
              readOnly={isAdmin}
            />
          </div>
        )}
        {refusedMedicalInsurance ||
          (certificateData?.medicalInsurance && (
            <div className="my-5 md:pl-5">
              <DInput
                id="insurance_description"
                className="mb-4"
                name="insurance_description"
                label="If yes, please describe"
                required
                answer={certificateData?.medicalInsuranceDetails}
                readOnly={isAdmin}
              />
            </div>
          ))}

        <div className="my-5">
          <DInput
            id="upcoming_events"
            className="mb-4"
            name="upcoming_events"
            label="Please list the events you are entering over the next 12 months."
            placeholder=""
            required
            answer={certificateData?.enteringOvernext12Months}
            readOnly={isAdmin}
          />
          <p>
            You will be provided with our generic medical certificate if you
            have not requested a specific format. If any of your events require
            a specific certificate template or form, please indicate in this
            section and upload the required template. We will issue a signed,
            stamped and dated medical certificate valid for 12 months from
            approval.
          </p>
        </div>

        <DHeader>Supporting Information</DHeader>

        <div className="my-5">
          <DInput
            id="supporting_info"
            className="mb-4"
            name="supporting_info"
            label="Is there any other relevant information or specific requirements related to your athletic goals or participation that you would like to share with The MEDIC?"
            placeholder=""
            answer={certificateData?.gpSupportingSpecific}
            readOnly={isAdmin}
          />
        </div>

        {/* <div className="my-5">
          <DFileUpload
            title="Identification Upload"
            description="Please upload a scanned copy or clear image of your identification (e.g., passport, driver's license) for verification purposes."
            required
            accept="image/*,.pdf"
            maxSize={10 * 1024 * 1024} // 10MB
            onFileChange={setIdentificationFile}
            value={identificationFile}
          />
        </div>

        <div className="my-5">
          <DFileUpload
            title="Additional Form Upload"
            description="If you need us to complete a form, please use the option below to upload it."
            accept="image/*,.pdf"
            maxSize={10 * 1024 * 1024} // 10MB
            onFileChange={setAdditionalFormFile}
            value={additionalFormFile}
          />
        </div> */}

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
              <DConfirmDetails latterType="Sports Consultation and Fitness Certificate"></DConfirmDetails>
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

export default SportsPage;
