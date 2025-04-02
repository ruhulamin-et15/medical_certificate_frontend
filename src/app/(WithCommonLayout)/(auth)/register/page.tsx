"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Loading from "@/components/ui/Loading";
import { useUser } from "@/lib/provider/UserProvider";
import { useRegisterMutation } from "@/redux/api/user/user.auth";
import { RegisterUserInterface } from "@/redux/api/user/user.auth.interface";
import { isValidPassword } from "@/utils/validPassword";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

const RegisterCard: FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [registerUser, { data, isLoading, isSuccess }] = useRegisterMutation();
  const { login } = useUser();
  const navigate = useRouter();
  const route = usePathname();
  useEffect(() => {
    if (route.startsWith("/register")) {
      navigate.push("/");
    }
    navigate.push("/");
  }, [navigate, route]);

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const password = formData.get("password");
    const email = formData.get("email");
    if (!isValidPassword(password as string)) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    const data: RegisterUserInterface = {
      firstName: firstName as string,
      lastName: lastName as string,
      email: email as string,
      password: password as string,
      phone: (formData.get("phone") as string) || null, // Optional field, fallback to empty string if not provided
    };

    if (!firstName || !password || !email) {
      setErrorMessage("First name, email or password is missing.");
      return;
    } else {
      await registerUser(data).unwrap();

      if (data || isSuccess) {
        await login({ email: email as string, password: password as string });
      }
    }

    setErrorMessage("");
  };

  return (
    <div className="flex items-center justify-center px-3 my-12 ">
      {isLoading ? (
        <div className="min-h-screen w-full fixed top-0 left-0 bg-black/25 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        ""
      )}
      <div className="w-full max-w-2xl py-8 px-5 md:pt-10 md:pb-16 md:px-20 bg-white border border-gray-200 rounded-sm">
        <h2 className="mb-6 text-4xl text-center">Registration</h2>
        <form onSubmit={handleRegisterSubmit}>
          {/* First Name */}
          <div className="flex md:gap-5 max-md:flex-col">
            <div className="mb-4 flex-1">
              <label htmlFor="firstName" className="block">
                First Name
              </label>
              <Input
                type="text"
                id="firstName"
                autoComplete="name"
                name="firstName"
                required
              />
            </div>
            {/* Last Name */}
            <div className="mb-4 flex-1">
              <label htmlFor="lastName" className="block">
                Last Name
              </label>
              <Input
                type="text"
                id="lastName"
                autoComplete="name"
                name="lastName"
              />
            </div>
          </div>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block">
              Email
            </label>
            <Input
              type="email"
              id="email"
              autoComplete="email"
              name="email"
              required
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="flex gap-2 justify-between">
              Password <p>(8 characters or more)</p>
            </label>
            <Input
              type="password"
              autoComplete="off"
              id="password"
              name="password"
              minLength={7}
              required
            />
          </div>
          {/* Phone (Optional) */}
          <div className="mb-4">
            <label htmlFor="phone" className="block">
              Phone (Optional)
            </label>
            <Input type="tel" autoComplete="tel" id="phone" name="phone" />
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          </div>

          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className="px-5 py-3 text-white text-xl rounded-md btn"
            >
              Register
            </Button>
          </div>
        </form>

        <div className="mt-10 ">
          Already Registered?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-primary-hover hover:no-underline underline"
          >
            Login
          </Link>
        </div>
      </div>
      {data || isSuccess ? <RedirectPopUp /> : ""}
    </div>
  );
};

export default RegisterCard;

const RedirectPopUp = () => {
  return (
    <div className="fixed inset-0 bg-black/40 flex  justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-h-32 p-6 max-w-sm w-full">
        <h2 className="text-green-600 text-2xl font-semibold mb-4">
          Register Successful.
        </h2>
        <p className="text-gray-700">Redirecting.......</p>
      </div>
    </div>
  );
};
