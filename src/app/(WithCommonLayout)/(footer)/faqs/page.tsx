"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineChevronDown } from "react-icons/hi2";

interface FAQItem {
  question: string;
  answer: string | ReactNode;
}

const faqData: FAQItem[] = [
  {
    question: "What is a fit note?",
    answer: (
      <div>
        A fit note is an official document provided by a doctor to verify that
        you have a medical condition impacting your capacity to perform your
        job. It is alternatively referred to as a sick note, a medical
        certificate, or a Statement of Fitness for Work. If you have been unwell
        for seven or more consecutive days, including weekends and holidays, you
        must obtain a fit note to be absent from work.
      </div>
    ),
  },
  {
    question: "What can be found on a sick note?",
    answer: (
      <div className="accordion-body">
        A typical sick note contains details about your medical condition or
        injury, offers guidance on what tasks you can or cannot perform at your
        workplace, and specifies how long you are expected to be away from work.{" "}
        <br />
        <br />
        In some instances, you might be considered fit for certain job duties
        while advised against others. For instance, if you work in a factory and
        have a back injury, you may be able to handle light duties but should
        avoid heavy lifting. <br />
        <br />
        Furthermore, a sick note can be utilised by a doctor to suggest
        adjustments that could facilitate your return to work, known as
        &#39;reasonable accommodations&#39;. These adjustments could include:{" "}
        <br />
        <br />
        1. Altering your daily job responsibilities.
        <br />
        2. Providing additional support from colleagues or managers.
        <br />
        3. Making changes to your workstation.
        <br />
        4. Adjusting your work hours or schedule.
        <br />
        5. Gradually reintegrating you into work with reduced hours initially.
        <br />
        <br />
        If your employer is unable to implement the doctor&#39;s recommended
        adjustments, the sick note will state that you are &#39;not fit for
        work&#39;.
      </div>
    ),
  },
  {
    question: "How can you get a sick note in the UK?",
    answer: (
      <div className="accordion-body">
        You should schedule an appointment with a GP, either at a nearby
        practice or through Medic Online, to have a medical assessment. The
        MEDIC will then determine your fitness for work and estimate the
        required recovery period before you can resume work. <br />
        <br />
        You can provide your employer with a copy of the sick note while
        retaining the original. If you obtain an online sick note with The MEDIC
        Clinic, it can be conveniently sent to your email inbox without the need
        to leave your home.
      </div>
    ),
  },
  {
    question: "Is it possible to get a sick note for free?",
    answer: (
      <div className="accordion-body">
        If a medical assessment by an NHS doctor determines that you are not fit
        for work, you can receive a sick note free of charge. For those looking
        to obtain a sick note without visiting a physical doctor&#39;s office,
        an alternative option is to schedule a consultation would be with The
        MEDIC Clinic, who can evaluate your eligibility for a sick note for a
        small fee.
      </div>
    ),
  },
  {
    question: "What is self certification?",
    answer: (
      <div className="accordion-body">
        Self-certification is a method that enables you to confirm your own
        illness or injury when you&#39;re absent from work for a continuous
        period of up to seven days. In such cases, there&#39;s no requirement
        for a fit note issued by a doctor. <br />
        <br />
        Upon your return to work following a period of sick leave, your employer
        might guide you to utilise an HR system or a self-certification form.
      </div>
    ),
  },
  {
    question: "What is the price for obtaining a sick note?",
    answer: (
      <div className="accordion-body">
        Obtaining a sick note from the NHS is free when your absence from work
        exceeds 7 days. However, if you require a private medical certificate
        for a period of 7 days or less, your GP practice may impose a fee.{" "}
        <br />
        <br />
        Employers may request a private medical certificate if you frequently
        have short-term sick leave, but it&#39;s important to note that a sick
        note cannot fulfil this requirement.
      </div>
    ),
  },
  {
    question: "Getting a sick note for ESA",
    answer:
      "When applying for Employment and Support Allowance (ESA), you may be required to submit a fit note as part of your application. Guidance on the necessity of a sick note for your ESA claim can be obtained from the Department for Work and Pensions (DWP) or your local Jobcentre.",
  },
  {
    question: "Can only GP’s issues sick notes?",
    answer:
      "A GP or another qualified medical professional must sign a sick note for it to be considered valid.",
  },
  {
    question: "For how long can a doctor provide a sick note?",
    answer:
      "The length of a sick note is tailored to the unique nature of your illness or injury. Consult your doctor for guidance on the anticipated duration of your work absence.",
  },
  {
    question: "Dates on a sick note?",
    answer:
      "The sick note should prominently display the date of issuance, indicating when it was provided and the duration of your work absence. The dates on your sick note cover the entire period.",
  },
  {
    question: "Can I extend my sick note?",
    answer:
      "To prolong your sick note, it's necessary to arrange another appointment with a GP for a fresh one. During this consultation, the doctor will reevaluate your condition and offer updated details regarding your work capabilities. If you prefer, you can schedule an appointment with Medic Online to explore the option of extending your sick note.",
  },
  {
    question: "Can you be ineligible for a sick note?",
    answer:
      "A doctor might decline to issue a sick note if they deem it unnecessary or if they doubt the presence of a medical condition impacting your work capacity.",
  },
  {
    question: "How do you go about forwarding a fit note?",
    answer:
      "To forward a fit note, first obtain one from a doctor, and then either deliver it personally to your employer or send it through post or email. If you choose to send it by post, consider notifying your employer via phone or email to inform them of its dispatch, should there be any potential delays.",
  },
  {
    question: "How your doctor decided on absence time?",
    answer: (
      <div className="accordion-body">
        Your doctor decided on length of leave based on following and it&#39;s
        at their discretion:
        <ol className="list-decimal list-inside ml-4">
          <li>
            The history you provided in the preliminary form and any evidence
            provided
          </li>
          <li>Average times for your symptoms</li>
          <li>Your job and role</li>
          <li>The doctor&#39;s own experience with similar cases</li>
          <li>Taking account of limitations of online consultations</li>
        </ol>
      </div>
    ),
  },
  {
    question: "Can I request a change in dates?",
    answer: (
      <div className="accordion-body">
        You can always discuss your certificate with us however each certificate
        is carefully considered between our physician associate and doctor
        before being approved. Sometimes its unsafe to give longer times as we
        require you to see your own GP for a review. Othertimes you would need a
        review before a longer time can be given.
      </div>
    ),
  },
  {
    question:
      "Can I return to work sooner if I feel better before the end of recommended time?",
    answer: (
      <div className="accordion-body">
        Yes, you can return back to work if you feel better within the suggested
        time off. You do not need to speak to our doctors before you return.
      </div>
    ),
  },
  {
    question:
      "Can I request another sick note certificate if I am not ready to return to work?",
    answer: (
      <div className="accordion-body">
        Yes, you may make a second request if you are not ready to return.
        However, if you have reached a 4 week period in total, you would need to
        see your own regular GP.
      </div>
    ),
  },
  {
    question: "What if my employer does not accept the certificate?",
    answer: (
      <div className="accordion-body">
        If in the event your employer does not accept the certificate - please
        notify us - sometimes by us communicating with your manager is enough.
        If however your work insists on your NHS GP med3 form we can issue you a
        refund at our discretion.
      </div>
    ),
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container my-10  mx-auto p-4">
      <h1 className="text-4xl px-2 md:px-5 mb-6">FAQs</h1>
      {faqData.map((faq, index) => (
        <div
          key={index}
          onClick={() => toggleFAQ(index)}
          className="mb-4 md:mb-6 cursor-pointer border-b-2 px-2 md:px-5 border-gray-200 pb-4 md:pb-6"
        >
          <div className="flex justify-between gap-1 items-center w-full text-left">
            <span
              className={`font-bold transition-colors ${
                openIndex === index && "text-primary"
              }`}
            >
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <HiOutlineChevronDown
                className={`w-6 h-6 ${openIndex === index && "text-primary"}`}
              />
            </motion.div>
          </div>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 1, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="my-2 sm:my-3 lg:my-4">{faq.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
export default FAQs;
