// import Header from "@/components/ui/Header";
// import PopupChildren from "@/components/ui/PopupChildren";
// import React from "react";

// const FAQSection: React.FC = () => {
//   return (
//     <div className="bg-[#FFF3EA] py-16 px-4">
//       <div className="container mx-auto">
//         <Header className="mb-5 text-background">
//           Frequently Asked Questions
//         </Header>

//         <div className="grid md:grid-cols-4 gap-8">
//           <div className="h-full pb-16">
//             <h3 className="text-base h-16 text-background bg-primary py-2 px-4 rounded-3xl">
//               Are Online Medical Certificates Valid?
//             </h3>
//             <PopupChildren className="h-full">
//               <div className="bg-white h-full p-4 mx-5 ">
//                 <p className="text-primary">
//                   Yes, online medical certificates obtained through The MEDIC
//                   Clinic are valid and recognised by authorities worldwide.
//                   Issued by licensed healthcare professionals, they meet all
//                   legal and medical requirements, making them suitable for
//                   personal and professional use. Trust our platform for secure
//                   and reliable online medical certificates.
//                 </p>
//               </div>
//             </PopupChildren>
//           </div>

//           <div className="h-full pb-16">
//             <h3 className="text-base h-16 text-background bg-primary py-2 px-4 rounded-3xl">
//               Can I use an online medical certificate for work or school?
//             </h3>
//             <PopupChildren className="h-full">
//               <div className="bg-white h-full p-4 mx-5 ">
//                 <p className="text-primary">
//                   Absolutely! Our online medical certificates are legally valid
//                   and widely accepted for various purposes, including work and
//                   school-related absences. Many employers and educational
//                   institutions recognise the convenience and authenticity of
//                   online certificates, making them a suitable alternative to
//                   traditional paper-based documentation.
//                 </p>
//               </div>
//             </PopupChildren>
//           </div>
//           <div className="h-full pb-16">
//             <h3 className="text-base h-16 text-background bg-primary py-2 px-4 rounded-3xl">
//               How quickly can I receive my online medical certificate?
//             </h3>
//             <PopupChildren className="h-full">
//               <div className="bg-white h-full p-4 mx-5 ">
//                 <p className="text-primary">
//                   At Medic Online, we prioritise efficiency. Upon completing the
//                   necessary steps and assessment, you will usually receive your
//                   online medical certificate within 24 to 48 hours. We
//                   understand the importance of timely documentation, and our
//                   team works diligently to provide you with the certificate
//                   promptly.
//                 </p>
//               </div>
//             </PopupChildren>
//           </div>

//           <div className="h-full pb-16">
//             <h3 className="text-base h-16 text-background bg-primary py-2 px-4 rounded-3xl">
//               Can you provide a backdated sick note?
//             </h3>
//             <PopupChildren className="h-full">
//               <div className="bg-white h-full p-4 mx-5 ">
//                 <p className="text-primary">
//                   Our doctors can backdate a sick note (also known as a fit
//                   note) for up to 2 weeks. A sick note can sign you off work or
//                   education for up to 4 weeks. It’ll include details of when
//                   you’ll be likely to return and any steps your employer or
//                   institution can take to help your return.
//                 </p>
//               </div>
//             </PopupChildren>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FAQSection;
"use client";
import AnimateHeader from "@/components/ui/AnimateHeader";
import { motion, useAnimation, useSpring } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useInView } from "react-intersection-observer";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQSection: FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData: FAQItem[] = [
    {
      question: "How fast can I receive my online medical certificate?",
      answer: `At Medic Online, we offer fast, reliable, and user-friendly service. Most certificates are emailed within 2 hours, with a maximum delivery time of 24 hours.`,
    },
    {
      question: "What is Medic Online?",
      answer: `Medic Online is a trusted digital healthcare platform offering the cheapest medical certificates in the UK, at just £25. We provide a simple and affordable solution for obtaining medical certificates.`,
    },
    {
      question: "What are your operating hours?",
      answer: `You can request a medical certificate 24/7, any day of the week, including weekends, and we’ll process it quickly within a few hours.`,
    },
    {
      question: "Are Online Medical Certificates Valid?",
      answer: `Yes, Medic Online's medical certificates are globally valid, issued by licensed professionals, and meet all legal standards. Trust us for secure and reliable service.`,
    },
  ];

  if (inView) controls.start("visible");

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? 0 : index));
  };

  const words = "Frequently Asked Questions".split(" ");
  const y = useSpring(0, {
    stiffness: 60, // Increase stiffness for faster spring
    damping: 5, // Reduce damping for quicker oscillation
  });

  useEffect(() => {
    let direction = 1; // Start moving down
    const maxY = 10; // Maximum y value
    const minY = -10; // Minimum y value
    const speed = 2; // Multiplier for faster updates
    let animationFrameId: number;

    const updateY = () => {
      let currentY = y.get();
      // Reverse direction at bounds
      if (currentY >= maxY) direction = -1;
      if (currentY <= minY) direction = 1;

      // Update y and clamp to bounds
      currentY = Math.max(minY, Math.min(maxY, currentY + direction * speed));
      y.set(currentY);

      // Schedule next frame
      animationFrameId = requestAnimationFrame(updateY);
    };

    animationFrameId = requestAnimationFrame(updateY);

    return () => cancelAnimationFrame(animationFrameId); // Clean up
  }, [y]);
  return (
    <div className="bg-[#FFF3EA]" id="faqs">
      <div className="container flex items-center px-5 mx-auto py-10 flex-col md:flex-row md:py-16 lg:py-20">
        <div className="mb-10 flex-1">
          <div className="max-lg:flex max-w-sm text-center mx-auto flex-col max-lg:text-center w-full max-lg:items-center">
            <AnimateHeader words={words} center large />
          </div>
          {/* <div className="relative w-full flex h-fit items-center justify-center overflow-hidden">
            <motion.div
              style={{
                y,
              }}
              className="w-[150px]"
            >
              <Image
                alt="Question mark"
                src={FAQImg}
                className="w-12 h-lg mx-auto my-10"
                height={100}
                width={100}
                style={{ height: "auto", width: "auto" }}
              />
            </motion.div>
          </div> */}
        </div>
        <div ref={ref} className="space-y-6 flex-1">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.2, duration: 0.5 },
                }),
              }}
              custom={index}
              className="rounded-sm  pb-0 overflow-hidden  bg-white shadow-md"
            >
              <div
                className="flex px-4 h-full py-3 justify-between bg-primary items-center my-auto cursor-pointer text-lg font-medium text-white"
                onClick={() => handleToggle(index)}
              >
                <span>{faq.question}</span>
                <span className="text-2xl transform transition-transform">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </div>

              <div
                className={`px-4 text-gray-600 overflow-hidden transition-all duration-500  ${
                  openIndex === index
                    ? "h-[150px] sm:h-[100px] lg:h-[100px]"
                    : "h-0"
                }`}
              >
                <div className="mt-3">{faq.answer}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FAQSection;
