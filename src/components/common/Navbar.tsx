"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "../ui/Button";
// import { FaRegUser } from "react-icons/fa6";
import { useUser } from "@/lib/provider/UserProvider";
import Cookies from "js-cookie";
import { FaHome, FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Dropdown from "../ui/Dropdown";
import { LiaCertificateSolid } from "react-icons/lia";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const { user, logout } = useUser();
  const route = usePathname();
  const navigate = useRouter();

  const localToken = Cookies.get("token");

  useEffect(() => {
    if (localStorage) {
      if (localToken) {
        setIsToken(true);
      } else {
        setIsToken(false);
      }
    }
  }, [localToken]);

  useEffect(() => {
    if (route.startsWith("/register")) {
      navigate.push("/error");
    }
  }, [navigate, route]);

  // (user);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const certificates = [
    {
      label: "Fit/Sick Note for Work",
      href: "/medical-certificate/sick-note-for-work",
    },
    {
      label: "Fit to Work",
      href: "/medical-certificate/employee-fitness-to-work-certificate",
    },
    {
      label: "Student Sick Leave",
      href: "/medical-certificate/student-sick-leave-letter",
    },
    {
      label: "Pregnancy Fit-to-Fly",
      href: "/medical-certificate/fit-for-flight-letter-for-expecting-mothers",
    },
    {
      label: "Chickenpox Fit-to-Fly",
      href: "/medical-certificate/chickenpox-flight-clearance-medical",
    },
    {
      label: "Travel Cancellation",
      href: "/medical-certificate/emergency-cancellation-letter-for-travel",
    },
  ];

  return (
    <div>
      <div className="bg-primary print:hidden font-bold gap-[6px] text-sm text-white flex justify-center items-center w-full py-[10px]">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div>DOCTORS ARE ONLINE NOW</div>
      </div>
      <nav className="bg-white print:hidden">
        <div className="container mx-auto ">
          <div className="flex justify-between ">
            <div className="flex-shrink-0 flex items-center">
              <Logo />
            </div>
            <div className="hidden lg:ml-5 lg:flex lg:items-center">
              <Link
                href={"/"}
                className=" px-3 cursor-pointer py-2 flex items-center gap-2 rounded-md text-lg"
              >
                <FaHome />
                Home
              </Link>
              <Dropdown item={certificates}>
                {" "}
                <LiaCertificateSolid className="w-6 h-6" />
                Medical Certificates
              </Dropdown>
              {user || isToken ? (
                <>
                  {user?.role === "ADMIN" && (
                    <Link
                      href={"/dashboard"}
                      className=" px-3 cursor-pointer py-2 flex items-center gap-2 rounded-md text-lg"
                    >
                      <IoMdSettings />
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href={"/my-account"}
                    className=" px-3 cursor-pointer py-2 flex items-center gap-2 rounded-md text-lg"
                  >
                    <FaUser />
                    My Account
                  </Link>
                  {/* <Link href={"/login"}>
                    <div
                      onClick={() => logout()}
                      className=" px-3 cursor-pointer py-2 flex items-center gap-2 rounded-md text-lg"
                    >
                      <RiLogoutCircleRLine />
                      Logout
                    </div>
                  </Link> */}
                </>
              ) : (
                // <Link
                //   href={"/login"}
                //   className=" px-3 cursor-pointer py-2 flex items-center gap-2 rounded-md text-lg"
                // >
                //   <FaRegUser />
                //   Log in
                // </Link>

                <></>
              )}

              <Link
                href="/medical-certificate"
                className="inline-flex items-center px-2 py-2 border border-transparent text-lg rounded-md text-white "
              >
                <Button className="text-sm max-w-[190px] font-bold">
                  Get My Medical Certificate
                </Button>
              </Link>
            </div>
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#4c7491]"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-fit opacity-100"
              : "max-h-0 overflow-hidden opacity-0"
          }`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 ">
            <Link
              onClick={toggleMobileMenu}
              href={"/"}
              className=" px-3 cursor-pointer py-2 flex items-center gap-2 rounded-md text-lg"
            >
              <FaHome />
              Home
            </Link>
            <Dropdown
              onItemClick={() => setIsMobileMenuOpen(false)}
              item={certificates}
            >
              <LiaCertificateSolid className="w-6 h-6" />
              Medical Certificates
            </Dropdown>
            {user || isToken ? (
              <>
                {user || isToken ? (
                  <>
                    {user?.role === "ADMIN" && (
                      <Link
                        onClick={toggleMobileMenu}
                        href={"/dashboard"}
                        className=" px-3 cursor-pointer py-2 flex items-center gap-2 rounded-md text-lg"
                      >
                        <IoMdSettings />
                        Dashboard
                      </Link>
                    )}
                    <Link
                      onClick={toggleMobileMenu}
                      href={"/my-account"}
                      className=" px-3 cursor-pointer py-2 flex items-center gap-2 rounded-md text-lg"
                    >
                      <FaUser />
                      My Account
                    </Link>
                    <Link onClick={toggleMobileMenu} href={"/login"}>
                      <div
                        onClick={() => logout()}
                        className=" px-3 cursor-pointer py-2 flex items-center gap-2 rounded-md text-lg"
                      >
                        <RiLogoutCircleRLine />
                        Logout
                      </div>
                    </Link>
                  </>
                ) : (
                  // <Link
                  //   onClick={toggleMobileMenu}
                  //   href={"/login"}
                  //   className=" px-3 cursor-pointer py-2 flex items-center gap-2 rounded-md text-lg"
                  // >
                  //   <FaRegUser />
                  //   Log in
                  // </Link>
                  <></>
                )}
              </>
            ) : (
              // <Link
              //   onClick={toggleMobileMenu}
              //   href={"/login"}
              //   className=" block rounded-md text-base md:text-lg"
              // >
              //   <div className=" px-3 cursor-pointer py-2 flex items-center gap-2 rounded-md text-lg">
              //     <FaRegUser />
              //     Log in
              //   </div>
              // </Link>
              <></>
            )}

            <hr />
            <Link
              onClick={toggleMobileMenu}
              href="/medical-certificate"
              className=" inline-flex items-center px-4 py-2 border border-transparent text-lg rounded-md text-white "
            >
              <Button className="font-bold">Get My Medical Certificates</Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
