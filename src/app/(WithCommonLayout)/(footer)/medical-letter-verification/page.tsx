"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Loading from "@/components/ui/Loading";
import { useVerificationCertificateMutation } from "@/redux/api/certificate/certificate.post";
import { useState } from "react";
import CertificateVerification from "./certificateVerificationDetails";

export default function LetterVerification() {
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  const [Verification, { isLoading }] = useVerificationCertificateMutation();
  const [responseData, setResponseData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the form data
    const form = e.currentTarget;

    const requestData = {
      referenceNumber:
        (form.elements.namedItem("referenceNumber") as HTMLInputElement)
          ?.value || "",
      lastName:
        (form.elements.namedItem("lastName") as HTMLInputElement)?.value || "",
      email:
        (form.elements.namedItem("email") as HTMLInputElement)?.value || "",
    };

    try {
      const response = await Verification(requestData).unwrap(); // Call mutation and unwrap the response
      setResponseData(response); // Store response in state
      // console.log("Mutation response:", response);
    } catch (err) {
      if (err) {
        setResponseData(err);
      }
    }
  };

  // console.log(responseData);

  return (
    <div className="max-w-[49rem] mx-auto p-4">
      <div className="print:!hidden">
        {isLoading ? (
          <div className="min-h-screen w-full fixed top-0 left-0 bg-black/25 flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          ""
        )}
        <h1 className="text-4xl font-bold text-center text-primary mb-10 md:mb-16 lg:mb-24">
          Medical Letter Verification
        </h1>

        <p className="mb-4 font-bold">Hey there!</p>

        <p className="mb-4">
          Chances are your goal here is to establish the legitimacy of a medical
          letter awarded by our organisation.
        </p>

        <p className="mb-8 leading-snug">
          Rest assured that the medical letter presented by to you by the
          individual has been awarded only after progressing through a series of
          checks, confirming the conditions of the individual it may concern.
        </p>

        <h2 className="text-lg font-bold mb-4">
          The main perks of opting for online consultations through Medic Online
          include:
        </h2>

        <ul className="list-disc pl-6 mb-6">
          <li>
            Consultations that are conducted by licensed and accredited medical
            experts based in the United Kingdom.
          </li>
          <li>
            Our support helps alleviate the load on the UK&#39;s healthcare
            system, which typically handles over 300 million GP visits annually.
          </li>
          <li>
            We are eliminating the need to visit a waiting room, mitigating the
            risk of spreading infection or illness.
          </li>
          <li>
            Straightforward and user-friendly solutions allow individuals to
            obtain essential rest, facilitating a quick return to their duties.
          </li>
        </ul>

        <p className="mb-6 leading-snug">
          Prior to the enactment of modern legislation, we are unable to share
          the explicit details shared during online consultations in order to
          protect the privacy rights of the individual. However, to confirm the
          legitimacy of the medical document, you can simply input the unique
          reference number and the surname of the person (staff, student, or
          client) associated with it. The reference number can be located at the
          bottom of the document.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mb-14 md:mb-20">
          <div>
            <label htmlFor="email" className="block mb-1">
              Your email <span className="text-red-500">*</span>
            </label>
            <Input
              name="email"
              type="email"
              id="email"
              placeholder="e.g. example@example.com"
              required
              className="w-full border sm:max-w-xs !rounded-none border-gray-300 px-3 !py-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block mb-1">
              Employee/student/customer last name{" "}
              <span className="text-red-500">*</span>
            </label>

            <Input
              name="lastName"
              type="text"
              placeholder="e.g. Smith"
              id="lastName"
              required
              className="w-full border sm:max-w-xs !rounded-none border-gray-300  px-3 !py-3"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="referenceNumber" className="block mb-1">
              Letter Reference Number (With Ref-12345678){" "}
              <span className="text-red-500">*</span>
            </label>
            <Input
              name="referenceNumber"
              type="text"
              id="referenceNumber"
              placeholder="e.g. Ref-12345678"
              required
              className="w-full border sm:max-w-xs !rounded-none border-gray-300 px-3 !py-3"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
            />
          </div>

          <Button type="submit" className="px-4">
            Submit
          </Button>
        </form>
      </div>
      {responseData !== null ? responseData?.data ? (
        <div>
          <CertificateVerification certificateData={responseData?.data} />
        </div>
      ) : (
        <div className="text-center text-red-500 text-3xl my-10 font-semibold">
          No Certificate Found
        </div>
      ): ''}
    </div>
  );
}
