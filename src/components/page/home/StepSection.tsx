// "use client";

// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import Image1 from "@/assets/image/placeholder/hp-3-steps-1.jpg";
// import Image2 from "@/assets/image/placeholder/hp-3-steps-2.jpg";
// import Image3 from "@/assets/image/placeholder/hp-3-steps-3.jpg";
// import AnimateHeader from "@/components/ui/AnimateHeader";
// import { IoPhonePortraitOutline } from "react-icons/io5";

// const steps = [
//   {
//     number: 1,
//     title: "Upload medical evidence",
//     description:
//       "With just a few clicks, our user-friendly platform makes the process of applying for a medical certificate quick and efficient.",
//     image: Image1.src,
//   },
//   {
//     number: 2,
//     title: "Email confirmation",
//     description:
//       "Upon submitting your application, receive prompt peace of mind as an email confirmation is swiftly dispatched to your inbox.",
//     image: Image2.src,
//   },
//   {
//     number: 3,
//     title: "Receive consultation",
//     description:
//       "If approved, you'll get your medical certificate delivered straight to your email.",
//     image: Image3.src,
//   },
// ];

// const headerWords =
//   "Simple. Fast. Efficient. We have streamlined the process.".split(" ");

// export default function StepSection() {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   return (
//     <div id="how-it-works" className="px-5 bg-primary/15 py-10 md:py-20">
//       <div className="container mx-auto">
//         <div className="lg:hidden block">
//           <AnimateHeader words={headerWords} animate2 />
//         </div>
//         <div className="flex lg:gap-5 flex-col max-lg:items-center lg:flex-row ">
//           {/* Step 1 */}
//           <div className="lg:w-1/3 max-lg:mt-10">
//             <StepCard step={steps[0]} setSelectedImage={setSelectedImage} />
//           </div>

//           {/* Steps 2-3 */}
//           <div className="flex-1">
//             <div className="hidden lg:block">
//               <AnimateHeader words={headerWords} animate2 />
//             </div>
//             <div className="flex lg:gap-8 max-lg:mt-10 flex-col lg:flex-row">
//               <div className="lg:w-1/2 lg:mt-[5%]">
//                 <StepCard step={steps[1]} setSelectedImage={setSelectedImage} />
//               </div>
//               <div className="lg:w-1/2 mt-8 lg:mt-[15%]">
//                 <StepCard step={steps[2]} setSelectedImage={setSelectedImage} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ImagePopup
//         selectedImage={selectedImage}
//         setSelectedImage={setSelectedImage}
//       />
//     </div>
//   );
// }

// function StepCard({
//   step,
//   setSelectedImage,
// }: {
//   step: (typeof steps)[0];
//   setSelectedImage: (image: string) => void;
// }) {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible(true);
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );

//     const currentRef = ref.current;

//     if (currentRef) {
//       observer.observe(currentRef);
//     }

//     return () => {
//       if (currentRef) {
//         observer.disconnect();
//       }
//     };
//   }, []);

//   return (
//     <div
//       ref={ref}
//       className=" max-w-[350px] bg-white p-4 rounded-lg text-center "
//     >
//       <div className="relative ">
//         <motion.div
//           initial={{ opacity: 0, y: 100 }}
//           animate={isVisible ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           onClick={() => setSelectedImage(step.image)}
//           className="relative z-0  will-change-transform"
//         >
//           {/* <Image
//             src={step.image}
//             alt={`Step ${step.number}`}
//             width={250}
//             height={250}
//             className="rounded-lg cursor-pointer w-full"
//           /> */}
//           <div className="w-full mx-auto md:w-1/3 relative bg-white rounded-lg h-[280px] px-4 py-4 flex flex-col items-center text-center">
//             <div className="w-[80px] h-[80px] mb-4 rounded-full -mt-14 bg-primary flex items-center justify-center">
//               <IoPhonePortraitOutline className="w-8 h-8  text-primary" />
//             </div>
//           </div>
//         </motion.div>
//       </div>
//       <h2 className="text-xl font-semibold mb-2 text-primary">{step.title}</h2>
//       <p className="text-gray-600">{step.description}</p>
//     </div>
//   );
// }

