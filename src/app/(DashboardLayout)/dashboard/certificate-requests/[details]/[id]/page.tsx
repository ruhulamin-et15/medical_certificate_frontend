"use client";
import AllergyCertificate from "@/components/page/certificates/allergy-certificate/AllergyCertificate";
import ChickenPoxComponent from "@/components/page/certificates/chickenpox-flight-clearance-medical/ChickenPoxMain";
import DisabilityMedical from "@/components/page/certificates/disability-medical-certificate/DisabilityMedical";
import EmergencyCancellation from "@/components/page/certificates/emergency-cancellation-letter-for-travel/EmergencyCancellation";
import EventActivity from "@/components/page/certificates/event-and-activity-cancellation-certificate/EventActivity";
import FitforFlightLetterMain from "@/components/page/certificates/fit-for-flight-letter-for-expecting-mothers/FitforFlightLetterMain";
import FitToCruise from "@/components/page/certificates/fit-to-cruise-medical-certificate/FitToCruise";
import InjuryPage from "@/components/page/certificates/injury-and-accident-confirmation-certificates/InjuryPage";
import MedicalLetterForBadge from "@/components/page/certificates/medical-letter-for-a-blue-badge/MedicalLetterForBadge";
import SportsPage from "@/components/page/certificates/sports-consultation-and-fitness-certificate/SportsPage";
import StudentMitigationMain from "@/components/page/certificates/student-mitigation-letter/StudentMitigationMain";
import StudentSickLeaveMain from "@/components/page/certificates/student-sick-leave-letter/StudentSickLeaveMain";
import Vaccine from "@/components/page/certificates/vaccine-exemption-certificate/Vaccine";
import VisaMedicalCertificatesMain from "@/components/page/certificates/visa-medicals-certificates-of-good-health/VisaMedicalCertificatesMain";
import WorkAdjustment from "@/components/page/certificates/work-adjustment-assessment/WorkAdjustment";
import { useUser } from "@/lib/provider/UserProvider";
import { useGetSingleCertificateQuery } from "@/redux/api/certificate/certificate.post";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import SnapImg from "@/assets/image/png/awsnap.png";
import AnimateHeader from "@/components/ui/AnimateHeader";
import Loading from "@/components/ui/Loading";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import EmployeeFitness from "@/components/page/certificates/employee-fitness-to-work-certificate/EmployeeFitness";
import SickNoteForWork from "@/components/page/certificates/sick-note-for-work/SickNoteForWork";
import TravelWithMedication from "@/components/page/certificates/travel-with-medication-letter/TravelWithMedication";
import GymandHealthClubCancellation from "@/components/page/certificates/gym-and-health-club-cancellation-certificate/GymandHealthClubCancellation";
import SpecialistReferral from "@/app/(WithCommonLayout)/consult-now/specialist-referral/SpecialistReferral";

const CertificateDetails = () => {
  const path = usePathname();
  const getRoute = path.split("/");
  const router = useRouter();

  const { user } = useUser();
  const isAdmin = user?.role === "ADMIN";

  // (isAdmin);
  const fetchRoute = getRoute[getRoute.length - 2];
  const fetchId = getRoute[getRoute.length - 1];

  const {
    data: mainData,
    isLoading,
    isFetching,
  } = useGetSingleCertificateQuery({
    route: fetchRoute,
    id: fetchId,
  });

  const data = mainData?.data;
  const words = " Opps... Route Not Found".split("");

  return (
    <div>
      {isLoading || isFetching ? (
        <div className="min-h-screen w-full fixed top-0 left-0 bg-black/25 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        ""
      )}
      <div className="max-h-[calc(100vh-130px)] overflow-hidden overflow-y-auto">
        <Header center>
          Details of &#34;{data?.firstName} {data?.lastName}&#34;
        </Header>
        <div className="max-w-lg mx-auto my-3 text-center">
          <Button
            size="static"
            onClick={() => router.back()}
            className="bg-gray-50 !rounded-md mx-auto border border-gray-300 text-gray-600 font-medium text-sm"
          >
            {"<"} Back
          </Button>
        </div>
        {fetchRoute === "allergy-certificate" ? (
          <AllergyCertificate data={data} isAdmin={isAdmin} />
        ) : fetchRoute === "chickenpox-flight-clearance-medical" ? (
          <ChickenPoxComponent data={data} isAdmin={isAdmin} />
        ) : fetchRoute === "disability-medical-certificate" ? (
          <DisabilityMedical data={data} isAdmin={isAdmin} />
        ) : fetchRoute === "emergency-cancellation-letter-for-travel" ? (
          <EmergencyCancellation data={data} isAdmin={isAdmin} />
        ) : fetchRoute === "employee-fitness-to-work-certificate" ? (
          <EmployeeFitness data={data} isAdmin={isAdmin} />
        ) : fetchRoute === "event-and-activity-cancellation-certificate" ? (
          <EventActivity certificateData={data} isAdmin={isAdmin} />
        ) : fetchRoute === "fit-for-flight-letter-for-expecting-mothers" ? (
          <FitforFlightLetterMain data={data} isAdmin={isAdmin} />
        ) : fetchRoute === "fit-to-cruise-medical-certificate" ? (
          <FitToCruise data={data} isAdmin={isAdmin} />
        ) : fetchRoute === "gym-and-health-club-cancellation-certificate" ? (
          <GymandHealthClubCancellation
            certificateData={data}
            isAdmin={isAdmin}
          />
        ) : fetchRoute === "injury-and-accident-confirmation-certificates" ? (
          <InjuryPage certificateData={data} isAdmin={isAdmin} />
        ) : fetchRoute === "medical-letter-for-a-blue-badge" ? (
          <MedicalLetterForBadge data={data} isAdmin={isAdmin} />
        ) : fetchRoute === "sick-note-for-work" ? (
          <SickNoteForWork data={data} isAdmin={isAdmin} />
        ) : fetchRoute === "sports-consultation-and-fitness-certificate" ? (
          <SportsPage certificateData={data} isAdmin={true} />
        ) : fetchRoute === "student-mitigation-letter" ? (
          <StudentMitigationMain data={data} isAdmin={isAdmin} />
        ) : fetchRoute === "student-sick-leave-letter" ? (
          <StudentSickLeaveMain data={data} isAdmin={isAdmin} />
        ) : fetchRoute === "travel-with-medication-letter" ? (
          <TravelWithMedication certificateData={data} isAdmin={isAdmin} />
        ) : fetchRoute === "vaccine-exemption-certificate" ? (
          <Vaccine data={data} isAdmin={isAdmin} />
        ) : fetchRoute === "visa-medicals-certificates-of-good-health" ? (
          <VisaMedicalCertificatesMain data={data} isAdmin={isAdmin} />
        ) : fetchRoute === "work-adjustment-assessment" ? (
          <WorkAdjustment certificateData={data} isAdmin={true} />
        ) : fetchRoute === "specialist-referral" ? (
          <SpecialistReferral data={data} isAdmin={true} />
        ) : (
          <div className="flex w-full flex-col h-full items-center justify-center">
            <Image
              alt="snap"
              src={SnapImg}
              width={150}
              height={150}
              style={{ width: "auto", height: "auto" }}
              className="max-w-20"
            />
            <AnimateHeader
              words={words}
              className="text-text font-semibold text-2xl"
            ></AnimateHeader>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateDetails;
