"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import MapImg from "@/assets/image/placeholder/uk-country.jpg";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface PopupData {
  name: string;
  location: string;
  action: string;
  timeAgo: string;
}

export default function PopupCard() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index

  // Example data array to map
  const popupData: PopupData[] = [
    {
      name: "Azra",
      location: "United Kingdom",
      action: "just requested a Certificate.",
      timeAgo: "18 hours ago",
    },
    {
      name: "Oliver",
      location: "United Kingdom",
      action: "just requested a Certificate.",
      timeAgo: "1 hour ago",
    },
    {
      name: "Charlotte",
      location: "United Kingdom",
      action: "just requested a Certificate.",
      timeAgo: "2 hours ago",
    },
    {
      name: "Amelia",
      location: "United Kingdom",
      action: "just requested a Certificate.",
      timeAgo: "4 hours ago",
    },
    {
      name: "Jack",
      location: "United Kingdom",
      action: "just requested a Certificate.",
      timeAgo: "6 hours ago",
    },
    {
      name: "Isabella",
      location: "United Kingdom",
      action: "just requested a Certificate.",
      timeAgo: "8 hours ago",
    },
    // Add more data here...
  ];

  useEffect(() => {
    const showCard = () => {
      setIsVisible(true); // Show the card
      setTimeout(() => setIsVisible(false), 7000); // Hide after 7 seconds
    };

    // Function to generate a random interval between 10 and 20 seconds (in milliseconds)
    const getRandomInterval = () => {
      return (Math.floor(Math.random() * (20 - 10 + 1)) + 10) * 1000; // Convert seconds to milliseconds
    };

    // Show the first card initially
    showCard();

    // Function to handle card switching and reset interval
    const switchCardAndSetInterval = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % popupData.length);
      showCard();

      // Clear existing interval and set a new one with a random time
      clearInterval(intervalId);
      intervalId = setInterval(switchCardAndSetInterval, getRandomInterval());
    };

    // Set an interval with an initial random delay
    let intervalId = setInterval(switchCardAndSetInterval, getRandomInterval());

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [popupData.length]);

  const pathname = usePathname();
  const show = pathname.includes("dashboard");
  return (
    <AnimatePresence>
      {isVisible && !show ? (
        <motion.div
          key={currentIndex} // Use currentIndex as the key to trigger animations
          className="fixed z-[999999] left-4 bottom-4 text-primary  md:bottom-10 w-64 sm:w-80 bg-sky-50 rounded-lg shadow-[0px_4px_16px_0px_rgba(60,111,154,0.50)] p-3 flex items-start space-x-3"
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 1000,
          }}
        >
          <div className="flex-shrink-0 flex items-center justify-center my-auto h-full">
            <Image
              alt="Map"
              src={MapImg}
              height={MapImg.height}
              width={MapImg.width}
              style={{ width: "60px", height: "auto" }}
              className="rounded-lg border-[3px] border-white"
            />
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-[12px] truncate">
              <span className="font-semibold">
                {popupData[currentIndex].name}
              </span>{" "}
              From{" "}
              <span className="font-semibold">
                {popupData[currentIndex].location}
              </span>
            </p>
            <p className="text-xs text-primary mt-1 mb-2 truncate">
              {popupData[currentIndex].action}
            </p>
            <div className="flex justify-between gap-2">
              <p className="text-xs text-primary mt-1">
                {popupData[currentIndex].timeAgo}
              </p>
              <div className="flex items-center mt-1">
                <FaCheck className="h-3 w-3 p-px text-white bg-green-400 rounded-full mr-1" />
                <span className="text-[11px] text-black/80">
                  by <span className="text-primary">FMEOS</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
}
