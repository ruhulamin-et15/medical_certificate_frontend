"use client";
import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string; // Additional classes for customization
}

const PopupChildren: React.FC<AnimateOnScrollProps> = ({
  children,
  className,
}) => {
  // Reference for the element
  const ref = React.useRef<HTMLDivElement | null>(null);
  // Animation control
  const controls = useAnimation();
  // Check if the element is in view
  const inView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (inView) {
      controls.start({ scale: 1 }); // Start animation to scale 1
    } else {
      controls.start({ scale: 0.3 }); // Reset scale when not in view
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ scale: 0.3 }} // Initial scale
      animate={controls} // Animation control
      transition={{ duration: 1 }} // Transition settings
    >
      {children}
    </motion.div>
  );
};

export default PopupChildren;
