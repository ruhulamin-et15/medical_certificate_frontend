"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Define the prop types for TypeScript
interface AnimateHeaderProps {
  words: string[];
  animate2?: boolean; // Prop to toggle between animations
  className?: string;
  center?: boolean;
  large?: boolean;
}

const AnimateHeader: React.FC<AnimateHeaderProps> = ({
  words,
  animate2,
  className,
  center,
  large,
}) => {
  const [isVisible, setIsVisible] = useState(false); // State to track visibility
  const ref = useRef<HTMLDivElement | null>(null); // Ref to the component

  // First animation configuration (default)
  const defaultAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 200, duration: 0.8 },
  };

  // Second animation configuration (animation 2)
  const containerAnimation2 = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each word's animation
      },
    },
  };

  const wordAnimation2 = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring", // Change to spring for smoother animation
        stiffness: 100,
        duration: 0.5,
      },
    },
  };

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Set visible to true when component is in view
        } else {
          setIsVisible(false); // Set visible to false when component is out of view
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the component is visible
    );

    if (ref.current) {
      observer.observe(ref.current); // Start observing the component
    }

    // Cleanup observer on component unmount
    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Conditional rendering based on animate2 prop
  return (
    <div ref={ref}>
      {animate2 ? (
        <motion.div
          variants={containerAnimation2} // Container level animation for animate2
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"} // Trigger animation based on visibility
          className={`${
            className && className
          } flex flex-wrap text-3xl max-md:text-center md:text-[38px] lg:text-[2rem] font-semibold`}
        >
          {words.map((word, index) => {
            // Assign different classes for the first 3 words, and default black for others
            const customClass =
              index === 0
                ? "text-[#33B6A8]" // Lighter shade of #007B7F
                : index === 1
                ? "text-[#1FA589]" // Slightly closer to #007B7F
                : index === 2
                ? "text-[#1F9289]"
                : "text-primary";

            return (
              <motion.span
                key={index}
                variants={wordAnimation2}
                className={`inline-block  mr-1 ${customClass}`}
              >
                {word}&nbsp;
              </motion.span>
            );
          })}
        </motion.div>
      ) : (
        <h1
          className={`${className ? className : "text-primary"} ${
            center && "mx-auto text-center w-full inline-block"
          } ${
            large ? "text-3xl !text-[2.5rem]" : "text-2xl "
          }  font-bold font-jost mr-1 `}
        >
          {words.map((word, index) => (
            <motion.span
              className="inline-block mr-1 leading-snug"
              key={index}
              initial={defaultAnimation.initial}
              animate={
                isVisible ? defaultAnimation.animate : defaultAnimation.initial
              }
              transition={{
                ...defaultAnimation.transition,
                delay: 0.15 + index * 0.04,
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
      )}
    </div>
  );
};

export default AnimateHeader;