// function ImagePopup({
//   selectedImage,
//   setSelectedImage,
// }: {
//   selectedImage: string | null;
//   setSelectedImage: (image: string | null) => void;
// }) {
//   return (
//     <AnimatePresence>
//       {selectedImage && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={() => setSelectedImage(null)}
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//         >
//           <div
//             className="bg-white p-4 rounded-lg"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <Image
//               src={selectedImage}
//               alt="Enlarged step"
//               width={600}
//               height={600}
//               className="rounded-lg"
//             />
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

import AnimateHeader from "@/components/ui/AnimateHeader";
import { Smartphone } from "lucide-react";
import { FaClockRotateLeft } from "react-icons/fa6";
import { GoTriangleRight } from "react-icons/go";
import { MdEmail } from "react-icons/md";

export default function Component() {
  const headerWords =
    "Simple. Fast. Efficient. We have streamlined the process.".split(" ");

  return (
    <div className="w-full  bg-primary/15 mx-auto px-4 pt-10 md:pt-20 lg:pt-28 pb-20 md:pb-28 lg:pb-40">
      <div className="flex items-center justify-center w-full mb-20 mx-auto text-center">
        <AnimateHeader center words={headerWords} animate2 />
      </div>
      <div className="flex container flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        {/* Step One */}
        <div className="w-full md:w-1/3 relative bg-white rounded-lg h-[280px] px-4 py-4 flex flex-col items-center text-center">
          <div className="w-[80px] !h-[80px] py-10 overflow-hidden mb-4 rounded-full -mt-14 bg-primary/20 flex items-center justify-center">
            <Smartphone className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-primary mb-2">STEP ONE</h3>
          <div className="text- text-gray-600">
            <strong>Fill out a questionnaire</strong>
            <br />
            <div className="mt-2 text-base md:text-sm lg:text-base  max-w-[270px]">
              Fill out a brief questionnaire – most people find it only takes a
              few minutes.
            </div>
          </div>
        </div>

        {/* Arrow Divider */}
        <div className="rotate-90 max-md:-mt-8 max-md:mb-5 md:rotate-0 text-5xl text-primary">
          <GoTriangleRight />
        </div>

        <div className="w-full md:w-1/3 relative bg-white rounded-lg h-[280px] px-4 py-4 flex flex-col items-center text-center">
          <div className="!w-[80px] !h-[80px] mb-4 overflow-hidden py-10 rounded-full -mt-14 bg-primary/20 flex items-center justify-center">
            <MdEmail className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-primary mb-2">STEP TWO</h3>
          <div className="text- text-gray-600">
            <strong>Email confirmation</strong>
            <br />
            <div className="mt-2 text-base md:text-sm lg:text-base  max-w-[270px]">
              After submitting your questionnaire, you’ll quickly receive an
              email confirmation, providing you with prompt peace of mind.
            </div>
          </div>
        </div>

        {/* Arrow Divider */}
        <div className="rotate-90 max-md:-mt-8 max-md:mb-5 md:rotate-0 text-5xl text-primary">
          <GoTriangleRight />
        </div>
        <div className="w-full md:w-1/3 relative bg-white rounded-lg h-[280px] px-4 py-4 flex flex-col items-center text-center">
          <div className="w-[80px] !h-[80px] mb-4 py-10 overflow-hidden rounded-full -mt-14 bg-primary/20 flex items-center justify-center">
            <FaClockRotateLeft className="w-8 h-8 text-primary transform scale-x-[-1]" />
          </div>
          <h3 className="text-2xl font-bold text-primary mb-2">STEP THREE</h3>
          <div className="text- text-gray-600">
            <strong>Receive your medical certificate</strong>
            <br />
            <div className="mt-2 text-base md:text-sm lg:text-base  max-w-[270px]">
              Get your personalized medical certificate sent directly to your
              email.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
