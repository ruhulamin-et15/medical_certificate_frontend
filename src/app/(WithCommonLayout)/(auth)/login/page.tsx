"use client";
import Button from "@/components/ui/Button";
import DLink from "@/components/ui/DLink";
import Input from "@/components/ui/Input";
import { useUser } from "@/lib/provider/UserProvider";
import { LoginUserInterface } from "@/redux/api/user/user.auth.interface";
import { FC, useEffect, useState } from "react";
// import Cookies from "js-cookie";

const LoginCard: FC = () => {
  const { login, isError, loginLoading } = useUser();
  const [logout, setLogout] = useState<string | undefined>();

  // const token = Cookies.get("token");
  const logoutMsg = localStorage.getItem("logout");

  useEffect(() => {
    if (localStorage) {
      if (logoutMsg) {
        setLogout(logoutMsg);
        localStorage.removeItem("logout");
      }
    }
  }, [logoutMsg]);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email === "string" && typeof password === "string") {
      const loginData: LoginUserInterface = {
        email,
        password,
      };

      await login(loginData);
    }
  };

  return (
    <div className="flex items-center justify-center px-3 my-12 ">
      <div className="w-full max-w-2xl py-8 px-5 md:pt-10 md:pb-16 md:px-20 pt-10 pb-28  bg-white border border-gray-200 rounded-sm">
        {logout && (
          <div className="text-3xl text-center mb-6 text-red-500 md:text-3xl">
            You are logged out Successfully.
          </div>
        )}
        <h2 className="mb-6 text-4xl  text-center">Admin Log In</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-8">
            <label htmlFor="email" className="block ">
              Email
            </label>
            <Input
              type="email"
              autoComplete="email"
              id="email"
              name="email"
              defaultValue=""
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block ">
              Password
            </label>
            <Input
              type="password"
              autoComplete="off"
              id="password"
              name="password"
              required
            />
          </div>
          <div className="flex gap-2 items-center justify-between">
            <Button
              type="submit"
              className="px-2 mt-5 text-white text-xl py-3 rounded-md btn w-20"
            >
              Login
            </Button>
            <DLink
              href="/forgot-password"
              className="text-primary hover:text-primary-hover hover:no-underline underline"
            >
              Forgot Password?
            </DLink>
          </div>
        </form>
        {/* <div className="mt-20">
          New Member?{" "}
          <DLink
            href="/register"
            className="text-primary hover:text-primary-hover hover:no-underline underline"
          >
            Register
          </DLink>
        </div> */}
        <p className="text-[2rem] text-red-500 mt-4">
          {isError ? (
            "Invalid Email or Password"
          ) : (
            <span className="text-transparent select-none">No Error</span>
          )}
        </p>
        {loginLoading && <RedirectPopUp />}
      </div>
    </div>
  );
};

export default LoginCard;

const RedirectPopUp = () => {
  return (
    <div className="fixed inset-0 bg-black/40 flex  justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-h-32 p-6 max-w-sm w-full">
        <h2 className="text-green-600 text-2xl font-semibold mb-4">
          Checking cretientials.
        </h2>
        <p className="text-gray-700">Loading.......</p>
      </div>
    </div>
  );
};
