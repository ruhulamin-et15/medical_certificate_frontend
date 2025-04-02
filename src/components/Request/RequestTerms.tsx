import Link from "next/link";
import React from "react";

const RequestTerms = () => {
  return (
    <div>
      <div className="bg-[#F0FFF8] p-5">
        <p className="mb-4">
          Upon submitting your medical consultation, you acknowledge our{" "}
          <Link href="/terms" className="text-primary underline">
            Terms
          </Link>{" "}
          and{" "}
          <a href="/privacy" className="text-primary underline">
            Privacy Policy
          </a>{" "}
          and consent to the following:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          {/* <li>
            You are NOT seriously unwell with any of the following symptoms:
            chest pain, shortness of breath, unable to swallow fluids or saliva,
            weakness or numbness down one side, slurred speech.
          </li> */}
          <li>
            You have comprehended the questions in the questionnaire and
            answered them honestly.
          </li>
          <li>
            The requested letter is solely for the individual with the provided
            name and details.
          </li>
          <li>
            Medic Online is not a replacement for a doctor&#39;s visit, nor is
            Medic Online your primary doctor or GP, and your Partner
            Practitioner may be unable to access your NHS or regular GP medical
            records.
          </li>
          <li>
            Medic Online facilitates access to private medical letters and does
            not issue Med3 notes, which are obtainable through your NHS GP for
            UK government benefits.
          </li>
          <li>
            If your symptoms persist or you have not fully recovered, you agree
            to consult with your regular doctor or GP for further medical
            advice.
          </li>
          {/* <li>
            Medic Online is unable to process refunds once our GP has reviewed
            your request and you’ve been sent a letter written by them. No
            exceptions.
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default RequestTerms;
