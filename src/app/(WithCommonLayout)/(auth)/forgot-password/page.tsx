"use client";
import Button from "@/components/ui/Button";
import DLink from "@/components/ui/DLink";
import Input from "@/components/ui/Input";
import { useForgottenPasswordMutation } from "@/redux/api/user/user.auth";
import React, { FormEvent, useEffect, useState } from "react";
import ResetPasswordPopup from "./ResetPasswordPopup";
import { useUser } from "@/lib/provider/UserProvider";

const ForgotPassword = () => {
  const [baseUrl, setBaseUrl] = useState<string>("");
  const { user } = useUser();

  useEffect(() => {
    // Check if window is defined to ensure code runs only on the client side
    if (typeof window !== "undefined") {
      const url = window.location.origin;
      setBaseUrl(url);
    }
  }, []);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [forgotPassword, { isLoading, isSuccess, isError, error }] =
    useForgottenPasswordMutation();
  const handleForgotPass = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("forgot-email") as string;
    if (email) {
      setIsOpen(true);
      await forgotPassword({ email: email, baseUrl: baseUrl }).unwrap();
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (isLoading || isSuccess) ? (
        <ResetPasswordPopup
          isLoading={isLoading}
          setIsOpen={setIsOpen}
          isSuccess={isSuccess}
        />
      ) : (
        ""
      )}
      <div className="flex items-center justify-center px-3 my-12 ">
        <div className="w-full max-w-2xl py-8 px-5 md:pt-10 md:pb-16 md:px-20 pt-10 lg:pb-20  bg-white border border-gray-200 rounded-sm">
          <div className="text-[2.5rem] text-center mb-10">
            {user ? "Change Password" : "Forgot your Password?"}
          </div>
          <form onSubmit={handleForgotPass}>
            <label htmlFor="forgot-email">Email</label>
            <Input
              required
              id="forgot-email"
              autoComplete="email"
              type="email"
              defaultValue={user ? user.email : ""}
              name="forgot-email"
              className="mb-8 disabled:bg-slate-100 disabled:cursor-not-allowed"
              readOnly={user ? true : false}
            />
            <div className="flex justify-between gap-4 flex-wrap items-center">
              <Button type="submit" className="py-[10px] px-5 text-[1.2rem]">
                {user ? "Send Verify Email" : "Submit"}
              </Button>
              {!user && <DLink href={"/login"}>Login</DLink>}
            </div>
            {isError || error ? (
              <p className="text-[2rem] text-red-500 mt-4">
                No account was found with the email address you entered.
              </p>
            ) : (
              <span className="text-transparent select-none">No Error</span>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
