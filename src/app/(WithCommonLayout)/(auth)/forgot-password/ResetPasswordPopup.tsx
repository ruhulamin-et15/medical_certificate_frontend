"use client";
import Loading from "@/components/ui/Loading";
import { useUser } from "@/lib/provider/UserProvider";
import Link from "next/link";
import React from "react";

export default function ResetPasswordPopup({
  isLoading,
  isSuccess,
  setIsOpen,
}: {
  isLoading: boolean;
  setIsOpen: (value: boolean) => void;
  isSuccess: boolean;
}) {
  const { user } = useUser();
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
        <Success user={user} />
      ) : (
        <Success user={user} />
      )}
    </div>
  );
}

const Success = ({ user }: { user: any }) => (
  <>
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-lg shadow-lg w-full max-h-[220px] mt-16 max-w-md overflow-hidden"
    >
      <div className="p-6">
        <h2 className="text-2xl font-normal text-green-600 mb-4">
          Reset Password.
        </h2>
        <p className="text-gray-700">
          You should receive a password reset email within a few minutes. If
          not, please check your spam/junk folder, in case it got delivered
          there.
        </p>
      </div>
      <div className="px-6 pb-6">
        <Link href={user ? "/" : "/login"}>
          <button className="py-1 px-4 bg-primary text-white hover:bg-primary-hover transition-colors rounded-md">
            {user ? "Okay" : "Login"}
          </button>
        </Link>
      </div>
    </div>
  </>
);
