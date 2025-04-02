"use client";

import Input from "@/components/ui/Input";
import Loading from "@/components/ui/Loading";
import { useResetPasswordMutation } from "@/redux/api/user/user.auth";
import { isValidPassword } from "@/utils/validPassword";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const params = useSearchParams();
  const token = params.get("token");
  const id = params.get("userId");
  const router = useRouter();

  const [resetPass, { isLoading, isSuccess, data, isError, error }] =
    useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if newPassword meets minimum length requirement
    if (!isValidPassword(newPassword)) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }
    if (!token || !id || !params) {
      setErrorMessage("Invalid data.");
      return;
    }
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    const data = {
      password: confirmPassword,
      token: token,
      id: id,
    };
    await resetPass(data).unwrap();
    // Clear any previous error
    if (isError || error) {
      setErrorMessage("Something went wrong! Try again.");
      return;
    }
    setErrorMessage("");
  };

  useEffect(() => {
    if (isSuccess || data) {
      router.push("/reset-password/success");
    }
  }, [data, isSuccess, router]);

  return (
    <div className="w-full container mx-auto p-6 mb-16">
      {isLoading ? (
        <div className="min-h-screen w-full fixed top-0 left-0 bg-black/25 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        ""
      )}
      <h1 className="text-2xl md:text-[2.5rem] font-normal text-center mb-6">
        Change Your Password
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="w-1/3 p-2 text-right">
                <label htmlFor="new-password" className="mr-2">
                  New Password:
                </label>
              </td>
              <td className="w-1/4 p-2 ">
                <Input
                  name="new-password"
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full border  px-2 py-1 max-w-[200px]"
                />
              </td>
              <td className="w-1/2 p-2 pb-5 text-left">Required</td>
            </tr>
            <tr>
              <td className="w-1/3 p-2 text-right">
                <label htmlFor="confirm-password" className="mr-2">
                  Confirm New Password:
                </label>
              </td>
              <td className="w-1/4  p-2">
                <Input
                  name="confirm-password"
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full border  px-2 py-1 max-w-[200px]"
                />

                {errorMessage && (
                  <div className="text-red-500 text-sm mt-2">
                    {errorMessage}
                  </div>
                )}
              </td>
              <td className="w-1/2 p-2 pb-8 text-left">Required</td>
            </tr>
            <tr>
              <td></td>
              <td className="w-1/4 p-2 ">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 text-sm font-normal rounded"
                >
                  Save
                </button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
