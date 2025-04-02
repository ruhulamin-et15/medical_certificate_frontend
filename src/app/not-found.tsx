"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const NotFound: React.FC = () => {
  const router = useRouter();

  // Navigate to home after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000); // Change the timeout duration as needed
    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, [router]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(5); // Initialize as number | null

  useEffect(() => {
    // Only run countdown if there is no user
    const intervalId = setInterval(() => {
      setCurrentNumber((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(intervalId);
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <motion.h1
        className="text-6xl font-bold text-primary"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>
      <motion.p
        className="mt-4 text-2xl text-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Oops! Page Not Found
      </motion.p>
      <motion.p
        className="mt-2 text-lg text-gray-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        We couldn&#39;t find the page you were looking for.
      </motion.p>
      <motion.button
        className="mt-6 px-4 py-2 text-white bg-primary rounded hover:bg-primary-hover"
        onClick={() => router.push("/")}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Go to Homepage
      </motion.button>
      <motion.p
        className="mt-4 text-lg text-gray-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Redirecting you in {currentNumber} seconds...
      </motion.p>
    </div>
  );
};

export default NotFound;
