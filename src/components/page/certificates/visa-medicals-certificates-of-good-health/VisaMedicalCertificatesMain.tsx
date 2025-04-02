import React from "react";
import VisaMedicalCertificates from "./VisaMedicalCertificates";
import { VisaCertificate } from "@/lib/interface/request.interface";

const VisaMedicalCertificatesMain = ({ data, isAdmin }: { data?: VisaCertificate, isAdmin?: boolean }) => {
  return <div className="container">
    <VisaMedicalCertificates data={data} isAdmin={isAdmin}></VisaMedicalCertificates>
  </div>;
};

export default VisaMedicalCertificatesMain;
