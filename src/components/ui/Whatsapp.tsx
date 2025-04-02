"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { SiWhatsapp } from "react-icons/si";

const Whatsapp = () => {
  const pathname = usePathname();
  const show = pathname.includes("dashboard");

  const [isVisible, setIsVisible] = useState(true); // Show immediately on load
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Hide message after 30 seconds on initial load
    const initialTimer = setTimeout(() => {
      setIsVisible(false);
    }, 30000);

    // Show message again after 5 minutes (300000ms) and hide after 30 seconds
    const interval = setInterval(() => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 30000);
    }, 120000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // Handle mouse enter to show for 30 seconds
  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsVisible(true);

    // Hide after 30 seconds
    setTimeout(() => {
      setIsHovered(false);
      setIsVisible(false);
    }, 30000);
  };

  // Handle close button click
  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {!show && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => !isHovered && setIsVisible(false)}
          className="fixed right-5 md:right-10 bottom-5"
        >
          {/* <Link
            target="_blank"
            href="https://api.whatsapp.com/send?phone=+4407925249929&text=Hi"
          > */}
          <Link
            target="_blank"
            href="https://api.whatsapp.com/send?phone=+447777413995&text=Hi"
          >
            <div className="text-3xl md:text-[2.6rem] bg-[#25D366] text-white flex items-center justify-center p-3 rounded-full">
              <SiWhatsapp />
            </div>
          </Link>

          {/* Animate Presence for smooth entry/exit */}
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="absolute w-[200px]  sm:w-[300px] right-0 bottom-16 md:bottom-20 bg-white text-gray-800 p-3 rounded-lg shadow-md flex items-center space-x-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => !isHovered && setIsVisible(false)}
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <IoMdClose size={20} />
                </button>

                <p className="text-sm sm:text-base md:text-lg font-medium">
                  Live Chat With A Doctor Now
                </p>
                <div
                  className="bg-white absolute shadow-md -bottom-5 right-7 text-white select-none"
                  style={{ clipPath: "polygon(86% 0, 0 0, 100% 100%)" }}
                >
                  {" text"}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default Whatsapp;

//  <div className="fixed right-5 md:right-10 bottom-5">
{
  /* <Link
            href={"https://api.whatsapp.com/send?phone=+447777413995&text=Hi"}
          >
            <div className="text-3xl md:text-[2.6rem] bg-[#25D366] text-white flex items-center justify-center p-3 rounded-full">
              <SiWhatsapp />
            </div>
          </Link> */
}
{
  /* <Link href={"https://api.whatsapp.com/send?phone=+4407925249929&text=Hi"}>
     <div className="text-3xl md:text-[2.6rem] bg-[#25D366] text-white flex items-center justify-center p-3 rounded-full">
       <SiWhatsapp />
     </div>
   </Link>
 </div>; */
}
