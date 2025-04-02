"use client";

import Button from "@/components/ui/Button";
import { useUser } from "@/lib/provider/UserProvider";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}) => {
  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem("isOpenNav", newState.toString()); // Update local storage
  };
  const pathname = usePathname();
  const { logout } = useUser();

  const headers = pathname.split("/");
  const header = headers.length > 2 ? headers[2] : headers[1];
  const formattedHeader =
    header
      ?.split("-") // Split words by hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" ") ?? // Join with spaces
    ""; // Fallback if header is undefined

  return (
    <header className="bg-white print:hidden shadow-md h-16 flex items-center justify-between px-4">
      <button
        onClick={toggleSidebar}
        className="text-gray-500  hover:text-gray-600 focus:outline-none focus:text-gray-600"
        aria-label="Toggle sidebar"
      >
        <div className="w-6 h-6 relative">
          <FaBars
            className={`absolute text-2xl transition-all duration-300 ${
              isSidebarOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
            }`}
          />
          <FaTimes
            className={`absolute text-2xl transition-all duration-300 ${
              isSidebarOpen ? "opacity-100 rotate-90" : "opacity-0 -rotate-0"
            }`}
          />
        </div>
      </button>
      <div className="text-xl font-semibold text-gray-700 normal-case first-letter:uppercase text-center">
        {formattedHeader}
      </div>
      <div>
        <Button onClick={() => logout()} className="px-5">
          Logout
        </Button>
      </div>{" "}
      {/* Placeholder for right-side content */}
    </header>
  );
};

export default Header;
