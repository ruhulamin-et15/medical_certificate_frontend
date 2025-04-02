"use client";
import DLink from "@/components/ui/DLink";
import Loading from "@/components/ui/Loading";
import React from "react";

export default function ChangePasswordPopup({
  isLoading,
  isSuccess,
  setIsOpen,
}: {
  isLoading: boolean;
  setIsOpen: (value: boolean) => void;
  isSuccess: boolean;
}) {
  return (
    <div
      onClick={() => setIsOpen(false)}
      className="min-h-screen w-full fixed top-0 bg-black/20 flex justify-center"
    >
      {isLoading ? (
        <div className="mt-20">
          <Loading />
        </div>
      ) : isSuccess ? (
        <Success />
      ) : (
        <Success />
      )}
    </div>
  );
}

const Success = () => (
  <>
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-lg shadow-lg w-full max-h-[220px] mt-16 max-w-md overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center  p-4">
        {/* Success Message Box */}
        <div className="bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-md mb-4 text-center">
          Your password for Login Area has now been reset.
        </div>

        {/* Instructions and Login Link */}
        <p className="text-center text-gray-700 mb-2">
          Login now with your new password:
        </p>
        <DLink href="/login" passHref>
          Go to Login Area
        </DLink>
      </div>
    </div>
  </>
);
