import Button from "@/components/ui/Button";
import React from "react";

const CertificateVerification = ({
  certificateData,
}: {
  certificateData: any;
}) => {
  const handlePrint = () => {
    window.print();
  };
  return (
    <div>
      <div className="mx-auto my-10 p-6 border rounded-lg shadow-lg print:shadow-none bg-white">
        <h2 className="text-xl font-bold text-center text-green-600 mb-4">
          ✅ Certificate Verified by Medic Online
        </h2>

        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold text-gray-700">
                Certificate ID
              </td>
              <td className="px-4 py-2 text-gray-600">
                {certificateData.certificateId}
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold text-gray-700">
                First Name
              </td>
              <td className="px-4 py-2 text-gray-600">
                {certificateData.firstName}
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold text-gray-700">
                Last Name
              </td>
              <td className="px-4 py-2 text-gray-600">
                {certificateData.lastName}
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold text-gray-700">Email</td>
              <td className="px-4 py-2 text-gray-600">
                {certificateData.email}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold text-gray-700">
                Reference Number
              </td>
              <td className="px-4 py-2 text-gray-600">
                {certificateData.referenceNumber}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center mb-10 print:!hidden">
        <Button onClick={handlePrint} className="px-3 mx-auto">
          🖨️ Print Copy
        </Button>
      </div>
    </div>
  );
};

export default CertificateVerification;
